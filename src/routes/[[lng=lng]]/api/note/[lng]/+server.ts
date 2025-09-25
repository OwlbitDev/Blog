import { json } from '@sveltejs/kit'
import type { Note } from '$lib/types'
import {defaultLocale} from '$lib/i18n'
import { isMatchContent } from '$lib/content'

async function getNotes(lng:string) {
    let notes: Note[] = []

    const paths = import.meta.glob(['/src/content/note/**/*.md'], { eager: true })

    for (const path in paths) {
        const file = paths[path]

        const index = path.lastIndexOf('/')
        const subdir =path.substring(0, index)
        const slug = subdir.split('/').at(-1)
        
        if (file && typeof file === 'object' && 'metadata' in file && slug && isMatchContent(lng,path.substring(index+1))) {
            const metadata = file.metadata as Omit<Note, 'slug'>
            const post = { ...metadata, slug } satisfies Note
            !post.draft && notes.push(post)
        }
    }

    notes = notes.sort(
        (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
    )

    return notes
}

export async function GET({params}) {
    const lng = params.lng || defaultLocale
    const notes = await getNotes(lng)
    return json(notes)
}
