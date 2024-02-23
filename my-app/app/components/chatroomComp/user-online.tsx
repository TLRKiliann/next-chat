"use client";

import type { UsersChatProps } from '@/app/lib/definitions';
import React, { useState } from 'react';
/* import { useSession } from "next-auth/react";
import { useFormState, useFormStatus } from 'react-dom';
import { mysqlSendInvitation } from '@/app/lib/actions'; */
import Image from 'next/image';
import DisplayInvitation from './invitation/display-invitation';

export default function UserOnline({dataroom}: {dataroom: UsersChatProps[]}) {
    
/*     const {data: session} = useSession();
    
    const {pending} = useFormStatus();
    const [code, formData] = useFormState(mysqlSendInvitation, undefined);
 */
    const mapping = dataroom.filter((obj: {username: string}, index: number) => {
        return index === dataroom.findIndex((o: {username: string}) => obj.username === o.username)
    });

    const [newMapping, setNewMapping] = useState<UsersChatProps[]>(mapping);
    const [acceptInvite, setAcceptInvite] = useState<boolean>(false);
    const [refuseInvite, setRefuseInvite] = useState<boolean>(false);


    const handleDisplayLinks = (id: number): void => {
        const findById = mapping.map((user: UsersChatProps) => user.id === id ? {...user, boolInvitation: 1} : user);
        //console.log(findById, "findById");
        setNewMapping(findById);
    };

    const handleCloseInvitation = (id: number): void => {
        const closeInvitation = mapping.map((user: UsersChatProps) => user.id === id ? {...user, boolInvitation: 0} : user);
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
                        <form action="">
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

            <DisplayInvitation
                newMapping={newMapping}
                handleCloseInvitation={(id: number) => handleCloseInvitation(id)} 
            />
        </div>
    )
}
