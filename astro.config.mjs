// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import Database from "better-sqlite3";
import auth from 'auth-astro';
 

//import auth from "auth-astro";

const sqliteIntegration = () => ({
  name: "sqlite-integration",
  hooks: {
    "astro:build:start": async () => {
      const db = new Database("src/data/blog.db");

      const query_create_table__posts = `
        CREATE TABLE IF NOT EXISTS posts (
          id TEXT PRIMARY KEY,
          content_id TEXT,
          title TEXT,
          main_category TEXT,
          tags TEXT,
          abstract TEXT,
          content TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          published_at DATETIME,
          updated_at DATETIME
        )
        `;

      db.exec(query_create_table__posts);

      const query_create_table__users = `
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT,
        name TEXT,
        password TEXT
      )
      `;

    db.exec(query_create_table__users);

      db.close();
    },
  },
});

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), sqliteIntegration(),auth()],
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: node({
    mode: "standalone",
  }),
});