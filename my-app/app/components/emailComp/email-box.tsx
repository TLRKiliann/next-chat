"use client";

import { deleteMessage } from '@/app/lib/actions';
import type { RetrieveEmailProps, UsersProps } from '@/app/lib/definitions';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { IoIosMail } from "react-icons/io";
import { IoIosMailOpen } from "react-icons/io";

export default function EmailBox({dataUsers, emailResponse}: {dataUsers: UsersProps[], emailResponse: RetrieveEmailProps[]}) {

    const { pending } = useFormStatus();
    const [code, formData] = useFormState(deleteMessage, undefined);

    const { data: session } = useSession();

    const [userName, setUserName] = useState<string>("");
    const [newEmailList, setNewEmailList] = useState<RetrieveEmailProps[]>(emailResponse);

    const findUser: UsersProps | undefined = dataUsers.find((usr: UsersProps) => usr.username === userName);
    const findMsg: RetrieveEmailProps | undefined = emailResponse.find((msg: RetrieveEmailProps) => msg.email === findUser?.email);
    
    useEffect(() => {
        if (session && session.user && session.user.name) {
            setUserName(session.user.name)
        };
        return () => console.log("clean-up (e-b)");
    }, [session]);

    const handleText = (id: number): void | null => {
        const findTextById: RetrieveEmailProps | undefined = newEmailList.find((email: RetrieveEmailProps) => email.id === id);
        if (findTextById?.bool_text === 0) {
            const mapBoolTextNeg: RetrieveEmailProps[] = newEmailList.map((email: RetrieveEmailProps) => email.id === findTextById.id 
                ? {...email, bool_text: 1} : email);
            setNewEmailList(mapBoolTextNeg);
        } else if (findTextById?.bool_text === 1) {
            const mapBoolTextPos: RetrieveEmailProps[] = newEmailList.map((email: RetrieveEmailProps) => email.id === findTextById.id 
                ? {...email, bool_text: 0} : email);
            setNewEmailList(mapBoolTextPos);
        }
        return null;
    };
    
    const handleDeleteMsg = (id: number): (() => void) => {
        const timer = setTimeout(() => {
            const filterById = newEmailList.filter((newMail: RetrieveEmailProps) => newMail.id !== id);
            setNewEmailList(filterById);
        }, 2000);
        return () => clearTimeout(timer);
    };

    return (
        <div className='md:w-[440px] xl:w-[650px] h-auto bg-gradient-to-r from-blue-900 from-10% 
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
                
                {newEmailList.map((emailRes: RetrieveEmailProps) => (
                    (emailRes.sender !== userName) && (emailRes.email === findMsg?.email) ? (
                        <div key={emailRes.id} className='flex items-center justify-between bg-blue-900 border-b 
                            border-cyan-600 py-2'
                        >
                            <p className="px-2 py-2">{emailRes.sender}</p>
                        
                            {emailRes.bool_text === 0 ? (
                                <button type="button" onClick={() => handleText(emailRes.id)} className='hover:text-slate-400 px-2'>
                                    <IoIosMail size={24} />
                                </button>
                                ) : (
                                <div className='flex items-center justify-between w-full text-slate-800 bg-slate-200 pl-2 py-1 rounded'>
                                    <p>
                                        Message: {emailRes.textarea}
                                    </p>
                                    <div className='flex'>
                                        <form action={formData}>
                                            <input type="number" id="id" name="id" value={emailRes.id} hidden readOnly />
                                            <button type="submit" id="submit" name="submit" value="btnDeleteMsg"
                                                disabled={pending}
                                                onClick={() => handleDeleteMsg(emailRes.id)}
                                                className='w-6 h-6 text-sm text-red-600 border border-red-600 hover:bg-red-200
                                                active:text-slate-100 active:bg-red-600 my-auto rounded-full'
                                            >
                                                x
                                            </button>
                                        </form>
                                        <button type="button" onClick={() => handleText(emailRes.id)} 
                                            className='text-blue-700 hover:text-blue-800 px-2'
                                        >
                                            <IoIosMailOpen size={24}/>
                                        </button> 
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : null
                ))}
            </div>

            <div>
                {!findMsg?.email ? (
                    <p className='text-orange-400 px-10'>No message received...</p>
                ) : null}
            </div>

            {code?.message ? (
                <p className='text-center text-cyan-400 pt-4'>{code.message}</p>
            ) : null}

        </div>
    )
}
