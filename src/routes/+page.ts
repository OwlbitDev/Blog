import { redirect } from '@sveltejs/kit';
export function load({ url }) {
  // 如果直接访问根路径，进行重定向
  if (url.pathname === '/') {
    // 重定向到用户偏好语言或默认语言
    throw redirect(302, `/en`);
  }
  
  return {};
}