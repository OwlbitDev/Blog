import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import relativeImages from "mdsvex-relative-images";

import { mdsvex, escapeSvelte } from 'mdsvex'
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHighlighter } from 'shiki'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'

import {genTOC} from './src/lib/mdscex/toc.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path_to_layout = join(__dirname, './src/mdsvex.svelte');

const theme= 'poimandres';
const highlighter = await createHighlighter({
	themes: [theme],
	langs: ['javascript', 'typescript', 'kotlin', 'c++', 'python', 'shell', 'java', 'cmake', 'groovy', 'astro', 'html', 'css']
})

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md', '.mdx', '.svx'],
	layout: {
		_: path_to_layout
	},
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme }))
			return `{@html \`${html}\` }`
		}
	},
	remarkPlugins: [relativeImages,[remarkToc,{tight: true}]],
	rehypePlugins: [rehypeSlug]
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.mdx', '.svx'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter()
	}
}

export default config
