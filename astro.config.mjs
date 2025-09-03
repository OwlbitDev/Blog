// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    site: 'https://coredive.dev',
    integrations: [mdx(), sitemap(
        {
            i18n: {
                defaultLocale: 'zh',
                locales: {zh:'zh-CN', en:'en-US'},
            },
        }
    ), tailwind()],
    i18n: {
        defaultLocale: 'zh',
        locales: ['zh', 'en'],
    },
    image: {
        service: passthroughImageService(),
    },
    experimental:{
        svg: true
    }
},
);