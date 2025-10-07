<script lang="ts">
    import Lang from '$lib/i18n/locales'
    const {lang,cat}=$props()
    const entry=Lang(lang)
    const title=entry[cat].title
    const description=entry[cat].description
</script>

<svelte:head>
	<title>{title} | owlbit</title>
	<meta name="description" content={description} />
</svelte:head>