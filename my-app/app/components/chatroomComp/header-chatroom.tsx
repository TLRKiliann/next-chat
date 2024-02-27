"use client";

import React from 'react'
import { useRouter } from 'next/navigation';

export default function HeaderChatroom({children}: {children: React.ReactNode}) {

    const router = useRouter();

    const handleLogout = () => {
        router.push("/logout");
    };

    return (
        <div className="flex items-center justify-between 
            bg-gradient-to-r from-blue-900 from-10% via-sky-700 via-30% to-blue-900 to-90%">

            <h1 className='text-2xl italic font-bold p-[20px]'>
                {children}
            </h1>

            <button type="button" onClick={handleLogout} 
                className='btn-primary mr-6'
            >
                Logout
            </button>

        </div>
    )
}
