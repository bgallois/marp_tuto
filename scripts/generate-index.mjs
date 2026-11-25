import { mkdir, writeFile } from 'node:fs/promises'

const outputDirectory = new URL('../dist/', import.meta.url)

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Choose a venue-specific version of the Marp theme-aware SVG demonstration.">
    <title>Marp theme-aware SVG demonstration</title>
    <style>
      :root {
        color-scheme: light dark;
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        background: #f4f7fa;
        color: #172b3a;
      }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
      }
      main {
        box-sizing: border-box;
        width: min(960px, 100%);
        padding: 48px 24px;
      }
      h1 {
        margin: 0 0 12px;
        color: #146a82;
        font-size: clamp(2rem, 6vw, 3.5rem);
        line-height: 1.05;
      }
      .intro {
        max-width: 68ch;
        margin: 0 0 36px;
        color: #526873;
        font-size: 1.1rem;
        line-height: 1.6;
      }
      .themes {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 18px;
      }
      .theme {
        display: block;
        min-height: 150px;
        padding: 24px;
        border: 2px solid transparent;
        border-radius: 14px;
        box-shadow: 0 10px 30px rgb(23 43 58 / 12%);
        color: inherit;
        text-decoration: none;
        transition: transform 150ms ease, box-shadow 150ms ease;
      }
      .theme:hover,
      .theme:focus-visible {
        transform: translateY(-3px);
        box-shadow: 0 14px 34px rgb(23 43 58 / 20%);
        outline: none;
      }
      .theme strong {
        display: block;
        margin-bottom: 10px;
        font-size: 1.35rem;
      }
      .theme span {
        line-height: 1.5;
      }
      .online {
        background: #f7fbfd;
        border-color: #146a82;
        color: #173042;
      }
      .dark-room {
        background: #111827;
        border-color: #67e8f9;
        color: #e5eef7;
      }
      .bright-room {
        background: #fff;
        border-color: #c1121f;
        color: #000;
      }
      footer {
        margin-top: 30px;
        color: #607580;
        font-size: 0.9rem;
      }
      @media (prefers-color-scheme: dark) {
        :root {
          background: #0b1220;
          color: #e5eef7;
        }
        .intro,
        footer {
          color: #afbdca;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <h1>One deck, three settings</h1>
      <p class="intro">
        Choose a presentation variant. Each deck uses the same Markdown and SVG
        source; only the Marp theme changes.
      </p>
      <nav class="themes" aria-label="Presentation themes">
        <a class="theme online" href="online.html">
          <strong>Online</strong>
          <span>Balanced for laptop displays and screen sharing.</span>
        </a>
        <a class="theme dark-room" href="dark-room.html">
          <strong>Dark room</strong>
          <span>Dark figure surfaces with light, enlarged text.</span>
        </a>
        <a class="theme bright-room" href="bright-room.html">
          <strong>Bright room</strong>
          <span>Maximum text contrast and the largest figure labels.</span>
        </a>
      </nav>
      <footer>Marp theme-aware inline SVG proof of concept</footer>
    </main>
  </body>
</html>
`

await mkdir(outputDirectory, { recursive: true })
await Promise.all([
  writeFile(new URL('index.html', outputDirectory), html, 'utf8'),
  writeFile(new URL('.nojekyll', outputDirectory), '', 'utf8'),
])

console.log('Generated dist/index.html and dist/.nojekyll')
