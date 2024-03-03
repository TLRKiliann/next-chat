"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import { FaPowerOff } from "react-icons/fa6";
import Link from 'next/link';

export default function HeaderChatroom({children}: {children: React.ReactNode}) {

    const router = useRouter();

    const handleLogout = (): void => {
        router.push("/logout");
    };

    return (
        <div className="flex items-center justify-between bg-gradient-to-r from-blue-900 from-10% 
            via-sky-700 via-30% to-blue-900 to-90%"
        >

            <h1 className='w-[20%] text-2xl italic font-bold p-5'>
                {children}
            </h1>

            <div className='flex items-center justify-between w-[70%] text-cyan-400'>
                <div>
                    <Link href="/">Home</Link>
                </div>
                <div>
                    <Link href="/chatroom/development">Development</Link>
                </div>
                <div>
                    <Link href="/chatroom/programming">Programming</Link>
                </div>
                <div>
                    <Link href="/chatroom/security">Security</Link>
                </div>
            </div>

            <div className='w-20%'>
                <button type="button" onClick={handleLogout} 
                    className='w-8 h-8 text-slate-200 bg-blue-600 transition ease-in-out transform duration-100 
                    hover:scale-105 hover:bg-blue-600/70 active:bg-blue-400 active:scale-95 
                    rounded-full hover:shadow-none active:shadow-none border-none mx-4'
                >
                    <FaPowerOff size={18} className='m-auto' />
                </button>
            </div>

        </div>
    )
}
