import { json } from '@sveltejs/kit'
import type { Blog } from '$lib/types'
import { isMatchContent } from '$lib/content'

async function getPosts(lng: string) {
	let posts: Blog[] = []

	const paths = import.meta.glob('/src/content/blog/**/*.md', { eager: true })

	for (const path in paths) {
		const file = paths[path]

		const index = path.lastIndexOf('/')
		const subdir =path.substring(0, index)
		const slug = subdir.split('/').at(-1)
		
		if (file && typeof file === 'object' && 'metadata' in file && slug&&isMatchContent(lng,path.substring(index+1))) {
			const metadata = file.metadata as Omit<Blog, 'slug'>
			const post = { ...metadata, slug } satisfies Blog
			!post.draft && posts.push(post)
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	)

	return posts
}

export async function GET(param) {
	const lng=param.url.searchParams.get('lng')
	const posts = await getPosts(lng)
	return json(posts)
}
