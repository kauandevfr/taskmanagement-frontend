import * as yup from 'yup';

export const addUser = yup.object({
    name: yup
        .string()
        .trim()
        .min(3, 'O nome precisa ter no mínimo 3 caracteres')
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'O nome deve conter apenas letras e espaços')
        .required('Nome obrigatório'),

    email: yup
        .string()
        .trim()
        .email('Informe um e-mail válido')
        .required('Email obrigatório'),

    password: yup
        .string()
        .required('Senha obrigatória')
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
        .matches(/[A-Z]/, 'A senha deve conter ao menos 1 letra maiúscula')
        .matches(/[a-z]/, 'A senha deve conter ao menos 1 letra minúscula')
        .matches(/\d/, 'A senha deve conter ao menos 1 número')
        .matches(/[^\w\s]/, 'A senha deve conter ao menos 1 caractere especial')
        .matches(/^\S+$/, 'A senha não pode conter espaços'),
});
