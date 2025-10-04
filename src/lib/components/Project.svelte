<script>
  import {page} from '$app/state'
  import {formatPath} from '$lib/i18n/path'
  import {_,json} from 'svelte-i18n'
  const projects = $json('project.projects')

  const {lang}=$props()
</script>

<section class="py-20">
  <div class="container mx-auto px-6">
    <h2 class="text-3xl font-serif font-bold text-center mb-12">{$_('project.project')}</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each projects as project (project.id)}
        <a
          href={project.link}
          class="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
        >
          <div class="relative overflow-hidden">
            <!-- 图片容器 -->
            <div class="h-56 bg-gray-200 relative overflow-hidden">
              <!-- 实际项目中应使用 <img> 或 <svelte:component> -->
              <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
                <img src={project.image} alt={project.title}/>
              </div>
            </div>
            
            <!-- 信息遮罩 -->
            <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 class="font-bold text-lg mb-1">{project.title}</h3>
              <p class="text-sm text-gray-200">{project.tags&&project.tags.join(' • ')}</p>
            </div>
          </div>
        </a>
      {/each}
    </div>

    <div class="text-center mt-12">
      <a
        href={formatPath(page.url.pathname,'/project')}
        class="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
      >
        
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </div>
</section>