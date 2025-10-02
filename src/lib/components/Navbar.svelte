<script>
	import { onMount } from 'svelte'
	import ThemeMode from './ThemeMode.svelte'
	import I18n from './I18n.svelte'
	import { _ } from 'svelte-i18n'
	import { formatPath } from '$lib/i18n/path'
	
	let scrolled = $state(false)
	let mobileMenuOpen = $state(false)
	
	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 10
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	})
	
	// 切换移动端菜单
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen
	}
	
	// 关闭移动端菜单
	function closeMobileMenu() {
		mobileMenuOpen = false
	}
	
	const { lang } = $props()
	
	// 导航项配置
	const navItems = ['project', 'blog', 'note', 'about']
</script>

<header
	class="fixed top-0 w-full z-50 transition-all duration-300 {scrolled
		? 'bg-surface-container dark:bg-dark-surface-container shadow-sm py-3 backdrop-blur-md'
		: 'bg-surface dark:bg-dark-surface py-5'}"
	role="banner"
>
	<nav class="container mx-auto px-6 flex justify-between items-center" aria-label={$_('nav.home')}>
		<!-- Logo -->
		<a
			href={formatPath(lang, '/')}
			class="flex items-center gap-3 text-xl font-serif font-bold text-primary dark:text-dark-primary hover:text-primary-container dark:hover:text-dark-primary-container transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:ring-offset-2 focus:ring-offset-surface dark:focus:ring-offset-dark-surface rounded-lg p-1"
			on:click={closeMobileMenu}
		>
			<img src="/favicon.svg" alt="lovol logo" class="size-8" />
			<span class="hidden sm:block">lovol</span>
		</a>

		<!-- Desktop Navigation -->
		<div class="hidden md:flex items-center space-x-2">
			{#each navItems as item}
				<a
					href={formatPath(lang,`/${item}`)}
					class="relative px-4 py-2 text-sm font-medium uppercase tracking-wider text-on-surface-variant dark:text-dark-on-surface-variant hover:text-on-surface dark:hover:text-dark-on-surface transition-colors duration-200 rounded-lg hover:bg-surface-container-high dark:hover:bg-dark-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:text-on-surface dark:focus:text-dark-on-surface"
					aria-label={$_(`nav.${item}`)}
				>
					{$_(`nav.${item}`)}
					<span class="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary dark:bg-dark-primary transition-all duration-300 group-hover:w-4/5 group-hover:left-1/10"></span>
				</a>
			{/each}
			
			<!-- 工具组件容器 -->
			<div class="flex items-center space-x-2 ml-4 pl-4 border-l border-outline-variant dark:border-dark-outline-variant">
				<ThemeMode />
				<I18n {lang}/>
			</div>
		</div>

		<!-- Mobile Navigation -->
		<div class="flex md:hidden items-center space-x-3">
			<!-- 工具组件（移动端可见） -->
			<div class="flex items-center space-x-2">
				<ThemeMode />
				<I18n {lang}/>
			</div>
			
			<!-- 移动端菜单按钮 -->
			<button
				class="p-2 rounded-lg text-on-surface-variant dark:text-dark-on-surface-variant hover:bg-surface-container-high dark:hover:bg-dark-surface-container-high hover:text-on-surface  dark:hover:text-dark-on-surface transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
				on:click={toggleMobileMenu}
				aria-label={mobileMenuOpen ? $_('nav.closemenu') : $_('nav.openmenu')}
				aria-expanded={mobileMenuOpen}
				aria-controls="mobile-menu"
			>
				{#if mobileMenuOpen}
					<!-- 关闭图标 -->
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				{:else}
					<!-- 菜单图标 -->
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				{/if}
			</button>
		</div>
	</nav>

	<!-- 移动端菜单 -->
	{#if mobileMenuOpen}
		<div 
			id="mobile-menu"
			class="md:hidden bg-surface-container dark:bg-dark-surface-container border-t border-outline-variant dark:border-dark-outline-variant shadow-lg"
			role="menu"
		>
			<div class="container mx-auto px-6 py-4">
				<div class="flex flex-col space-y-2">
					{#each navItems as item}
						<a
							href={formatPath(lang,`/${item}`)}
							class="px-4 py-3 text-base font-medium uppercase tracking-wider text-on-surface dark:text-dark-on-surface rounded-lg hover:bg-surface-container-high dark:hover:bg-dark-surface-container-high hover:text-on-surface dark:hover:text-dark-on-surface transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:bg-surface-container-high dark:focus:bg-dark-surface-container-high"
							on:click={closeMobileMenu}
							role="menuitem"
						>
							{$_(`nav.${item}`)}
						</a>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</header>

<style>
	/* 确保内容不被导航栏遮挡 */
	:global(main) {
		padding-top: 80px;
	}

	/* 移动端菜单动画 */
	#mobile-menu {
		animation: slideDown 0.3s ease-out;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* 高对比度模式支持 */
	@media (prefers-contrast: high) {
		header {
			border-bottom: 1px solid var(--color-outline);
		}
		
		.mobile-menu {
			border-top: 2px solid var(--color-outline);
		}
	}

	/* 减少动画偏好 */
	@media (prefers-reduced-motion: reduce) {
		header,
		#mobile-menu {
			transition: none;
			animation: none;
		}
	}
</style>