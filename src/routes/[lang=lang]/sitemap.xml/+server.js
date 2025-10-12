import { blog, note } from '$lib/content'

export const prerender = true

async function formatContent(lang) {
    const blogs = await blog(lang)
    const notes = await note(lang,)
    return blogs.concat(notes).map(item => item.slug)
}
async function gen(target, alternate) {
    const siteUrl = 'https://owlbit.dev';

    const fixUrls = ['', 'blog', 'note', 'about', 'project']
    const contents = await formatContent(target)
    const alternateContents = await formatContent(alternate)

    const urls = fixUrls.concat(contents)
    const alternateUrls = fixUrls.concat(alternateContents)
    const sitemap = urls.map(url => {
        const origin = `${siteUrl}/${target}/${url}`
        const alternateUrl = `${siteUrl}/${alternate}/${url}`
        return `
                <url>
                <loc>${origin}</loc>
                <xhtml:link
                        rel="alternate"
                        hreflang="${target}"
                        href="${origin}"/>
                ${alternateUrls.find(item => item === url) ?
                     `<xhtml:link
                        rel="alternate"
                        hreflang="${alternate}"
                        href="${alternateUrl}"/>
                        ` : ''}
                </url>`
    }).join('')
    return sitemap
}
export async function GET({ params }) {
    const lang = params.lang
    const alternate = ['en', 'zh'].find(item => item !== lang)
    const urls = await gen(lang, alternate)

    return new Response(
        `
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
			${urls}
		</urlset>`.trim(),
        {
            headers: {
                'Content-Type': 'application/xml'
            }
        }
    );
}