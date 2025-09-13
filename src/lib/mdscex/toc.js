// src/lib/mdsvex/toc-plugin.js
import { visit } from 'unist-util-visit';

/**
 * 一个用于提取 Markdown 标题的 mdsvex 插件
 * 它会将提取到的标题数组添加到文件的 data 中
 */
export function genTOC() {
  return (tree, file) => {
    const headings = []; // 用于存储提取到的标题

    // 遍历 AST，寻找所有标题节点 (如 h1, h2, h3 等)
    visit(tree, 'heading', (node) => {
      // 从标题节点的子节点中提取纯文本内容
      let text = '';
      // 遍历标题节点的子节点，通常是 text 类型
      if (node.children && node.children.length > 0) {
        for (const child of node.children) {
          if (child.type === 'text' || child.type === 'inlineCode') {
            text += child.value;
          }
          // 可以考虑处理其他类型的节点，如链接等
        }
      }

      // 如果成功提取到文本，则将其加入 headings 数组
      if (text) {
        let baseId = text.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
          .replace(/-+/g, '-');

        // 确保 ID 唯一
        let uniqueId = baseId;
        let counter = 1;
        while (headings.some(h => h.id === uniqueId)) {
          uniqueId = `${baseId}-${counter}`;
          counter++;
        }

        headings.push({
          depth: node.depth,
          text,
          id: uniqueId
        });
      }
    });
    // 将提取到的 headings 数组挂载到 file.data 上，以便后续使用
    if (!file.data.fm) file.data.fm = {}; // 确保 fm 对象存在
    file.data.fm.headings = headings; // 将标题信息存入 frontmatter 数据中
  };
}