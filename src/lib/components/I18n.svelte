<script lang="ts">
	import { fly } from 'svelte/transition'
	import { get } from 'svelte/store'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { Earth } from 'lucide-svelte'
	import { locale, waitLocale } from 'svelte-i18n'
	import { defaultLocale } from '$lib/i18n'
	import { formatPath } from '$lib/i18n/path'

	let isOpen = $state(false)
	const closeEvent = () => {
		if (isOpen) {
			isOpen = false
		}
	}

	const switchLanguage = async (lang: string) => {
		const currentLocale = get(locale) // 获取当前激活的语言

		// 2. 防重复点击：如果新语言与当前语言相同，则不做任何操作
		if (lang === currentLocale) {
			console.log(`Locale is already ${currentLocale}. Ignoring switch.`)
			return
		}

		// 3. 更新 svelte-i18n 的 locale store
		locale.set(lang)

		localStorage.setItem('user-locale', lang)

		// 5. 智能路径格式化：根据是否为默认语言决定是否添加前缀

		let newPath,
			currentPath = $page.url.pathname
		if (lang === defaultLocale) {
			// 切换到默认语言：移除可能存在的语言前缀
			// 假设 currentPath 可能是 "/fr/about" 或 "/about"
			newPath = `/${currentPath.split('/').slice(2).join('/')}` || '/' // 移除路径中的第一部分（语言代码）
		} else {
			// 切换到非默认语言：确保路径有语言前缀
			// 如果当前路径已经是某种语言前缀（如 /fr/about），先清理后再添加新前缀
			const pathWithoutExistingLocale = `/${currentPath.split('/').slice(2).join('/')}` || '/'
			newPath = `/${lang}${pathWithoutExistingLocale}`
		}

		// 确保路径不为空
		if (newPath === '') {
			newPath = '/'
		}

		// 6. 执行跳转（仅在路径确实发生变化时）
		if (newPath !== currentPath) {
			await goto(newPath, { replaceState: true, keepFocus: true, noScroll: true })
		} else {
			// 即使路径没变（比如在默认语言根目录间切换），但语言变了，页面内容已通过响应式更新
			// 可以选择触发一个自定义事件，通知某些组件重新检查语言敏感的内容（如通过API获取的数据）
			window.dispatchEvent(new CustomEvent('localeChanged', { detail: lang }))
		}
	}
</script>

<svelte:window onclick={closeEvent} />
<div class="flex flex-col relative">
	<button
		onclick={(event) => {
			event.stopPropagation()
			isOpen = !isOpen
		}}
		aria-label="Toggle language menu"
	>
		<Earth />
	</button>
	{#if isOpen}
		<ul
			class="absolute z-10 top-8 bg-surface-container text-on-surface rounded-md shadow-md p-2 whitespace-nowrap gap-2"
			transition:fly={{ y: 20, duration: 200 }}
		>
			<li>
				<button
					onclick={() => {
						switchLanguage('en')
					}}>English</button
				>
			</li>
			<li>
				<button
					onclick={() => {
						switchLanguage('zh')
					}}>简体中文</button
				>
			</li>
		</ul>
	{/if}
</div>

<style>
	button {
		padding: 0;
		font-weight: inherit;
		background: none;
		border: none;
		box-shadow: none;
		overflow: hidden;

		> * {
			display: flex;
			gap: var(--size-2);
		}
	}
</style>
