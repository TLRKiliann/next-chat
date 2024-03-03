import type { UsersProps } from '@/app/lib/definitions'
import React from 'react'
import Image from 'next/image';
/* import { usePathname } from 'next/navigation';
import { EffectFunc } from '@/app/lib/functions';
 */
type UsersBoard = {
    newMapping: UsersProps[];
    handleDisplayLinks: (id: number) => void;
};

export default function UsersBoard({newMapping, handleDisplayLinks}: UsersBoard) {

    //const pathname = usePathname();

    //const callerPathName = EffectFunc({pathname});

    return (
        <>
            {newMapping.map((user: UsersProps) => (
                /* (user.selectedroom === callerPathName) && (user.display === 0) ? ( */
                    <div key={user.id} onClick={() => handleDisplayLinks(user.id)}
                        className='flex items-center justify-between bg-slate-800 cursor-pointer border-b border-slate-700 px-4 py-3'>
                        
                        <Image src={user.img} width={30} height={30} alt="img missing" 
                            className='flex w-[30px] h-[30px] object-cover rounded-full'
                        />
                        
                        <p className='w-[60%] text-lg'>{user.username}</p>

                        <div className='flex w-[20px] h-[20px]'>
                        <span className={`w-full h-full ${user.online === 1 
                            ? "bg-green-500 border border-green-500" 
                            : "bg-red-600 border border-red-600"} rounded-full`}
                        >
                        </span> 
                        </div>

                    </div>
                /* ) : null */
            ))}
        </>
    )
}
