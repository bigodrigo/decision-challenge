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
        return createdUser.id;
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw new Error('Erro ao criar usuário');
    }
}

export async function updateUser(formData: FormData) {
    try {
        const id = Number(formData.get('id')); // Obtendo e convertendo o ID para número
        console.log("Atualizando usuário com ID:", id); // Adicione este log para depuração

        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
                nome: formData.get("nome") as string,
                senha: formData.get("senha") as string,
                dataNascimento: new Date(formData.get("dataNascimento") as string),
                nomeMae: formData.get("nomeMae") as string,
            },
        });

        revalidatePath(`/usuarios/${updatedUser.id}`);

        return updatedUser.id;
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        throw new Error('Erro ao atualizar usuário');
    }
}