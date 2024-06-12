"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createUser(formData: FormData) {
    // importante -> Verificar se a validação é a forma correta!
    await prisma.user.create({
        data: {
            nome: formData.get("nome") as string,
            senha: formData.get("senha") as string,
            dataNascimento: new Date(formData.get("dataNascimento") as string),
            nomeMae: formData.get("nomeMae") as string,
        }
    })

    revalidatePath("/usuario")
}