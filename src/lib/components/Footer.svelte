<script>
  import {Github,Mail} from "lucide-svelte"
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/owlnut', icon: Github },
    { name: 'Email', url: 'mailto:owlnutlee@outlook.com', icon: Mail },
  ];
</script>

<footer class="bg-surface-container dark:bg-dark-surface-container text-on-surface dark:text-dark-on-surface py-12">
  <div class="container mx-auto px-6">
    <div class="flex flex-col items-center space-y-4">
      <!-- 社交媒体链接 -->
      <div class="flex space-x-6">
        {#each socialLinks as link}
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-primary transition-colors"
            aria-label={link.name}
          >
            <!-- 这里应使用实际的图标组件 -->
            <span class="text-lg font-semibold"><link.icon/></span>
          </a>
        {/each}
      </div>
      <!-- 版权信息 -->
      <div class="text-center text-sm text-text-light">
        <p>© {new Date().getFullYear()} owlnut. All rights reserved.</p>
      </div>
    </div>
  </div>
</footer>