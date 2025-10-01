<script>
  import { formatPath } from '$lib/i18n/path';
  
  const { lang, note } = $props();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
</script>

<a 
  href={formatPath(lang, `/note/${note.slug}`)} 
  class="group block bg-surface dark:bg-dark-surface rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:bg-surface-container-low dark:hover:bg-dark-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:ring-offset-2 focus:ring-offset-surface dark:focus:ring-offset-dark-surface"
  tabindex="0"
>
  <div class="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-8">
    <!-- 日期 - 使用表面变体颜色 -->
    <div class="flex-shrink-0">
      <div class="text-sm uppercase tracking-wider text-on-surface-variant dark:text-dark-on-surface-variant">
        {formatDate(note.date)}
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="flex-grow border-b border-outline-variant dark:border-dark-outline-variant pb-8 group-last:border-b-0 p-4 rounded-lg transition-colors group-hover:bg-surface-container dark:group-hover:bg-dark-surface-container">
      <!-- 标题 - 使用主色悬停效果 -->
      <h3 class="text-xl font-semibold mb-3 text-on-surface dark:text-dark-on-surface group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">
        {note.title}
      </h3>
      
      <!-- 描述 - 使用表面变体颜色 -->
      <p class="text-on-surface-variant dark:text-dark-on-surface-variant mb-4 leading-relaxed">
        {note.description}
      </p>
      
      <!-- 分类标签 - 使用次要容器颜色 -->
      <span class="inline-block bg-secondary-container dark:bg-dark-secondary-container text-on-secondary-container dark:text-dark-on-secondary-container text-xs px-3 py-1 rounded-full font-medium">
        {note.category}
      </span>
    </div>
  </div>
</a>