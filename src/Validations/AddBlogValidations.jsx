import * as Yup from "yup";

const AddBlogValidation = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string(),
  content: Yup.string().required("Content is required"),
//   tags: Yup.string().max(100, "Tags should be less than 100 characters"),
//   coverImage: Yup.string().nullable(), // optional
//   status: Yup.string()
//     .oneOf(["New", "Published", "Draft"], "Invalid status")
//     .required("Status is required"),
});

export default AddBlogValidation;
