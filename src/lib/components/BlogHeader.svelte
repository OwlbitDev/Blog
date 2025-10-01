<script>
  const { title, date, author, readTime, featured } = $props();
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
</script>

<header class="blog-header mb-8">
  <!-- 特色标识 -->
  {#if featured}
    <div class="featured-badge inline-flex items-center bg-primary dark:bg-dark-primary text-on-primary dark:text-dark-on-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
      精选文章
    </div>
  {/if}
  
  <!-- 标题 -->
  <h1 class="text-3xl md:text-4xl font-bold text-on-surface dark:text-dark-on-surface mb-4 leading-tight">
    {title}
  </h1>
  
  <!-- 元信息 -->
  <div class="blog-meta flex flex-wrap items-center gap-4 text-on-surface-variant dark:text-dark-on-surface-variant text-sm">
    <div class="meta-item flex items-center gap-2">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
      </svg>
      {author}
    </div>
    
    <div class="meta-item flex items-center gap-2">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
      </svg>
      {formatDate(date)}
    </div>
    
    <div class="meta-item flex items-center gap-2">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
      </svg>
      {readTime} 阅读
    </div>
  </div>
</header>