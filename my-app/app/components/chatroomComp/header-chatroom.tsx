"use client";

import React from 'react'
import { useRouter } from 'next/navigation';

export default function HeaderChatroom() {

    const router = useRouter();

    const handleLogout = () => {
        router.push("/logout");
    };

    return (
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
    )
}
