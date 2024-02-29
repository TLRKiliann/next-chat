"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import { FaPowerOff } from "react-icons/fa6";

export default function HeaderChatroom({children}: {children: React.ReactNode}) {

    const router = useRouter();

    const handleLogout = (): void => {
        router.push("/logout");
    };

    return (
        <div className="flex items-center justify-between bg-gradient-to-r from-blue-900 from-10% 
            via-sky-700 via-30% to-blue-900 to-90%"
        >

            <h1 className='text-2xl italic font-bold p-[20px]'>
                {children}
            </h1>

            <button type="button" onClick={handleLogout} 
                className='text-slate-200 bg-blue-600 transition ease-in-out transform duration-100 hover:scale-105 hover:bg-blue-600/70 
                active:bg-blue-400 active:scale-95 px-2 py-2 rounded-full hover:shadow-none active:shadow-none mr-4'
            >
                <FaPowerOff />
            </button>

        </div>
    )
}
