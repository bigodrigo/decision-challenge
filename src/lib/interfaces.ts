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