// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';


// https://astro.build/config
export default defineConfig({
    integrations: [sitemap()],
    output:"server",
    vite: {
        plugins: [tailwindcss()]
    },
    adapter: node({
        mode:"standalone"
    })
});
