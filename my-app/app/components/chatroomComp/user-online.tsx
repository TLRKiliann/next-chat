"use client";

import type { UsersProps } from '@/app/lib/definitions';
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useFormState, useFormStatus } from 'react-dom';
import { mysqlResponseInvitation } from '@/app/lib/actions';
import Image from 'next/image';
import DisplayInvitation from './invitation/display-invitation';

export default function UserOnline({dataUsers}: {dataUsers: UsersProps[]}) {

    const {pending} = useFormStatus();
    const [code, formData] = useFormState(mysqlResponseInvitation, undefined);

    const {data: session} = useSession();
    
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        if (session && session.user && session.user.name) {
            setUserName(session.user.name);
        };
        return () => console.log("Clean-up session user-online !");
    }, [])


    const mapping = dataUsers.filter((obj: {username: string}, index: number) => {
        return index === dataUsers.findIndex((o: {username: string}) => obj.username === o.username)
    });

    // SENDER !!!
    //const findSender = dataUsers.map();

    const [newMapping, setNewMapping] = useState<UsersProps[]>(mapping);


    const [acceptInvite, setAcceptInvite] = useState<boolean>(false);
    const [refuseInvite, setRefuseInvite] = useState<boolean>(false);

    const [response, setResponse] = useState<number>(0);

    const handleDisplayLinks = (id: number): void => {
        const findById = mapping.map((user: UsersProps) => user.id === id ? {...user, boolinvitation: 1} : user);
        setNewMapping(findById);
    };

    const handleCloseInvitation = (id: number): void => {
        const closeInvitation = mapping.map((user: UsersProps) => user.id === id ? {...user, boolinvitation: 0} : user);
        setNewMapping(closeInvitation);
    };

    const handleAccept = (): void => {
        if (response === 0) {
            setAcceptInvite(!acceptInvite);
            setResponse(prev => prev = 1);
        } else {
            setAcceptInvite(!acceptInvite);
            setResponse(prev => prev = 0);
        }
    };

    const handleRefuse = (): void => {
        if (response === 1) {
            setRefuseInvite(!refuseInvite);
            setResponse(prev => prev = 0);
        } else {
            setRefuseInvite(!refuseInvite);
            setResponse(prev => prev = 1);
        }
    };

    console.log(response, "response")

    return (
        <div className='flex flex-col w-[25%] bg-blue-900'>

            {newMapping.map((user: UsersProps) => (
                <div key={user.id} onClick={() => handleDisplayLinks(user.id)}
                    className='flex items-center justify-start bg-slate-800 cursor-pointer border-b border-slate-700 px-4 py-3'>
                    
                    <Image src={user.img} width={30} height={30} alt={user.username ? user.username : "img missing"} 
                        className='flex w-[30px] h-[30px] object-cover rounded-full'
                    />
                    
                    <p className='w-[80%] text-lg pl-4'>{user.username}</p>

                    {user.online === 1 
                        ? <span className='w-[20px] h-[20px] bg-green-500 border border-green-500 rounded-full'></span> 
                        : <span className='w-[20px] h-[20px] bg-red-600 border border-red-600 rounded-full'></span>
                    } 
                </div>
            ))}

            {newMapping.map((user: UsersProps) => (
                (user.display === 1) /* && (user.username === userName) */ ? (
                    <div key={user.id} className='fixed z-10 top-0 left-0 w-[400px] text-slate-600
                        bg-slate-400 rounded-br-xl shadow-lg'>
                        
                        <h2 className='text-xl font-bold text-center my-2'>Invitation</h2>
                        
                        <p className='px-10 py-2'>
                            <span className='text-red-600'>
                                {user.sender} 
                            </span>
                            &nbsp;sent an invitation to you for gooing to&nbsp;
                            <span className='text-red-600'>
                                {user.selectedroom}&nbsp;
                            </span>
                            room.
                        </p>

                        <h2 className="mb-2 px-10 py-2">
                            Accept ?
                        </h2>

                        <div className='flex items-center justify-around w-[200px] m-auto'>

                            <span>
                                <label htmlFor="accept">Yes</label>
                                <input type="checkbox" id="accept" name="accept" 
                                    checked={acceptInvite} onChange={handleAccept} className='ml-2'/>
                            </span>

                            <span>
                                <label htmlFor="refuse">No</label>
                                <input type="checkbox" id="refuse" name="refuse" 
                                    checked={refuseInvite} onChange={handleRefuse} className='ml-2' />              
                            </span>  

                        </div>

                        <form action={formData}>

                            {acceptInvite === true ? (
                                <input type="number" id="reponse" name="response" value={response} hidden readOnly />
                                ) : null
                            };

                            {refuseInvite === true ? (
                                <input type="number" id="response" name="response" value={response} hidden readOnly />
                                ) : null
                            };
                            
                            <div className='flex items-center justify-center my-6'>
                                {acceptInvite === false}
                                <button type="submit" id="submit" name="submit" value="responseInvite" 
                                    disabled={pending || (acceptInvite === false) && (refuseInvite === false)}
                                    className='text-slate-50 btn-primary shadow-btn'
                                >
                                    Submit
                                </button>
                            </div>
                            {code?.message ? (
                                <p>{code.message}</p>
                                ) : null
                            }
                        </form>
                    </div>
                ) : null
            ))}
            <DisplayInvitation
                newMapping={newMapping}
                handleCloseInvitation={(id: number) => handleCloseInvitation(id)} 
            />
        </div>
    )
}
