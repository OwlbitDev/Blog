<script>
  const { tags } = $props();
</script>

<div class="blog-tags mt-8 pt-6 border-t border-outline-variant dark:border-dark-outline-variant">
  <div class="flex flex-wrap gap-2">
    {#each tags as tag}
      <span class="tag bg-secondary-container dark:bg-dark-secondary-container text-on-secondary-container dark:text-dark-on-secondary-container px-3 py-1 rounded-full text-sm font-medium">
        {tag}
      </span>
    {/each}
  </div>
</div>