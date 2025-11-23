import * as yup from "yup";

const updateTask = yup.object({
    description: yup
        .string()
        .trim()
        .matches(/[A-Za-z]/, "Precisa conter ao menos uma letra")
        .notRequired(),

    completed: yup
        .boolean()
        .notRequired(),
});

export default updateTask;
