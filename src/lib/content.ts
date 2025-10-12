export function isMatchContent(lng: string, value: string) {
    switch (lng) {
        case 'zh':
            return value == 'index-zh.md'
        default:
            return value == 'index.md'
    }
}

export function findLang(path: string) {
    const part = path.split('/')
    const index = part[part.length - 1]
    switch (index) {
        case 'index-zh.md':
            return 'zh'
        default:
            return 'en'
    }
}

export function blog(lang: string){
    let contents = []
    const paths = import.meta.glob('/src/content/blog/**/*.md', { eager: true })
    const covers = import.meta.glob('/src/content/blog/**/*.webp', { eager: true, as: 'url' })

    for (const path in paths) {
        const file = paths[path]

        const index = path.lastIndexOf('/')
        const subdir = path.substring(0, index)
        const slug = subdir.split('/').at(-1)

        const cover = covers[`/src/content/blog/${slug}/cover.webp`]

        if (file && typeof file === 'object' && 'metadata' in file && slug && isMatchContent(lang, path.substring(index + 1))) {
            const metadata = file.metadata
            const content = { ...metadata, slug, cover }
            !content.draft && contents.push(content)
        }
    }

    contents = contents.sort(
        (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
    )

    return contents
}

export function note(lang: string){
    let contents = []
    const paths = import.meta.glob('/src/content/note/**/*.md', { eager: true })
    const covers = import.meta.glob('/src/content/note/**/*.webp', { eager: true, as: 'url' })

    for (const path in paths) {
        const file = paths[path]

        const index = path.lastIndexOf('/')
        const subdir = path.substring(0, index)
        const slug = subdir.split('/').at(-1)

        const cover = covers[`/src/content/note/${slug}/cover.webp`]

        if (file && typeof file === 'object' && 'metadata' in file && slug && isMatchContent(lang, path.substring(index + 1))) {
            const metadata = file.metadata
            const content = { ...metadata, slug, cover }
            !content.draft && contents.push(content)
        }
    }

    contents = contents.sort(
        (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
    )

    return contents
}