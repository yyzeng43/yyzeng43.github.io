import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as C from './content';
import { ShiftGraphic } from './shift-graphic';
import { DemoCard } from './demo-card';
import { PublicationList } from './publication-list';
import { CpdDemo } from './cpd-demo';

type Theme = 'light' | 'dark';

@Component({
  selector: 'app-root',
  imports: [ShiftGraphic, DemoCard, PublicationList, CpdDemo],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements AfterViewInit {
  protected readonly c = C;
  protected readonly year = new Date().getFullYear();
  protected readonly nav = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Research' },
    { id: 'experience', label: 'Experience' },
    { id: 'publications', label: 'Publications' },
    { id: 'skills', label: 'Skills' },
    { id: 'teaching', label: 'Teaching' },
    { id: 'service', label: 'Service' },
  ];
  protected readonly active = signal('');
  protected readonly theme = signal<Theme | null>(null);

  private readonly doc = inject(DOCUMENT);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') this.applyTheme(saved);
    } catch {
      /* storage unavailable: follow the system theme */
    }
  }

  /** Splits text on **bold** markers into plain and bold segments. */
  protected rich(text: string) {
    return text.split(/\*\*(.+?)\*\*/g).map((t, i) => ({ t, b: i % 2 === 1 })).filter((s) => s.t);
  }

  /** Splits text on [label](url) markers into plain and link segments. */
  protected linked(text: string) {
    const out: { t: string; url?: string }[] = [];
    const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
    let last = 0;
    for (const m of text.matchAll(re)) {
      if (m.index > last) out.push({ t: text.slice(last, m.index) });
      out.push({ t: m[1], url: m[2] });
      last = m.index + m[0].length;
    }
    if (last < text.length) out.push({ t: text.slice(last) });
    return out;
  }

  protected toggleTheme() {
    const current =
      this.theme() ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next: Theme = current === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* ignore */
    }
  }

  private applyTheme(t: Theme) {
    this.theme.set(t);
    this.doc.documentElement.dataset['theme'] = t;
  }

  ngAfterViewInit() {
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) this.active.set(e.target.id);
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    this.host.nativeElement
      .querySelectorAll('section[id]')
      .forEach((el: Element) => io.observe(el));
    this.destroyRef.onDestroy(() => io.disconnect());
  }
}
