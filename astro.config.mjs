import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gnikesh.github.io/',
  trailingSlash: 'never',
  devToolbar: { enabled: false },
  integrations: [sitemap()],
});
