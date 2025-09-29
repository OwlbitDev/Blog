import '$lib/i18n'
import type { LayoutLoad } from './$types'
import { browser } from '$app/environment'
import { locale, waitLocale } from 'svelte-i18n'

export const prerender = true
export const trailingSlash = 'never';
export const load: LayoutLoad =  async ({ params }) => {
    let currentLocale = params.lang;
    if (browser) {
		locale.set(currentLocale)
	}
	await waitLocale()
    return { lang: currentLocale };
}