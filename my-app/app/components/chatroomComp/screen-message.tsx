"use client";

import { UsersChatProps } from '@/app/lib/definitions'
import React, { useState, useEffect } from 'react'
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

export default function ScreenMessage({dataroom}: {dataroom: UsersChatProps[]}) {

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

    return (               
        <div className='flex flex-col justify-between w-full h-[calc(100%-80px)] overflow-scroll scroll-smooth'>
            
            {dataroom.map((d: UsersChatProps) => (
                <div key={d.id} 
                    className={`${d.username === username 
                        ? "flex flex-col items-end" 
                        : "flex flex-col items-start"} w-full h-full bg-slate-200`}>

                    <div className={`w-[50%] text-slate-600 bg-slate-100 mx-4 my-4 p-2 
                        ${d.username === username 
                            ? "rounded-tl-lg" 
                            : "rounded-br-lg"} rounded-tr-lg rounded-bl-lg shadow-btn`}>
                        
                        <p className='text-lg text-slate-800 mb-2'>{d.message}</p>

                        <div className='flex items-center justify-between text-sm text-slate-500'>
                            <p>{d.username}</p>
                            <p>{d.date.toLocaleString()}</p>
                        </div>

                    </div>

                </div>
            ))}
        </div>
    )
};
