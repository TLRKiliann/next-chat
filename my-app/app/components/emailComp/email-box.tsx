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

    const verifyMailBox = emailResponse.find((emailItem: EmailProps) => emailItem.sender === userName);
    console.log(verifyMailBox?.sender, "verifyMailBox");

    return (
        <div className='w-[440px] h-auto bg-gradient-to-r from-blue-900 from-10% 
        via-sky-700 via-50% to-blue-900 to-90% m-auto mt-28 rounded-xl'>

            <h1 className='text-xl text-center py-2'>MailBox</h1>
            
            {dataUsers.map((item: UsersProps) => (
                userName === item.username ? (
                    <div key={item.id}>
                        <p className='w-full px-10'>Email box: {item.email}</p>

                    </div>
                    
                ) : null
            ))}

            <div className='px-10 py-5'>
                {emailResponse.map((emailRes: EmailProps) => (
                    userName !== emailRes.sender ? (
                    <div key={emailRes.id} className='flex justify-between py-2 border'>
                        <p>{emailRes.email}</p>
                        <p>{emailRes.sender}</p>
                        <p>{emailRes.textarea}</p>
                    </div>
                    ) : (
                        <p>EmailBox is empty</p>
                    )
                ))}
            </div>

            <div>
                {verifyMailBox.sender ? (
                        <p>EmailBox is empty</p>
                    ) : null
                }
            </div>

        </div>
    )
}
