import React from 'react';
import { queryChatRoom, queryUsers } from '@/app/lib/db';
import FormMessage from '@/app/components/chatroomComp/form-message';
import ScreenMessage from '@/app/components/chatroomComp/screen-message';
import UserOnline from '@/app/components/chatroomComp/user-online';

export default async function QuestionRoom() {

    const req = await queryUsers("SELECT * FROM userschat", []);
    const dataUsers: string = JSON.stringify(req);

    const request = await queryChatRoom("SELECT * FROM chatroom", []);
    const data = JSON.stringify(request);

    if (!dataUsers) {
        throw new Error("Error: dataUsers not loaded for db");
    };

    if (!data) {
        throw new Error("Error: data not loaded for db");
    };

    return (
        <div className='w-full h-screen bg-slate-900'>
            <h1 className='text-2xl italic font-bold p-[20px]'>
                Question
            </h1>

            <div className='flex w-full h-[calc(100%-72px)]'>

                <UserOnline dataUsers={JSON.parse(dataUsers)} />

                <div className='w-full h-content shadow-inside
                    bg-gradient-to-r from-green-200 from-10% to-blue-200 to-90%'>

                    <ScreenMessage dataroom={JSON.parse(data)} />

                    <FormMessage dataroom={JSON.parse(data)} />

                </div>

            </div>

        </div>
    )
}
