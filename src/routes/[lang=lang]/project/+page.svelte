<script>
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import FilledButton from '$lib/components/FilledButton.svelte';
  import {_,json} from 'svelte-i18n'
  
  
  // 项目数据示例
  const projects = $json('project.projects')
  
  // 过滤状态
  let activeFilter = $state('all');
  
  const filters = [
    { id: 'all', label: $_('project.allpro') },
    { id: 'live', label: $_('project.live') },
    { id: 'development', label: $_('project.develop') },
    { id: 'maintained', label: $_('project.maintained') },
    { id: 'archived', label: $_('project.archived') }
  ];
  
  // 使用函数来计算过滤后的项目
  function getFilteredProjects() {
    return activeFilter === 'all' 
      ? projects 
      : projects.filter(project => project.status === activeFilter);
  }
  
  // 获取特色项目
  function getFeaturedProjects() {
    return getFilteredProjects().filter(project => project.featured);
  }
  
  // 获取常规项目
  function getRegularProjects() {
    return getFilteredProjects().filter(project => !project.featured);
  }
</script>

<div class="projects-page min-h-screen bg-surface dark:bg-dark-surface">
  <!-- 页面头部 -->
  <section class="page-header dark:page-header-dd bg-surface-container dark:bg-dark-surface-container py-16 px-6">
    <div class="container mx-auto max-w-6xl">
      <div class="text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-on-surface dark:text-dark-on-surface mb-4">{$_('project.my-projects')}</h1>
        <p class="text-xl text-on-surface-variant dark:text-dark-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          {$_('project.slogen')}
        </p>
      </div>
    </div>
  </section>

  <!-- 过滤器和内容 -->
  <section class="page-content py-12 px-6">
    <div class="container mx-auto max-w-6xl">
      <!-- 过滤器 -->
      <div class="filters-container mb-12">
        <div class="flex flex-wrap gap-2 justify-center">
          {#each filters as filter}
            <button
              class="filter-btn px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 {activeFilter === filter.id 
                ? 'bg-primary dark:bg-dark-primary text-on-primary dark:text-dark-on-primary shadow-xs' 
                : 'bg-surface-container dark:bg-dark-surface-container text-on-surface-variant dark:text-dark-on-surface-variant hover:bg-surface-container-high dark:hover:bg-dark-surface-container-high hover:text-on-surface dark:hover:text-dark-on-surface'}"
              onclick={() => activeFilter = filter.id}
              aria-pressed={activeFilter === filter.id}
            >
              {filter.label}
            </button>
          {/each}
        </div>
      </div>

      <!-- 项目网格 -->
      <div class="projects-grid">
        <!-- 特色项目 -->
        {#if getFeaturedProjects().length > 0}
          <div class="featured-section mb-12">
            <h2 class="text-2xl font-semibold text-on-surface dark:text-dark-on-surface mb-6 flex items-center">
              <svg class="w-6 h-6 mr-2 text-primary dark:text-dark-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              {$_('project.curated')}
            </h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {#each getFeaturedProjects() as project}
                <ProjectCard {project} featured={true} />
              {/each}
            </div>
          </div>
        {/if}

        <!-- 常规项目 -->
        {#if getRegularProjects().length > 0}
          <div class="regular-section">
            <h2 class="text-2xl font-semibold text-on-surface dark:text-dark-on-surface mb-6">所有项目</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {#each getRegularProjects() as project}
                <ProjectCard {project} />
              {/each}
            </div>
          </div>
        {/if}

        <!-- 空状态 -->
        {#if getFilteredProjects().length === 0}
          <div class="empty-state text-center py-16">
            <svg class="w-24 h-24 mx-auto mb-6 text-on-surface-variant dark:text-dark-on-surface-variant  opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <h3 class="text-xl font-medium text-on-surface dark:text-dark-on-surface mb-2">$_('project.no-project')</h3>
            <p class="text-on-surface-variant dark:text-dark-on-surface-variant mb-6">$_('project.no-result')</p>
            <FilledButton on:click={() => activeFilter = 'all'}>
              {$_('project.show-all')}
            </FilledButton>
          </div>
        {/if}
      </div>
    </div>
  </section>
</div>

<style>
  .projects-page {
    min-height: 100vh;
  }
  
  .page-header {
    background: linear-gradient(135deg, var(--color-surface-container) 0%, var(--color-surface-container-low) 100%);
  }
  
  .page-header-dd {
    background: linear-gradient(135deg, var(--color-dark-surface-container) 0%, var(--color-dark-surface-container-low) 100%);
  }
  /* 平滑滚动 */
  html {
    scroll-behavior: smooth;
  }
  
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }
</style>