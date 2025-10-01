<script lang="ts">
      import { fly } from 'svelte/transition';
</script>
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