import { defineConfig } from 'auth-astro';
import Credentials from '@auth/core/providers/credentials'
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";

export default defineConfig({
  providers: [
    Credentials({
        authorize: async({email,password}) => {
            const db = new Database("src/data/blog.db");

            const res = db.prepare(' * FROM users WHERE email = ? AND password = ?').get(email,password);

            db.close;
            if(!res){
              throw new Error('Autenticación invalida :(')
            }
            if(!bcrypt.compareSync("1236456",res.password)){
              throw new Error('Autenticación invalida :(');

            }

            return {
                id: res.id,
                name: res.name
            }      
        }
    })
  ],
});