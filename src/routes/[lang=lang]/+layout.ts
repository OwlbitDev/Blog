import type { LayoutLoad } from './$types'

export const prerender = true
export const trailingSlash = 'never';
export const load: LayoutLoad =  async ({ params }) => {
    let currentLocale = params.lang;
    return { lang: currentLocale };
}