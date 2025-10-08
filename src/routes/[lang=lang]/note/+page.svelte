<script>
	import Meta from '$lib/components/Meta.svelte'
	import Note from '$lib/components/NoteItem.svelte'
	const { data } = $props()

</script>

<Meta lang={data.lang} cat="note"/>

<section class="py-20">
	<div class="container mx-auto px-6">
		<div class="max-w-3xl mx-auto space-y-12">
			{#each data.notes as note (note.slug)}
				<Note lang={data.lang} {note} />
			{/each}
		</div>
	</div>
</section>
