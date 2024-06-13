"use client"
import React from 'react';
import { Form, Field } from 'react-final-form';
import * as yup from 'yup';
import { Button, Container, TextField } from '@mui/material';
import { createUser } from '@/server/actions';

// Schema de validação com Yup
const validationSchema = yup.object().shape({
  nome: yup.string().min(10, 'Nome deve ter no mínimo 10 caracteres').max(100, 'Nome deve ter no máximo 100 caracteres').required('Nome é obrigatório'),
  senha: yup.string().min(10, 'Senha deve ter no mínimo 10 caracteres').max(30, 'Senha deve ter no máximo 30 caracteres').required('Senha é obrigatória'),
  dataNascimento: yup.date().max(new Date(), 'Data de nascimento não pode ser superior a hoje').required('Data de nascimento é obrigatória'),
  nomeMae: yup.string().min(10, 'Nome da mãe deve ter no mínimo 10 caracteres').max(100, 'Nome da mãe deve ter no máximo 100 caracteres').required('Nome da mãe é obrigatório'),
});

// Função de validação usando o schema do Yup
const validate = values => {
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

export default function CriarUsuario() {
  const onSubmit = async (formData) => {
    const response = await fetch('/api/criarUsuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Usuário criado com sucesso!');
    } else {
      const errorData = await response.json();
      alert(`Erro ao criar usuário: ${errorData.error}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white text-pri">
      <h1 className='text-lg mb-2 md:text-3xl'>Novo Usuário</h1>
      <Container className="flex flex-col items-center justify-center ">
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form //onSubmit={handleSubmit} 
              action={createUser}
              className="flex flex-col items-center gap-4">
              <Field name="nome">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Nome"
                    variant="outlined"
                    error={meta.touched && meta.error}
                    helperText={meta.touched && meta.error}
                    fullWidth
                  />
                )}
              </Field>
              <Field name="senha">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Senha"
                    type="password"
                    variant="outlined"
                    error={meta.touched && meta.error}
                    helperText={meta.touched && meta.error}
                    fullWidth
                  />
                )}
              </Field>
              <Field name="dataNascimento">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Data de Nascimento"
                    type="date"
                    variant="outlined"
                    error={meta.touched && meta.error}
                    helperText={meta.touched && meta.error}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                )}
              </Field>
              <Field name="nomeMae">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Nome da Mãe"
                    variant="outlined"
                    error={meta.touched && meta.error}
                    helperText={meta.touched && meta.error}
                    fullWidth
                  />
                )}
              </Field>
              <Button variant="contained" className="bg-pri w-full" type="submit">
                Criar Usuário
              </Button>
            </form>
          )}
        />
      </Container>
    </main>
  );
}
