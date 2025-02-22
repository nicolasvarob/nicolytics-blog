import { defineMiddleware } from "astro:middleware";
import PocketBase from "pocketbase"

/*export const onRequest = defineMiddleware(async (context,next)=> {

    const pb = new PocketBase('http://127.0.0.1:8090');
    
    
    

    console.log('middleware called')
    console.log('middleware locals')
    console.log(console.log(context.locals.pb.authStore.model))
    console.log('isValid')
    console.log(pb.authStore.isValid)
   
    if(context.url.pathname.includes('/editor')) {
        if(!pb.authStore.isValid) return Response.redirect(new URL('/login', context.url));
    } 
    else if(context.url.pathname.includes('/login')) {
        if(pb.authStore.isValid) return Response.redirect(new URL('/editor/create-post', context.url));
    }
    return next();
})*/