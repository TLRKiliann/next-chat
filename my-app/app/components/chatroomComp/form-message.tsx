"use client";

import React, { useState, useEffect } from 'react';
import { mysqlQueryChatroom } from '@/app/lib/actions';
import { UsersChatProps } from '@/app/lib/definitions';
import { useSession } from 'next-auth/react';
import { useFormState, useFormStatus } from 'react-dom';
import { redirect } from 'next/navigation';

export default function FormMessage({data}: {data: UsersChatProps[]}) {

    const {data: session} = useSession();

    if (!session) {
        redirect("/login")
    };

    const { pending } = useFormStatus();
    const [ code, formAction ] = useFormState(mysqlQueryChatroom, undefined)

    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        if (session && session.user && session.user.name) {
            setUsername(session.user.name);
        }
        return () => console.log("Clean-up useEffect !");
    }, []);

    const [message, setMessage] = useState<string>("");

    console.log("hello FormMessage");
/*     //const username = session.user?.name;
    //console.log(username, "username");
   

    //const derivatedState = useMemo(() => message, [message]);

    //const id = Date.now();

    //console.log(data, "data (2)")

    const findById = data.find((d: UsersChatProps) => d.username === session.user.name);
    
    console.log(findById, "findById");
    console.log("hello FormMessage (2)")
    
    let id;
    let room;
    let online;
    let email;    

    if (findById !== undefined && findById !== null) {
        id = findById.id;
        room = findById.room;
        email = findById.email;
        online = findById.online;
    }

    console.log(id, room, online, email, "definitvely");
 */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setMessage(value);
    };

    return (
        <form action={formAction} className='absolute z-10 flex items-center justify-between w-[80%] h-[80px]
            bg-gradient-to-r from-blue-900 from-10% via-sky-700 via-30% to-blue-900 to-90% 
            px-4'
        >

            <input type="text" id="username" name="username" value={username} hidden readOnly />
{/* 
            <input type="number" id="id" name="id" value={id} hidden readOnly />
            <input type="text" id="username" name="username" value={username} hidden readOnly />
            <input type="text" id="email" name="email" value={email} hidden readOnly />
            <input type="text" id="online" name="online" value={online} hidden readOnly />
 */}
            <input type="text" id="message" name="message" value={message} onChange={handleChange} 
                placeholder="Comment something here..." 
                className='w-[90%] text-slate-800 placeholder:text-slate-500 px-4 py-1 rounded-full'
            />

{/*             <input type="text" id="room" name="room" value={room} hidden readOnly />
 */}
            <button type="submit" id="submit" name="submit" value="btnSubmit" disabled={pending}
                className='btn-primary shadow-light'>
                {pending ? "Pending..." : "Enter"}
            </button>

            {code?.message ? (
                <p className='text-lg text-green-400'>{code.message}</p>
            ) : null}
        </form>
    )
}
