<script>
	import { onMount, tick } from 'svelte'
	import { fade } from 'svelte/transition'
	  import { formatPath } from '$lib/i18n/path'
	import TableOfContents from '$lib/components/blog/TableOfContents.svelte'
	import ShareButtons from '$lib/components/blog/ShareButtons.svelte'
	import BlogCard from '$lib/components/blog/BlogCard.svelte'

	const { data } = $props()
	const { lang,blog, content: Content, relatedPosts } = data
	let headings = blog.headings

	let activeHeadingId = $state()
	let observer

	onMount(() => {
		setupHeadingsObserver()

		return () => {
			if (observer) {
				observer.disconnect()
			}
		}
	})

	$effect(() => {
		if (post.content) {
			setTimeout(() => {
				if (observer) {
					observer.disconnect()
				}
				setupHeadingsObserver()
			}, 100)
		}
	})

	// 在 +page.svelte 的 setupHeadingsObserver 函数中
	function setupHeadingsObserver() {
		const headings = document.querySelectorAll('h2, h3')
		if (headings.length === 0) return

		if (observer) observer.disconnect()

		// 存储当前最可见的标题
		let mostVisibleId = ''
		let highestRatio = 0

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					// 更新最可见的标题
					if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
						highestRatio = entry.intersectionRatio
						mostVisibleId = entry.target.id
					}
				})

				// 只在有明确的最可见标题时更新
				if (mostVisibleId && highestRatio > 0.1) {
					activeHeadingId = mostVisibleId
				}
			},
			{
				rootMargin: '-70px 0px -45% 0px',
				threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
			}
		)

		headings.forEach((element) => observer.observe(element))
	}

	function scrollToSection(sectionId) {
		const element = document.getElementById(sectionId)
		if (element) {
			// 根据你的导航栏实际高度调整这个值
			const headerOffset = 90
			const elementPosition = element.getBoundingClientRect().top
			const offsetPosition = elementPosition + window.pageYOffset - headerOffset

			// 先平滑滚动到目标位置
			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			})

			// 确保 URL 哈希更新（用于深层链接）
			history.replaceState(null, '', `#${sectionId}`)

      activeHeadingId=sectionId
		}
	}
</script>

<svelte:head>
	<title>{blog.title} | Your Name</title>
	<meta name="description" content={blog.description} />

	<meta property="og:title" content={blog.title} />
	<meta property="og:description" content={blog.description} />
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={blog.date} />
	<meta property="article:author" content="Your Name" />
	{#each blog.tags as tag}
		<meta property="article:tag" content={tag} />
	{/each}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={blog.title} />
	<meta name="twitter:description" content={blog.description} />
</svelte:head>

<article class="min-h-screen" in:fade={{ duration: 300 }}>
	<!-- 文章头部 -->
	<header class="py-16">
		<div class="container mx-auto px-6">
			<nav class="mb-8">
				<a
					href={formatPath(lang,"/blog")}
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
					Back to Blog
				</a>
			</nav>

			<div class="max-w-3xl mx-auto">
				<h1 class="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
					{blog.title}
				</h1>

				<div class="flex flex-wrap items-center gap-4 text-text-light/80 mb-8">
					<time datetime={blog.date} class="flex items-center">
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
						{new Date(blog.date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</time>

					<span class="flex items-center">
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
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						{blog.readingTime} min read
					</span>

					<span class="bg-primary/10 text-primary dark:text-dark-primary text-sm px-3 py-1 rounded-full">
						{blog.category}
					</span>
				</div>

				{#if blog.description}
					<p class="text-xl text-text-light/80 border-l-4 border-primary/30 pl-4 py-2">
						{blog.description}
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
					<div class="sticky top-28">
						<TableOfContents {headings} {activeHeadingId} onScrollTo={scrollToSection} />

						<ShareButtons
							title={blog.title}
							url={typeof window !== 'undefined' ? window.location.href : ''}
							class="mt-8"
						/>
					</div>
				</aside>

				<!-- 文章内容 -->
				<main class="lg:col-span-3">
					<div class="prose prose-lg max-w-none">
						<!-- 文章封面图 -->
						{#if blog.coverImage}
							<figure class="my-8">
								<img src={blog.coverImage} alt={blog.title} class="rounded-xl shadow-md w-full" />
								{#if blog.coverCaption}
									<figcaption class="text-center text-sm text-text-light mt-2">
										{blog.coverCaption}
									</figcaption>
								{/if}
							</figure>
						{/if}

						<Content></Content>

						<!-- 标签 -->
						{#if blog.tags && blog.tags.length > 0}
							<div class="mt-12 pt-8 border-t border-gray-200">
								<h3 class="text-sm font-medium text-text-light mb-4">Tags</h3>
								<div class="flex flex-wrap gap-2">
									{#each blog.tags as tag}
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

	<!-- 相关文章 -->
	{#if relatedPosts && relatedPosts.length > 0}
		<section class="py-16 bg-background">
			<div class="container mx-auto px-6">
				<h2 class="text-2xl font-serif font-bold mb-12 text-center text-text">Continue Reading</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
					{#each relatedPosts as post}
						<BlogCard {post} />
					{/each}
				</div>
			</div>
		</section>
	{/if}
</article>
