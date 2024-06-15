"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, Button, Container, TextField, FormControl, InputLabel, Input, InputAdornment, IconButton } from '@mui/material';
import { Form, Field } from 'react-final-form';
import { VisibilityOff } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateUser, deleteUser } from '@/server/actions';
import { validate } from '@/lib/validationSchema';

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

    const deleteFunction = async (user) => {
        try {
            const result = await deleteUser(user.id);

            if (result) {
                setAlert({ severity: 'error', message: 'Usuário deletado com sucesso!', open: true });
                setTimeout(() => {
                    router.push('/usuarios/');
                }, 2500);
            } else {
                setAlert({ severity: 'error', message: `Erro ao deletar usuário (sem tratamento)`, open: true });
            }
        } catch (error) {
            setAlert({ severity: 'error', message: `Erro ao deletar usuário (catch)`, open: true });
        }
    }

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
                validate={validate}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
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
                            Atualizar Usuário
                        </Button>
                        {alert.open && <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>{alert.message}</Alert>}
                    </form>
                )}
            />
            <Button 
                variant="outlined" 
                startIcon={<DeleteIcon />}
                onClick={() => {deleteFunction(user)}} 
                className="bg-error w-full mt-4 text-white border-0 hover:border-0 hover:shadow-lg hover:bg-error hover:shadow-error hover:animate-pulse hover:scale-110"
            >
                Delete
            </Button>
        </Container>
    );
}
