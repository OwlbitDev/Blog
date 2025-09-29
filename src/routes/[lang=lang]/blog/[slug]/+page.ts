import { error } from '@sveltejs/kit'
import {findLang} from '$lib/content'

export const prerender = true;
export async function entries() {
	const modules = import.meta.glob('./../../../../content/blog/**/*.md')
	const data = []
	for (const path in modules) {
		const lang=findLang(path)
		const dirs = path.split('/').slice(0, -1)
		const slug = dirs.slice(-1)[0]
		if(slug!='blog'){
			data.push({lang,slug})
		}
	}
	return data
}

export async function load({ params }) {
	try {
		const suffix = 'en'==params.lang?'':'-zh'
		const post = await import(`../../../../content/blog/${params.slug}/index${suffix}.md`)

		return {
			content: post.default,
			blog: post.metadata
		}
	} catch (e) {
		error(404, `Could not find ${params.slug} ${e}`)
	}
}
