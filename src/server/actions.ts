"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createUser(formData: FormData) {
    // importante -> Verificar se a validação é a forma correta!
    try {
        // Simulando um erro para fins de teste
        // return new Promise((_, reject) => {
        //     setTimeout(() => reject(new Error('Erro simulado ao criar usuário')), 500);
        // });
        
        // Criação do usuário no banco de dados
        const createdUser = await prisma.user.create({
            data: {
                nome: formData.get("nome") as string,
                senha: formData.get("senha") as string,
                dataNascimento: new Date(formData.get("dataNascimento") as string),
                nomeMae: formData.get("nomeMae") as string,
            },
        });

        // Altera os usuários na lista
        revalidatePath("/usuarios");

        // console.log(createdUser)
        return createdUser.id
    } catch (error) {
        // Retorna erro
        // return { success: false, error: error.message };
    }
}