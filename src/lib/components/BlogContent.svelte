<script>
  const { content:Content } = $props();
</script>

<div class="blog-content prose prose-lg max-w-none text-on-surface dark:text-dark-on-surface">
  <!-- 这里使用你喜欢的 markdown 渲染器或直接渲染 HTML -->
  <div class="content-wrapper">
    <Content />
  </div>
</div>

<style>
  .blog-content {
    line-height: 1.7;
  }
  
  .blog-content h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-on-surface);
    margin: 2rem 0 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--color-outline-variant);
  }
  
  .blog-content h2{
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-dark-on-surface);
    margin: 2rem 0 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--color-outline-variant);
  }

  .blog-content h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-on-surface);
    margin: 1.5rem 0 0.75rem;
  }
  
  .blog-content p {
    margin-bottom: 1rem;
    color: var(--color-on-surface-variant);
  }
  
  .blog-content blockquote {
    border-left: 4px solid var(--color-primary);
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: var(--color-on-surface-variant);
    background: var(--color-surface-container-low);
    padding: 1rem;
    border-radius: 0 8px 8px 0;
  }
  
  .blog-content code {
    background: var(--color-surface-variant);
    color: var(--color-on-surface-variant);
    padding: 0.125rem 0.25rem;
    border-radius: 4px;
    font-size: 0.875em;
  }
  
  .blog-content pre {
    background: var(--color-surface-variant);
    color: var(--color-on-surface-variant);
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5rem 0;
  }
  
  .blog-content ul, .blog-content ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
    color: var(--color-on-surface-variant);
  }
  
  .blog-content li {
    margin-bottom: 0.5rem;
  }
</style>