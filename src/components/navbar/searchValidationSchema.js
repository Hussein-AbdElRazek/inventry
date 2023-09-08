import *  as Yup from 'yup';

export const searchValidationSchema = Yup.object({
    searchValue: Yup.string()
        .required("Required"),
});