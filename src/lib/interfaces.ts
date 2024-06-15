export interface User {
    id: number;
    nome: string;
    senha: string;
    dataNascimento: Date;
    nomeMae: string;
}


export interface UserFormValues {
    nome: string;
    senha: string;
    dataNascimento: Date | string;
    nomeMae: string;
}

import { AlertColor } from '@mui/material';

export interface AlertState {
    severity: AlertColor;
    message: string;
    open: boolean;
}