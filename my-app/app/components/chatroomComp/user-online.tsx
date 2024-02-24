"use client";

import type { UsersProps } from '@/app/lib/definitions';
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
/* import { useFormState, useFormStatus } from 'react-dom';
import { mysqlResponseInvitation } from '@/app/lib/actions'; */
import Image from 'next/image';
import DisplayInvitation from './invitation/display-invitation';
import ResponseReceiver from './invitation/response-receiver';

export default function UserOnline({dataUsers}: {dataUsers: UsersProps[]}) {

/*     const {pending} = useFormStatus();
    const [code, formData] = useFormState(mysqlResponseInvitation, undefined);
 */
    const {data: session} = useSession();
    
    const [userName, setUserName] = useState<string>("");

    const [senderInvite, setSenderInvite] = useState<string>("");

    const [senderResponse, setSenderResponse] = useState<UsersProps | undefined>(undefined)

    console.log(senderInvite, "senderInvite");

    const handleResponse = (findsender: string) => {
        const responseToSender = dataUsers.find((data: UsersProps) => data.username === findsender);
        if (responseToSender) {
            setSenderResponse(responseToSender);
        } else {
            return null;
        }
    }

    useEffect(() => {
        if (session && session.user && session.user.name) {
            setUserName(session.user.name);
        };
        const callSender = () => {
            const findSender = dataUsers.find((user: UsersProps) => user.sender !== "");
            if (findSender && findSender.sender) {
                setSenderInvite(findSender.sender);
                handleResponse(findSender.sender);
            }
        };
        callSender()
        return () => console.log("Clean-up session user-online !");
    }, []);


    const mapping = dataUsers.filter((obj: {username: string}, index: number) => {
        return index === dataUsers.findIndex((o: {username: string}) => obj.username === o.username)
    });

    const [newMapping, setNewMapping] = useState<UsersProps[]>(mapping);


    const [acceptInvite, setAcceptInvite] = useState<boolean>(false);
    const [refuseInvite, setRefuseInvite] = useState<boolean>(false);

    const [response, setResponse] = useState<number>(0);

    const handleDisplayLinks = (id: number): void => {
        const findById = mapping.map((user: UsersProps) => user.id === id 
            ? {...user, boolinvitation: 1} : user);
        setNewMapping(findById);
    };

    const handleCloseInvitation = (id: number): void => {
        const closeInvitation = mapping.map((user: UsersProps) => user.id === id 
            ? {...user, boolinvitation: 0} : user);
        setNewMapping(closeInvitation);
    };

    const handleAccept = (): void => {
        if (response === 0) {
            setAcceptInvite(!acceptInvite);
            setResponse((prev) => prev = 1);
        } else {
            setAcceptInvite(!acceptInvite);
            setResponse((prev) => prev = 0);
        }
    };

    const handleRefuse = (): void => {
        if (response === 1) {
            setRefuseInvite(!refuseInvite);
            setResponse((prev) => prev = 0);
        } else {
            setRefuseInvite(!refuseInvite);
            setResponse((prev) => prev = 1);
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

            <ResponseReceiver 
                newMapping={newMapping}
                acceptInvite={acceptInvite}
                refuseInvite={refuseInvite}
                handleAccept={handleAccept}
                handleRefuse={handleRefuse}
                senderResponse={senderResponse}
                response={response}
            />
            
            <DisplayInvitation
                newMapping={newMapping}
                handleCloseInvitation={(id: number) => handleCloseInvitation(id)} 
            />
        </div>
    )
}
