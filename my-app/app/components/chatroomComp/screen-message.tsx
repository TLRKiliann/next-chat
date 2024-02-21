"use client";

import { UsersChatProps } from '@/app/lib/definitions'
import React, { useState, useEffect } from 'react'
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

type SessionProps = {
    user?: {
        name: string;
    }
}

export default function ScreenMessage({data}: {data: UsersChatProps[]}) {

    const {data: session} = useSession();

    if (!session) {
        redirect("/login")
    };

    const [username, setUsername] = useState<string>("");

    useEffect(() => {
/*         const session: SessionProps = {
            user: {
                name: 'ko@l@tr33'
            }
        }; */
        if (session && session.user && session.user.name) {
            setUsername(session.user.name);
        }
        return () => console.log("Clean-up useEffect !");
    }, []);

    return (               
        <div className='flex flex-col justify-between w-full h-[calc(100%-80px)]'>
            
            {data.map((d: UsersChatProps) => (

                <div key={d.id} className={`${d.username === username ? "flex flex-col items-end" : "flex flex-col items-start"} 
                    "w-full h-full overflow-scroll scroll-smooth bg-slate-50"`}>

                    <div className='w-[50%] text-slate-600 bg-slate-200 mx-4 my-4 p-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg'>
                        
                        <p className='text-lg text-slate-800 mb-2'>{d.message}</p>

                        <div className='flex items-center justify-between text-sm text-slate-500'>
                            <p>{d.username}</p>
                            <p>{d.id}</p>
                        </div>

                    </div>

                </div>
            ))}
        </div>
    )
};
