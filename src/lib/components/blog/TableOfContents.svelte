<script>
  // 使用 Svelte 5 的 $props() 函数来声明组件属性
  let { headings = [], activeHeadingId = '', onScrollTo } = $props();
  
  function handleScrollTo(sectionId) {
      onScrollTo(sectionId);
  }
</script>

{#if headings && headings.length > 0}
  <div class="bg-surface-container-low dark:bg-dark-surface-container-low text-on-surface dark:text-dark-on-surface p-6 rounded-lg shadow-sm border border-secondary/10 dark:border-dark-secondary/10">
    <h3 class="text-lg font-semibold mb-4">Table of Contents</h3>
    <nav>
      <ul class="space-y-2">
        {#each headings as heading}
          <li>
            <a
              href={`#${heading.id}`}
              class={`block py-1 text-sm transition-colors hover:text-primary ${
                activeHeadingId === heading.id
                  ? 'text-primary font-medium'
                  : 'text-text-light'
              } ${heading.depth === 3 ? 'pl-4' : ''}`}
              onclick={() => handleScrollTo(heading.text)}
            >
              {heading.text}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
{/if}