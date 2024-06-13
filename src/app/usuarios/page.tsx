import Link from 'next/link';
import prisma from '@/lib/db';

export default async function Usuarios() {
    const user = await prisma.user.findMany()

    return (
        <main className="flex flex-col items-center justify-start py-4 px-4 text-pri">
            <h1 className='text-lg mb-2 md:text-3xl'>Usuários</h1>
            <ul className='border-t border-b border-black py-4'>
                {user.map((user) => (
                    <li key={user.id} className='flex items-center justify-between px-5'>
                        <Link href={`usuarios/${user.id}`}>
                            <p className='text-pri'>{user.nome}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}