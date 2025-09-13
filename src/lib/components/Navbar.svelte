<script>
  import { onMount } from 'svelte';
  import ThemeMode from './ThemeMode.svelte';
  let scrolled = false;

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 10;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<header
  class="fixed top-0 w-full z-50 transition-all duration-300 {scrolled
    ? 'bg-surface-container/90 dark:bg-dark-surface-container/90  text-on-surface dark:text-dark-on-surface backdrop-blur-md shadow-sm py-2'
    : 'bg-transparent py-4'}"
>
  <nav class="container mx-auto px-6 flex justify-between items-center">
    <a href="/" class="flex flex-col items-center text-2xl font-serif font-bold text-primary dark:text-dark-primary">
        <img src="/favicon.svg" alt="logo" class="size-6" />
        <span>Lanal</span>
    </a>

    <!-- Desktop Navigation -->
    <div class="hidden md:flex items-center space-x-8">
      {#each ['Work', 'Blog','note','About'] as item}
        <a
          href={ `/${item.toLowerCase()}`}
          class="relative text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary dark:hover:text-dark-primary"
        >
          {item}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-dark-primary transition-all duration-300 group-hover:w-full"></span>
        </a>
      {/each}
      <ThemeMode />
    </div>

    <!-- Mobile menu button (简化版) -->
    <button class="md:hidden">☰</button>
  </nav>
</header>

<style>
  /* 确保内容不被导航栏遮挡 */
  :global(main) {
    padding-top: 80px;
  }
</style>