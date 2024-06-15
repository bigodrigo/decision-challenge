import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/encryptPassword'; 

const prisma = new PrismaClient();

async function main() {
  // Dados dos 5 usuários aleatórios
  const usersData = [
    {
      nome: 'Usuário 1',
      senha: await hashPassword('senha123'),
      dataNascimento: new Date('1990-01-01').toISOString(),
      nomeMae: 'Mãe 1',
    },
    {
      nome: 'Usuário 2',
      senha: await hashPassword('senha456'),
      dataNascimento: new Date('1992-05-15').toISOString(),
      nomeMae: 'Mãe 2',
    },
    {
      nome: 'Usuário 3',
      senha: await hashPassword('senha789'),
      dataNascimento: new Date('1995-09-20').toISOString(),
      nomeMae: 'Mãe 3',
    },
    {
      nome: 'Usuário 4',
      senha: await hashPassword('senhaabc'),
      dataNascimento: new Date('1988-07-10').toISOString(),
      nomeMae: 'Mãe 4',
    },
    {
      nome: 'Usuário 5',
      senha: await hashPassword('senhaxyz'),
      dataNascimento: new Date('1987-03-25').toISOString(),
      nomeMae: 'Mãe 5',
    },
  ];

  // Criação dos usuários no banco de dados
  for (const userData of usersData) {
    await prisma.user.create({
      data: userData,
    });
  }

  console.log('Dados de seed inseridos com sucesso.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
