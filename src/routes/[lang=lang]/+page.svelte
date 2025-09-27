<script>
  import Hero from '$lib/components/Hero.svelte';
  import Work from '$lib/components/Project.svelte';
  import LatestBlog from '$lib/components/LatestBlog.svelte';
  const {data}=$props()
</script>

<Hero lang={data.lang}/>
<Work lang={data.lang}/>
<LatestBlog lang={data.lang} blog={data.blogs}/>