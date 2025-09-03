// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    site: 'https://coredive.dev',
    integrations: [mdx(), sitemap(
        {
            i18n: {
                defaultLocale: 'zh',
                locales: {zh:'zh-CN', en:'en-US'},
            },
        }
    )],
    i18n: {
        defaultLocale: 'zh',
        locales: ['zh', 'en'],
    },
    image: {
        service: passthroughImageService(),
    },
    vite: {
        plugins: [tailwindcss()],
    },
},);