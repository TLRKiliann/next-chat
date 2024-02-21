"use client";

import { mysqlQueryChatroom } from '@/app/lib/actions';
import React, {useState} from 'react';
import { useFormState, useFormStatus } from 'react-dom';

export default function FormMessage() {
    
    const { pending } = useFormStatus();
    const [ code, formAction ] = useFormState(mysqlQueryChatroom, undefined)

    const [message, setMessage] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setMessage(value);
    };

    return (
        <form action={formAction} className='absolute flex items-center justify-between w-[80%] h-[80px]
            bg-gradient-to-r from-blue-900 from-10% via-sky-700 via-30% to-blue-900 to-90% 
            z-10 px-4'
        >

            <input type="text" value={message} onChange={handleChange} 
                placeholder="Write something here..." 
                className='w-[90%] text-slate-800 px-4 py-1 rounded-full'
            />

            <button type="submit" className='btn-primary shadow-light' disabled={pending}>
                Enter
            </button>

            {code?.message ? (
                <p>{code.message}</p>
            ) : null}
        </form>
    )
}
