"use client";

import type { EmailProps, UsersProps } from '@/app/lib/definitions'
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'

export default function EmailBox({dataUsers, emailResponse}: {dataUsers: UsersProps[], emailResponse: EmailProps[]}) {

    const { data: session } = useSession();

    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        if (session && session.user && session.user.name) {
            setUserName(session.user.name)
        }
        return () => console.log("clean-up (e-b)");
    }, []);

    const verifyMailBox = emailResponse.filter((emailItem: EmailProps) => emailItem.sender !== userName);
    console.log(verifyMailBox);

    return (
        <div className='w-[440px] h-auto bg-gradient-to-r from-blue-900 from-10% 
            via-sky-700 via-50% to-blue-900 to-90% pt-2 pb-5 rounded-xl'>

            <h1 className='text-xl text-center py-2'>MailBox</h1>
            
            {dataUsers.map((item: UsersProps) => (
                item.username === userName ? (
                    <div key={item.id}>
                        <p className='w-full text-cyan-400 px-10'>Email box: {item.email}</p>
                    </div>
                    
                ) : null
            ))}

            <div className='px-10 pt-2'>
                {emailResponse.map((emailRes: EmailProps) => (
                    emailRes.sender !== userName ? (
                    <div key={emailRes.id} className='flex justify-between py-2 border'>
                        <p>{emailRes.email}</p>
                        <p>{emailRes.sender}</p>
                        <p>{emailRes.textarea}</p>
                    </div>
                    ) : null
                ))}
            </div>

            <div>
                {verifyMailBox ? (
                    <p className='text-orange-400 px-10'>No message received...</p>
                    ) : null
                }
            </div>

        </div>
    )
}
