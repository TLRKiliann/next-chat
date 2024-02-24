import type { UsersProps } from '@/app/lib/definitions'
import React from 'react'
import Image from 'next/image';

type UsersBoard = {
    newMapping: UsersProps[];
    handleDisplayLinks: (id: number) => void;
};

export default function UsersBoard({newMapping, handleDisplayLinks}: UsersBoard) {

    return (
        <>
            {newMapping.map((user: UsersProps) => (
                <div key={user.id} onClick={() => handleDisplayLinks(user.id)}
                    className='flex items-center justify-start bg-slate-800 cursor-pointer border-b border-slate-700 px-4 py-3'>
                    
                    <Image src={user.img} width={30} height={30} alt="img missing" 
                        className='flex w-[30px] h-[30px] object-cover rounded-full'
                    />
                    
                    <p className='w-[80%] text-lg pl-4'>{user.username}</p>

                    {user.online === 1 
                        ? <span className='w-[20px] h-[20px] bg-green-500 border border-green-500 rounded-full'></span> 
                        : <span className='w-[20px] h-[20px] bg-red-600 border border-red-600 rounded-full'></span>
                    } 
                </div>
            ))}
        </>
    )
}
