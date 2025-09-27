<script>
  import Blog from "./BlogItem.svelte"
  import {_} from "svelte-i18n"
  import {formatPath} from '$lib/i18n/path'
  const {lang,blog}=$props()
  
</script>

<section class="py-20">
  <div class="container mx-auto px-6">
    <h2 class="text-3xl font-serif font-bold text-center mb-12">{$_('last.last')}</h2>

    <div class="max-w-3xl mx-auto space-y-12">
      {#each blog as b (b.slug)}
        <Blog {lang} blog={b}/>
      {/each}
    </div>

    <div class="text-center mt-12">
      <a
        href={formatPath(lang,"/blog")}
        class="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
      >
        {$_('last.all')}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </div>
</section>