export function isMatchContent(lng:string,value:string){
    switch (lng) {
        case 'zh':
            return value=='index-zh.md'
        default:
            return value=='index.md'
    }
}

export function findLang(path:string){
    const part=path.split('/')
    const index=part[part.length-1]
    switch (index) {
        case 'index-zh.md':
            return 'zh'
        default:
            return 'en'
    }
}