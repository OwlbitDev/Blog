import { getCollection } from 'astro:content';

export const getPosts = async (lng:string|undefined=undefined) => {
    const posts = await getCollection('posts');
    const formatPosts= posts.map(post => {
        let lng = 'zh'
        let id = post.id
        if (post.id.includes('indexen')) {
            lng = 'en'
            const index = post.id.lastIndexOf('/')
            id = post.id.substring(0, index)
        }
        return {
            ...post,
            id,
            lng
        }
    }
    ).filter(post=>post.data.draft !== true)
    formatPosts.sort((a, b) => b.data.publishDate -a.data.publishDate)
    if(lng){
        return formatPosts.filter(post => post.lng === lng)
    }
    return formatPosts
};