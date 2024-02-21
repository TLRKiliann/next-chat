"use client";

import type { UsersProps } from '@/app/lib/definitions';
import React, { useState, useMemo } from 'react';
import { useSession } from "next-auth/react";
import { redirect, useRouter } from 'next/navigation';
import { userschat } from '@/app/lib/data';
import Image from 'next/image';

type DataUserMsg = {
    id: Date;
    session: string;
    message: string;
}

//client !
export default function ChatRoom() {

    //const [code, formAction] = functionToCall(dataToPass, undefined)


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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setMessage(value);
    };

    const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        const date = new Date();
        const userMessage: DataUserMsg = {
            id: date, session: session.user?.name || "", message: derivatedState
        }
        setAllMsgUser(prevState => [...prevState, userMessage]);
        setMessage("");
    };

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


                <div className='flex flex-col w-[25%] bg-blue-900'>

                    {users.map((user: UsersProps) => (
                        user.onLine ? (
                            <div key={user.id} 
                                className='flex items-center justify-start bg-slate-800 border-b border-slate-500 px-4 py-3'>
                                <Image src={user.img} width={30} height={30} alt={user.username} 
                                    className='flex w-[30px] h-[30px] object-cover rounded-full'
                                />
                                <p className='w-[80%] px-2'>{user.username}</p>
                                {/* <p className='w-[50px] border'>{user.email}</p> */}
                                {user.onLine === true 
                                    ? <span className='w-[20px] h-[20px] bg-green-400 border border-green-400 rounded-full'></span> 
                                    : <p>not ok</p>
                                }
                            </div>
                        ) : null
                    ))}

                </div>



                <div className='w-full h-full'>
                    
                    <div className='flex justify-between w-full h-[calc(100%-80px)]'>
                        
                        {/* <div className='w-full h-full overflow-scroll scroll-smooth bg-yellow-600'>
                            <p className='text-slate-600 bg-slate-100 m-4 p-2 rounded-tr-lg rounded-bl-lg rounded-br-lg'>
                                Left screen
                            </p>
                        </div> */}

                        {/* `{session.user?.name ? "items-end" : "items-start"}` */}
                        <div className='flex flex-col items-end justify-content 
                            w-full h-full overflow-scroll scroll-smooth bg-slate-50'>

                            {allMsgUser.map((allMsg: DataUserMsg) => (
                                <div key={`${allMsg.id}`} 
                                    className='w-[50%] text-slate-600 bg-slate-200 m-4 p-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg'>
                                    
                                    <p className='text-lg text-slate-800 mb-2'>{allMsg.message}</p>
        
                                    <div className='flex items-center justify-between text-sm text-slate-500'>
                                        <p>{allMsg.session}</p>
                                        <p>{allMsg.id.toLocaleString()}</p>
                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>
                    


                    <form onSubmit={handleClick} className='absolute flex items-center justify-between w-[80%] h-[80px]
                        bg-gradient-to-r from-blue-900 from-10% via-sky-700 via-30% to-blue-900 to-90% 
                        z-10 px-4'
                    >

                        <input type="text" value={message} onChange={handleChange} 
                            placeholder="Write something here..." 
                            className='w-[90%] text-slate-800 px-4 py-1 rounded-full'
                        />

                        <button type="submit" className='btn-primary shadow-light'>
                            Enter
                        </button>

                    </form>

                </div>



            </div>

        </div>
    )
}
