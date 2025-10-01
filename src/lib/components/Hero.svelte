<script>
	import { _ } from 'svelte-i18n'
	import { formatPath } from '$lib/i18n/path'
	import FilledButtom from './FilledButton.svelte'
	import OutlinedButton from './OutlinedButton.svelte'

	const { lang } = $props()
</script>

<section class="min-h-screen flex items-center py-20">
	<div class="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
		<!-- 文案区 -->
		<div class="space-y-8">
			<h1 class="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
				{@html $_('hero.intro')}
			</h1>
			<p class="text-xl text-text-light">
				{$_('hero.description')}
			</p>
			<div class="flex space-x-4">
				<FilledButtom href={formatPath(lang, '/project')}>
					{$_('hero.project')}
				</FilledButtom>

				<OutlinedButton href={formatPath(lang, '/blog')}>
					{$_('hero.blog')}
				</OutlinedButton>
			</div>
		</div>

		<!-- 视觉区 - 使用一个占位图 -->
		<div class="relative">
			<div
				class="w-full h-96 bg-gradient-to-br from-primary/20 dark:from-dark-primary/20 to-primary/5 dark:to-dark-primary/5 rounded-2xl flex items-center justify-center"
			>
				<!-- 这里应该放置你的3D图形或肖像 -->
				<span class="text-primary dark:text-dark-primary text-lg">Your Visual Here</span>
			</div>
		</div>
	</div>
</section>
