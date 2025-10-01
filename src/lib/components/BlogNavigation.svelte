<script>
  import FilledButton from './FilledButton.svelte';
  
  const { previous, next } = $props();
</script>

<nav class="blog-navigation mt-12 pt-8 border-t border-outline-variant">
  <div class="flex flex-col md:flex-row justify-between gap-4">
    <!-- 上一篇 -->
    {#if previous}
      <div class="nav-item flex-1">
        <div class="text-sm text-on-surface-variant mb-2">上一篇</div>
        <FilledButton 
          href={`/blog/${previous.slug}`}
          size="medium"
          class="w-full justify-start"
        >
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          {previous.title}
        </FilledButton>
      </div>
    {:else}
      <div class="flex-1"></div>
    {/if}
    
    <!-- 下一篇 -->
    {#if next}
      <div class="nav-item flex-1 text-right">
        <div class="text-sm text-on-surface-variant mb-2">下一篇</div>
        <FilledButton 
          href={`/blog/${next.slug}`}
          size="medium"
          class="w-full justify-end"
        >
          {next.title}
          <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
          </svg>
        </FilledButton>
      </div>
    {:else}
      <div class="flex-1"></div>
    {/if}
  </div>
</nav>