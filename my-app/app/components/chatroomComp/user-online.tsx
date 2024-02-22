"use client";

import type { UsersChatProps } from '@/app/lib/definitions';
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
//import Image from 'next/image';

export default function UserOnline({dataroom}: {dataroom: UsersChatProps[]}) {
    
    const {data: session} = useSession();
    
    if (!session) {
        redirect("/login")
    };
    
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        if (session && session.user && session.user.name) {
            setUsername(session.user.name);
        }
        return () => console.log("Clean-up useEffect !");
    }, []);

    //const mapping = dataroom.reduce((a, b:{id: number}) => a + b.id, 0)
    const mapping = dataroom.filter((n, i, arr) => i === arr.indexOf(n));
    console.log(mapping, "mapping");

/*     const map2 = dataroom.filter((user: UsersChatProps) => user.username  ? "ok" : "bad");
    console.log(map2); */
    return (
        <div className='flex flex-col w-[25%] bg-blue-900'>

            {dataroom.map((user: UsersChatProps) => (
                
                    <div key={user.id} 
                        className='flex items-center justify-start bg-slate-800 border-b border-slate-500 px-4 py-3'>
                        {/* <Image src={user.img} width={30} height={30} alt={user.username} 
                            className='flex w-[30px] h-[30px] object-cover rounded-full'
                        /> */}
                        <p className='w-[80%] px-2'>{user.username}</p>

                        {user.online === 1 
                            ? <span className='w-[20px] h-[20px] bg-green-500 border border-green-500 rounded-full'></span> 
                            : <span className='w-[20px] h-[20px] bg-red-600 border border-red-600 rounded-full'></span>
                        }
                    </div>

            ))}

        </div>
    )
}
