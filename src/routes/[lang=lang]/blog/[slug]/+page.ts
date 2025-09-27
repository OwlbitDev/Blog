import { error } from '@sveltejs/kit'

export async function load({ params }) {
	try {
		const suffix=params.lng??''
		const post = await import(`../../../../content/blog/${params.slug}/index${suffix}.md`)

		return {
			content: post.default,
			blog: post.metadata
		}
	} catch (e) {
		error(404, `Could not find ${params.slug} ${e}`)
	}
}
