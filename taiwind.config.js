// tailwind.config.js
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}', // 确保包含你的组件文件
    // 如果博客内容来自特定目录，也需要添加，例如：
    './src/content/blog/**/*.md',
    // './src/content/blog/**/*.svx',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}