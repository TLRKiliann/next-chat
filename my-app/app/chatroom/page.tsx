"use client";

import type { UsersProps } from '@/app/lib/definitions';
import React, { useState } from 'react'
import { userschat } from '@/app/lib/data';
import Image from 'next/image';

export default function ChatRoom() {

    const [users, setUsers] = useState<UsersProps[]>(userschat)

    return (
        <div>
            <h1>Chat room</h1>

            {users.map((user: UsersProps) => (
                user.onLine ? (
                    <div key={user.id} className='flex items-center justify-between w-3/5 border'>
                        <Image src={user.img} width={20} height={20} alt={user.username} />
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                        {user.onLine === true ? <p>online</p> : <p>not ok</p>}
                        
                    </div>

                ) : null
            ))}

        </div>
    )
}
