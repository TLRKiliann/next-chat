import React from 'react';
import { queryChatRoom, queryUsers } from '@/app/lib/db';
import FormMessage from '@/app/components/chatroomComp/form-message';
import ScreenMessage from '@/app/components/chatroomComp/screen-message';
import UserOnline from '@/app/components/chatroomComp/user-online';

export default async function SecretRoom() {

    const req = await queryUsers("SELECT * FROM userschat", []);
    const dataUsers: string = JSON.stringify(req);

    const request = await queryChatRoom("SELECT * FROM confidential", []);
    const data = JSON.stringify(request);

    return (
        <div className='bg-slate-900'>
            <h1 className='text-2xl italic font-bold p-[20px]'>
                Confidential
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
