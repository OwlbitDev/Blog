export function isMatchContent(lng:string,value:string){
    switch (lng) {
        case 'zh':
            return value=='index-zh.md'
        default:
            return value=='index.md'
    }
}