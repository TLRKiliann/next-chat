"use client";

import type { UsersProps } from '@/app/lib/definitions';
import returnToChatRoom from '@/app/lib/actions';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

const SELECTEDROOM = "chatroom";
const RESPONSE = 0;

export default function BackToChatroom({dataUsers}: {dataUsers: UsersProps[]}) {

    const { pending } = useFormStatus();
    const [code, formData] = useFormState(returnToChatRoom , undefined);

    const { data: session } = useSession();

    const router = useRouter();

    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        if (session && session.user && session.user.name) {
            setUserName(session.user.name);
        }
    }, [session]);

    const handleRouteToChange = () => {
        setTimeout(() => {
            const dataFilter = dataUsers.filter((d: UsersProps) => d.selectedroom === "chatroom");
            console.log(dataFilter, "data filter");
            const mappingRoom = dataFilter.map((u: UsersProps) => u.selectedroom);
            console.log(mappingRoom, "mapping room");
            if (mappingRoom) {
                router.push("/chatroom");
            }
        }, 2000)
    };

    console.log(code?.message ? code.message : "No code message");
    
    return (
        <div className='fixed z-20 bottom-0 left-0 w-1/5 bg-slate-200 text-slate-900 py-10'>
            {dataUsers.map((user: UsersProps) => (
                user.username === userName ? (
                    <form key={user.id} action={formData}>
                        
                        <input type="number" id="id" name="id" value={user.id} hidden readOnly />
                        <input type="text" id="sender" name="sender" value={user.sender} hidden readOnly />
                        <input type="text" id="selectedroom" name="selectedroom" value={SELECTEDROOM} hidden readOnly />
                        <input type="number" id="response" name="response" value={RESPONSE} hidden readOnly />

                        <button type="submit" id="submit" name="submit" value="btnBackToMain" 
                            onClick={handleRouteToChange}
                            disabled={pending}
                        >
                            Back to chatroom
                        </button>

                    </form>
                ) : null
            ))}
        </div>
    )
}
