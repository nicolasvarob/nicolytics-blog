// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import Database from "better-sqlite3";

import auth from "auth-astro";

const sqliteIntegration = () => ({
  name: "sqlite-integration",
  hooks: {
    "astro:build:start": async () => {
      const db = new Database("src/data/blog.db");

      const query = `
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

      db.exec(query);

      // Run your queries and store results somewhere
      //const data = db.prepare('SELECT * FROM your_table').all();

      // Write to a JSON file that your app can import
      //const fs = require('fs');
      //fs.writeFileSync('./src/data/db-content.json', JSON.stringify(data));

      db.close();
    },
  },
});

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), sqliteIntegration(), auth()],
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: node({
    mode: "standalone",
  }),
});