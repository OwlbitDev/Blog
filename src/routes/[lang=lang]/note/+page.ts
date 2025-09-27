import type { Note } from '$lib/types'
import { contentUrl } from '$lib/api'

export async function load({ fetch,params }) {
    const response = await fetch(contentUrl('note',params.lang))
    const notes: Note[] = await response.json()
    return { notes }
}