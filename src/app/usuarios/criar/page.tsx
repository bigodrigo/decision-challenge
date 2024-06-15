"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Alert, Button, Container, FormControl, InputLabel, Input, InputAdornment, IconButton, AlertColor } from '@mui/material';
import { Form, Field } from 'react-final-form';
import { createUser } from '@/server/actions';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { validate } from '@/lib/validationSchema';
import { UserFormValues, AlertState } from '@/lib/interfaces'; 
import { hashPassword } from '@/lib/encryptPassword';


export default function CriarUsuario() {
  const router = useRouter();
  const [alert, setAlert] = useState<AlertState>({ severity: 'success', message: '', open: false });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
  const onSubmit = async (values: UserFormValues) => {
    // Rota clássica de api/POST
    // const response = await fetch('/api/usuarios', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // });

    const hashedPassword = await hashPassword(values.senha); // Criptografa a senha

    const formData = new FormData();
    formData.append('nome', values.nome);
    formData.append('senha', hashedPassword); // Usa a senha criptografada
    formData.append('dataNascimento', new Date(values.dataNascimento).toISOString());
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
              // action={createUser} -> Utiliza as Server Actions do Next
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
              <Button variant="contained" className="bg-pri w-full hover:shadow-lg hover:bg-pri hover:shadow-pri hover:animate-pulse hover:scale-110" type="submit">
                Criar Usuário
              </Button>
              {alert.open && (
                <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
                  {alert.message}
                </Alert>
              )}
            </form>
          )}
        />
      </Container>
    </main>
  );
}
