import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initialUsers: Prisma.UserCreateInput[] = [
    {
        nome: 'Teste Numero1',
        senha: 'teste123456', //hashedPassword
        dataNascimento: new Date,
        nomeMae: 'Maria Teste1'
    }
]

async function main() {
    console.log('Start seeding ...');

    for (const user of initialUsers) {
        const newUser = await prisma.user.create({
            data: user,
        });
        console.log(`Created user with id: ${newUser.id}`);

        console.log('Seeding finished.');
    }
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });