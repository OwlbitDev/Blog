import type { Blog } from '$lib/types'

export async function load({ fetch }) {
    const response = await fetch('/api/blog')
    const blogs: Blog[] = await response.json()
    return { blogs }
}