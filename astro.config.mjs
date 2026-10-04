import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { nikeshChatDev } from './server/dev-plugin.ts';

export default defineConfig({
  site: 'https://gnikesh.github.io/',
  trailingSlash: 'never',
  devToolbar: { enabled: false },
  integrations: [sitemap()],
  // Self-hosted at build time, with metric-matched fallbacks to avoid layout shift.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Newsreader',
      cssVariable: '--font-newsreader',
      weights: ['400 600'],
      styles: ['normal', 'italic'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['400 700'],
      styles: ['normal'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-plex-mono',
      weights: [400, 500],
      styles: ['normal'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
  vite: { plugins: [nikeshChatDev()] },
});
