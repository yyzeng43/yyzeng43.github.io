# yyzeng43.github.io

Personal website of Yingyan Zeng, built with Angular and deployed to GitHub Pages
by GitHub Actions on every push to `main`.

## Edit content

Almost everything on the page lives in **`src/app/content.ts`**: bio, highlights,
projects, experience, publications, skills, teaching, service, and demo videos.
Edit that file, save, and push. No HTML needed.

## Add a demo video

Each entry in `demos` in `src/app/content.ts` can have a `video`:

```ts
// YouTube (recommended for anything long): the id is the part after watch?v=
video: { kind: 'youtube', id: 'abc123XYZ' }

// Vimeo
video: { kind: 'vimeo', id: '123456789' }

// A file you host yourself: put it in public/videos/
video: { kind: 'file', src: 'videos/my-demo.mp4', poster: 'videos/my-demo.jpg' }
```

Leave `video` out and the card shows "Video coming soon".

Self-hosted files: use MP4 (H.264), keep each under ~50 MB (GitHub rejects files
over 100 MB), and add a poster image so the card isn't blank before playback.
For longer videos, upload to YouTube (unlisted works) and use the `youtube` kind.
YouTube videos load only when a visitor clicks play.

## Resume button

Copy your resume to `public/resume.pdf` and set `resumeUrl: 'resume.pdf'` in
`content.ts`.

## Run locally

Requires Node.js 20.19+ (22 recommended).

```bash
npm install
npm start          # http://localhost:4200, reloads as you edit
npm run build      # production build into dist/yyzeng-site/browser
```

## One-time GitHub setting

Repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
