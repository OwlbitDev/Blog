import { getPosts } from "./content";
export async function getTags() {
    const posts=await getPosts()
    const map=new Map<string,Map<string,typeof posts>>()
    posts.forEach(post=>{
        let lngTag=map.get(post.lng)
        if(!lngTag){
            lngTag=new Map()
            map.set(post.lng,lngTag)
        }
        post.data.tags.forEach(tag=>{
            let tagPost=lngTag.get(tag)
            if(!tagPost){
                tagPost=[]
                lngTag.set(tag,tagPost)
            }
            tagPost.push(post)
        })
    })

    return map
}