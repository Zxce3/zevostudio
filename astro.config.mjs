import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from "@astrojs/sitemap";
import { fetchInstagramPosts } from './fetchInstagramPosts.js';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  // Add your domain name here
  site: "https://zevostudio.netlify.app",
  integrations: [ sitemap()],
  hooks: {
    'astro:build:start': async ({ command }) => {
      if (command === 'build') {
        await fetchInstagramPosts();
      }
    }
  }
});