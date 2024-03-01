import type { Metadata } from 'next';
import React from 'react';
import { queryEmail, queryUsers } from '@/app/lib/db';
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

    const requestEmail = await queryEmail("SELECT * FROM mailbox", []);
    const emailResponse: string = JSON.stringify(requestEmail);

    if (!dataUsers) {
        throw new Error("Error: dataUsers not accessible from db !");
    };

    if (!emailResponse) {
        throw new Error("Error: emailResponse not accessible from db !");
    };

    return (
        <div className='w-full min-h-screen bg-slate-800'>

            <HeaderChatroom>Email</HeaderChatroom>

            <EmailForm dataUsers={JSON.parse(dataUsers)} emailResponse={JSON.parse(emailResponse)} />

        </div>
    )
};
