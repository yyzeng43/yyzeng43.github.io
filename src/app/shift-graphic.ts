import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Hero illustration: a stream of distributions that keep the same mean and
 * variance but change shape at a change point — the kind of shift that
 * Euclidean summaries miss (see the ICML 2026 paper).
 */

const STEPS = 24;
const CHANGE_AT = 14;
const W = 960;
const H = 210;
const TOP = 22;
const BOTTOM = 182;
const LEFT = 46; // room for the 'mean' label
const STEP_X = (W - LEFT) / STEPS;
const WIDTH_SCALE = STEP_X * 0.78;

const normal = (x: number, m: number, s: number) =>
  Math.exp(-0.5 * ((x - m) / s) ** 2) / (s * Math.sqrt(2 * Math.PI));

// Deterministic jitter so every visit draws the same picture.
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const yOf = (v: number) => TOP + ((3 - v) / 6) * (BOTTOM - TOP);

interface Shape {
  d: string;
  outline: string;
  after: boolean;
  delay: number;
}

function buildShapes(): Shape[] {
  const shapes: Shape[] = [];
  for (let t = 0; t < STEPS; t++) {
    const after = t >= CHANGE_AT;
    const j = (rand(t + 1) - 0.5) * 0.12;
    // Before: N(0, 1). After: equal mixture of N(±0.9, 0.436²) — same mean, same variance.
    const m = 0.9 + j;
    const s = 0.436 + j * 0.3;
    const pdf = (v: number) =>
      after ? 0.5 * normal(v, -m, s) + 0.5 * normal(v, m, s) : normal(v, j, 1 + j);
    const x0 = LEFT + t * STEP_X + STEP_X * 0.08;
    const pts: string[] = [];
    for (let i = 0; i <= 60; i++) {
      const v = 3 - (i / 60) * 6;
      pts.push(`${(x0 + pdf(v) * WIDTH_SCALE * 2.1).toFixed(1)},${yOf(v).toFixed(1)}`);
    }
    shapes.push({
      d: `M${x0.toFixed(1)},${yOf(3).toFixed(1)} L${pts.join(' L')} L${x0.toFixed(1)},${yOf(-3).toFixed(1)} Z`,
      outline: `M${pts.join(' L')}`,
      after,
      delay: t * 45,
    });
  }
  return shapes;
}

@Component({
  selector: 'app-shift-graphic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="shift">
      <svg [attr.viewBox]="'0 0 ' + w + ' ' + h" role="img"
           aria-labelledby="shift-title shift-desc" preserveAspectRatio="xMidYMid meet">
        <title id="shift-title">A distribution shift with the same mean</title>
        <desc id="shift-desc">
          Twenty-four distributions over time. The first fourteen are bell-shaped; after the change point
          they split into two peaks, while the mean and variance stay the same.
        </desc>
        @for (s of shapes; track $index) {
          <g class="shift__d" [class.shift__d--after]="s.after" [style.animation-delay.ms]="s.delay">
            <path class="shift__fill" [attr.d]="s.d" />
            <path class="shift__line" [attr.d]="s.outline" />
          </g>
        }
        <line class="shift__mean" [attr.x1]="left" [attr.x2]="w" [attr.y1]="meanY" [attr.y2]="meanY" />
        <text class="shift__label" x="0" [attr.y]="meanY + 4">mean</text>
        <line class="shift__cp" [attr.x1]="cpX" [attr.x2]="cpX" [attr.y1]="8" [attr.y2]="h - 14" />
        <text class="shift__label shift__label--cp" [attr.x]="cpX + 6" y="16">change point</text>
      </svg>
      <figcaption>
        Same mean, same variance, different shape. Summary statistics miss this kind of shift;
        my online change-point method for distribution-valued data catches it.
      </figcaption>
    </figure>
  `,
})
export class ShiftGraphic {
  protected readonly w = W;
  protected readonly h = H;
  protected readonly left = LEFT;
  protected readonly shapes = buildShapes();
  protected readonly meanY = yOf(0);
  protected readonly cpX = LEFT + CHANGE_AT * STEP_X;
}
