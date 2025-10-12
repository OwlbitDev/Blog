import { json } from '@sveltejs/kit'
import { note } from '$lib/content'

export async function GET({params}) {
    const lang = params.lang
    const notes = await note(lang)
    return json(notes)
}
