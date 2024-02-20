"use client";

import type { UsersProps } from '@/app/lib/definitions';
import React, { useState, useMemo } from 'react';
import { useSession } from "next-auth/react";
import { redirect, useRouter } from 'next/navigation';
import { userschat } from '@/app/lib/data';
import Image from 'next/image';

export default function ChatRoom() {

    const {data: session} = useSession();

    console.log(session?.user?.name, "username");

    if (!session) {
        redirect("/login")
    };

    const router = useRouter();

    const [users, setUsers] = useState<UsersProps[]>(userschat);
    
    const [inputStr, setInputStr] = useState<string>("");
    const [allStr, setAllStr] = useState<string[]>([]);

    const derivatedState = useMemo(() => inputStr, [inputStr]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event?.currentTarget.value)
        const {value} = event.currentTarget;
        setInputStr(value);
    };

    const handleClick = () => {
        setAllStr((prevState) => [...prevState, derivatedState]);
        setInputStr("");
    };

    const handleLogout = () => {
        router.push("/logout");
    };

    return (
        <div className='h-screen'>
            
            <div className="flex items-center justify-between">

                <h1 className='text-2xl italic font-bold p-[20px]'>
                    Chat room
                </h1>

                <button type="button" onClick={handleLogout} 
                    className='bg-slate-600 mr-[20px] px-4 py-2 rounded'
                >
                    Logout
                </button>

            </div>


            <div className='flex w-full h-[calc(100%-70px)]'>


                <div className='flex flex-col w-[20%] bg-blue-900'>

                    {users.map((user: UsersProps) => (
                        user.onLine ? (
                            <div key={user.id} 
                                className='flex items-center justify-between bg-slate-800 mb-4 px-4 py-2'>
                                <Image src={user.img} width={30} height={30} alt={user.username} 
                                    className='flex w-[30px] h-[30px] object-cover rounded-full'
                                />
                                <p className='w-[120px]'>{user.username}</p>
                                {/* <p className='w-[50px] border'>{user.email}</p> */}
                                {user.onLine === true 
                                    ? <span className='w-[20px] h-[20px] bg-green-400 rounded-full'></span> 
                                    : <p>not ok</p>
                                }
                            </div>
                        ) : null
                    ))}

                </div>



                <div className='w-full'>
                    
                    <div className='flex justify-between bg-slate-700 h-[calc(100%-80px)]'>
                        
                        <div className='w-full h-full overflow-scroll scroll-smooth bg-yellow-600'>
                            <p className='text-slate-600 bg-slate-100 m-4 p-2 rounded-tr-lg rounded-bl-lg rounded-br-lg'>
                                Left screen
                            </p>
                        </div>

                        <div className='w-full h-full overflow-scroll scroll-smooth bg-blue-600'>
                            {allStr.map((a: string) => (
                                <p key={a} className='text-slate-600 bg-slate-100 m-4 p-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg'>
                                    {a}
                                </p>
                            ))}
                        </div>

                    </div>
                    


                    <div className='absolute flex items-center justify-between w-5/6 h-[80px] bg-slate-700 z-10 px-4'>

                        <input type="text" value={inputStr} onChange={handleChange} 
                            placeholder="Write something here..." 
                            className='w-[90%] text-slate-800 px-4 py-1 rounded-full'
                        />

                        <button type="button" onClick={handleClick} className='btn-primary'>
                            Enter
                        </button>

                    </div>

                </div>



            </div>

        </div>
    )
}
