import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  nome: yup.string().min(10, 'Nome deve ter no mínimo 10 caracteres').max(100, 'Nome deve ter no máximo 100 caracteres').required('Nome é obrigatório'),
  senha: yup.string().min(10, 'Senha deve ter no mínimo 10 caracteres').max(30, 'Senha deve ter no máximo 30 caracteres').required('Senha é obrigatória'),
  dataNascimento: yup.date().max(new Date(), 'Data de nascimento não pode ser superior a hoje').required('Data de nascimento é obrigatória'),
  nomeMae: yup.string().min(10, 'Nome da mãe deve ter no mínimo 10 caracteres').max(100, 'Nome da mãe deve ter no máximo 100 caracteres').required('Nome da mãe é obrigatório'),
});

export const validate = values => {
  try {
    validationSchema.validateSync(values, { abortEarly: false });
    return {};
  } catch (error) {
    return error.inner.reduce((errors, err) => {
      errors[err.path] = err.message;
      return errors;
    }, {});
  }
};
