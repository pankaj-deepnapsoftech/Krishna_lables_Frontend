 import * as Yup from "yup"

 export const  validationSchema =  Yup.object({
     title: Yup.string().required('Title is required'),
     author: Yup.string(),
     content: Yup.string().required('Content is required'),
     coverImage: Yup.string(),
     tags: Yup.string(), 
     status: Yup.string().oneOf(['New', 'Published', 'Draft']),
 })