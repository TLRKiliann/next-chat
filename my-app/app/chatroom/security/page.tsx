import type { Metadata } from 'next';
import React from 'react';
import { queryChatRoom, queryUsers } from '@/app/lib/db';
import HeaderChatroom from '@/app/components/chatroomComp/header-chatroom';
import FormMessage from '@/app/components/chatroomComp/form-message';
import ScreenMessage from '@/app/components/chatroomComp/screen-message';
import UserOnline from '@/app/components/chatroomComp/user-online';
import BackToChatroom from '@/app/components/nextroom/backto-chatroom';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: {
        absolute: "Security"
    },
    description: "Security room"
};

export default async function SecurityRoom() {

    const req = await queryUsers("SELECT * FROM userschat", []);
    const dataUsers: string = JSON.stringify(req);

    //Security
    const request = await queryChatRoom("SELECT * FROM question", []);
    const data = JSON.stringify(request);

    if (!dataUsers) {
        throw new Error("Error: dataUsers not loaded for db");
    };

    if (!data) {
        throw new Error("Error: data not loaded for db");
    };

    return (
        <div className='w-full h-screen bg-slate-900'>

            <HeaderChatroom>Security</HeaderChatroom>

            <div className='flex w-full h-[calc(100%-72px)]'>

                <UserOnline dataUsers={JSON.parse(dataUsers)} />

                <div className='w-full h-content shadow-inside bg-red-400'>

                    <ScreenMessage dataroom={JSON.parse(data)} />

                    <FormMessage dataroom={JSON.parse(data)} dataUsers={JSON.parse(dataUsers)} />

                </div>

            </div>

            <BackToChatroom dataUsers={JSON.parse(dataUsers)} />

        </div>
    )
}
