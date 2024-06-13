"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Alert, Button, Container, TextField } from '@mui/material';
import { Form, Field } from 'react-final-form';
import * as yup from 'yup';
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
  const router = useRouter();
  const [alert, setAlert] = useState({ severity: '', message: '', open: false });
  
  const onSubmit = async (values) => {
    // Rota clássica de api/POST
    // const response = await fetch('/api/usuarios', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // });

    const formData = new FormData();
    formData.append('nome', values.nome);
    formData.append('senha', values.senha);
    formData.append('dataNascimento', values.dataNascimento);
    formData.append('nomeMae', values.nomeMae);

    try {
      const result = await createUser(formData);

      if (result) {
        setAlert({ severity: 'success', message: 'Usuário criado com sucesso!', open: true });
        setTimeout(() => {
          router.push(`./${result}`);
        }, 3000); // Adiciona um atraso de 3 segundos antes do redirecionamento
      } else {
        setAlert({ severity: 'error', message: `Erro ao criar usuário (sem ID)`, open: true });
      }
    } catch (error) {
      setAlert({ severity: 'error', message: `Erro ao criar usuário (catch)`, open: true });
    }
  };

  return (
    <main className="flex flex-col items-center justify-start py-4 px-4 text-pri">
      <h1 className='text-lg mb-2 md:text-3xl'>Novo Usuário</h1>
      <Container className="flex flex-col items-center justify-center ">
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} 
              // action={createUser}
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
              {alert.open && <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>{alert.message}</Alert>}
            </form>
          )}
        />
      </Container>
    </main>
  );
}
