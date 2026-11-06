import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';

/**
 * Interactive demo for "Beyond Euclidean Summaries: Online Change Point Detection
 * for Distribution-Valued Data" (ICML 2026).
 *
 * Each tick streams in one distribution (a sample of N points). The detector compares
 * the Wasserstein–Fréchet mean of a fixed reference window (1-D: the average quantile
 * function) with that of the most recent window, using the W2 distance. A classical
 * mean-based chart is calibrated to the same false-alarm rate for comparison.
 * This is an illustrative browser simulation, not the paper's exact procedure.
 */

type Kind = 'none' | 'mean' | 'variance' | 'shape';

const N = 200; // points per distribution
const K = 40; // quantile levels
const REF = 20; // reference window (ticks 0..REF-1)
const WIN = 10; // recent window
const VISIBLE_WIDE = 60; // ticks shown on wide screens
const VISIBLE_NARROW = 30;
const BASE_SLOT = 16; // violin paths are drawn for this slot width, then scaled
const MAX_TICKS = 220;
const TICK_MS = 170;

const W = 960;
const TOP_Y0 = 30;
const TOP_Y1 = 186;
const BOT_Y0 = 222;
const BOT_Y1 = 326;
const V_MIN = -3.6;
const V_MAX = 3.6;
const GRID = 56;
const Y_MAX = 3; // statistic axis, in multiples of the threshold

function randn() {
  let u = 0;
  while (u === 0) u = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * Math.random());
}

function draw(kind: Kind): number[] {
  const mj = randn() * 0.08;
  const sj = 1 + randn() * 0.05;
  const xs = new Array<number>(N);
  for (let i = 0; i < N; i++) {
    switch (kind) {
      case 'mean':
        xs[i] = 0.45 + mj + sj * randn();
        break;
      case 'variance':
        xs[i] = mj + 1.4 * sj * randn();
        break;
      case 'shape': // equal mixture of N(±0.9, 0.436²): same mean and variance as N(0, 1)
        xs[i] = mj + (Math.random() < 0.5 ? -0.9 : 0.9) + 0.436 * sj * randn();
        break;
      default:
        xs[i] = mj + sj * randn();
    }
  }
  return xs.sort((a, b) => a - b);
}

const quantiles = (sorted: number[]) =>
  Array.from({ length: K }, (_, k) => sorted[Math.min(N - 1, Math.floor(((k + 0.5) / K) * N))]);

const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;

function avgQ(qs: number[][]) {
  const out = new Array<number>(K).fill(0);
  for (const q of qs) for (let k = 0; k < K; k++) out[k] += q[k] / qs.length;
  return out;
}

const w2 = (a: number[], b: number[]) =>
  Math.sqrt(a.reduce((s, ak, k) => s + (ak - b[k]) ** 2, 0) / K);

const yOf = (v: number) => TOP_Y0 + ((V_MAX - v) / (V_MAX - V_MIN)) * (TOP_Y1 - TOP_Y0);

/** Half-violin outline from a Gaussian KDE, drawn rightward from x = 0. */
function violin(sorted: number[]) {
  const m = mean(sorted);
  const sd = Math.sqrt(sorted.reduce((s, x) => s + (x - m) ** 2, 0) / N);
  const h = 1.06 * sd * Math.pow(N, -0.2);
  const pts: string[] = [];
  for (let g = 0; g <= GRID; g++) {
    const v = V_MAX - (g / GRID) * (V_MAX - V_MIN);
    let d = 0;
    for (const x of sorted) d += Math.exp(-0.5 * ((v - x) / h) ** 2);
    d /= N * h * Math.sqrt(2 * Math.PI);
    pts.push(`${(Math.min(d, 0.75) * BASE_SLOT * 2.3).toFixed(1)},${yOf(v).toFixed(1)}`);
  }
  return `M0,${yOf(V_MAX).toFixed(1)} L${pts.join(' L')} L0,${yOf(V_MIN).toFixed(1)} Z`;
}

interface Tick {
  t: number;
  path: string;
  after: boolean;
  w: number | null; // normalized by threshold
  m: number | null;
}

interface Stream {
  q: number[][];
  mu: number[];
}

function stats(s: Stream): { w: number; m: number } | null {
  const n = s.q.length;
  if (n < REF + WIN) return null;
  const refQ = avgQ(s.q.slice(0, REF));
  const recQ = avgQ(s.q.slice(n - WIN));
  return {
    w: w2(refQ, recQ),
    m: Math.abs(mean(s.mu.slice(0, REF)) - mean(s.mu.slice(n - WIN))),
  };
}

/** Thresholds giving ~5% false-alarm probability per 200-tick null run, for both charts. */
function calibrate(runs = 60, len = 200) {
  const maxW: number[] = [];
  const maxM: number[] = [];
  for (let r = 0; r < runs; r++) {
    const s: Stream = { q: [], mu: [] };
    let mw = 0;
    let mm = 0;
    for (let t = 0; t < len; t++) {
      const xs = draw('none');
      s.q.push(quantiles(xs));
      s.mu.push(mean(xs));
      const st = stats(s);
      if (st) {
        mw = Math.max(mw, st.w);
        mm = Math.max(mm, st.m);
      }
    }
    maxW.push(mw);
    maxM.push(mm);
  }
  const q95 = (a: number[]) => a.sort((x, y) => x - y)[Math.floor(0.95 * (a.length - 1))];
  return { w: q95(maxW), m: q95(maxM) };
}

const KINDS: { key: Exclude<Kind, 'none'>; label: string }[] = [
  { key: 'shape', label: 'Shape change' },
  { key: 'variance', label: 'Variance change' },
  { key: 'mean', label: 'Mean shift' },
];

@Component({
  selector: 'app-cpd-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cpd">
      <div class="cpd__stage">
        <svg [attr.viewBox]="'0 0 ' + w + ' 336'" role="img" aria-labelledby="cpd-title cpd-desc">
          <title id="cpd-title">Streaming distributions and detection statistics</title>
          <desc id="cpd-desc">
            Top: one distribution per tick. Bottom: the Wasserstein–Fréchet detection statistic and a
            mean-based statistic, each scaled so that 1 is its alarm threshold.
          </desc>

          @if (refBand(); as rb) {
            <rect class="cpd__ref" [attr.x]="rb.x" [attr.width]="rb.w" [attr.y]="topY0 - 4" [attr.height]="topY1 - topY0 + 8" />
            <text class="cpd__lbl" [attr.x]="rb.x + 2" [attr.y]="topY0 - 12">reference window</text>
          }
          @if (recBand(); as wb) {
            <rect class="cpd__rec" [attr.x]="wb.x" [attr.width]="wb.w" [attr.y]="topY0 - 4" [attr.height]="topY1 - topY0 + 8" />
            <text class="cpd__lbl" [attr.x]="wb.x + wb.w" [attr.y]="topY0 - 12" text-anchor="end">latest window</text>
          }

          @for (k of view(); track k.t) {
            <path class="cpd__d" [class.cpd__d--after]="k.after" [attr.d]="k.path"
                  [attr.transform]="'translate(' + (k.x + 1.5) + ',0) scale(' + slot() / 16 + ',1)'" vector-effect="non-scaling-stroke" />
          }

          @if (marker(changeAt()); as x) {
            <line class="cpd__chg" [attr.x1]="x" [attr.x2]="x" [attr.y1]="topY0 - 4" [attr.y2]="botY1" />
            <text class="cpd__lbl cpd__lbl--chg" [attr.x]="x + 5" [attr.y]="botY0 - 10">change injected</text>
          }
          @if (marker(alarmAt()); as x) {
            <line class="cpd__alarm" [attr.x1]="x" [attr.x2]="x" [attr.y1]="topY0 - 4" [attr.y2]="botY1" />
            <text class="cpd__lbl cpd__lbl--alarm" [attr.x]="x + 5" [attr.y]="botY0 + 18">alarm</text>
          }

          <!-- statistics panel -->
          <line class="cpd__axis" x1="0" [attr.x2]="w" [attr.y1]="botY1" [attr.y2]="botY1" />
          <line class="cpd__thr" x1="0" [attr.x2]="w" [attr.y1]="thrY" [attr.y2]="thrY" />
          <text class="cpd__lbl" [attr.x]="w - 4" [attr.y]="thrY - 6" text-anchor="end">alarm threshold</text>
          <polyline class="cpd__m" [attr.points]="lines().m" />
          <polyline class="cpd__w" [attr.points]="lines().w" />
        </svg>
      </div>

      <div class="cpd__bar">
        <div class="cpd__kinds" role="group" aria-label="Type of change to inject">
          @for (k of kinds; track k.key) {
            <button type="button" class="filter" [attr.aria-pressed]="kind() === k.key"
                    [disabled]="changeAt() !== null" (click)="kind.set(k.key)">{{ k.label }}</button>
          }
        </div>
        <div class="cpd__actions">
          <button type="button" class="btn btn--primary" (click)="inject()"
                  [disabled]="changeAt() !== null || ticks().length < refEnd">Inject change</button>
          <button type="button" class="btn" (click)="toggle()">{{ playing() ? 'Pause' : 'Play' }}</button>
          <button type="button" class="btn" (click)="restart()">Restart</button>
        </div>
      </div>

      <ul class="cpd__legend" aria-label="Legend">
        <li><span class="sw sw--w"></span>Wasserstein–Fréchet detector</li>
        <li><span class="sw sw--m"></span>Mean-based chart (same false-alarm rate)</li>
        <li><span class="sw sw--pre"></span>Before change</li>
        <li><span class="sw sw--post"></span>After change</li>
      </ul>

      <p class="cpd__status" aria-live="polite">{{ status() }}</p>

      <p class="item__caption">Illustrative simulation running in your browser. See the paper for the exact statistic and its guarantees.</p>
    </div>
  `,
})
export class CpdDemo {
  protected readonly w = W;
  protected readonly topY0 = TOP_Y0;
  protected readonly topY1 = TOP_Y1;
  protected readonly botY0 = BOT_Y0;
  protected readonly botY1 = BOT_Y1;
  protected readonly thrY = BOT_Y1 - (1 / Y_MAX) * (BOT_Y1 - BOT_Y0);
  protected readonly refEnd = REF + WIN;
  protected readonly kinds = KINDS;

  protected readonly kind = signal<Exclude<Kind, 'none'>>('shape');
  protected readonly ticks = signal<Tick[]>([]);
  protected readonly playing = signal(false);
  protected readonly changeAt = signal<number | null>(null);
  protected readonly alarmAt = signal<number | null>(null);
  private readonly mAlarmAt = signal<number | null>(null);

  private stream: Stream = { q: [], mu: [] };
  private thr: { w: number; m: number } | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private visible = false;
  private userPaused = false;
  private readonly host = inject(ElementRef<HTMLElement>);

  private readonly visibleN = signal(VISIBLE_WIDE);
  protected readonly slot = computed(() => W / this.visibleN());
  private readonly first = computed(() => Math.max(0, this.ticks().length - this.visibleN()));

  protected readonly view = computed(() => {
    const f = this.first();
    return this.ticks()
      .slice(f)
      .map((k) => ({ ...k, x: (k.t - f) * this.slot() }));
  });

  protected readonly refBand = computed(() => {
    const f = this.first();
    const end = Math.min(REF, this.ticks().length);
    if (end <= f) return null;
    return { x: 0, w: (end - f) * this.slot() };
  });

  protected readonly recBand = computed(() => {
    const n = this.ticks().length;
    if (n < REF + WIN) return null;
    const f = this.first();
    const sl = this.slot();
    return { x: Math.max(0, n - WIN - f) * sl, w: Math.min(WIN, n - f) * sl };
  });

  protected readonly lines = computed(() => {
    const f = this.first();
    const yS = (v: number) => (BOT_Y1 - (Math.min(v, Y_MAX) / Y_MAX) * (BOT_Y1 - BOT_Y0)).toFixed(1);
    const w: string[] = [];
    const m: string[] = [];
    for (const k of this.ticks().slice(f)) {
      const x = ((k.t - f) * this.slot() + this.slot() / 2).toFixed(1);
      if (k.w !== null) w.push(`${x},${yS(k.w)}`);
      if (k.m !== null) m.push(`${x},${yS(k.m)}`);
    }
    return { w: w.join(' '), m: m.join(' ') };
  });

  protected readonly status = computed(() => {
    const n = this.ticks().length;
    const c = this.changeAt();
    const a = this.alarmAt();
    const ma = this.mAlarmAt();
    if (n === 0) return 'Press Play to start the stream.';
    if (n < REF + WIN) return `Collecting the reference window… tick ${n}`;
    if (c === null) return a !== null
      ? `False alarm at tick ${a}. Restart to try again.`
      : 'Monitoring. Choose a change type and press Inject change.';
    if (a === null) return `Change injected at tick ${c}. Watching…`;
    const delay = a - c;
    const mText = ma !== null && ma >= c ? `the mean chart alarmed after ${ma - c} ticks` : 'the mean chart has not alarmed';
    return delay >= 0
      ? `Alarm ${delay} ticks after the change; ${mText}.`
      : `False alarm at tick ${a}, before the change.`;
  });

  constructor() {
    afterNextRender(() => {
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const ro = new ResizeObserver(([e]) =>
        this.visibleN.set(e.contentRect.width < 600 ? VISIBLE_NARROW : VISIBLE_WIDE),
      );
      ro.observe(this.host.nativeElement);
      const io = new IntersectionObserver(
        ([e]) => {
          this.visible = e.isIntersecting;
          if (this.visible && !reduce && !this.userPaused && this.ticks().length < MAX_TICKS) this.start();
          if (!this.visible) this.stop();
        },
        { threshold: 0.25 },
      );
      io.observe(this.host.nativeElement);
      this.destroyRef.onDestroy(() => {
        io.disconnect();
        ro.disconnect();
        this.stop();
      });
    });
  }

  private readonly destroyRef = inject(DestroyRef);

  protected marker(t: number | null) {
    if (t === null) return null;
    const f = this.first();
    if (t < f) return null;
    return (t - f) * this.slot();
  }

  protected toggle() {
    if (this.playing()) {
      this.userPaused = true;
      this.stop();
    } else {
      this.userPaused = false;
      if (this.ticks().length >= MAX_TICKS) this.reset();
      this.start();
    }
  }

  protected restart() {
    this.reset();
    this.userPaused = false;
    this.start();
  }

  protected inject() {
    if (this.changeAt() === null) this.changeAt.set(this.ticks().length);
    if (!this.playing()) this.start();
  }

  private reset() {
    this.stop();
    this.stream = { q: [], mu: [] };
    this.ticks.set([]);
    this.changeAt.set(null);
    this.alarmAt.set(null);
    this.mAlarmAt.set(null);
  }

  private start() {
    if (this.timer) return;
    this.thr ??= calibrate();
    this.playing.set(true);
    this.timer = setInterval(() => this.step(), TICK_MS);
  }

  private stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.playing.set(false);
  }

  private step() {
    const t = this.ticks().length;
    if (t >= MAX_TICKS) {
      this.stop();
      return;
    }
    const c = this.changeAt();
    const after = c !== null && t >= c;
    const xs = draw(after ? this.kind() : 'none');
    this.stream.q.push(quantiles(xs));
    this.stream.mu.push(mean(xs));
    const st = stats(this.stream);
    const thr = this.thr!;
    const tick: Tick = {
      t,
      path: violin(xs),
      after,
      w: st ? st.w / thr.w : null,
      m: st ? st.m / thr.m : null,
    };
    if (tick.w !== null && tick.w >= 1 && this.alarmAt() === null) this.alarmAt.set(t);
    if (tick.m !== null && tick.m >= 1 && this.mAlarmAt() === null) this.mAlarmAt.set(t);
    this.ticks.update((ks) => [...ks, tick]);
    // stop a while after the alarm so the result stays on screen
    const a = this.alarmAt();
    if (a !== null && c !== null && (t >= a + 24 || t - c >= this.visibleN() - 6)) this.stop();
  }
}
