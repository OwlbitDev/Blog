<script>
	import { onMount } from 'svelte'
	import { formatPath } from '$lib/i18n/path'
	import { fade, scale, fly } from 'svelte/transition'
	import FilledButtom from '$lib/components/FilledButton.svelte'
	import OutlinedButton from '$lib/components/OutlinedButton.svelte'
	import Brain from '$lib/components/Brain.svelte'
	import Zen from '$lib/components/Zen.svelte'
	import Lang from '$lib/i18n/locales'

	const { data } = $props()
	const lang = data.lang
	const locale = Lang(lang)

	let animatedSkills = $state(false)
	let activeTimelineItem = $state(0)

	// 技能条动画
	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						animatedSkills = true
					}
				})
			},
			{ threshold: 0.5 }
		)

		const skillsSection = document.querySelector('#skills-section')
		if (skillsSection) observer.observe(skillsSection)
	})

	// 滚动到联系区域
	function scrollToContact() {
		document.getElementById('contact-section')?.scrollIntoView({
			behavior: 'smooth'
		})
	}
</script>

<svelte:head>
	<title>About | owlbit</title>
	<meta
		name="description"
		content="Learn more about my journey, philosophy, and approach to design and development"
	/>
</svelte:head>

<div class="min-h-screen">
	<section class="relative py-20 overflow-hidden">
		<div
			class="absolute top-10 left-10 w-20 h-20 bg-primary/10 dark:bg-dark-primary/10 rounded-full blur-xl"
		></div>
		<div
			class="absolute bottom-10 right-10 w-32 h-32 bg-primary/5 dark:bg-dark-primary/5 rounded-full blur-xl"
		></div>

		<div class="container mx-auto px-6 relative z-10">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<!-- 文案区域 -->
				<div in:fade={{ duration: 800 }}>
					<h1 class="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
						{locale.about.thinker},<br />
						<span class="text-primary dark:text-dark-primary">{locale.about.creator}</span>,<br />
						{locale.about.solver}
					</h1>
					<p class="text-xl text-text-light mb-8 leading-relaxed">
						{locale.about.intro}
					</p>
					<div class="flex flex-wrap gap-4">
						<FilledButtom onclick={scrollToContact}>
							{locale.about.contact}
						</FilledButtom>
						<OutlinedButton href={formatPath(lang, '/project')}>
							{locale.about.project}
						</OutlinedButton>
					</div>
				</div>
				<Brain />
			</div>
		</div>
	</section>

	<section class="py-20 bg-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm">
		<div class="container mx-auto px-6">
			<div class="max-w-4xl mx-auto text-center">
				<h2 class="text-3xl font-serif font-bold mb-8" in:fade>{locale.about.zentitle}</h2>
				<Zen items={locale.about.zen} />
			</div>
		</div>
	</section>

	<section id="skills-section" class="py-20 bg-background dark:bg-dark-background">
		<div class="container mx-auto px-6">
			<h2 class="text-3xl font-serif font-bold mb-12 text-center" in:fade>{locale.about.skillstitle}</h2>
			<div class="max-w-2xl mx-auto space-y-6">
				{#each locale.about.skills as skill, i}
					<div class="group" in:fly={{ x: -50, duration: 600, delay: i * 100 }}>
						<div class="flex justify-between mb-2">
							<span class="font-medium text-text">{skill.name}</span>
							<span class="text-primary dark:text-dark-primary font-semibold">{skill.level}%</span>
						</div>
						<div class="h-3 bg-secondary-container dark:bg-dark-secondary-container rounded-full overflow-hidden">
							<div
								class={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
								style={`width: ${animatedSkills ? skill.level : 0}%`}
							></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- 时间轴区域 -->
	<section class="py-20">
		<div class="container mx-auto px-6">
			<h2 class="text-3xl font-serif font-bold mb-12 text-center" in:fade>{locale.about.timelinetitle}</h2>
			<div class="max-w-4xl mx-auto">
				<div class="relative">
					<!-- 时间线 -->
					<div
						class="absolute left-8 top-0 bottom-0 w-0.5 bg-primary dark:bg-dark-primary transform -translate-x-1/2"
					></div>

					{#each locale.about.timeline as item, i}
						<button
							class="relative flex items-start mb-12 group cursor-pointer"
							onclick={() => (activeTimelineItem = i)}
							in:fly={{ x: i % 2 === 0 ? -50 : 50, duration: 600, delay: i * 150 }}
						>
							<!-- 时间点 -->
							<div
								class={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-bold text-on-primary dark:text-dark-on-primary z-10 transition-all duration-300 ${
									activeTimelineItem === i
										? 'bg-primary dark:bg-dark-primary scale-110 shadow-lg'
										: 'bg-primary/30 dark:bg-dark-primary/30 group-hover:bg-primary/70 dark:group-hover:bg-dark-primary/70'
								}`}
							>
								{item.icon}
							</div>

							<!-- 内容卡片 -->
							<div
								class={`ml-8 flex-1 transition-all duration-300 ${
									activeTimelineItem === i
										? 'transform -translate-y-2'
										: 'group-hover:transform group-hover:-translate-y-1'
								}`}
							>
								<div
									class={`p-6 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
										activeTimelineItem === i
											? 'bg-surface-container dark:bg-dark-surface-container border-primary dark:border-dark-primary shadow-lg'
											: 'bg-surface-container-low dark:bg-dark-surface-container-low border-transparent group-hover:border-primary/50 dark:group-hover:border-dark-primary/50'
									}`}
								>
									<div class="flex justify-between items-start mb-2">
										<h3 class="text-xl font-semibold">{item.title}</h3>
										<span class="text-on-surface dark:text-dark-on-surface font-bold">{item.year}</span>
									</div>
									<p class="text-text-light">{item.description}</p>
								</div>
							</div>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- 个人兴趣区域 -->
	<section class="py-20">
		<div class="container mx-auto px-6">
			<h2 class="text-3xl font-serif font-bold mb-12 text-center" in:fade>{locale.about.intereststitle}</h2>
			<div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
				{#each locale.about.interests as interest, i}
					<div
						class="text-center p-6 rounded-lg bg-surface dark:bg-dark-surface hover:bg-surface-container dark:hover:bg-dark-surface-container transition-all duration-300 transform hover:scale-105 group"
						in:scale={{ duration: 600, delay: i * 100 }}
					>
						<div
							class="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300"
						>
							{interest.emoji}
						</div>
						<h3 class="font-semibold mb-1">{interest.name}</h3>
						<p
							class="text-sm text-text-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						>
							{interest.description}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- 召唤行动区域 -->
	<section id="contact-section" class="py-20">
		<div class="container mx-auto px-6 text-center">
			<h2 class="text-3xl font-serif font-bold mb-6" in:fade>{locale.about.talk}</h2>
			<p class="text-xl text-text-light mb-8 max-w-2xl mx-auto">
				{locale.about.talkme}
			</p>
			<div class="flex flex-wrap justify-center gap-4">

        <FilledButtom href="mailto:honguilee@outlook.com">
          {locale.about.sendemail}
        </FilledButtom>
					
        <OutlinedButton href={formatPath(lang, '/project')}>
          {locale.about.viewproject}
        </OutlinedButton>
			</div>
		</div>
	</section>
</div>

<style>
	/* 自定义动画 */
	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.float-animation {
		animation: float 6s ease-in-out infinite;
	}
</style>
