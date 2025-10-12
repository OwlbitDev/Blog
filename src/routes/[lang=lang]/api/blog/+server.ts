import { json } from '@sveltejs/kit'
import { blog } from '$lib/content'

export async function GET({params}) {
	const lang = params.lang
	const posts = await blog(lang)
	return json(posts)
}
