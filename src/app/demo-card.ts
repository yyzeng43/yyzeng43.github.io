import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Video } from './content';

/** Plays a YouTube/Vimeo embed (loaded only on click) or a self-hosted video file. */
@Component({
  selector: 'app-demo-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="demo__media">
      @switch (video().kind) {
        @case ('file') {
          <video controls playsinline preload="metadata"
                 [attr.poster]="fileVideo()?.poster ?? null" [src]="fileVideo()?.src"></video>
        }
        @default {
          @if (playing()) {
            <iframe [src]="embedUrl()" title="Project demo video" loading="lazy"
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowfullscreen></iframe>
          } @else {
            <button type="button" class="demo__play" (click)="playing.set(true)" aria-label="Play demo video">
              @if (thumb(); as t) { <img [src]="t" alt="" loading="lazy" /> }
              <span class="demo__play-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </span>
            </button>
          }
        }
      }
    </div>
  `,
})
export class DemoCard {
  readonly video = input.required<Video>();
  protected readonly playing = signal(false);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly fileVideo = computed(() => {
    const v = this.video();
    return v.kind === 'file' ? v : null;
  });

  protected readonly thumb = computed(() => {
    const v = this.video();
    return v.kind === 'youtube' ? `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg` : null;
  });

  protected readonly embedUrl = computed<SafeResourceUrl | null>(() => {
    const v = this.video();
    let url: string | null = null;
    if (v.kind === 'youtube') url = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.id)}?autoplay=1&rel=0`;
    if (v.kind === 'vimeo') url = `https://player.vimeo.com/video/${encodeURIComponent(v.id)}?autoplay=1&dnt=1`;
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  });
}
