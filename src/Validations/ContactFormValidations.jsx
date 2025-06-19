import * as Yup from 'yup';

export const contactValidationSchema = Yup.object({
    name: Yup.string()
        .required('Name is required')
        .min(2, 'Name should be at least 2 characters'),

    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),

    phone: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),

    company: Yup.string()
        .required('Company name is required')
        .min(2, 'Company name should be at least 2 characters'),

    subject: Yup.string()
        .required('Subject is required')
        .min(5, 'Subject should be at least 5 characters'),

    message: Yup.string()
        .required('Message is required')
        .min(10, 'Message should be at least 10 characters'),
});
