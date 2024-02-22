import type { Metadata } from 'next';
//import type { Metadata } from 'next/types';
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
    //console.log(data, "data");

/*     const req = await queryChatRoom("SELECT * FROM usersonline", []);
    const usersOnline: string = JSON.stringify(req);
    console.log(usersOnline, "data");
 */
    if (!data) {
        throw new Error("Error: data not loaded for db");
    }

/*     if (!usersOnline) {
        throw new Error("Error: usersOnline not loaded for db");
    } */

    return (
        <div className='w-full h-screen'>
            
            <HeaderChatroom />

            <div className='flex w-full h-[calc(100%-70px)]'>

                <UserOnline dataroom={JSON.parse(data)} />

                <div className='w-full bg-slate-400'>

                    <ScreenMessage dataroom={JSON.parse(data)} />
                    
                    <FormMessage dataroom={JSON.parse(data)} />

                </div>

            </div>

        </div>
    )
};
