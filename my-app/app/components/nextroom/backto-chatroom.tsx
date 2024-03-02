"use client";

import type { UsersProps } from '@/app/lib/definitions';
import returnToChatRoom from '@/app/lib/actions';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

const SENDERMSG = "";
const SELECTROOM = "/chatroom";
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

    const handleRouteToChange = (): void => {
        setTimeout(() => {
            const dataFilter: UsersProps[] = dataUsers.filter((d: UsersProps) => d.selectedroom === "/chatroom");
            const mappingRoom: string[] = dataFilter.map((u: UsersProps) => u.selectedroom);
            if (mappingRoom) {
                router.push("/chatroom");
            }
        }, 2000)
    };

    if (code?.message) {
        console.info(code.message);
    };
    
    return (
        <div className='fixed z-20 bottom-0 left-0 w-1/5 bg-blue-900 text-slate-900 pb-5'>
            {dataUsers.map((user: UsersProps) => (
                user.username === userName ? (
                    <form key={user.id} action={formData} className='flex'>
                        
                        <input type="number" id="id" name="id" value={user.id} hidden readOnly />
                        <input type="text" id="sender" name="sender" value={SENDERMSG} hidden readOnly />
                        <input type="text" id="selectedroom" name="selectedroom" value={SELECTROOM} hidden readOnly />
                        <input type="number" id="response" name="response" value={RESPONSE} hidden readOnly />

                        <button type="submit" id="submit" name="submit" value="btnBackToMain" 
                            onClick={handleRouteToChange}
                            disabled={pending}
                            className='text-slate-50 btn-primary m-auto'
                        >
                            {pending ? "Pending..." : "Back to chatroom"}
                        </button>

                    </form>
                ) : null
            ))}
        </div>
    )
}
