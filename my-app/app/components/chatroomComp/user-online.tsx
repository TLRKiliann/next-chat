"use client";

import type { UsersProps } from '@/app/lib/definitions';
import React, { useState } from 'react';
/* import { useSession } from "next-auth/react";
import { useFormState, useFormStatus } from 'react-dom';
import { mysqlSendInvitation } from '@/app/lib/actions'; */
import Image from 'next/image';
import DisplayInvitation from './invitation/display-invitation';

export default function UserOnline({dataUsers}: {dataUsers: UsersProps[]}) {
    
    /* const {data: session} = useSession();
    
    const {pending} = useFormStatus();
    const [code, formData] = useFormState(mysqlSendInvitation, undefined); */

    const mapping = dataUsers.filter((obj: {username: string}, index: number) => {
        return index === dataUsers.findIndex((o: {username: string}) => obj.username === o.username)
    });

    const [newMapping, setNewMapping] = useState<UsersProps[]>(mapping);
    const [acceptInvite, setAcceptInvite] = useState<boolean>(false);
    const [refuseInvite, setRefuseInvite] = useState<boolean>(false);


    const handleDisplayLinks = (id: number): void => {
        const findById = mapping.map((user: UsersProps) => user.id === id ? {...user, boolinvitation: 1} : user);
        //console.log(findById, "findById");
        setNewMapping(findById);
    };

    const handleCloseInvitation = (id: number): void => {
        const closeInvitation = mapping.map((user: UsersProps) => user.id === id ? {...user, boolinvitation: 0} : user);
        //console.log(closeInvitation, "closeInvitation");
        setNewMapping(closeInvitation);
    };

    const handleAccept = (): void => {
        setAcceptInvite(!acceptInvite);
    };

    const handleRefuse = (): void => {
        setRefuseInvite(!refuseInvite);
    };

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
                
                user.display === 1 ? (

                    <div key={user.id}>
                        
                        <h2>Invitation</h2>
                        
                        <p className='text-red-600'>
                            <span>
                                {user.sender} 
                            </span>
                            sent an invitation to you for gooing to 
                            <span>
                                {user.roomselected}
                            </span>
                            room.
                        </p>

                        <form action="">
                            <h2>
                                Accept ?
                            </h2>

                            <label htmlFor="accept">Yes
                                <input type="checkbox" id="accept" name="accept" checked={acceptInvite} onChange={handleAccept} />
                            </label>
                            <label htmlFor="refuse">
                                <input type="checkbox" id="refuse" name="refuse" checked={refuseInvite} onChange={handleRefuse} />
                            </label>
                            
                            <button type="submit">Submit</button>
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
