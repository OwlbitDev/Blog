<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '../../app.css'

</script>

<div class="min-h-screen flex flex-col bg-background dark:bg-dark-background text-on-background dark:text-dark-on-background font-sans">
  <Navbar />
  <main class="flex-grow">
    <slot />
  </main>
  <Footer />
</div>