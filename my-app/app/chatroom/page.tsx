import type { Metadata } from 'next';
import React from 'react';
import { queryUsers, queryChatRoom } from '@/app/lib/db';
import HeaderChatroom from '@/app/components/chatroomComp/header-chatroom';
import UserOnline from '@/app/components/chatroomComp/user-online';
import ScreenMessage from '@/app/components/chatroomComp/screen-message';
import FormMessage from '@/app/components/chatroomComp/form-message';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: {
      absolute: "Chatroom"
    },
    description: "default room"
};

export default async function LayoutChatRoom() {

    const req = await queryUsers("SELECT * FROM userschat", []);
    const dataUsers: string = JSON.stringify(req);

    const request = await queryChatRoom("SELECT * FROM chatroom", []);
    const data: string = JSON.stringify(request);

    if (!dataUsers) {
        throw new Error("Error: dataUsers not loaded from db");
    };

    if (!data) {
        throw new Error("Error: data not loaded from db");
    };

    return (
        <div className='w-full h-screen'>
            
            <HeaderChatroom>Chatroom</HeaderChatroom>

            <div className='flex w-full h-full pt-[72px]'>

                <UserOnline dataUsers={JSON.parse(dataUsers)} />

                <div className='w-full h-content shadow-inside
                    bg-gradient-to-r from-green-200 from-10% to-blue-200 to-90%'>

                    <ScreenMessage dataroom={JSON.parse(data)} />

                    <FormMessage dataroom={JSON.parse(data)} dataUsers={JSON.parse(dataUsers)} />

                </div>

            </div>

        </div>
    )
};


