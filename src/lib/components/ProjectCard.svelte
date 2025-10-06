<script>
  import { fly } from 'svelte/transition';
  import Lang from '$lib/i18n/locales'
  const { lang,project, featured = false } = $props();
	const locale = Lang(lang)  
  
  // 状态标签映射
  const statusLabels = {
    live: { label: locale.project.live, color: 'bg-primary-container text-on-primary-container' },
    development: { label: locale.project.develop, color: 'bg-tertiary-container text-on-tertiary-container' },
    maintained: { label: locale.project.maintained, color: 'bg-secondary-container text-on-secondary-container' },
    archived: { label: locale.project.archived, color: 'bg-surface-variant text-on-surface-variant' }
  };
</script>

<div 
  class="project-card group bg-surface dark:bg-dark-surface rounded-xl border border-outline-variant dark:border-dark-outline-variant overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-outline dark:hover:border-dark-outline focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:ring-offset-2 focus:ring-offset-surface dark:focus:ring-offset-dark-surface {featured ? 'featured-card' : ''}"
  in:fly={{ y: 30, duration: 500 }}
  tabindex="0"
  role="article"
  aria-labelledby={`project-${project.id}-title`}
>
  <!-- 项目图片 -->
  <div class="project-image relative overflow-hidden bg-surface-variant dark:bg-dark-surface-variant">
    <img 
      src={project.image} 
      alt={project.title}
      class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
    />
    
    <!-- 状态标签 -->
    <div class="absolute top-3 right-3">
      <span class="status-tag px-2 py-1 rounded-full text-xs font-medium {statusLabels[project.status].color}">
        {statusLabels[project.status].label}
      </span>
    </div>
    
    <!-- 特色标识 -->
    {#if project.featured}
      <div class="absolute top-3 left-3">
        <div class="featured-badge bg-primary dark:bg-dark-primary text-on-primary dark:text-dark-on-primary px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          {locale.project.curated}
        </div>
      </div>
    {/if}
  </div>

  <!-- 项目内容 -->
  <div class="project-content p-6">
    <!-- 标题 -->
    <h3 id={`project-${project.id}-title`} class="text-xl font-semibold text-on-surface dark:text-dark-on-surface  mb-3 group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">
      {project.title}
    </h3>
    
    <!-- 描述 -->
    <p class="text-on-surface-variant dark:text-dark-on-surface-variant mb-4 leading-relaxed line-clamp-3">
      {project.description}
    </p>
    
    <!-- 标签 -->
    <div class="project-tags flex flex-wrap gap-2 mb-6">
      {#each project.tags as tag}
        <span class="tag bg-surface-variant dark:bg-dark-surface-variant text-on-surface-variant dark:text-dark-on-surface-variant px-2 py-1 rounded-md text-xs font-medium">
          {tag}
        </span>
      {/each}
    </div>
    
    <!-- 操作按钮 -->
    <div class="project-actions flex gap-3">
      {#if project.link}
        <a
          href={project.link}
          class="flex-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button class="w-full bg-primary dark:bg-dark-primary text-on-primary dark:text-dark-on-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-container dark:hover:bg-dark-primary-container hover:text-on-primary-container dark:hover:text-dark-on-primary-container transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:ring-offset-2">
            {locale.project['access-project']}
          </button>
        </a>
      {/if}
      
      {#if project.github}
        <a
          href={project.github}
          class="flex-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button class="w-full bg-surface-variant dark:bg-dark-surface-variant text-on-surface-variant dark:text-dark-on-surface-variant px-4 py-2 rounded-lg text-sm font-medium hover:bg-surface-container-high dark:hover:bg-dark-surface-container-high hover:text-on-surface dark:hover:text-dark-on-surface transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary">
            GitHub
          </button>
        </a>
      {/if}
      
      {#if !project.link && !project.github}
        <button 
          class="w-full bg-surface-variant dark:bg-dark-surface-variant text-on-surface-variant dark:text-dark-on-surface-variant px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed opacity-50"
          disabled
        >
          {locale.project['link-forthcoming']}
        </button>
      {/if}
    </div>
  </div>
</div>

<style>
  .project-card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .project-image {
    height: 192px;
    flex-shrink: 0;
  }
  
  .project-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .project-actions {
    margin-top: auto;
  }
  
  .featured-card {
    border-color: var(--color-primary);
    box-shadow: 0 4px 12px rgb(27 101 133 / 0.15);
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* 高对比度模式 */
  @media (prefers-contrast: high) {
    .project-card {
      border-width: 2px;
    }
    
    .featured-card {
      border-width: 3px;
    }
  }
</style>