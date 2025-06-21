import * as Yup from "yup";

const AddBlogValidation = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().nullable(),
    content: Yup.string().required("Content is required"),
    tags: Yup.string().nullable(),
    status: Yup.string()
        .oneOf(["New", "Published", "Draft"], "Invalid status")
        .required("Status is required"),
});

export default AddBlogValidation;
