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
export const createPost = defineAction({
  input: z.object({
    content_id: z.string(),
    title: z.string().min(6),
    main_category:z.string().min(3),
    tags:z.string(),
    abstract: z.string(),
    content: z.string(),
    created_at:z.string(),
    published_at:z.string(),
    updated_at:z.string(),
  }),
  handler: async ({ content_id, title, main_category, tags, abstract, content,created_at, published_at, updated_at }) => {
    const db = new Database("../src/data/blog.db");

    console.log('create post action')
    
    const insertData = db
    .prepare(`INSERT INTO posts (id,content_id,title,main_category,tags,abstract,content,created_at, published_at,updated_at) 
        VALUES (?,?,?,?,?,?,?,?,?)`);
      
    insertData.run(uuidv4(),content_id,title,main_category,tags,abstract,content,created_at,published_at,updated_at);
    db.close();
    
    return { ok: true };
  },
});

export const updatePost = defineAction({
  input: z.object({
    title: z.string().min(6),
    main_category:z.string().min(3),
    tags:z.string(),
    abstract: z.string(),
    content: z.string(),
    published_at:z.string(),
    updated_at:z.string(),
  }),
  handler: async ({  title,main_category,tags,abstract,content,published_at,updated_at }) => {
    const db = new Database("../src/data/blog.db");

    console.log('update post action')
    
    const insertData = db
    .prepare(` posts (title,main_category,tags,abstract,content,published_at,updated_at) 
        VALUES (?,?,?,?,?,?,?,?,?)`);
      
    insertData.run(title,main_category,tags,abstract,content,published_at,updated_at);
    db.close();
    
    return { ok: true };
  },
});