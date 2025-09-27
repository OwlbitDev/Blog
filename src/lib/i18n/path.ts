
export function formatPath(lang:string,url:string) {
  // 否则，添加语言前缀
  if(url=='/'){
    return `/${lang}`;
  }else if(url.startsWith('/')){
    return `/${lang}${url}`;
  }
  return `/${lang}/${url}`;
}