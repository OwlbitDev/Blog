<script>
  import Hero from '$lib/components/Hero.svelte';
  import Work from '$lib/components/Work.svelte';
  import LatestBlog from '$lib/components/LatestBlog.svelte';
  const {data}=$props()
</script>

<Hero />
<Work />
<LatestBlog blog={data.blogs}/>