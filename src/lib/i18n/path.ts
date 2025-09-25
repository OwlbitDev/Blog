// src/lib/i18n-utils.js
import { get } from 'svelte/store';
import { locale } from 'svelte-i18n'; // 导入 svelte-i18n 的 locale store

// 定义默认语言（根据你的项目配置调整）
const defaultLocale = 'en';

/**
 * 根据当前语言格式化路径
 * @param {string} path - 原始路径，如 '/work' 或 'about'
 * @returns {string} 格式化后的路径，如 '/fr/work' 或 '/work'
 */
export function formatPath(path:string) {
  const currentLocale = get(locale) || defaultLocale;
  // 确保路径以斜杠开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // 如果是默认语言，则不添加语言前缀
  if (currentLocale === defaultLocale) {
    return normalizedPath;
  }

  // 否则，添加语言前缀
  return `/${currentLocale}${normalizedPath}`;
}