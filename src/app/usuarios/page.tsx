import Link from 'next/link';
import prisma from '@/lib/db';

export default async function Usuarios() {
    const user = await prisma.user.findMany()

    return (
        <main className="flex flex-col items-center justify-start py-4 px-4 text-pri">
            <h1 className='text-xl mb-2 md:text-3xl text-pri font-semibold'>Usuários</h1>
            <ul className='border-t border-b border-black p-4 md:grid md:grid-cols-4 gap-4 overflow-auto md:max-h-96 lg:max-h-[450px]'>
                {user.map((user) => (
                    <Link href={`usuarios/${user.id}`} key={user.id} >
                        <li className='flex items-center justify-center px-5 my-2 rounded-lg  bg-sec hover:scale-110 hover:animate-pulse'>
                                <p className='text-white text-center text-sm md:text-base content-center py-1 md:h-12'>{user.nome}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </main>
    )
}