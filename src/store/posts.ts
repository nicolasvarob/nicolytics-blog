import { atom } from 'nanostores'

export const postCurrentState= atom({
    content_id: "" ,
    title: "" ,
    main_category: "",
    tags: "",
    abstract: "",
    content:"",
    created_at: "",
    published_at:"",
    updated_at:""
});
