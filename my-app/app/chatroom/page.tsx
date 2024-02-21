"use client";

import type { UsersProps } from '@/app/lib/definitions';
import React, { useState, useMemo } from 'react';
import { useSession } from "next-auth/react";
import { redirect, useRouter } from 'next/navigation';
import { userschat } from '@/app/lib/data';
import FormMessage from '@/app/components/chatroomComp/form-message';
import { queryChatRoom } from '@/app/lib/db';
import ScreenMessage from '@/app/components/chatroomComp/screen-message';
import UserOnline from '@/app/components/chatroomComp/user-online';

type DataUserMsg = {
    id: Date;
    session: string;
    message: string;
}

/* export const metadata: Metadata = {
    title: {
      absolute: "Baker's Decks"
    },
    description: "list of Baker's decks"
}; */
  

//client !
export default async function ChatRoom() {


    const request = await queryChatRoom("SELECT * FROM chatroom", []);
    const data = JSON.stringify(request);
    console.log(data, "data");
    /*
    const { pending } = useFormStatus();
    const [ code, formAction ] = useFormState(queryDecksCart, undefined)
    //action={formAction}

    const data: string = JSON.stringify(request);
  
    if (!data) {
      throw new Error("Error: data not loaded for baker's decks");
    } */

    const {data: session} = useSession();
    console.log(session?.user?.name, "username");

    if (!session) {
        redirect("/login")
    };

    const router = useRouter();

    const [users] = useState<UsersProps[]>(userschat);
    
    const [message, setMessage] = useState<string>("");
    const [allMsgUser, setAllMsgUser] = useState<DataUserMsg[]>([]);

    const derivatedState = useMemo(() => message, [message]);



/*     const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        const date = new Date();
        const userMessage: DataUserMsg = {
            id: date, session: session.user?.name || "", message: derivatedState
        }
        setAllMsgUser(prevState => [...prevState, userMessage]);
        setMessage("");
    }; */

    const handleLogout = () => {
        router.push("/logout");
    };

    return (
        <div className='w-full h-screen'>
            
            <div className="flex items-center justify-between bg-blue-900">

                <h1 className='text-2xl italic font-bold p-[20px]'>
                    Chat room
                </h1>

                <button type="button" onClick={handleLogout} 
                    className='btn-primary mr-6 shadow-light'
                >
                    Logout
                </button>

            </div>


            <div className='flex w-full h-[calc(100%-70px)]'>


                <UserOnline />

                <div className='w-full h-full'>

                    <ScreenMessage />
                    
                    <FormMessage />

                </div>



            </div>

        </div>
    )
}
