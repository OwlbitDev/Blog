import {defaultLocale} from '$lib/i18n'

export function contentUrl(path:string,lng:string|undefined) {
	return `/api/${path}/${lng??defaultLocale}`
}