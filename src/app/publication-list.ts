import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { Publication } from './content';

type Filter = 'all' | Publication['type'];

const LABELS: Record<Filter, string> = {
  all: 'All',
  journal: 'Journals',
  conference: 'Conferences',
  preprint: 'Preprints',
  thesis: 'Thesis',
};

@Component({
  selector: 'app-publication-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="filters" role="group" aria-label="Filter publications">
      @for (f of filters(); track f.key) {
        <button type="button" class="filter" [attr.aria-pressed]="filter() === f.key"
                (click)="filter.set(f.key)">
          {{ f.label }} <span class="filter__n">{{ f.count }}</span>
        </button>
      }
    </div>

    @for (y of byYear(); track y.year) {
      <div class="pub-year">
        <div class="pub-year__label">{{ y.year }}</div>
        <ol class="pubs">
          @for (p of y.items; track p.title) {
            <li class="pub">
              @if (p.url) {
                <a class="pub__title" [href]="p.url" target="_blank" rel="noopener">{{ p.title }}</a>
              } @else {
                <span class="pub__title">{{ p.title }}</span>
              }
              <span class="pub__authors">
                @for (part of splitAuthors(p.authors); track $index) {@if (part.me) {<strong>{{ part.text }}</strong>} @else {{{ part.text }}}}
              </span>
              <span class="pub__venue">{{ p.venue }}</span>
            </li>
          }
        </ol>
      </div>
    }
    <p class="note">⁺ Equal contribution.</p>
  `,
})
export class PublicationList {
  readonly items = input.required<Publication[]>();
  protected readonly filter = signal<Filter>('all');

  protected readonly filters = computed(() => {
    const all = this.items();
    const keys: Filter[] = ['all', 'journal', 'conference', 'preprint', 'thesis'];
    return keys
      .map((key) => ({
        key,
        label: LABELS[key],
        count: key === 'all' ? all.length : all.filter((p) => p.type === key).length,
      }))
      .filter((f) => f.count > 0);
  });

  protected readonly byYear = computed(() => {
    const f = this.filter();
    const list = this.items().filter((p) => f === 'all' || p.type === f);
    const years = [...new Set(list.map((p) => p.year))].sort((a, b) => b - a);
    return years.map((year) => ({ year, items: list.filter((p) => p.year === year) }));
  });

  protected splitAuthors(authors: string) {
    const me = /Zeng, Y\.[⁺+]?/;
    const m = authors.match(me);
    if (!m || m.index === undefined) return [{ text: authors, me: false }];
    return [
      { text: authors.slice(0, m.index), me: false },
      { text: m[0], me: true },
      { text: authors.slice(m.index + m[0].length), me: false },
    ];
  }
}
