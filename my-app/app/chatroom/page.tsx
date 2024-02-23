import type { Metadata } from 'next';
import React from 'react';
import { queryChatRoom } from '@/app/lib/db';
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

export default async function ChatRoom() {

    const request = await queryChatRoom("SELECT * FROM chatroom", []);
    const data: string = JSON.stringify(request);

    if (!data) {
        throw new Error("Error: data not loaded for db");
    };

    return (
        <div className='w-full h-screen'>
            
            <HeaderChatroom>Chatroom</HeaderChatroom>

            <div className='flex w-full h-[calc(100%-72px)]'>

                <UserOnline dataroom={JSON.parse(data)} />

                <div className='w-full h-content shadow-inside
                    bg-gradient-to-r from-green-200 from-10% to-blue-200 to-90%'>

                    <ScreenMessage dataroom={JSON.parse(data)} />

                    <FormMessage dataroom={JSON.parse(data)} />

                </div>

            </div>

        </div>
    )
};
