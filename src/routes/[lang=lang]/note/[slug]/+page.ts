import { error } from '@sveltejs/kit'
import {findLang} from '$lib/content'

export async function entries() {
	const modules = import.meta.glob('./../../../../content/note/**/*.md')
	const data = []
	for (const path in modules) {
		const lang=findLang(path)
		const dirs = path.split('/').slice(0, -1)
		const slug = dirs.slice(-1)[0]
		data.push({lang,slug})
	}
	return data
}

export async function load({ params }) {
	try {
		const post = await import(`../../../../content/note/${params.slug}/index.md`)

		return {
			content: post.default,
			note: post.metadata
		}
	} catch (e) {
		error(404, `Could not find ${params.slug} ${e}`)
	}
}
