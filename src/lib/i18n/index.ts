import { browser } from '$app/environment'
import { init, register } from 'svelte-i18n'

export const defaultLocale = 'en'

register('en', () => import('./locales/en.json'))
register('zh', () => import('./locales/zh.json'))

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? window.navigator.language : defaultLocale,
})