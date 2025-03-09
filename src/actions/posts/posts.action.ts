import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { v4 as uuidv4 } from 'uuid';
import Database from "better-sqlite3";

/*CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content_id TEXT,
  title TEXT,
  main_category TEXT,
  tags TEXT,
  abstract TEXT,
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  published_at DATETIME,
  updated_at DATETIME
)*/
const zDefinePost = z.object({
  post_id: z.string(),
  content_id: z.string(),
  title: z.string().min(6),
  main_category:z.string().min(3),
  tags:z.string(),
  abstract: z.string(),
  content: z.string(),
  created_at:z.string(),
  published_at:z.string(),
  updated_at:z.string(),
})


export const savePost = defineAction({
  input: zDefinePost,
  handler: async ({ post_id,content_id, title, main_category, tags, abstract, content,created_at, published_at, updated_at }) => {
    const db = new Database("../src/data/blog.db");

    if(post_id){
      const queryCheckPost = `SELECT post_id FROM posts WHERE post_id = ? `;
      const postExists = db.prepare(queryCheckPost).get(post_id);
      if(postExists){
        const updatePost = db
        .prepare(`UPDATE posts set(title,main_category,tags,abstract,content,published_at,updated_at) 
            VALUES (?,?,?,?,?,?,?,?,?)`);
          
            updatePost.run(title,main_category,tags,abstract,content,published_at,updated_at);
      } else {
        const insertData = db
    .prepare(`INSERT INTO posts (id,content_id,title,main_category,tags,abstract,content,created_at, published_at,updated_at) 
        VALUES (?,?,?,?,?,?,?,?,?)`);
    insertData.run(uuidv4(),content_id,title,main_category,tags,abstract,content,created_at,published_at,updated_at);
      
      }
      db.close();

    }

    console.log('create post action')
    
    const insertData = db
    .prepare(`INSERT INTO posts (id,content_id,title,main_category,tags,abstract,content,created_at, published_at,updated_at) 
        VALUES (?,?,?,?,?,?,?,?,?)`);
      
    insertData.run(uuidv4(),content_id,title,main_category,tags,abstract,content,created_at,published_at,updated_at);
    db.close();
    
    return { ok: true };
  },
});

export const testAction = defineAction({

  handler: async ({}) => {
    console.log('test this action')

    return { ok: true };
  },
});