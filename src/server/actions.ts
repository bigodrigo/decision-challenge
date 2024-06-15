"use server"

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UserFormValues } from "@/lib/interfaces";

export async function createUser(formData: FormData) {
    // importante -> Verificar se a validação é a forma correta!
    try {
        // Simulando um erro para fins de teste
        // return new Promise((_, reject) => {
        //     setTimeout(() => reject(new Error('Erro simulado ao criar usuário')), 500);
        // });
        
        // Criação do usuário no banco de dados
        const data: UserFormValues = {
            nome: formData.get("nome") as string,
            senha: formData.get("senha") as string,
            dataNascimento: new Date(formData.get("dataNascimento") as string),
            nomeMae: formData.get("nomeMae") as string,
        };

        const createdUser = await prisma.user.create({
            data,
        });

        //atualiza a lista de usuários
        revalidatePath("/usuarios");

        return createdUser.id;
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw new Error('Erro ao criar usuário');
    }
}

export async function updateUser(formData: FormData) {
    try {
        const id = Number(formData.get('id'));
        console.log("Atualizando usuário com ID:", id);

        const data: UserFormValues = {
            nome: formData.get("nome") as string,
            senha: formData.get("senha") as string,
            dataNascimento: new Date(formData.get("dataNascimento") as string),
            nomeMae: formData.get("nomeMae") as string,
        };

        const updatedUser = await prisma.user.update({
            where: { id: id },
            data,
        });

        revalidatePath(`/usuarios/${updatedUser.id}`);

        return updatedUser.id;
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        throw new Error('Erro ao atualizar usuário');
    }
}

export async function deleteUser(id: number) {
    try {
        console.log("Deletando:", id);

        const deletedUser = await prisma.user.delete({
            where: { id: id },
        });

        revalidatePath('/usuarios');

        return deletedUser.id;
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        throw new Error('Erro ao deletar usuário');
    }
}