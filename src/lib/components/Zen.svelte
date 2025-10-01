<script>
  import { fly } from 'svelte/transition';
  
  const {items} =$props()
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  {#each items as item, i}
    <div 
      class="p-6 rounded-xl bg-surface dark:bg-dark-surface border border-outline-variant dark:border-dark-outline-variant transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md hover:bg-surface-container dark:hover:bg-dark-surface-container focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:ring-offset-2 focus:ring-offset-surface dark:focus:ring-offset-dark-surface"
      in:fly={{ y: 50, duration: 600, delay: i * 200 }}
      tabindex="0"
      role="article"
      aria-labelledby={`item-${i}-title`}
    >
      <div class="text-4xl mb-4 text-primary dark:text-dark-primary">
        {item.icon}
      </div>
      <h3 id={`principle-${i}-title`} class="text-xl font-semibold mb-3 text-on-surface text-dark-on-surface">
        {item.title}
      </h3>
      <p class="text-on-surface-variant dark:text-dark-on-surface-variant leading-relaxed">
        {item.desc}
      </p>
    </div>
  {/each}
</div>