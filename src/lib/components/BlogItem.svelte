<script>
	import {formatPath} from '$lib/i18n/path'
  const {lang,blog}=$props()
    let elementId = `blog-${Math.random().toString(36).substr(2, 9)}`;
  const formatDate = (dateString) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
	}
</script>

<a href={formatPath(lang,`/blog/${blog.slug}`)} class="blog-card group bg-surface dark:bg-dark-surface rounded-xl p-4 shadow-sm border border-outline-variant dark:border-dark-outline-variant transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary dark:hover:border-dark-primary cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface"
  aria-labelledby="{elementId}-title"
  aria-describedby="{elementId}-excerpt">
  <!-- 特色博客标识 -->
  {#if blog.featured}
    <div class="featured-badge absolute -top-2 right-4 bg-gradient-to-br from-primary dark:from-dark-primary to-tertiary dark:to-dark-tertiary text-on-primary dark:text-dark-on-primary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg shadow-primary/30 z-10">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
      精选
    </div>
  {/if}

  <div class="blog-content flex gap-4 items-start">
    <!-- 图片区域 -->
    {#if blog.cover}
      <div class="blog-image flex-shrink-0 w-30 h-20 rounded-lg overflow-hidden bg-surface-variant dark:bg-dark-surface-variant">
        <img 
          src={blog.cover}
          alt='cover' 
          class="image w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
		  role="presentation"
        />
      </div>
    {/if}

    <!-- 文本内容区域 -->
    <div class="flex-1 min-w-0">
      <!-- 标签区域 -->
      <div class="flex flex-wrap gap-2 mb-2">
        {#each blog.tags as tag}
          <div class="tag bg-secondary-container dark:bg-dark-secondary-container text-on-secondary-container dark:text-dark-on-secondary-container px-2 py-1 rounded-full text-xs font-medium">
            {tag}
          </div>
        {/each}
      </div>

      <!-- 标题 - 遵循 Material Design 排版层级 -->
      <h3 id="{elementId}-title"  class="text-lg font-semibold leading-tight mb-2 text-on-surface dark:text-dark-on-surface line-clamp-2 group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">
        {blog.title}
      </h3>

      <!-- 摘要 - 使用正确的表面变体颜色 -->
      <p id="{elementId}-excerpt" class="text-sm leading-relaxed text-on-surface-variant dark:text-dark-on-surface-variant mb-3 line-clamp-2">
        {blog.description}
      </p>

      <!-- 元信息 - 仅保留日期 -->
      <div class="flex items-center gap-4 text-xs text-outline dark:text-dark-outline">
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
          </svg>
          {formatDate(blog.date)}
        </div>
      </div>
    </div>
  </div>
</a>

<style>
	.blog-card {
    display: block;
    text-decoration: none;
    position: relative;
    cursor: pointer;
  }

  .blog-card:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  /* 确保文本截断实用类可用 */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

   /* 响应式设计 */
  @media (max-width: 640px) {
    .blog-content {
      flex-direction: column;
    }

    .blog-image {
      width: 100%;
      height: 160px;
    }
  }

  /* 高对比度模式支持 */
  @media (prefers-contrast: high) {
    .blog-card {
      border-width: 2px;
    }
    
    .tag {
      border: 1px solid currentColor;
    }
  }

  /* 减少动画偏好 */
  @media (prefers-reduced-motion: reduce) {
    .blog-card,
    .image {
      transition: none;
    }
    
    .group-hover\:scale-105 {
      transform: none;
    }
  }
</style>