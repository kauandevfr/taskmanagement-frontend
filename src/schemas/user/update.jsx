import * as yup from 'yup';

export const updateUser = yup
    .object({
        name: yup
            .string()
            .trim()
            .min(3, 'O nome precisa ter no mínimo 3 caracteres')
            .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'O nome deve conter apenas letras e espaços')
            .notRequired(),

        email: yup
            .string()
            .trim()
            .email('Informe um e-mail válido')
            .notRequired(),

        currentPassword: yup.string().notRequired(),

        newPassword: yup
            .string()
            .transform((v) => (v === '' ? undefined : v))
            .notRequired()
            .min(8, 'A nova senha deve ter no mínimo 8 caracteres')
            .matches(/[A-Z]/, 'A nova senha deve conter ao menos 1 letra maiúscula')
            .matches(/[a-z]/, 'A nova senha deve conter ao menos 1 letra minúscula')
            .matches(/\d/, 'A nova senha deve conter ao menos 1 número')
            .matches(/[^\w\s]/, 'A nova senha deve conter ao menos 1 caractere especial')
            .matches(/^\S+$/, 'A nova senha não pode conter espaços'),
    })
