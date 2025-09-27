<script>
	import { onMount } from 'svelte'
	import ThemeMode from './ThemeMode.svelte'
	import I18n from './I18n.svelte'
	import { _ } from 'svelte-i18n'
	import { formatPath } from '$lib/i18n/path'
	let scrolled = false

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 10
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	})

	const {lang}=$props()
</script>

<header
	class="fixed top-0 w-full z-50 transition-all duration-300 {scrolled
		? 'bg-surface-container dark:bg-dark-surface-container  text-on-surface dark:text-dark-on-surface backdrop-blur-md shadow-sm py-2'
		: 'bg-transparent py-4'}"
>
	<nav class="container mx-auto px-6 flex justify-between items-center">
		<a
			href={formatPath(lang, '/')}
			class="flex flex-col items-center text-2xl font-serif font-bold text-primary dark:text-dark-primary"
		>
			<img src="/favicon.svg" alt="logo" class="size-6" />
			<span>lovol</span>
		</a>

		<!-- Desktop Navigation -->
		<div class="hidden md:flex items-center space-x-8">
			{#each ['project', 'blog', 'note', 'about'] as item}
				<a
					href={formatPath(lang,`/${item}`)}
					class="relative text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary dark:hover:text-dark-primary"
				>
					{$_(`nav.${item}`)}
					<span
						class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-dark-primary transition-all duration-300 group-hover:w-full"
					></span>
				</a>
			{/each}
			<ThemeMode />
			<I18n {lang}/>
		</div>

		<!-- Mobile menu button (简化版) -->
		<button class="md:hidden">☰</button>
	</nav>
</header>

<style>
	/* 确保内容不被导航栏遮挡 */
	:global(main) {
		padding-top: 80px;
	}
</style>
