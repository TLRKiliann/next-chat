import React from 'react'
import Image from 'next/image';

export default function UserOnline() {
    
    return (
        <div className='flex flex-col w-[25%] bg-blue-900'>

            {users.map((user: UsersProps) => (
                user.onLine ? (
                    <div key={user.id} 
                        className='flex items-center justify-start bg-slate-800 border-b border-slate-500 px-4 py-3'>
                        <Image src={user.img} width={30} height={30} alt={user.username} 
                            className='flex w-[30px] h-[30px] object-cover rounded-full'
                        />
                        <p className='w-[80%] px-2'>{user.username}</p>
                        {/* <p className='w-[50px] border'>{user.email}</p> */}
                        {user.onLine === true 
                            ? <span className='w-[20px] h-[20px] bg-green-400 border border-green-400 rounded-full'></span> 
                            : <p>not ok</p>
                        }
                    </div>
                ) : null
            ))}

        </div>
    )
}
