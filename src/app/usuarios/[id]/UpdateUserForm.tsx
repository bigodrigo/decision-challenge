"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, Button, Container, TextField, FormControl, InputLabel, Input, InputAdornment, IconButton } from '@mui/material';
import { Form, Field } from 'react-final-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { updateUser } from '@/server/actions';

export default function UpdateUserForm({ user }) {
    const router = useRouter();
    const [alert, setAlert] = useState({ severity: '', message: '', open: false });

    const onSubmit = async (values) => {
        // Rota Clássica
        // const response = await fetch(`/api/updateUser`, {
        //     method: 'POST',
        //     body: JSON.stringify({ ...values, id: user.id }),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // });

        const formData = new FormData();
        formData.append('id', user.id.toString()); // Adiciona o ID ao formData
        formData.append('nome', values.nome);
        formData.append('senha', values.senha);
        formData.append('dataNascimento', values.dataNascimento);
        formData.append('nomeMae', values.nomeMae);

        try {
            const result = await updateUser(formData);

            if (result) {
                setAlert({ severity: 'success', message: 'Usuário atualizado com sucesso!', open: true });
                setTimeout(() => {
                    router.push(`/usuarios/${result}`);
                }, 2500);
            } else {
                setAlert({ severity: 'error', message: `Erro ao atualizar usuário (sem tratamento)`, open: true });
            }
        } catch (error) {
            setAlert({ severity: 'error', message: `Erro ao atualizar usuário (catch)`, open: true });
        }
    };

    return (
        <Container className="flex flex-col items-center justify-center min-w-[300px]">
            <Form
                onSubmit={onSubmit}
                initialValues={{
                    nome: user.nome,
                    senha: user.senha,
                    dataNascimento: user.dataNascimento.toISOString().split('T')[0],
                    nomeMae: user.nomeMae,
                }}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 min-w-[300px]">
                        <Field name="nome">
                            {({ input, meta }) => (
                                <TextField
                                    {...input}
                                    label="Nome"
                                    variant="standard"
                                    error={meta.touched && meta.error}
                                    helperText={meta.touched && meta.error}
                                    fullWidth
                                    style={{ minWidth: '300px' }}
                                />
                            )}
                        </Field>
                        <Field name="senha">
                            {({ input, meta }) => (
                                <FormControl variant="standard" fullWidth style={{ minWidth: '300px' }}>
                                    <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
                                    <Input
                                        {...input}
                                        id="standard-adornment-password"
                                        type='password'
                                        disabled
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                >
                                                    <VisibilityOff />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {meta.touched && meta.error && <span className='text-sec'>{meta.error}</span>}
                                </FormControl>
                            )}
                        </Field>
                        <Field name="dataNascimento">
                            {({ input, meta }) => (
                                <FormControl variant="standard" fullWidth style={{ minWidth: '300px' }} error={meta.touched && meta.error}>
                                    <InputLabel htmlFor="standard-date" shrink>Data de Nascimento</InputLabel>
                                    <Input
                                        {...input}
                                        id="standard-date"
                                        type="date"
                                    />
                                    {meta.touched && meta.error && <span className='text-sec'>{meta.error}</span>}
                                </FormControl>
                            )}
                        </Field>
                        <Field name="nomeMae">
                            {({ input, meta }) => (
                                <TextField
                                    {...input}
                                    label="Nome da Mãe"
                                    variant="standard"
                                    error={meta.touched && meta.error}
                                    helperText={meta.touched && meta.error}
                                    fullWidth
                                    style={{ minWidth: '300px' }}
                                />
                            )}
                        </Field>
                        <Button variant="contained" className="bg-pri w-full" type="submit">
                            Atualizar Usuário
                        </Button>
                        {alert.open && <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>{alert.message}</Alert>}
                    </form>
                )}
            />
        </Container>
    );
}
