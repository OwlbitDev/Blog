<script>
  import { onMount } from 'svelte';
  import {_} from 'svelte-i18n'
  import { fade, scale, fly } from 'svelte/transition';
  
  // 技能数据
  let skills = [
    { name: '产品设计', level: 75, color: 'from-blue-400 to-cyan-400' },
    { name: '前端开发', level: 85, color: 'from-purple-400 to-pink-400' },
    { name: '用户体验', level: 88, color: 'from-green-400 to-teal-400' },
    { name: '品牌策略', level: 82, color: 'from-orange-400 to-red-400' }
  ];
  
  // 时间轴数据
  let timeline = [
    { 
      year: '2023', 
      title: '独立产品设计师', 
      description: '开始自由职业，专注于数字产品设计与开发',
      icon: '🚀'
    },
    { 
      year: '2021', 
      title: '高级产品设计师', 
      description: '在科技公司领导产品设计团队',
      icon: '💼'
    },
    { 
      year: '2019', 
      title: 'UI/UX设计师', 
      description: '进入数字设计领域，专注于用户体验',
      icon: '🎨'
    },
    { 
      year: '2017', 
      title: '设计之旅开始', 
      description: '毕业于设计学院，开启创意生涯',
      icon: '🎓'
    }
  ];
  
  // 兴趣数据
  let interests = [
    { name: '哲学阅读', emoji: '📚', description: '探索思想与存在意义' },
    { name: '抽象摄影', emoji: '📷', description: '捕捉生活中的几何与光影' },
    { name: '冥想思考', emoji: '🧘', description: '在静默中寻找灵感' },
    { name: '科技人文', emoji: '⚙️', description: '关注技术与社会交汇点' }
  ];
  
  let animatedSkills = false;
  let activeTimelineItem = 0;
  
  // 技能条动画
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animatedSkills = true;
        }
      });
    }, { threshold: 0.5 });
    
    const skillsSection = document.querySelector('#skills-section');
    if (skillsSection) observer.observe(skillsSection);
  });
  
  // 滚动到联系区域
  function scrollToContact() {
    document.getElementById('contact-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }
</script>

<svelte:head>
  <title>About | lovol</title>
  <meta name="description" content="Learn more about my journey, philosophy, and approach to design and development" />
</svelte:head>

<div class="min-h-screen">
  <!-- 英雄区域 - 带有思考者主题 -->
  <section class="relative py-20 overflow-hidden">
    <!-- 背景装饰元素 -->
    <div class="absolute top-10 left-10 w-20 h-20 bg-primary/10 dark:bg-dark-primary/10 rounded-full blur-xl"></div>
    <div class="absolute bottom-10 right-10 w-32 h-32 bg-primary/5 dark:bg-dark-primary/5 rounded-full blur-xl"></div>
    
    <div class="container mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- 文案区域 -->
        <div in:fade={{ duration: 800 }}>
          <h1 class="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            {$_('about.thinker')},<br>
            <span class="text-primary dark:text-dark-primary">{$_('about.creator')}</span>,<br>
            {$_('about.solver')}
          </h1>
          <p class="text-xl text-text-light mb-8 leading-relaxed">
            {$_("about.intro")}
          </p>
          <div class="flex flex-wrap gap-4">
            <button 
              on:click={scrollToContact}
              class="bg-primary dark:bg-dark-primary text-on-primay dark:text-dark-on-primary px-8 py-3 rounded-lg font-medium hover:bg-primary/90 dark:hover:bg-dark-primary/90 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {$_("about.contact")}
            </button>
            <a 
              href="/work" 
              class="border border-secondary dark:border-dark-secondary text-on-secondary px-8 py-3 rounded-lg font-medium hover:bg-surface-high hover:text-primary  dark:hover:text-dark-primary hover:border-primary dark:hover:border-dark-primary transition-all transform hover:scale-105"
            >
              {$_("about.project")}
            </a>
          </div>
        </div>
        
        <!-- 视觉区域 - 抽象思考图形 -->
        <div class="relative h-96" in:fly={{ x: 100, duration: 800 }}>
          <div class="absolute inset-0 bg-gradient-to-br from-primary/20 dark:from-dark-primary/20 to-primary/5 dark:to-dark-primary/5 rounded-2xl flex items-center justify-center">
            <!-- 抽象思考图形 -->
            <div class="relative w-64 h-64">
              <!-- 大脑轮廓 -->
              <div class="absolute inset-0 border-2 border-primary/30 dark:border-dark-primary/30 rounded-full"></div>
              <!-- 思维节点 -->
              <div class="absolute top-1/4 left-1/4 w-4 h-4 bg-primary dark:bg-dark-primary rounded-full animate-pulse"></div>
              <div class="absolute top-1/3 right-1/3 w-3 h-3 bg-primary dark:bg-dark-primary rounded-full animate-pulse" style="animation-delay: 0.5s;"></div>
              <div class="absolute bottom-1/3 left-1/3 w-2 h-2 bg-primary dark:bg-dark-primary rounded-full animate-pulse" style="animation-delay: 1s;"></div>
              <!-- 连接线 -->
              <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <path d="M25,25 Q50,15 75,25" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2" class="text-primary/40 dark:text-dark-primary/40" fill="none">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="2s" repeatCount="indefinite" />
                </path>
                <path d="M30,70 Q50,85 70,70" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2" class="text-primary/40 dark:text-dark-primary" fill="none">
                  <animate attributeName="stroke-dashoffset" from="0" to="10" dur="2s" repeatCount="indefinite" />
                </path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 个人哲学区域 -->
  <section class="py-20 bg-surface/50 backdrop-blur-sm">
    <div class="container mx-auto px-6">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-serif font-bold mb-8" in:fade>设计哲学</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          {#each [
            { icon: '💭', title: '深度思考', desc: '每个设计决策背后都有其逻辑与理由' },
            { icon: '🎯', title: '用户中心', desc: '始终将用户体验放在设计过程的核心' },
            { icon: '⚡', title: '简洁有力', desc: '用最少的元素传达最丰富的信息' }
          ] as principle, i}
            <div 
              class="p-6 rounded-lg bg-background/50 hover:bg-background/80 transition-all duration-300 transform hover:-translate-y-2"
              in:fly={{ y: 50, duration: 600, delay: i * 200 }}
            >
              <div class="text-4xl mb-4">{principle.icon}</div>
              <h3 class="text-xl font-semibold mb-2">{principle.title}</h3>
              <p class="text-text-light">{principle.desc}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- 技能展示区域 -->
  <section id="skills-section" class="py-20 bg-background">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-serif font-bold mb-12 text-center" in:fade>专业技能</h2>
      <div class="max-w-2xl mx-auto space-y-6">
        {#each skills as skill, i}
          <div class="group" in:fly={{ x: -50, duration: 600, delay: i * 100 }}>
            <div class="flex justify-between mb-2">
              <span class="font-medium text-text">{skill.name}</span>
              <span class="text-primary font-semibold">{skill.level}%</span>
            </div>
            <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
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
  <section class="py-20 bg-white/50">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-serif font-bold mb-12 text-center" in:fade>成长历程</h2>
      <div class="max-w-4xl mx-auto">
        <div class="relative">
          <!-- 时间线 -->
          <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 transform -translate-x-1/2"></div>
          
          {#each timeline as item, i}
            <div 
              class="relative flex items-start mb-12 group cursor-pointer"
              on:click={() => activeTimelineItem = i}
              in:fly={{ x: i % 2 === 0 ? -50 : 50, duration: 600, delay: i * 150 }}
            >
              <!-- 时间点 -->
              <div class={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-bold text-white z-10 transition-all duration-300 ${
                activeTimelineItem === i 
                  ? 'bg-primary scale-110 shadow-lg' 
                  : 'bg-text-light group-hover:bg-primary/80'
              }`}>
                {item.icon}
              </div>
              
              <!-- 内容卡片 -->
              <div class={`ml-8 flex-1 transition-all duration-300 ${
                activeTimelineItem === i 
                  ? 'transform -translate-y-2' 
                  : 'group-hover:transform group-hover:-translate-y-1'
              }`}>
                <div class={`p-6 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                  activeTimelineItem === i
                    ? 'bg-white/80 border-primary/30 shadow-lg'
                    : 'bg-white/50 border-transparent group-hover:bg-white/70 group-hover:border-primary/20'
                }`}>
                  <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-semibold">{item.title}</h3>
                    <span class="text-primary font-bold">{item.year}</span>
                  </div>
                  <p class="text-text-light">{item.description}</p>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- 个人兴趣区域 -->
  <section class="py-20 bg-background">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-serif font-bold mb-12 text-center" in:fade>兴趣与热情</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
        {#each interests as interest, i}
          <div 
            class="text-center p-6 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-300 transform hover:scale-105 group"
            in:scale={{ duration: 600, delay: i * 100 }}
          >
            <div class="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
              {interest.emoji}
            </div>
            <h3 class="font-semibold mb-1">{interest.name}</h3>
            <p class="text-sm text-text-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {interest.description}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- 召唤行动区域 -->
  <section id="contact-section" class="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
    <div class="container mx-auto px-6 text-center">
      <h2 class="text-3xl font-serif font-bold mb-6" in:fade>开始我们的对话</h2>
      <p class="text-xl text-text-light mb-8 max-w-2xl mx-auto">
        有项目想法或只是想聊聊设计、技术和创意？我很乐意与你交流。
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <a 
          href="mailto:hello@yourname.com" 
          class="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg"
        >
          发送邮件
        </a>
        <a 
          href="/work" 
          class="border border-text text-text px-8 py-3 rounded-lg font-medium hover:bg-text hover:text-white transition-all transform hover:scale-105"
        >
          浏览作品
        </a>
      </div>
    </div>
  </section>
</div>

<style>
  /* 自定义动画 */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .float-animation {
    animation: float 6s ease-in-out infinite;
  }
  
  /* 确保滚动平滑 */
  html {
    scroll-behavior: smooth;
  }
</style>