import type { Metadata } from 'next';
import React from 'react';
import { queryUsers } from '@/app/lib/db';
import HeaderChatroom from '../components/chatroomComp/header-chatroom';
import EmailForm from '../components/emailComp/email-form';

export const metadata: Metadata = {
    title: {
      absolute: "Email"
    },
    description: "Email page"
};

export default async function EmailPage() {

    const req = await queryUsers("SELECT * FROM userschat", []);
    const dataUsers: string = JSON.stringify(req);

    if (!dataUsers) {
        throw new Error("Error: dataUsers not accessible from db !");
    }

    return (
        <div className='w-full min-h-screen bg-slate-800'>

            <HeaderChatroom>Email</HeaderChatroom>

            <EmailForm dataUsers={JSON.parse(dataUsers)} />

        </div>
    )
};
