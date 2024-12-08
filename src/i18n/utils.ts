import { ui, defaultLanguage,simpleLanguages } from './ui';

export function useTranslations(lang: string|undefined) {
  return function t(key: keyof typeof ui[typeof defaultLanguage]) {
    return ui[lang??defaultLanguage][key] || ui[defaultLanguage][key];
  }
}

export async function getStaticPaths() {
  return simpleLanguages.map(lng => ({ params: { lng } }))
}