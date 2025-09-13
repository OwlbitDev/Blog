<script>
	const { note } = $props()

	const formatDate = (dateString) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
	}
</script>

<a href={`/note/${note.slug}`} class="group block">
	<div class="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-8">
		<!-- 日期 -->
		<div class="flex-shrink-0">
			<div class="text-sm uppercase tracking-wider text-text-light">
				{formatDate(note.date)}
			</div>
		</div>

		<!-- 内容 -->
		<div
			class="flex-grow border-b border-gray-200 pb-8 group-last:border-b-0 group-hover:bg-gray-50/50 p-4 rounded-lg transition-colors"
		>
			<h3 class="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
				{note.title}
			</h3>
			<p class="text-text-light mb-4">
				{note.description}
			</p>
			<span class="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
				{note.category}
			</span>
		</div>
	</div>
</a>
