import { getPosts } from "./content";
export async function getTags() {
    const posts=await getPosts()
    const map=new Map<string,typeof posts>()
    posts.forEach(post=>{
        post.data.tags.forEach(tag=>{
            let tagPost=map.get(tag)
            if(!tagPost){
                tagPost=[]
                map.set(tag,tagPost)
            }
            tagPost.push(post)
        })
    })
    return map
}