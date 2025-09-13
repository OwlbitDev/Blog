<script>
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/yourname', icon: 'github' },
    { name: 'Twitter', url: 'https://twitter.com/yourname', icon: 'twitter' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/yourname', icon: 'linkedin' },
    { name: 'Dribbble', url: 'https://dribbble.com/yourname', icon: 'dribbble' },
  ];
</script>

<footer class="bg-white py-12">
  <div class="container mx-auto px-6">
    <div class="flex flex-col items-center space-y-8">
      <!-- 社交媒体链接 -->
      <div class="flex space-x-6">
        {#each socialLinks as link}
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            class="text-text-light hover:text-primary transition-colors"
            aria-label={link.name}
          >
            <!-- 这里应使用实际的图标组件 -->
            <span class="text-lg font-semibold">{link.icon}</span>
          </a>
        {/each}
      </div>

      <!-- 邮箱 -->
      <a href="mailto:hello@yourname.com" class="text-lg text-text hover:text-primary transition-colors">
        hello@yourname.com
      </a>

      <!-- 次要导航 -->
      <nav class="flex flex-wrap justify-center space-x-6">
        {#each ['Work', 'Blog', 'About', 'Contact'] as item}
          <a
            href={`/${item.toLowerCase()}`}
            class="text-sm text-text-light hover:text-primary transition-colors"
          >
            {item}
          </a>
        {/each}
      </nav>

      <!-- 版权信息 -->
      <div class="text-center text-sm text-text-light">
        <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
      </div>
    </div>
  </div>
</footer>