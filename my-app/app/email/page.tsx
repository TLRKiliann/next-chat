import type { Metadata } from 'next';
import React from 'react';
import { queryEmail, queryUsers } from '@/app/lib/db';
import HeaderChatroom from '@/app/components/chatroomComp/header-chatroom';
import EmailForm from '@/app/components/emailComp/email-form';
import EmailBox from '@/app/components/emailComp/email-box';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: {
      absolute: "Email"
    },
    description: "Email page"
};

export default async function EmailPage() {

    const req = await queryUsers("SELECT * FROM userschat", []);
    const dataUsers: string = JSON.stringify(req);

    const request = await queryEmail("SELECT * FROM mailbox", []);
    const emailResponse: string = JSON.stringify(request);

    if (!dataUsers) {
        throw new Error("Error: dataUsers not accessible from db !");
    };

    if (!emailResponse) {
        throw new Error("Error: emailResponse not accessible from db !");
    };

    return (
        <div className='w-full min-h-screen bg-slate-800'>

            <HeaderChatroom>Email</HeaderChatroom>

            <div className='flex w-full md:h-auto xl:min-h-screen m-auto'>

            <div className="flex items-center justify-around w-full h-[600px] m-auto px-10">

                <EmailForm dataUsers={JSON.parse(dataUsers)} />

                <EmailBox dataUsers={JSON.parse(dataUsers)} emailResponse={JSON.parse(emailResponse)} />

            </div>

            </div>

        </div>
    )
};
