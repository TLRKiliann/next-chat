"use client";

import type { UsersProps } from '@/app/lib/definitions';
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import DisplayInvitation from './invitation/display-invitation';
import ResponseReceiver from './invitation/response-receiver';
import UsersBoard from './invitation/users-board';

export default function UserOnline({dataUsers}: {dataUsers: UsersProps[]}) {

    const {data: session} = useSession();
    
    const [userName, setUserName] = useState<string>("");

    const [senderInvite, setSenderInvite] = useState<string>("");

    const [senderResponse, setSenderResponse] = useState<UsersProps | undefined>(undefined)

    const handleResponse = (findsender: string) => {
        const responseToSender = dataUsers.find((data: UsersProps) => data.username === findsender);
        if (responseToSender) {
            setSenderResponse(responseToSender);
        } else {
            return null;
        }
    };

    useEffect(() => {
        if (session && session.user && session.user.name) {
            setUserName(session.user.name);
        }
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
        setAcceptInvite(!acceptInvite);
    };

    const handleRefuse = (): void => {
        setRefuseInvite(!refuseInvite);
    };

    return (
        <div className='flex flex-col w-[25%] bg-blue-900'>

            <UsersBoard newMapping={newMapping} handleDisplayLinks={(id) => handleDisplayLinks(id)} />

            <ResponseReceiver 
                newMapping={newMapping}
                acceptInvite={acceptInvite}
                refuseInvite={refuseInvite}
                handleAccept={handleAccept}
                handleRefuse={handleRefuse}
                senderResponse={senderResponse}
                userName={userName}
            />
            
            <DisplayInvitation
                newMapping={newMapping}
                handleCloseInvitation={(id: number) => handleCloseInvitation(id)} 
            />
        </div>
    )
}
