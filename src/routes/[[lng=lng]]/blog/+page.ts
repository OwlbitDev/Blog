import type { Blog } from '$lib/types'

export async function load({ fetch,params }) {
    const response = await fetch(`/api/blog?lng=${params.lng}`)
    const blogs: Blog[] = await response.json()
    return { blogs }
}