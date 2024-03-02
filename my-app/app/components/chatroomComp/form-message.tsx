"use client";

import type { UsersChatProps, UsersProps } from '@/app/lib/definitions';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { mysqlQueryChatroom } from '@/app/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { effectFunc } from '@/app/lib/functions';

type dataStateProps = {
    newId: number;
    username: string | undefined | null;
    message: string;
    date: Date;
    toggleEmoji: boolean;
};

export default function FormMessage({dataroom, dataUsers}: {dataroom: UsersChatProps[], dataUsers: UsersProps[]}) {

    const { pending } = useFormStatus();
    const [ code, formAction ] = useFormState(mysqlQueryChatroom, undefined)

    const { data: session } = useSession();
    const pathname = usePathname();

    const [dataState, setDataState] = useState<dataStateProps>({
        newId: 0,
        username: "",
        message: "",
        date: new Date,
        toggleEmoji: false
    });

    const callerPathName = effectFunc({pathname});

    useEffect(() => {
        if (session && session.user && session.user.name && session.user.image) {
            setDataState((prev) => ({...prev, username: session.user?.name}));
        };
        return () => console.log("Clean-up useEffect (f-m) 1 !");
    }, [session]);

    useEffect(() => {
        if (dataroom) {
            setDataState((prev) => ({...prev, newId: dataroom.length + 1, date: new Date, message: ""}));
        }
        return () => console.log("Clean-up useEffect (f-m) 2 !");
    }, [dataroom]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value }: HTMLInputElement = event.currentTarget;
        setDataState((prev) => ({...prev, message: value}));
    };

    const handleToggleEmoji = (): void => {
        setDataState((prev) => ({...prev, toggleEmoji: !prev.toggleEmoji}));
    };
    
    const handleClickEmoji = (event: React.MouseEvent<HTMLSpanElement>): void => {
        const value: HTMLSpanElement = event.currentTarget;
        if (value.id === "emo1") {
            setDataState((prev) => ({...prev, message: prev.message + " 🙂 "}));
        } else if (value.id === "emo2") {
            setDataState((prev) => ({...prev, message: prev.message + " 😃 "}));
        } else if (value.id === "emo3") {
            setDataState((prev) => ({...prev, message: prev.message + " 😙 "}));
        } else if (value.id === "emo4") {
            setDataState((prev) => ({...prev, message: prev.message + " 😇 "}));
        } else if (value.id === "emo5") {
            setDataState((prev) => ({...prev, message: prev.message + " 😎 "}));
        } else if (value.id === "emo6") {
            setDataState((prev) => ({...prev, message: prev.message + " 🥲 "}));
        } else if (value.id === "emo7") {
            setDataState((prev) => ({...prev, message: prev.message + " 😈 "}));
        } else {
            console.log("No emoji corresponding...");
        }
        setDataState((prev) => ({...prev, toggleEmoji: false}));
    };

    if (!session) {
        redirect("/login")
    };

    if (code?.message) {
        console.log(code.message);
    };

    return (
        <>
            {dataUsers.map((d: UsersProps) => (
                dataState.username === d.username ? (
                    <form key={d.id} action={formAction} className='absolute z-10 flex items-center justify-around 
                        w-[80%] h-[80px] bg-gradient-to-r from-blue-900 from-10% via-sky-700 via-30% 
                        to-blue-900 to-90% px-4'
                    >

                        <input type="number" id="chatid" name="chatid" value={dataState.newId} hidden readOnly />
                        <input type="number" id="id" name="id" value={d.id} hidden readOnly />
                        
                        <input type="text" id="username" name="username" value={dataState.username} hidden readOnly />
                        <input type="number" id="online" name="online" value={d.online} hidden readOnly />

                        <div className='flex items-center justify-end w-full'>
                            <input type="text" id="message" name="message" value={dataState.message} 
                                onChange={handleChange}
                                placeholder="Comment something here..." 
                                className='w-full text-slate-800 bg-slate-200 placeholder:text-slate-500 mr-10 px-4 py-1 rounded-full'
                            />
                            <button onClick={handleToggleEmoji}
                                className='absolute mr-11 text-xl'
                            >
                                🙂
                            </button>
                            {dataState.toggleEmoji === true ? (
                                <div className='fixed z-10 bottom-[70px] h-auto bg-slate-500 p-4 rounded-xl'>
                                    <div className='bg-slate-800 p-2 rounded-lg'>

                                        <span id="emo1" onClick={(e) => handleClickEmoji(e)} 
                                            className='text-xl cursor-pointer'>
                                            🙂
                                        </span>
                                        <span id="emo2" onClick={(e) => handleClickEmoji(e)} 
                                            className='text-xl cursor-pointer'>
                                            😃
                                        </span>
                                        <span id="emo3" onClick={(e) => handleClickEmoji(e)} 
                                            className='text-xl cursor-pointer'>
                                            😙
                                        </span>
                                        <span id="emo4" onClick={(e) => handleClickEmoji(e)} 
                                            className='text-xl cursor-pointer'>
                                            😇
                                        </span>
                                        <span id="emo5" onClick={(e) => handleClickEmoji(e)} 
                                            className='text-xl cursor-pointer'>
                                            😎
                                        </span>
                                        <span id="emo6" onClick={(e) => handleClickEmoji(e)} 
                                            className='text-xl cursor-pointer'>
                                            🥲
                                        </span>
                                        <span id="emo7" onClick={(e) => handleClickEmoji(e)} 
                                            className='text-xl cursor-pointer'>
                                            😈
                                        </span>

                                    </div>
                                </div>
                                ) : null
                            }
                        </div>

                        <input type="text" id="room" name="room" value={callerPathName} hidden readOnly />
                        <input type="text" id="date" name="date" value={dataState.date.toLocaleString()} hidden readOnly />

                        <button type="submit" id="submit" name="submit"
                            value="insert" disabled={pending}
                            className='btn-primary'>
                            {pending ? "Pending..." : "Enter"}
                        </button>

                    </form>
                ) : null
            ))}
        </>
    )
};
