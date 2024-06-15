import prisma from '@/lib/db';
import { User } from '@/lib/interfaces';
import { redirect } from 'next/navigation';
import UpdateUserForm from './UpdateUserForm';

interface Params {
  params: {
    id: string;
  };
}

export default async function Usuario({ params }: Params) {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!user) {
    return redirect('/usuarios'); // Redirecionar se o usuário não for encontrado
  }

  return (
    <main className="flex flex-col items-center justify-start py-4 px-4">
      <h1 className='text-lg mb-2 md:text-3xl text-sec'>Edição do Usuário</h1>
      <UpdateUserForm user={user as User} />
    </main>
  );
}
