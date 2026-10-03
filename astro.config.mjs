import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://howto.email',
  output: 'static',
  integrations: [sitemap()],
});
