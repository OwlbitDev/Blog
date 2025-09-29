import type { Blog } from '$lib/types'
import {contentUrl} from '$lib/api'

export async function entries(){
	return ['zh', 'en'].map(lang => ({lang}))
}

export async function load({ fetch,params }) {
	const response = await fetch(contentUrl('blog',params.lang))
	const blogs: Blog[] = await response.json()
	return { blogs:blogs.splice(0, 5) }
}