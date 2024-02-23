"use client";

import type { UsersChatProps } from '@/app/lib/definitions';
import React from 'react';
import { useSession } from "next-auth/react";
import { useFormState, useFormStatus } from 'react-dom';
import { mysqlSendInvitation } from '@/app/lib/actions';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function UserOnline({dataroom}: {dataroom: UsersChatProps[]}) {
    
    const {data: session} = useSession();
    
    if (!session) {
        redirect("/login")
    };

    const {pending} = useFormStatus();
    const [code, formData] = useFormState(mysqlSendInvitation, undefined);

    const mapping = dataroom.filter((obj: {username: string}, index: number) => {
        return index === dataroom.findIndex((o: {username: string}) => obj.username === o.username)
    });

    const handleDisplayLinks = (id: number) => {
        const findById = mapping.map((user: UsersChatProps) => user.id === id ? {...user, boolInvitation: 1} : user);
        return findById;
    };

    const handleCloseInvitation = (id: number) => {
        const closeInvitation = mapping.map((user: UsersChatProps) => user.id === id ? {...user, boolInvitation: 0} : user);
        return closeInvitation;
    };

    return (
        <div className='flex flex-col w-[25%] bg-blue-900'>

            {mapping.map((user: UsersChatProps) => (
                <div key={user.id} onClick={() => handleDisplayLinks(user.id)}
                    className='flex items-center justify-start bg-slate-800 border-b border-slate-700 px-4 py-3'>
                    
                    <Image src={user.img} width={30} height={30} alt={user.username} 
                        className='flex w-[30px] h-[30px] object-cover rounded-full'
                    />
                    
                    <p className='w-[80%] text-lg pl-4'>{user.username}</p>

                    {user.online === 1 
                        ? <span className='w-[20px] h-[20px] bg-green-500 border border-green-500 rounded-full'></span> 
                        : <span className='w-[20px] h-[20px] bg-red-600 border border-red-600 rounded-full'></span>
                    }

                    {user.boolInvitation === 1 ? (
                        <div>
                            <h2>Invitation Proposal</h2>
                            
                            <button type="button" onClick={() => handleCloseInvitation(user.id)}>Close</button>
                            
                            <form action={formData}>
                                
                                <label htmlFor="">Info</label>
                                <select name="" id="">
                                    <option value="info">Info</option>
                                    <option value="question">Question</option>
                                    <option value="confidential">Confidential</option>
                                </select>

                                <button type="submit" disabled={pending}>Submit</button>
                                
                                {code?.message ? (
                                    <p>{code.message}</p>
                                    ) : null
                                }
                            </form>

                            <li>
                                <Link href="/email">Email</Link>
                            </li>
                        </div>
                        ) : null
                    }

                </div>
            ))}

        </div>
    )
}
