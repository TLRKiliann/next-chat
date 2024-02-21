"use client";

import { UsersChatProps } from '@/app/lib/definitions'
import React from 'react'
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

export default function ScreenMessage({data}: {data: UsersChatProps[]}) {

    //const [allMsgUser, setAllMsgUser] = useState<DataUserMsg[]>([]);

    const {data: session} = useSession();

    console.log(session?.user?.name, "username");

    if (!session) {
        redirect("/login")
    };

    return (               
        <div className='flex justify-between w-full h-[calc(100%-80px)]'>
            
            {data.map((allMsg: UsersChatProps) => ( 
                <div key={`${allMsg.id}`} className={`'flex flex-col ${allMsg.username === session?.user?.name ? "items-end" : "items-start"} justify-content 
                    w-full h-full overflow-scroll scroll-smooth bg-slate-50'`}>

                    <div className='w-[50%] text-slate-600 bg-slate-200 m-4 p-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg'>
                        
                        <p className='text-lg text-slate-800 mb-2'>{allMsg.message}</p>

                        <div className='flex items-center justify-between text-sm text-slate-500'>
                            <p>{allMsg.username}</p>
                            <p>{allMsg.id.toLocaleString()}</p>
                        </div>

                    </div>

                </div>
            ))}
        </div>
    )
};
