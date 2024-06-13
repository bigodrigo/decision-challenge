"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Alert, Button, Container, FormControl, InputLabel, Input, InputAdornment, IconButton } from '@mui/material';
import { Form, Field } from 'react-final-form';
import * as yup from 'yup';
import { createUser } from '@/server/actions';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
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
        }, 2500); // Adiciona um atraso de 2,5 segundos antes do redirecionamento
      } else {
        setAlert({ severity: 'error', message: `Erro ao criar usuário (sem ID)`, open: true });
      }
    } catch (error) {
      setAlert({ severity: 'error', message: `Erro ao criar usuário (catch)`, open: true });
    }
  };

  return (
    <main className="flex flex-col items-center justify-start py-4 px-4 text-pri">
      <h1 className='text-lg mb-2 md:text-3xl text-sec'>Novo Usuário</h1>
      <Container className="flex flex-col items-center justify-center md:min-w-80">
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} 
              // action={createUser}
              className="flex flex-col items-center gap-4">
              <Field name="nome">
                {({ input, meta }) => (
                  <FormControl variant="standard" fullWidth className='md:min-w-80' error={meta.touched && meta.error}>
                    <InputLabel htmlFor='standard-name'>Nome</InputLabel>
                    <Input
                      {...input}
                      id="standard-name"
                      type='text'
                    />
                    {meta.touched && meta.error && <span className='text-error text-xs'>{meta.error}</span>}
                  </FormControl>
                )}
              </Field>
              <Field name="senha">
                {({ input, meta }) => (
                  <FormControl variant="standard" fullWidth className='md:min-w-80' error={meta.touched && meta.error}>
                    <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
                    <Input
                      {...input}
                      id="standard-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      error={meta.touched && meta.error}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {meta.touched && meta.error && <span className='text-error text-xs'>{meta.error}</span>}
                  </FormControl>
                )}
              </Field>
              <Field name="dataNascimento">
                {({ input, meta }) => (
                  <FormControl variant="standard" fullWidth className='md:min-w-80' error={meta.touched && meta.error}>
                    <InputLabel htmlFor="standard-date" shrink>Data de Nascimento</InputLabel>
                    <Input
                      {...input}
                      id="standard-date"
                      type="date"
                    />
                    {meta.touched && meta.error && <span className='text-error text-xs'>{meta.error}</span>}
                  </FormControl>
                )}
              </Field>
              <Field name="nomeMae">
                {({ input, meta }) => (
                  <FormControl variant="standard" fullWidth className='md:min-w-80' error={meta.touched && meta.error}>
                  <InputLabel htmlFor='standard-mother-name'>Nome da Mãe</InputLabel>
                  <Input
                    {...input}
                    id="standard-mother-name"
                    type='text'
                  />
                  {meta.touched && meta.error && <span className='text-error text-xs'>{meta.error}</span>}
                </FormControl>
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
