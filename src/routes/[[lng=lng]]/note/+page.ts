import type { Note } from '$lib/types'

export async function load({ fetch,params }) {
    const response = await fetch(`/api/note?lng=${params.lng}`)
    const notes: Note[] = await response.json()
    return { notes }
}