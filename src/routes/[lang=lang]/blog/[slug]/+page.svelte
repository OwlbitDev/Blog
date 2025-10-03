<script>
	import BlogHeader from '$lib/components/BlogHeader.svelte'
	import BlogContent from '$lib/components/BlogContent.svelte'
	import BlogTags from '$lib/components/BlogTags.svelte'
	import BlogNavigation from '$lib/components/BlogNavigation.svelte'
		import TableOfContents from '$lib/components/TableOfContents.svelte'


	const { data } = $props()
	const { lang, blog, content, prev,next } = data
	let headings = blog.headings
</script>

<svelte:head>
	<title>{blog.title} | owlnut</title>
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

<div class="blog-detail-container max-w-7xl mx-auto px-4 py-8">
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <!-- 侧边栏 - 标题导航 -->
    <div class="lg:col-span-1">
      <TableOfContents headings={headings} />
    </div>
    
    <!-- 主内容区域 -->
    <div class="lg:col-span-3">
      <article class="blog-detail max-w-3xl mx-auto">
        <!-- 博客头部 -->
        <BlogHeader 
          title={blog.title} 
          date={blog.date}
          author={blog.author}
          readTime={blog.readTime}
          featured={blog.featured}
        />
        
        <!-- 封面图片 -->
        {#if blog.cover}
          <div class="cover-image-container mb-8 rounded-xl overflow-hidden bg-surface-variant">
            <img 
              src={blog.cover} 
              alt={blog.title}
              class="w-full h-64 md:h-96 object-cover"
            />
          </div>
        {/if}
        
        <!-- 博客内容 -->
        <BlogContent content={content} />
        
        <!-- 标签区域 -->
        <BlogTags tags={blog.tags} />
        
        <!-- 导航区域 -->
        <BlogNavigation 
          previous={prev}
          next={next}
        />
        
      </article>
    </div>
  </div>
</div>