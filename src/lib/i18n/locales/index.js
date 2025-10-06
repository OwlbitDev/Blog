import en from './en.json'
import zh from './zh.json'
export default function(lang){
    return lang === 'zh' ? zh : en
}