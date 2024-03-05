"use client";

import type { UsersProps } from '@/app/lib/definitions';
import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DisplayInvitation from './invitation/display-invitation';
import ResponseReceiver from './invitation/response-receiver';
import UsersBoard from './invitation/users-board';

type GlobalStateProps = {
    userName: string | null | undefined;
    senderResponse: UsersProps | undefined;
    newMapping: UsersProps[];
    acceptInvite: boolean;
    refuseInvite: boolean;
};

export default function UserOnline({dataUsers}: {dataUsers: UsersProps[]}) {

    const router = useRouter();

    const { data: session } = useSession();

    const mapping: UsersProps[] = dataUsers.filter((obj: {username: string}, index: number) => {
        return index === dataUsers.findIndex((o: {username: string}) => obj.username === o.username)
    });

    const [globalState, setGlobalState] = useState<GlobalStateProps>({
        userName: "",
        senderResponse: undefined,
        newMapping: mapping,
        acceptInvite: false,
        refuseInvite: false
    });

    useEffect(() => {
        if (session && session.user && session.user.name) {
            setGlobalState((prev) => ({...prev, userName: session.user?.name}));
        }
        return () => console.log("Clean-up session (u-o) 1 !");
    }, [session]);


    const handleResponse = (findSender: string): void => {
        const responseToSender = dataUsers.find((data: UsersProps) => data.username === findSender);
        if (responseToSender) {
            setGlobalState((prev) => ({...prev, senderResponse: responseToSender}));
        }
    };

    useEffect(() => {
        const findSender = dataUsers.find((user: UsersProps) => user.sender !== "");
        if (findSender && findSender.sender) {
            handleResponse(findSender.sender);
        };
        return () => console.log("Clean-up session findSender (u-o) 2 !");
    }, [dataUsers]);

    const verifyQuestion: UsersProps[] = dataUsers.filter((user: UsersProps) => (
        (user.response === 1) && (user.selectedroom).includes("/question"))
    );

    const verifyInfo: UsersProps[] = dataUsers.filter((user: UsersProps) => (
        (user.response === 1) && (user.selectedroom).includes("/info"))
    );

    const verifyConfidential: UsersProps[] = dataUsers.filter((user: UsersProps) => (
        (user.response === 1) && (user.selectedroom).includes("/confidential"))
    );

    const handleVerifyRoom = (): void => {
        let redirectRoute: string = "";
        if (verifyQuestion.length === 2) {
            redirectRoute = "/chatroom/question";
        } else if (verifyInfo.length === 2) {
            redirectRoute = "/chatroom/info";
        } else if (verifyConfidential.length === 2) {
            redirectRoute = "/chatroom/confidential";
        } else {
            console.log("There aren't 2 response for same room");
            return;
        }
        router.push(redirectRoute);
    };

    useEffect(() => {
        const timer = setTimeout(handleVerifyRoom, 2000);
        return () => clearTimeout(timer);
    }, [verifyQuestion, verifyInfo, verifyConfidential]);

    // user 2 response yes or no
    const handleRouteToChange = (): (() => void) => {
        const timer = setTimeout(() => {
            const filterDataByRoom: UsersProps[] = dataUsers.filter((d: UsersProps) => d.selectedroom);
            const filterDataByRoomFind: UsersProps | undefined = dataUsers.find((d: UsersProps) => d.selectedroom);

                if ((filterDataByRoomFind?.selectedroom === "/question") && (filterDataByRoom.length === 2)) {
                    router.push("/chatroom/question");
                } else if ((filterDataByRoomFind?.selectedroom === "/info") && (filterDataByRoom.length === 2)) {
                    router.push("/chatroom/info");
                } else if ((filterDataByRoomFind?.selectedroom === "/confidential") && (filterDataByRoom.length === 2)) {
                    router.push("/chatroom/confidential");
                } else if (filterDataByRoom.length > 2) {
                    console.error("users greater than 2 !")
                } else {
                    console.log("2 users required !")
                }
        }, 2000)
        return () => clearTimeout(timer);
    };

    //initial window invitation
    const handleDisplayLinks = (id: number): void => {
        const openInvitation: UsersProps[] = mapping.map((user: UsersProps) => user.id === id 
            ? {...user, boolinvitation: 1}
            : user
        );
        setGlobalState((prev) => ({...prev, newMapping: openInvitation}));
    };

    //to close invitation window
    const handleCloseInvitation = (id: number): void => {
        const closeInvitation: UsersProps[] = mapping.map((user: UsersProps) => user.id === id 
            ? {...user, boolinvitation: 0}
            : user
        );
        setGlobalState((prev) => ({...prev, newMapping: closeInvitation}));
    };

    // yes
    const handleAccept = (): void => {
        setGlobalState((prev) => ({...prev, acceptInvite: !prev.acceptInvite}))
    };

    // no
    const handleRefuse = (): void => {
        setGlobalState((prev) => ({...prev, refuseInvite: !prev.refuseInvite}))
    };

    return (
        <div className='flex flex-col w-[25%] bg-blue-900'>

            <UsersBoard 
                newMapping={globalState.newMapping}
                handleDisplayLinks={(id) => handleDisplayLinks(id)}
            />

            <ResponseReceiver 
                newMapping={globalState.newMapping}
                acceptInvite={globalState.acceptInvite}
                refuseInvite={globalState.refuseInvite}
                handleAccept={handleAccept}
                handleRefuse={handleRefuse}
                senderResponse={globalState.senderResponse}
                handleRouteToChange={handleRouteToChange}
            />
            
            <DisplayInvitation
                newMapping={globalState.newMapping} 
                handleCloseInvitation={(id: number) => handleCloseInvitation(id)} 
            />

        </div>
    )
}
