// src/lib/validationSchema.ts

import * as Yup from 'yup';
import { UserFormValues } from './interfaces';

const validationSchema = Yup.object().shape({
    nome: Yup.string()
        .min(10, 'Nome deve ter pelo menos 10 caracteres')
        .max(100, 'Nome não pode ter mais de 100 caracteres')
        .required('Nome é obrigatório'),
    senha: Yup.string()
        .min(10, 'Senha deve ter pelo menos 10 caracteres')
        .max(30, 'Senha não pode ter mais de 30 caracteres')
        .required('Senha é obrigatória'),
    dataNascimento: Yup.date()
        .max(new Date(), 'Data de nascimento não pode ser no futuro')
        .required('Data de nascimento é obrigatória'),
    nomeMae: Yup.string()
        .min(10, 'Nome da mãe deve ter pelo menos 10 caracteres')
        .max(100, 'Nome da mãe não pode ter mais de 100 caracteres')
        .required('Nome da mãe é obrigatório'),
});

export const validate = async (values: UserFormValues) => {
    try {
        await validationSchema.validate(values, { abortEarly: false });
        return {};
    } catch (error) {
        const validationError = error as Yup.ValidationError; // Asserção de tipo
        return validationError.inner.reduce((errors: { [key: string]: string }, err) => {
            if (err.path) {  // Verifique se err.path não é indefinido
                errors[err.path] = err.message;
            }
            return errors;
        }, {});
    }
};
