<script>
  import { onMount, onDestroy } from 'svelte';
  import { Application } from '@splinetool/runtime';
  
  // 接收可选的场景URL参数，默认使用一个示例场景
  export let sceneUrl = 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode';
  export let className = '';
  
  let canvas;
  let spline;
  let isLoading = true;
  let hasError = false;
  
  onMount(async () => {
    if (!canvas) return;
    
    try {
      spline = new Application(canvas);
      await spline.load(sceneUrl);
      
      // 可选：添加一些交互效果
      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('click', onCanvasClick);
      
      isLoading = false;
    } catch (error) {
      console.error('Failed to load Spline scene:', error);
      hasError = true;
      isLoading = false;
    }
  });
  
  onDestroy(() => {
    if (canvas) {
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('click', onCanvasClick);
    }
    
    if (spline) {
      spline.dispose();
    }
  });
  
  function onMouseMove(e) {
    if (!spline) return;
    
    // 创建简单的鼠标跟随效果
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // 根据鼠标位置轻微旋转整个场景
    spline.setVariable('MouseX', x);
    spline.setVariable('MouseY', y);
  }
  
  function onCanvasClick() {
    if (!spline) return;
    
    // 点击时触发一个动画
    spline.emitEvent('click', '全部');
  }
</script>

<div class="relative w-full h-full {className}">
  {#if isLoading}
    <div class="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl">
      <div class="flex flex-col items-center">
        <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
        <p class="text-sm text-text-light">Loading 3D model...</p>
      </div>
    </div>
  {:else if hasError}
    <div class="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl">
      <div class="text-center p-6">
        <div class="text-red-500 text-lg mb-2">Failed to load 3D model</div>
        <p class="text-sm text-text-light mb-4">Please check your connection and try again</p>
        <button 
          on:click={() => location.reload()} 
          class="px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  {/if}
  
  <canvas
    bind:this={canvas}
    class="w-full h-full rounded-2xl {isLoading || hasError ? 'opacity-0' : 'opacity-100'}"
    style="transition: opacity 0.5s ease-in-out;"
  />
</div>

<style>
  canvas {
    outline: none;
    cursor: grab;
  }
  
  canvas:active {
    cursor: grabbing;
  }
</style>