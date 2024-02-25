"use client";

import type { UsersProps } from '@/app/lib/definitions';
import returnToChatRoom from '@/app/lib/actions';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

export default function BackToChatroom({dataUsers}: {dataUsers: UsersProps[]}) {

    const {pending} = useFormStatus();
    const [code, formData] = useFormState(returnToChatRoom , undefined);

    const {data: session} = useSession();

    const router = useRouter();

    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        if (session && session.user && session.user.name) {
            setUserName(session.user.name);
        }
    }, [dataUsers]);

    if (code?.message) {
        router.push("/chatroom");
    } else {
        return "Not pushed by router.push()";
    };

    const mapping = dataUsers.map((user: UsersProps) => user.username === userName);
    console.log(mapping, "mapping from backtochatroom");

    return (
        <div className='fixed z-20 w-[25%] bg-slate-200 text-slate-900 py-10'>
            {dataUsers.map((user: UsersProps) => (

                <form key={user.id} action={formData}>
                    
                    <input type="number" id="id" name="id" value={user.id} hidden readOnly />
                    <input type="text" id="sender" name="sender" value={user.sender} hidden readOnly />
                    <input type="text" id="selectedroom" name="selectedroom" value={user.selectedroom} hidden readOnly />
                    <input type="number" id="response" name="response" value={0} hidden readOnly />

                    <button type="submit" id="submit" name="submit" value="btnBackToMain" disabled={pending}>
                        Back to chatroom
                    </button>

                </form>
            ))}
        </div>
    )
}
