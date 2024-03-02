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
    }, [session]);

    const findUser: UsersProps | undefined = dataUsers.find((usr: UsersProps) => usr.username === userName);

    const findMsg: EmailProps | undefined = emailResponse.find((msg: EmailProps) => msg.email === findUser?.email);

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

            <div className='md:text-sm px-10 pt-2'>
                {emailResponse.map((emailRes: EmailProps) => (
                    (emailRes.sender !== userName) && (emailRes.email === findMsg?.email) ? (
                    <div key={emailRes.id} className='flex justify-between py-2 border'>
                        <p className="px-2 py-1">Sender: {emailRes.sender}</p>
                        <p className="px-2 py-1">Txt: {emailRes.textarea}</p>
                    </div>
                    ) : (
                        null
                    )
                ))}
            </div>

            <div>
                {!findMsg?.email ? (
                    <p className='text-orange-400 px-10'>No message received...</p>
                ) : null}
            </div>


        </div>
    )
}
