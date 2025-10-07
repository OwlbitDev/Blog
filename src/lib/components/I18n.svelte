<script lang="ts">
	import { fly } from 'svelte/transition'
	import { goto } from '$app/navigation'
	import { page } from '$app/state'
	import { Earth } from 'lucide-svelte'

	const { lang } = $props()
	let isOpen = $state(false)
	const closeEvent = () => {
		if (isOpen) {
			isOpen = false
		}
	}

	const switchLanguage = async (lang: string) => {
		// 2. 防重复点击：如果新语言与当前语言相同，则不做任何操作
		// 5. 智能路径格式化：根据是否为默认语言决定是否添加前缀
		let newPath,
			currentPath = page.url.pathname

		// 切换到非默认语言：确保路径有语言前缀
		// 如果当前路径已经是某种语言前缀（如 /fr/about），先清理后再添加新前缀
		const pathWithoutExistingLocale = `/${currentPath.split('/').slice(2).join('/')}` || '/'
		newPath = `/${lang}${pathWithoutExistingLocale}`

		// 确保路径不为空
		if (newPath === '') {
			newPath = '/'
		}

		console.log('newPath', newPath)
		// 6. 执行跳转（仅在路径确实发生变化时）
		if (newPath !== currentPath) {
			window.location.href = newPath
		}
	}

	const languages=new Map()
	languages.set('en', 'English')
	languages.set('zh', '简体中文')
</script>

<svelte:window onclick={closeEvent} />
<div class="flex flex-col relative">
	<button
	class="cursor-pointer"
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
			class="absolute z-10 top-8 bg-surface-container text-on-surface rounded-md shadow-md p-4 whitespace-nowrap gap-2"
			transition:fly={{ y: 20, duration: 200 }}
		>
		{#each languages as [k,v]}
			<li>
				<button
					onclick={async() => {
						await switchLanguage(k)
					}} class="p-6 cursor-pointer">{v}</button
				>
			</li>
			{/each}
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
	}
</style>
