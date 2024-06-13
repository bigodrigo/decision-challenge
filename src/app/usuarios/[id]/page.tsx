import Link from 'next/link';
import prisma from '@/lib/db';

export default async function Usuario({ params }) {
    const user = await prisma.user.findUnique({
        where: {
            id: Number(params.id)
        }
    })

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white text-pri">
            <h1 className='text-lg mb-2 md:text-3xl'>{user?.nome}</h1>
            {/* <p className='text-ter'>{user?.dataNascimento}</p> */}
            <p className='text-ter'>{user?.nomeMae}</p>
        </main>
    )
}