<script>
	import { onMount, tick } from 'svelte'
	  import { formatPath } from '$lib/i18n/path'
	import { fade } from 'svelte/transition'
	import TableOfContents from '$lib/components/blog/TableOfContents.svelte'
	import ShareButtons from '$lib/components/blog/ShareButtons.svelte'
	import BlogCard from '$lib/components/blog/BlogCard.svelte'

	const { data } = $props()
	const { lang,note, content: Content } = data
</script>

<svelte:head>
	<title>{note.title} | owlnut</title>
	<meta name="description" content={note.description} />

	<meta property="og:title" content={note.title} />
	<meta property="og:description" content={note.description} />
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={note.date} />
	<meta property="article:author" content="Your Name" />
	{#each note.tags as tag}
		<meta property="article:tag" content={tag} />
	{/each}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={note.title} />
	<meta name="twitter:description" content={note.description} />
</svelte:head>

<article class="min-h-screen" in:fade={{ duration: 300 }}>
	<!-- 文章头部 -->
	<header class="py-16">
		<div class="container mx-auto px-6">
			<nav class="mb-8">
				<a
					href={formatPath(lang,"/note")}
					class="inline-flex items-center text-primary dark:text-dark-primary hover:opacity-80 transition-opacity group"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
					Back to Note
				</a>
			</nav>

			<div class="max-w-3xl mx-auto">
				<h1 class="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
					{note.title}
				</h1>

				<div class="flex flex-wrap items-center gap-4 text-text-light/80 mb-8">
					<time datetime={note.date} class="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 mr-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						{new Date(note.date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</time>

					<span class="bg-primary/10 text-primary dark:text-dark-primary text-sm px-3 py-1 rounded-full">
						{note.category}
					</span>
				</div>

				{#if note.description}
					<p class="text-xl text-text-light/80 border-l-4 border-primary/30 pl-4 py-2">
						{note.description}
					</p>
				{/if}
			</div>
		</div>
	</header>

	<!-- 文章内容和目录 -->
	<div class="py-12">
		<div class="container mx-auto px-6">
			<div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
				<!-- 目录 -->
				<aside class="lg:col-span-1">
					<div class="sticky bottom-28">
						<ShareButtons
							title={note.title}
							url={typeof window !== 'undefined' ? window.location.href : ''}
							class="mt-8"
						/>
					</div>
				</aside>

				<!-- 文章内容 -->
				<main class="lg:col-span-3">
					<div class="prose prose-lg max-w-none">
						<!-- 文章封面图 -->
						
						<Content></Content>

						<!-- 标签 -->
						{#if note.tags && note.tags.length > 0}
							<div class="mt-12 pt-8 border-t border-gray-200">
								<h3 class="text-sm font-medium text-text-light mb-4">Tags</h3>
								<div class="flex flex-wrap gap-2">
									{#each note.tags as tag}
										<a
											href={formatPath(lang,`/blog`)}
											class="bg-gray-100 text-text-light text-sm px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors"
										>
											#{tag}
										</a>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				</main>
			</div>
		</div>
	</div>
</article>
