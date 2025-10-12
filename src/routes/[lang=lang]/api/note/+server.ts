import { json } from '@sveltejs/kit'
import { content } from '$lib/content'

export async function GET({params}) {
    const lang = params.lang
    const notes = await content(lang,'note')
    return json(notes)
}
