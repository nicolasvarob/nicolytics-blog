import { z,defineCollection } from "astro:content";
import Database from "better-sqlite3";


const db_blog_posts = defineCollection({
    loader: async () => {
        const db = new Database('src/data/blog.db');
        const query = `SELECT * FROM posts`;
        const data = db.prepare(query).all();
        db.close();

        return data.map((post:any)=> ({
            id: post.id,
            content_id: post.content_id,
            abstract: post.abstract,
            published_at: post.published_at,
            updated:post.updated,
            title:post.title,
            content: post.content,
            main_category: post.main_category    
        }))
        
    }
})


export const collections = { db_blog_posts };