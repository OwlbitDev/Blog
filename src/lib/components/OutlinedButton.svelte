<script>
    const {href}=$props()
</script>
<a
          {href}
          class="border border-secondary dark:border-dark-secondary text-secondary dark:text-dark-secondary px-8 py-3 rounded-md font-medium hover:bg-secondary-container dark:hover:bg-dark-secondary-container hover:text-on-secondary-container dark:hover:text-dark-on-secondary-container transition-colors hover:scale-102"
          ><slot /></a>