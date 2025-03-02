import { z,defineCollection } from "astro:content";

console.log(import.meta.env)

const blog_posts = defineCollection({
    loader: async () => {
        const response = await fetch(`${import.meta.env.PUBLIC_PB_HOST}/api/collections/posts/records`);
        const data = await response.json();
        return data.items.map((post:any)=> ({
                id: post.id,
                content_id: post.content_id,
                abstract: post.abstract,
                published_at: post.published_at,
                title:post.title,
                content: post.content,
                main_category: post.main_category     
        }))

      
    }
});


export const collections = { blog_posts };