"use client";

import type { EmailProps, UsersProps } from '@/app/lib/definitions';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { IoIosMail } from "react-icons/io";
import { IoIosMailOpen } from "react-icons/io";

export default function EmailBox({dataUsers, emailResponse}: {dataUsers: UsersProps[], emailResponse: EmailProps[]}) {

    const { data: session } = useSession();

    const [userName, setUserName] = useState<string>("");
    const [newEmailList, setNewEmailList] = useState<EmailProps[]>(emailResponse);

    useEffect(() => {
        if (session && session.user && session.user.name) {
            setUserName(session.user.name)
        }
        return () => console.log("clean-up (e-b)");
    }, [session]);

    const findUser: UsersProps | undefined = dataUsers.find((usr: UsersProps) => usr.username === userName);
    const findMsg: EmailProps | undefined = emailResponse.find((msg: EmailProps) => msg.email === findUser?.email);

    const handleText = (id: number): void | null => {
        const findTextById: EmailProps | undefined = newEmailList.find((email: EmailProps) => email.id === id);
        if (findTextById?.bool_text === 0) {
            const mapBoolTextNeg: EmailProps[] = newEmailList.map((email: EmailProps) => email.id === findTextById.id 
                ? {...email, bool_text: 1} : email);
            setNewEmailList(mapBoolTextNeg);
        } else if (findTextById?.bool_text === 1) {
            const mapBoolTextPos: EmailProps[] = newEmailList.map((email: EmailProps) => email.id === findTextById.id 
                ? {...email, bool_text: 0} : email);
            setNewEmailList(mapBoolTextPos);
        }
        return null;
    };

    return (
        <div className='md:w-[440px] xl:w-[600px] h-auto bg-gradient-to-r from-blue-900 from-10% 
            via-sky-700 via-50% to-blue-900 to-90% pt-2 pb-5 rounded-xl'>

            <h1 className='text-xl text-center py-2'>MailBox</h1>

            {dataUsers.map((user: UsersProps) => (
                user.username === userName ? (
                    <div key={user.id}>
                        <p className='w-full text-slate-100 px-10'>Email box: <span className='text-cyan-400'>{user.email}</span></p>
                    </div>
                    
                ) : null
            ))}

            <div className='md:text-sm px-8 pt-2'>

                <div className='flex items-center justify-between'>
                    <p className="text-cyan-400 px-2 py-1">Sender</p>
                    <p className="text-cyan-400 px-2 py-1">Mail</p>
                </div>
                {newEmailList.map((emailRes: EmailProps) => (
                    (emailRes.sender !== userName) && (emailRes.email === findMsg?.email) ? (
                    <div key={emailRes.id} className='flex items-center justify-between bg-blue-900 border-b 
                        border-cyan-600 py-2'
                    >
                        <p className="px-2 py-1">{emailRes.sender}</p>
                        
                        {emailRes.bool_text === 0 ? (
                            <button type="button" onClick={() => handleText(emailRes.id)} className='px-2'>
                                <IoIosMail size={24} />
                           </button>
                            ) : (
                            <div className='flex items-center justify-between w-full text-slate-800 bg-slate-200 pl-2 rounded'>
                                <p>
                                    Message: {emailRes.textarea}
                                </p>
                                <form /* action={} */ className='absolute flex justify-end w-[24%]'>
                                    <button type="submit" id="submit" name="submit" value="btnDeleteMsg"
                                        /* disabled={pending} */
                                        className='flex items-center justify-center text-sm text-red-600 border border-red-600 
                                        px-2 rounded'
                                    >
                                        x
                                    </button>
                                </form>
                                <button type="button" onClick={() => handleText(emailRes.id)} 
                                    className='px-2'
                                >
                                    <IoIosMailOpen size={24}/>
                                </button>            
                            </div>
                        )}
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
