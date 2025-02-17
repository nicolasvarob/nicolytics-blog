import { defineMiddleware } from "astro:middleware";
import PocketBase from "pocketbase"

export const onRequest = defineMiddleware((context,next)=> {
    console.log('middleware !')
    if(context.url.pathname === '/') console.log(' es el home')
    return next();
})