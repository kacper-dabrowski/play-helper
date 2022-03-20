import * as Yup from 'yup';

export const loginSchema = Yup.object({
    login: Yup.string().max(20, 'Login musi być nie dłuzszy niz 20 znaków').required('Pole jest wymagane'),
    password: Yup.string().min(6, 'Hasło nie może być krótsze niż 6 znaków').required('Pole jest wymagane'),
});

export const solutionSchema = Yup.object({
    title: Yup.string().required('Pole jest wymagane'),
    description: Yup.string().required('Pole jest wymagane'),
    content: Yup.string().required('Pole jest wymagane'),
    isPublic: Yup.boolean(),
});

export const srqSchema = Yup.object({
    title: Yup.string().required('Pole jest wymagane'),
    description: Yup.string().required('Pole jest wymagane'),
    department: Yup.string().required('Pole jest wymagane'),
    content: Yup.string().required('Pole jest wymagane'),
});

export const signupSchema = Yup.object({
    username: Yup.string().max(20, 'Pole musi być krótsze niz 20 znaków').required('Pole jest wymagane'),
    fullName: Yup.string().required('Pole jest wymagane'),
    password: Yup.string().min(6, 'Hasło musi być dłuzsze niz 6 znakow').required('Pole jest wymagane'),
    confirmPassword: Yup.string()
        .required('Pole jest wymagane')
        .oneOf([Yup.ref('password'), null], 'Hasła muszą się zgadzać'),
});
