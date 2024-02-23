"use client";

import type { UsersChatProps } from '@/app/lib/definitions';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { mysqlQueryChatroom } from '@/app/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function FormMessage({dataroom}: {dataroom: UsersChatProps[]}) {

    const { pending } = useFormStatus();
    const [ code, formAction ] = useFormState(mysqlQueryChatroom, undefined)

    const {data: session} = useSession();

    const [newId, setNewId] = useState<number>(0);
    const [username, setUsername] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date);
    const [img, setImg] = useState<string>("");

    const pathname = usePathname();
    //console.log(pathname, "pathname");

    useEffect(() => {
        if (session && session.user && session.user.name && session.user.image) {
            setUsername(session.user.name);
            setImg(session.user.image);
        }
        return () => console.log("Clean-up useEffect !");
    }, []);

    useEffect(() => {
        if (dataroom) {
            setNewId(dataroom.length + 1);
            setDate(new Date);
            setMessage("");
        }
        return () => console.log("Clean-up useEffect 2 !");
    }, [dataroom]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setMessage(value);
    };

    if (!session) {
        redirect("/login")
    };

    const verifyCodeMsg = code?.message ? code.message : null;
    console.log(verifyCodeMsg, "return of code.message");
    
    return (
        <>
            {dataroom.map((d: UsersChatProps) => (
                username === d.username ? (
                    <form key={d.id} action={formAction} className='absolute z-10 flex items-center justify-around w-[80%] h-[80px]
                        bg-gradient-to-r from-blue-900 from-10% via-sky-700 via-30% to-blue-900 to-90% px-4'
                    >

                        <input type="number" id="id" name="id" value={newId} hidden readOnly />
                        <input type="text" id="username" name="username" value={username} hidden readOnly />
                        <input type="text" id="email" name="email" value={d.email} hidden readOnly />
                        <input type="number" id="online" name="online" value={d.online} hidden readOnly />

                        <input type="text" id="message" name="message" value={message} 
                            onChange={handleChange}
                            placeholder="Comment something here..." 
                            className='w-[80%] text-slate-800 bg-slate-200 placeholder:text-slate-500 px-4 py-1 rounded-full'
                        />

                        <input type="text" id="room" name="room" value={pathname} hidden readOnly />

                        <input type="text" id="date" name="date" value={date.toLocaleString()} hidden readOnly />
                        <input type="text" id="img" name="img" value={img} hidden readOnly />

                        <button type="submit" id="submit" name="submit"
                            value="insert" disabled={pending}
                            className='btn-primary shadow-light'>
                            {pending ? "Pending..." : "Enter"}
                        </button>

                    </form>
                ) : null
            ))}
        </>
    )
};
