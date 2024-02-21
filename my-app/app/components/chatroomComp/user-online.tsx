import type { UsersProps } from '@/app/lib/definitions';
import React from 'react'
import Image from 'next/image';

export const dynamic = "force-dynamic";

export default function UserOnline({data}: {data: UsersProps[]}) {

    return (
        <div className='flex flex-col w-[25%] bg-blue-900'>

            {data.map((user: UsersProps) => (
                /* user.onLine ? ( */
                    <div key={user.id} 
                        className='flex items-center justify-start bg-slate-800 border-b border-slate-500 px-4 py-3'>
{/*                         <Image src={user.img} width={30} height={30} alt={user.username} 
                            className='flex w-[30px] h-[30px] object-cover rounded-full'
                        /> */}
                        <p className='w-[80%] px-2'>{user.username}</p>

                        {user.online === 1 
                            ? <span className='w-[20px] h-[20px] bg-green-500 border border-green-500 rounded-full'></span> 
                            : <span className='w-[20px] h-[20px] bg-red-600 border border-red-600 rounded-full'></span>
                        }
                    </div>
                /* ) : null */
            ))}

        </div>
    )
}
