/**
 * 检测用户偏好的语言
 * @param {Request} request
 * @param {string} cookie
 * @returns {string} 语言代码
 */
export function detectUserLanguage(request, cookie) {
  // 1. 优先使用用户之前的选择（cookie）
  if (cookie) {
    return cookie;
  }
  
  // 2. 分析浏览器语言偏好
  const acceptLanguage = request.headers.get('accept-language') || '';
  const languages = acceptLanguage.split(',').map(lang => {
    const [code, quality = 'q=1'] = lang.trim().split(';');
    return {
      code: code.split('-')[0], // 取主要语言代码
      quality: parseFloat(quality.replace('q=', ''))
    };
  });
  
  // 按权重排序
  languages.sort((a, b) => b.quality - a.quality);
  
  // 查找支持的语言
  for (const lang of languages) {
    if (['en', 'zh'].includes(lang.code)) {
      return lang.code;
    }
  }
  
  // 3. 默认语言
  return 'en';
}

/**
 * 设置语言cookie
 * @param {string} lang
 * @returns {string} cookie字符串
 */
export function setLanguageCookie(lang) {
  return `preferred_lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`;
}