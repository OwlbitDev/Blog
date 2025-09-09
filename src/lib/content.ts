import { getCollection } from 'astro:content';

export const getPosts = async () => {
    const posts = await getCollection('blog');
    const formatPosts= posts.filter(post=>post.data.draft !== true)
    formatPosts.sort((a, b) => b.data.date -a.data.date)
    return formatPosts
};