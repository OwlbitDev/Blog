<script>
	import Blog from '$lib/components/BlogItem.svelte'
	import Meta from '$lib/components/Meta.svelte'
	const { data } = $props()
</script>

<Meta lang={data.lang} cat="blog"/>
<section class="py-20 bg-surface dark:bg-dark-surface">
	<div class="container mx-auto px-6">
		<div class="max-w-3xl mx-auto space-y-12">
			{#each data.blogs as blog (blog.slug)}
				<Blog lang={data.lang} {blog} />
			{/each}
		</div>
	</div>
</section>
