import * as yup from 'yup';

const addTask = yup.object({
    description: yup
        .string()
        .trim()
        .matches(/[A-Za-z]/, "Precisa conter ao menos uma letra")
        .required("Descrição obrigatória"),
});

export default addTask