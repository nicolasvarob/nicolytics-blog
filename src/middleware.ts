import { defineMiddleware } from "astro:middleware"
import { getSession } from "auth-astro/server";

export const onRequest = defineMiddleware(
    async ({ url, locals, redirect, request }, next) => {
      console.log('middleware called')
      
      const session = await getSession(request)

      
      const isLoggedIn = !!session;

      console.log("Is logged in ? " + isLoggedIn)
      console.log(url.pathname)

      locals.isLoggedIn = isLoggedIn;
      locals.user = {
        name: session?.user.name ?? '',
        email: session?.user.email ?? '',
      }


      if(
        !isLoggedIn 
        && url.pathname.startsWith('/editor')){
          console.log('redirect to login')
        return redirect('/login')
      } 
      else if (
        isLoggedIn 
        && (url.pathname == "/login"||url.pathname == "/editor" ) ){
          console.log('redirect to list posts')
        return redirect('/editor/list-posts')
      }
  
  
 
  

  
      return next();
    }
  );