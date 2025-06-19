import * as Yup from 'yup';

export const productValidationSchema = Yup.object({
    name: Yup.string()
        .required('Product name is required')
        .min(2, 'Name must be at least 2 characters'),

    category: Yup.string()
        .required('Category is required'),

    shortDescription: Yup.string()
        .required('Short description is required')
        .max(150, 'Short description cannot exceed 150 characters'),

    longDescription: Yup.string()
        .required('Long description is required')
        .min(10, 'Long description must be at least 10 characters'),

    price: Yup.number()
        .typeError('Price must be a number')
        .required('Price is required')
        .positive('Price must be a positive number'),



    status: Yup.string()
        .oneOf(['Active', 'Inactive'], 'Invalid status')
        .required('Status is required'),
});
