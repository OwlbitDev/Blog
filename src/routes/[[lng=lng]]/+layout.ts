import { locale, waitLocale } from 'svelte-i18n'
import type { LayoutLoad } from './$types'

export const prerender = true
export const load: LayoutLoad = async ({url,params}) => {
	locale.set(params.lng??'en')
	await waitLocale()
	return {
		url: url.pathname
	}
}
