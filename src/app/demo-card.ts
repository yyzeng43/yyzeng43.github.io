import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Demo } from './content';

/** Plays a YouTube/Vimeo embed (loaded only on click) or a self-hosted video file. */
@Component({
  selector: 'app-demo-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="demo">
      <div class="demo__media">
        @switch (demo().video?.kind) {
          @case ('file') {
            <video controls playsinline preload="metadata"
                   [attr.poster]="fileVideo()?.poster ?? null" [src]="fileVideo()?.src">
            </video>
          }
          @case (undefined) {
            <div class="demo__empty">Video coming soon</div>
          }
          @default {
            @if (playing()) {
              <iframe [src]="embedUrl()" [title]="demo().title" loading="lazy"
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      allowfullscreen></iframe>
            } @else {
              <button type="button" class="demo__play" (click)="playing.set(true)"
                      [attr.aria-label]="'Play video: ' + demo().title">
                @if (thumb(); as t) { <img [src]="t" alt="" loading="lazy" /> }
                <span class="demo__play-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </button>
            }
          }
        }
      </div>
      <h3 class="demo__title">{{ demo().title }}</h3>
      <p class="demo__desc">{{ demo().description }}</p>
      @if (demo().sponsor; as sp) {
        <p class="sponsor">
          <span>Sponsored by</span>
          @if (sp.url) {
            <a class="sponsor__logo" [href]="sp.url" target="_blank" rel="noopener"><img [src]="sp.logo" [alt]="sp.name" loading="lazy" /></a>
          } @else {
            <span class="sponsor__logo"><img [src]="sp.logo" [alt]="sp.name" loading="lazy" /></span>
          }
        </p>
      }
      @if (demo().links?.length) {
        <p class="demo__links">
          @for (l of demo().links; track l.url) { <a [href]="l.url" target="_blank" rel="noopener">{{ l.label }}</a> }
        </p>
      }
    </article>
  `,
})
export class DemoCard {
  readonly demo = input.required<Demo>();
  protected readonly playing = signal(false);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly fileVideo = computed(() => {
    const v = this.demo().video;
    return v?.kind === 'file' ? v : null;
  });

  protected readonly thumb = computed(() => {
    const v = this.demo().video;
    return v?.kind === 'youtube' ? `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg` : null;
  });

  protected readonly embedUrl = computed<SafeResourceUrl | null>(() => {
    const v = this.demo().video;
    let url: string | null = null;
    if (v?.kind === 'youtube') url = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.id)}?autoplay=1&rel=0`;
    if (v?.kind === 'vimeo') url = `https://player.vimeo.com/video/${encodeURIComponent(v.id)}?autoplay=1&dnt=1`;
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  });
}
