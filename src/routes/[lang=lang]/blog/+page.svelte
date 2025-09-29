<script>
	import Blog from '$lib/components/BlogItem.svelte'
	const { data } = $props()

</script>

<section class="py-20 bg-surface dark:bg-dark-surface">
	<div class="container mx-auto px-6">
		<div class="max-w-3xl mx-auto space-y-12">
			{#each data.blogs as blog (blog.slug)}
				<Blog lang={data.lang} {blog} />
			{/each}
		</div>
	</div>
</section>
