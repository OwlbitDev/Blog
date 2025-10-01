// lib/remark-collect-headings.js
import { visit } from 'unist-util-visit';
import { slug } from 'github-slugger'; // 注意这里导入的是 slug 函数

export function genTOC() {
  return (tree, file) => {
    // console.log('=== Remark阶段收集标题 ===');
    const headings = [];
    // 使用导入的 slug 函数创建一个新的 slugger 实例

    visit(tree, 'heading', (node) => {
      // console.log('找到heading节点:', node);
      const level = node.depth;
      const text = extractTextFromHeading(node);
      // 使用 slugger 实例来生成 slug
      const id = slug(text); // 或者直接使用 slug(text)
      
      // console.log(`标题: H${level} - "${text}" -> ID: ${id}`);
      
      if (text) {
        headings.push({ level, text, id });
      }
    });

    // console.log('Remark收集结果:', headings);
    
    // 将数据存入 file.data.fm
    if (!file.data.fm) file.data.fm = {};
    file.data.fm.headings = headings;
  };
}

function extractTextFromHeading(node) {
  if (!node.children) return '';
  
  return node.children
    .map(child => {
      if (child.type === 'text') return child.value;
      if (child.type === 'inlineCode') return child.value;
      // 可以根据需要处理其他类型的子节点，如强调、链接等
      return '';
    })
    .filter(Boolean)
    .join(' ')
    .trim();
}