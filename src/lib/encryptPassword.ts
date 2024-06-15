import bcrypt from 'bcryptjs';

const saltRounds = 10; 

// Função para criar um hash de senha
export const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

// Função para comparar uma senha com seu hash -> Fora do escopo
export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};
