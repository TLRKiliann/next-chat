import type { Metadata } from 'next';
//import type { Metadata } from 'next/types';
import React from 'react';
import FormMessage from '@/app/components/chatroomComp/form-message';
import { queryChatRoom } from '@/app/lib/db';
import ScreenMessage from '@/app/components/chatroomComp/screen-message';
import UserOnline from '@/app/components/chatroomComp/user-online';

export const metadata: Metadata = {
    title: {
      absolute: "Chatroom"
    },
    description: "default room"
};

export default async function ChatRoom() {

    const request = await queryChatRoom("SELECT * FROM chatroom", []);
    const data: string = JSON.stringify(request);
    console.log(data, "data");

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
            
            <div className='flex w-full h-[calc(100%-70px)]'>

                <UserOnline data={JSON.parse(data)} />

                <div className='w-full bg-slate-800'>

                    <ScreenMessage data={JSON.parse(data)} />
                    
                    <FormMessage data={JSON.parse(data)} />

                </div>

            </div>

        </div>
    )
};
