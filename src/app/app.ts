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

type Theme = 'light' | 'dark';

@Component({
  selector: 'app-root',
  imports: [ShiftGraphic, DemoCard, PublicationList],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements AfterViewInit {
  protected readonly c = C;
  protected readonly year = new Date().getFullYear();
  protected readonly nav = [
    { id: 'about', label: 'About' },
    { id: 'demos', label: 'Demos' },
    { id: 'projects', label: 'Projects' },
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
