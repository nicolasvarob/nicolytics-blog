import { defineMiddleware } from "astro:middleware"

const nonAuthenticatedRoutes = ['/login']
/*
export const onRequest = defineMiddleware(
    ({url, locals,redirect}, next) => {
        const isLoggedIn = false;
 
    }
);*/