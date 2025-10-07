<script>
  import Meta from '$lib/components/Meta.svelte'
  import Hero from '$lib/components/Hero.svelte';
  import Work from '$lib/components/Project.svelte';
  import LatestBlog from '$lib/components/LatestBlog.svelte';
  const {data}=$props()
</script>

<Meta lang={data.lang} cat="home"/>
<Hero lang={data.lang}/>
<Work lang={data.lang}/>
<LatestBlog lang={data.lang} blog={data.blogs}/>