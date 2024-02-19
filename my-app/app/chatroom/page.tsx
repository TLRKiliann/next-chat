"use client";

import type { UsersProps } from '@/app/lib/definitions';
import React, { useState } from 'react'
import { userschat } from '@/app/lib/data';
import Image from 'next/image';

export default function ChatRoom() {

    const [users, setUsers] = useState<UsersProps[]>(userschat)
    const [inputStr, setInputStr] = useState<string>("");
    const [allStr, setAllStr] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event?.currentTarget.value)
        const {value} = event.currentTarget;
        setInputStr(value);
    }

    const handleClick = () => {
        setAllStr((prevState) => [...prevState, inputStr]);
    }

    return (
        <div className='h-screen border-2'>
            
            <h1 className='text-2xl italic font-bold p-[20px] border'>
                Chat room
            </h1>

            <div className='flex w-full h-[calc(100%-70px)] border-2 border-orange-400'>

                <div className='flex flex-col w-[280px] bg-blue-900 border'>

                    {users.map((user: UsersProps) => (
                        user.onLine ? (
                            <div key={user.id} 
                                className='flex items-center justify-between bg-slate-800 mb-4 px-4 py-2 border'>
                                <Image src={user.img} width={30} height={30} alt={user.username} 
                                    className='flex w-[30px] h-[30px] object-cover rounded-full'
                                />
                                <p className='w-[120px] border'>{user.username}</p>
                                {/* <p className='w-[50px] border'>{user.email}</p> */}
                                {user.onLine === true 
                                    ? <span className='w-[20px] h-[20px] bg-green-400 rounded-full'></span> 
                                    : <p>not ok</p>
                                }
                            </div>
                        ) : null
                    ))}

                </div>


                <div className='w-full border'>
                    
                    <div className='flex justify-between bg-slate-700 h-[calc(100%-80px)]'>
                        
                        <div className='border'>
                            Left screen
                        </div>

                        <div className='border'>
                            {allStr.map((a: string) => (
                                <p>{a}</p>
                            ))}
                        </div>

                    </div>
                    
                    <div className='flex items-center justify-center h-[80px] border'>

                        <input type="text" value={inputStr} onChange={handleChange} 
                            placeholder="Write something here..." 
                            className='w-full text-slate-800 mx-4 px-4 py-1 rounded-full'
                        />

                        <button type="button" onClick={handleClick} className='btn-primary mr-4'>
                            Enter
                        </button>

                    </div>

                </div>



            </div>

        </div>
    )
}
