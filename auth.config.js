import { defineConfig } from 'auth-astro';
import Credentials from '@auth/core/providers/credentials'
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";



export default defineConfig({
  providers: [
    Credentials({
      credentials: {
        email: {  },
        password: {  },
      },
        authorize: async({email,password}) => {
            const db = new Database("src/data/blog.db");



            const res =  db.prepare('SELECT * FROM users WHERE email = ?').get(email);

            db.close();
            if(!res){
              throw new Error('Autenticación invalida :(')
            }
            if(!bcrypt.compareSync(password, res.password)){
              throw new Error('Autenticación invalida :(');

            }

            return {
                id: res.id,
                name: res.name,
                email: res.email
            }      
        }
    })
  ],
});