"use client";

import type { UsersChatProps } from '@/app/lib/definitions'
import React, { useState, useEffect, useRef } from 'react'
import { useSession } from "next-auth/react";
import { redirect, usePathname } from 'next/navigation';
import { effectFunc } from '@/app/utils/functions';

export default function ScreenMessage({dataroom}: {dataroom: UsersChatProps[]}) {

    const {data: session} = useSession();
    const pathname = usePathname();

    const [username, setUsername] = useState<string>("");

    const msgRef = useRef<HTMLDivElement>(null);

    const updateMsg: string[] = dataroom.map((msg: UsersChatProps) => msg.message);

    const callerPathName = effectFunc({pathname});

    useEffect(() => {
        if (session && session.user && session.user.name) {
            setUsername(session.user.name);
        }
        return () => console.log("Clean-up session (s-m) 1 !");
    }, [session]);

    useEffect(() => {
        msgRef.current?.scrollIntoView();
        return () => console.log("Clean-up update msg (s-m) 2 !")
    }, [updateMsg])

    if (!session) {
        redirect("/login")
    };

    return (               
        <div className='flex flex-col items-center justify-start w-full h-[calc(100%-80px)] overflow-scroll 
            scroll-smooth'>
            {dataroom.map((d: UsersChatProps) => (
                d.room === callerPathName ? (
                <div key={d.chatid} 
                    className={`flex flex-col ${d.username === username 
                        ? "items-end"
                        : "items-start"} justify-center w-full`}>

                    <div ref={msgRef} className={`w-[50%] bg-slate-100 m-4 p-2
                        ${d.username === username 
                            ? "rounded-tl-lg" 
                            : "rounded-br-lg"} rounded-tr-lg rounded-bl-lg shadow-msg`}>
                        
                        <p className='text-lg text-slate-700 mb-2'>{d.message}</p>

                        <div className='flex items-center justify-between text-sm text-slate-500'>
                            <p>{d.username}</p>
                            <p>{d.date.toLocaleString()}</p>
                        </div>

                    </div>

                </div>
                ) : null
            ))}
        </div>
    )
};
