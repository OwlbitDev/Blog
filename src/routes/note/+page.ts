import type { Note } from '$lib/types'

export async function load({ fetch }) {
    const response = await fetch('/api/note')
    const notes: Note[] = await response.json()
    return { notes }
}