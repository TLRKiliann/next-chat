"use client";

import type { UsersChatProps } from '@/app/lib/definitions';
import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import { useFormState, useFormStatus } from 'react-dom';
import { mysqlSendInvitation } from '@/app/lib/actions';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = "force-dynamic";

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

    const [newMapping, setNewMapping] = useState<UsersChatProps[]>(mapping);

    const handleDisplayLinks = (id: number) => {
        const findById = mapping.map((user: UsersChatProps) => user.id === id ? {...user, boolInvitation: 1} : user);
        console.log(findById, "findById");
        setNewMapping(findById);
    };

    const handleCloseInvitation = (id: number) => {
        const closeInvitation = mapping.map((user: UsersChatProps) => user.id === id ? {...user, boolInvitation: 0} : user);
        console.log(closeInvitation, "closeInvitation");
        setNewMapping(closeInvitation);
    };

    const [acceptInvite, setAcceptInvite] = useState<boolean>(false);

    const [refuseInvite, setRefuseInvite] = useState<boolean>(false);

    const handleAccept = () => {
        setAcceptInvite(!acceptInvite);
    };

    const handleRefuse = () => {
        setRefuseInvite(!refuseInvite);
    };

    return (
        <div className='flex flex-col w-[25%] bg-blue-900'>

            {newMapping.map((user: UsersChatProps) => (
                <div key={user.id} onClick={() => handleDisplayLinks(user.id)}
                    className='flex items-center justify-start bg-slate-800 cursor-pointer border-b border-slate-700 px-4 py-3'>
                    
                    <Image src={user.img} width={30} height={30} alt={user.username} 
                        className='flex w-[30px] h-[30px] object-cover rounded-full'
                    />
                    
                    <p className='w-[80%] text-lg pl-4'>{user.username}</p>

                    {user.online === 1 
                        ? <span className='w-[20px] h-[20px] bg-green-500 border border-green-500 rounded-full'></span> 
                        : <span className='w-[20px] h-[20px] bg-red-600 border border-red-600 rounded-full'></span>
                    } 
                </div>
            ))}

            {newMapping.map((user: UsersChatProps) => (
                user.displayInvitation === 1 ? (
                    <div key={user.id}>
                        <h2>Invitation</h2>
                        <p>{user.userSender} sent an invitation to {user.roomSelected}</p>
                        <form action={formData}>
                            <h2>
                                Accept ?
                            </h2>

                            <label htmlFor="">Yes
                                <input type="checkbox" checked={acceptInvite} onChange={handleAccept} />
                            </label>
                            <label htmlFor="">
                                <input type="checkbox" checked={refuseInvite} onChange={handleRefuse} />
                            </label>
                            
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                ) : null
            ))}

            <div>
                {newMapping.map((user: UsersChatProps) => (
                    user.boolInvitation === 1 ? (
                        <div key={user.id} className="fixed z-20 top-0 left-0 w-2/5 h-auto
                            bg-slate-400 text-slate-600 border">
                            <div className='flex justify-end'>
                                <button type="button" onClick={() => handleCloseInvitation(user.id)}
                                    className="flex items-center justify-center text-slate-600 mt-2 mr-2 px-2 
                                        border border-slate-500 rounded-full"
                                >
                                    X
                                </button>
                            </div>
                          
                            <div className='flex flex-col'>
                                <h2 className="font-bold text-xl text-center">Invitation Proposal for :</h2>
                                <p className="text-lg text-center text-slate-500 mt-2">{user.username}</p>
                            </div>

                            <form action={formData} className="flex flex-col items-center justify-center">
                                
                                <div className='flex my-5'>
                                    <label htmlFor="room">Choose Room :</label>
                                    <select name="room" id="room">
                                        <option value="info">Info</option>
                                        <option value="question">Question</option>
                                        <option value="confidential">Confidential</option>
                                    </select>

                                </div>

                                <button type="submit" disabled={pending} className='text-slate-50 btn-primary mb-5 shadow-btn'>Submit</button>
                                
                                {code?.message ? (
                                    <p>{code.message}</p>
                                    ) : null
                                }
                            </form>

                            <li className='text-center text-blue-600 mb-2'>
                                <Link href="/email">Send an e-mail</Link>
                            </li>
                        </div>
                    ) : null
                ))}
            </div>
        </div>
    )
}
