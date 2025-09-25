import type { Blog } from '$lib/types'
import { contentUrl } from '$lib/api'
export async function load({ fetch,params }) {
    const response = await fetch(contentUrl('blog',params.lng))
    const blogs: Blog[] = await response.json()
    return { blogs }
}