<script>
  export let post;
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
</script>

<a href={`/blog/${post.slug}`} class="group block">
  <article class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    {#if post.coverImage}
      <div class="aspect-w-16 aspect-h-9 overflow-hidden">
        <img 
          src={post.coverImage} 
          alt={post.title}
          class="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    {/if}
    
    <div class="p-6">
      <div class="flex items-center gap-3 text-sm text-text-light mb-3">
        <time datetime={post.date}>{formatDate(post.date)}</time>
        <span>•</span>
        <span>{post.readingTime} min read</span>
      </div>
      
      <h3 class="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
        {post.title}
      </h3>
      
      {#if post.excerpt}
        <p class="text-text-light mb-4 line-clamp-3">
          {post.excerpt}
        </p>
      {/if}
      
      <div class="flex items-center justify-between">
        <span class="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
          {post.category}
        </span>
        
        <span class="text-primary text-sm font-medium group-hover:underline">
          Read more
        </span>
      </div>
    </div>
  </article>
</a>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>