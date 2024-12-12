// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    site: 'https://deep-thinking.top',
    integrations: [mdx(), sitemap(), tailwind()],
    i18n: {
        defaultLocale: 'zh',
        locales: ['zh', 'en'],
    },
    image: {
        service: passthroughImageService(),
    }
},
);