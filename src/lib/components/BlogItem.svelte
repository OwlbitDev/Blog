<script>
	import { formatPath } from '$lib/i18n/path'

	const { lang, blog } = $props()

	const formatDate = (dateString) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
	}
</script>

<a href={formatPath(lang, `/blog/${blog.slug}`)} class="group block">
	<div class="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-8">
		<div class="flex-shrink-0">
			<div class="text-sm uppercase tracking-wider text-text-light">
				{formatDate(blog.date)}
			</div>
		</div>
		<div
			class="flex-grow pb-8 group-hover:bg-surface-container dark:group-hover:bg-dark-surface-container text-on-surface dark:text-dark-on-surface p-4 rounded-lg transition-colors"
		>
			<h3
				class="text-xl font-semibold mb-2 transition-colors"
			>
				{blog.title}
			</h3>
			<p class="mb-4">
				{blog.description}
			</p>
			<div class="flex flex-wrap gap-2">
				{#each blog.tags as tag}
					<span
						class="inline-block bg-secondary/10 dark:bg-dark-secondary/10 text-on-secondary dark:text-dark-on-secondary text-xs px-3 py-1 rounded-full"
					>
						{tag}
					</span>
				{/each}
			</div>
		</div>
	</div>
</a>
