import { z,defineCollection } from "astro:content";

const blog_posts = defineCollection({
    loader: async () => {
        const response = await fetch("http://127.0.0.1:8090/api/collections/posts/records");
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