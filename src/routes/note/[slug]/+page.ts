import { error } from '@sveltejs/kit'

export async function load({ params }) {
	try {
		const post = await import(`../../../content/note/${params.slug}/index.md`)

		return {
			content: post.default,
			note: post.metadata
		}
	} catch (e) {
		error(404, `Could not find ${params.slug} ${e}`)
	}
}
