<script>
	const { href, onclick } = $props()
</script>

{#if href}
	<a
		{href}
		class="bg-primary dark:bg-dark-primary text-on-primay dark:text-dark-on-primary px-8 py-3 rounded-lg font-medium hover:bg-primary/95 dark:hover:bg-dark-primary/95 transition-all transform hover:scale-102 shadow-lg hover:shadow-xl"
	>
		<slot />
	</a>
{:else}
	<button
		type="button"
		{onclick}
		class="cursor-pointer bg-primary dark:bg-dark-primary text-on-primay dark:text-dark-on-primary px-8 py-3 rounded-lg font-medium hover:bg-primary/95 dark:hover:bg-dark-primary/95 transition-all transform hover:scale-102 shadow-lg hover:shadow-xl"
	>
		<slot />
	</button>
{/if}
