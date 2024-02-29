"use client";

import type { UsersProps } from '@/app/lib/definitions';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DisplayInvitation from './invitation/display-invitation';
import ResponseReceiver from './invitation/response-receiver';
import UsersBoard from './invitation/users-board';

export default function UserOnline({dataUsers}: {dataUsers: UsersProps[]}) {

    const router = useRouter();

    const { data: session } = useSession();

    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        if (session && session.user && session.user.name) {
            setUserName(session.user.name);
        }
        return () => console.log("Clean-up session (u-o) 1 !");
    }, [session]);

    const [senderResponse, setSenderResponse] = useState<UsersProps | undefined>(undefined);

    const mapping: UsersProps[] = dataUsers.filter((obj: {username: string}, index: number) => {
        return index === dataUsers.findIndex((o: {username: string}) => obj.username === o.username)
    });

    const [newMapping, setNewMapping] = useState<UsersProps[]>(mapping);
    const [acceptInvite, setAcceptInvite] = useState<boolean>(false);
    const [refuseInvite, setRefuseInvite] = useState<boolean>(false);

    //sender - response - selectedroom
    useEffect(() => {
        const verifyQuestion = dataUsers.filter((user: UsersProps) => (
            (user.response === 1) && (user.selectedroom).includes("/question"))
        );
        const verifyInfo = dataUsers.filter((user: UsersProps) => (
            (user.response === 1) && (user.selectedroom).includes("/info"))
        );
        const verifyConfidential = dataUsers.filter((user: UsersProps) => (
            (user.response === 1) && (user.selectedroom).includes("/confidential"))
        );

        if (verifyQuestion.length === 2) {
            router.push("/chatroom/question");
        } else if (verifyInfo.length === 2) {
            router.push("/chatroom/info");
        } else if (verifyConfidential.length === 2) {
            router.push("/chatroom/confidential");
        } else {
            console.log("No twice response at same room");
        }
        /* const interval = setInterval(() => {
            console.log(verifyResponse, "verifyresponse");
            console.info("Verify response...")
        }, 2000); */
        //return () => clearInterval(interval);
        return () => console.log("Interval from useEffect() !");
    }, []);

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
        return () => console.log("Clean-up session findSender (u-o) 2 !");
    }, [dataUsers]);

    const handleRouteToChange = (): void => {
        setTimeout(() => {
            const filterDataByRoom = dataUsers.filter((d: UsersProps) => d.selectedroom);
            
            console.log(filterDataByRoom, "filter from handleRouteToChange !");

            const filterDataByRoomFind = dataUsers.find((d: UsersProps) => d.selectedroom);
            if (filterDataByRoom.length === 2) {
                if (filterDataByRoomFind?.selectedroom === "/question") {
                    router.push("/chatroom/question");
                } else if (filterDataByRoomFind?.selectedroom === "/info") {
                    router.push("/chatroom/info");
                } else if (filterDataByRoomFind?.selectedroom === "/confidential") {
                    router.push("/chatroom/confidential");
                } else {
                    console.log("2 users required !")
                }
            } else if (filterDataByRoom.length > 2) {
                console.error("users greater than 2 !")
            } else {
                console.info("2 users required !")
            };
        }, 2000)
    };

    const handleDisplayLinks = (id: number): void => {
        const openInvitation = mapping.map((user: UsersProps) => user.id === id 
            ? {...user, boolinvitation: 1}
            : user
        );
        setNewMapping(openInvitation);
    };

    const handleCloseInvitation = (id: number): void => {
        const closeInvitation = mapping.map((user: UsersProps) => user.id === id 
            ? {...user, boolinvitation: 0}
            : user
        );
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

            <UsersBoard 
                newMapping={newMapping}
                handleDisplayLinks={(id) => handleDisplayLinks(id)}
            />

            <ResponseReceiver 
                newMapping={newMapping}
                acceptInvite={acceptInvite}
                refuseInvite={refuseInvite}
                handleAccept={handleAccept}
                handleRefuse={handleRefuse}
                senderResponse={senderResponse}
                handleRouteToChange={handleRouteToChange}
            />
            
            <DisplayInvitation
                newMapping={newMapping} 
                handleCloseInvitation={(id: number) => handleCloseInvitation(id)} 
            />

        </div>
    )
}
