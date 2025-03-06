import { defineMiddleware } from "astro:middleware"
import { getSession } from "auth-astro/server";

export const onRequest = defineMiddleware(
    async ({ url, locals, redirect, request }, next) => {
      
      const session = await getSession(request)
      
      const isLoggedIn = !!session;

      locals.isLoggedIn = isLoggedIn;
      locals.user = {
        name: session?.user.name ?? '',
        email: session?.user.email ?? '',
      }


      if(
        !isLoggedIn 
        && url.pathname.startsWith('/editor')){
        return redirect('/login')
      } 
      else if (
        isLoggedIn 
        && (url.pathname == "/login"||url.pathname == "/editor" ) ){
        return redirect('/editor/list-posts')
      }
  
  
 
  

  
      return next();
    }
  );