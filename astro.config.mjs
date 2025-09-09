// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    site: 'https://litlab.dev',
    integrations: [mdx(), sitemap()],
    vite: {
        plugins: [tailwindcss()],
    },
    image: {
        service: passthroughImageService(),
    }
},
);
