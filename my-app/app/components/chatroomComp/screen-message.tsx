"use client";

import type { UsersChatProps } from '@/app/lib/definitions'
import React, { useState, useEffect, useRef } from 'react'
import { useSession } from "next-auth/react";
import { redirect, usePathname } from 'next/navigation';

export default function ScreenMessage({dataroom}: {dataroom: UsersChatProps[]}) {

    console.info(dataroom, "+++ dataroom +++");

    const {data: session} = useSession();
    const pathname = usePathname();

    const [username, setUsername] = useState<string>("");
    const [customPathname, setCustomPathname] = useState<string>("");
    
    const msgRef = useRef<HTMLDivElement>(null);

    const updateMsg: string[] = dataroom.map((msg: UsersChatProps) => msg.message);

    useEffect(() => {
        switch(pathname) {
            case "/chatroom/question":
                setCustomPathname("/question");
                break;
            case "/chatroom/info":
                setCustomPathname("/info");
                break;
            case "/chatroom/confidential":
                setCustomPathname("/confidential");
                break;
            case "/chatroom":
                setCustomPathname("/chatroom");
                break;
            default:
                console.log("end of loop (s-m)");
        };
        return () => console.log("Clean-up pathname (sm) !")
    }, []);

    useEffect(() => {
        if (session && session.user && session.user.name) {
            setUsername(session.user.name);
        }
        return () => console.log("Clean-up session (sm) !");
    }, [session]);

    useEffect(() => {
        msgRef.current?.scrollIntoView();
        return () => console.log("Clean-up update msg (sm) !")
    }, [updateMsg])

    if (!session) {
        redirect("/login")
    };

    return (               
        <div className='flex flex-col items-center justify-start w-full h-[calc(100%-80px)] overflow-scroll 
            scroll-smooth'>
            {dataroom.map((d: UsersChatProps) => (
                d.room === customPathname ? (
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
