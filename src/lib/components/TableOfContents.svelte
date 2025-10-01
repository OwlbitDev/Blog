<script>
  import {_} from 'svelte-i18n'
  import { createEventDispatcher } from 'svelte';
  
  const { headings = [] } = $props();
  const dispatch = createEventDispatcher();
  
  let activeId = $state('');
  let isExpanded = $state(false);
  
  // 平滑滚动到指定标题
  function scrollToHeading(id, event) {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // 更新活动状态
      activeId = id;
      dispatch('navigate', { id, heading: headings.find(h => h.id === id) });
      
      // 在移动端点击后自动收起
      if (window.innerWidth < 768) {
        isExpanded = false;
      }
    }
  }
  
  // 观察标题激活状态
  function observeHeadings() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            activeId = entry.target.id;
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.5, 1]
      }
    );
    
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });
    
    return () => observer.disconnect();
  }
  
  $effect(() => {
    if (headings.length > 0) {
      return observeHeadings();
    }
  });
</script>

<aside class="table-of-contents">
  <!-- 移动端标题和切换按钮 -->
  <div class="toc-header md:hidden flex items-center justify-between p-4 bg-surface-container dark:bg-dark-surface-container border-b border-outline-variant dark:border-dark-outline-variant">
    <h3 class="text-lg font-semibold text-on-surface dark:text-dark-on-surface">{$_('blog.index')}</h3>
    <button
      class="p-2 rounded-lg hover:bg-surface-container-high dark:hover:bg-dark-surface-container-high transition-colors"
      onclick={() => isExpanded = !isExpanded}
      aria-expanded={isExpanded}
      aria-label={isExpanded ? $_('blog.collapse') : $_('blog.expand')}
    >
      <svg 
        class="w-5 h-5 text-on-surface-variant dark:text-dark-on-surface-variant transition-transform {isExpanded ? 'rotate-180' : ''}" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </div>
  
  <!-- 导航内容 -->
  <div class="toc-content bg-surface-container dark:bg-dark-surface-container rounded-xl border border-r-outline-variant dark:border-r-dark-outline-variant overflow-hidden {isExpanded ? 'block' : 'hidden md:block'}">
    <!-- 桌面端标题 -->
    <div class="hidden md:flex items-center p-4 border-b border-outline-variant">
      <svg class="w-5 h-5 mr-2 text-primary dark:text-dark-primary" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
      </svg>
      <h3 class="text-lg font-semibold text-on-surface dark:text-dark-on-surface">{$_('blog.pageindex')}</h3>
    </div>
    
    <!-- 导航列表 -->
    <nav class="p-4" aria-label={$_('blog.toc')}>
      <ul class="space-y-2">
        {#each headings as heading}
          <li class="toc-item" style="padding-left: {(heading.level - 2) * 16}px">
            <a
              href="#{heading.id}"
              class="block py-2 px-3 rounded-lg text-on-surface-variant dark:text-dark-on-surface-variant hover:bg-surface-container-high dark:bg-dark-surface-container-high  hover:text-on-surface dark:hover:text-dark-on-surface transition-all duration-200 {activeId === heading.id ? 'bg-primary-container dark:bg-dark-primary-container text-on-primary-container dark:text-dark-on-primary-container font-medium' : ''}"
              onclick={(e) => {scrollToHeading(heading.id, e)
                e.preventDefault()
              }}
              aria-current={activeId === heading.id ? 'location' : undefined}
            >
              <span class="flex items-center">
                {#if activeId === heading.id}
                  <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                {/if}
                {heading.text}
              </span>
            </a>
          </li>
        {/each}
      </ul>
    </nav>
    
    <!-- 空状态 -->
    {#if headings.length === 0}
      <div class="p-6 text-center text-on-surface-variant dark:text-dark-on-surface-variant">
        <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p>{$_('blog.emptyindex')}</p>
      </div>
    {/if}
  </div>
</aside>

<style>
  .table-of-contents {
    position: sticky;
    top: 96px;
    max-height: calc(100vh - 96px);
    overflow-y: auto;
  }
  
  /* 自定义滚动条 */
  .table-of-contents::-webkit-scrollbar {
    width: 1px;
  }
  
  .table-of-contents::-webkit-scrollbar-track {
    background: var(--color-surface-variant);
    border-radius: 1px;
  }
  
  .table-of-contents::-webkit-scrollbar-thumb {
    background: var(--color-outline-variant);
    border-radius: 1px;
  }
  
  .table-of-contents::-webkit-scrollbar-thumb:hover {
    background: var(--color-outline);
  }
  
  /* 响应式设计 */
  @media (max-width: 767px) {
    .table-of-contents {
      position: relative;
      top: 0;
      margin-bottom: 24px;
    }
    
    .toc-content {
      border-radius: 0 0 12px 12px;
    }
  }
</style>