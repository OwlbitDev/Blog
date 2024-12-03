import { getCollection } from 'astro:content';

export const getPosts = async () => {
    const posts = await getCollection('posts');
    return posts.map(post => {
        let lng = 'zh'
        let id = post.id
        if (post.id.includes('indexen')) {
            lng = 'en'
            const index = post.id.lastIndexOf('/')
            id = post.id.substring(0, index)
        }
        return {
            ...post,
            id: id,
            lng
        }
    }
    )
};