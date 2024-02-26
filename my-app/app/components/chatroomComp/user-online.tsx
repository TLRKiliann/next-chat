"use client";

import type { UsersProps } from '@/app/lib/definitions';
import React, { useState, useEffect } from 'react';
import DisplayInvitation from './invitation/display-invitation';
import ResponseReceiver from './invitation/response-receiver';
import UsersBoard from './invitation/users-board';
import { useRouter } from 'next/navigation';

export default function UserOnline({dataUsers}: {dataUsers: UsersProps[]}) {
    
    const router = useRouter();

    const [senderResponse, setSenderResponse] = useState<UsersProps | undefined>(undefined)

    const mapping = dataUsers.filter((obj: {username: string}, index: number) => {
        return index === dataUsers.findIndex((o: {username: string}) => obj.username === o.username)
    });

    const [newMapping, setNewMapping] = useState<UsersProps[]>(mapping);
    const [acceptInvite, setAcceptInvite] = useState<boolean>(false);
    const [refuseInvite, setRefuseInvite] = useState<boolean>(false);

    const handleResponse = (findSender: string) => {
        const responseToSender = dataUsers.find((data: UsersProps) => data.username === findSender);
        if (responseToSender) {
            setSenderResponse(responseToSender);
        } else {
            return null;
        }
    };

    useEffect(() => {
        const findSender = dataUsers.find((user: UsersProps) => user.sender !== "");
        if (findSender && findSender.sender) {
            handleResponse(findSender.sender);
        }
        return () => console.log("Clean-up session findSender!");
    }, [dataUsers]);

    const handleRouteToChange = () => {
        setTimeout(() => {
            const dataFilterQuestion = dataUsers.filter((d: UsersProps) => d.selectedroom === "question");
            console.log(dataFilterQuestion, "data filter (1)");
            console.log(dataFilterQuestion[0], "data filter (1)");
            
            const dataFilterInfo = dataUsers.filter((d: UsersProps) => d.selectedroom === "info");
            console.log(dataFilterInfo, "data filter (2)");
            
            const dataFilterConfidential = dataUsers.filter((d: UsersProps) => d.selectedroom === "confidential");
            console.log(dataFilterConfidential, "data filter (3)");

            const filterRoomQuestion = dataFilterQuestion.map((u: UsersProps) => u.selectedroom);
            //console.log(mappingRoom, "mapping room");
            if (filterRoomQuestion.length === 2) {
                router.push("/chatroom/question");
            } else if (filterRoomQuestion.length === 2) {
                //case selectedroom === "question";
                router.push("/chatroom/info");
            } else if (filterRoomQuestion.length === 2) {
                router.push("/chatroom/confidential");
            } else {
                console.log("No room select by 2 users...")
            };
        }, 2000)
    };

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
                handleRouteToChange={handleRouteToChange}
            />
            
            <DisplayInvitation newMapping={newMapping} 
                handleCloseInvitation={(id: number) => handleCloseInvitation(id)} />

        </div>
    )
}
