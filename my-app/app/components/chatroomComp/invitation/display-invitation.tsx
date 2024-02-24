"use client";

import type { UsersProps } from '@/app/lib/definitions';
import { mysqlSendInvitation } from '@/app/lib/actions';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { redirect } from 'next/navigation';

type DisplayInvitationProps = {
    newMapping: UsersProps[];
    handleCloseInvitation: (id: number) => void;
};

export default function DisplayInvitation({newMapping, handleCloseInvitation}: DisplayInvitationProps) {

    const {pending} = useFormStatus();
    const [code, formData] = useFormState(mysqlSendInvitation, undefined);

    const {data: session} = useSession();

    const [userName, setUserName] = useState<string>("");
    const [selectedRoom, setSelectedRoom] = useState<string>("");

    const [stateRoom, setStateRoom] = useState<{info: boolean, question: boolean, confidential: boolean}>({
        info: false,
        question: false,
        confidential: false
    });

    useEffect(() => {
        if (session && session.user && session.user.name) {
            setUserName(session.user.name)
        };
        return () => console.log("Clean-up session userName !")
    }, [session])

    const handleInfo = (): void => {
        if (stateRoom.info === false) {
            setStateRoom((prevInfo) => ({...prevInfo, info: !prevInfo.info}));
            setSelectedRoom("info");
        } else {
            setStateRoom((prevInfo) => ({...prevInfo, info: !prevInfo.info}));
            setSelectedRoom("");
        }
    };

    const handleQuestion = (): void => {
        if (stateRoom.question === false) {
            setStateRoom((prevQuestion) => ({...prevQuestion, question: !prevQuestion.question}));
            setSelectedRoom("question");
        } else {
            setStateRoom((prevQuestion) => ({...prevQuestion, question: !prevQuestion.question}));
            setSelectedRoom("");
        }
    };

    const handleConfidential = (): void => {
        if (stateRoom.confidential === false) {
            setStateRoom((prevConfi) => ({...prevConfi, confidential: !prevConfi.confidential}));
            setSelectedRoom("confidential");
        } else {
            setStateRoom((prevConfi) => ({...prevConfi, confidential: !prevConfi.confidential}));
            setSelectedRoom("");
        }
    };

    //console.log(stateRoom, "stateRoom");
    //console.log(stateRoom.info, "stateRoom - info");

    if (!session) {
        redirect("/login")
    };
    console.log(selectedRoom, "selectedRoom")
    return (
        <div>
            {newMapping.map((user: UsersProps) => (
                user.boolinvitation === 1 ? (
                    <div key={user.id} className="fixed z-20 top-0 left-0 w-2/5 h-auto
                        bg-slate-200 text-slate-600 rounded-br-xl shadow-2xl">
                        <div className='flex justify-end'>
                            <button type="button" onClick={() => handleCloseInvitation(user.id)}
                                className="flex items-center justify-center w-5 h-5 pb-[2px] text-slate-500 
                                mt-2 mr-2 border border-slate-500 rounded-full"
                            >
                                x
                            </button>
                        </div>
                    
                        <div className='flex flex-col'>
                            <h2 className="font-bold text-lg text-center">Invitation proposal for :</h2>
                            <p className="text-lg text-center text-indigo-600 mt-2 mb-1">{user.username}</p>
                        </div>

                        <div className='flex flex-col items-center justify-center'>
                            <div className='flex items-center justify-between w-[180px] text-slate-100 
                                bg-slate-800 my-2 px-4 py-2 rounded-xl shadow-inside'>
                                <label htmlFor="info">Info</label>
                                <input type="checkbox" id="info" name="info" 
                                    checked={stateRoom.info} onChange={handleInfo} />
                            </div>

                            <div className='flex items-center justify-between w-[180px] text-slate-100 
                                bg-slate-800 my-2 px-4 py-2 rounded-xl shadow-inside'>
                                <label htmlFor="question">Question</label>
                                <input type="checkbox" id="question" name="question" 
                                    checked={stateRoom.question} onChange={handleQuestion} />
                            </div>

                            <div className='flex items-center justify-between w-[180px] text-slate-100 
                                bg-slate-800 my-2 px-4 py-2 rounded-xl shadow-inside'>
                                <label htmlFor="confidential">Confidential</label>
                                <input type="checkbox" id="confidential" name="confidential" 
                                checked={stateRoom.confidential} onChange={handleConfidential} />
                            </div>
                        </div>

                        <form action={formData} className="flex flex-col items-center justify-center">

                            <input type="number" id="id" name="id" value={user.id} hidden readOnly />
                
                            <input type="text" id="usersender" name="usersender" value={userName} hidden readOnly />
                            <input type="number" id="displayinvitation" name="displayinvitation" 
                                value={1} hidden readOnly />

                            <input type="text" id="selectedroom" name="selectedroom" value={selectedRoom} hidden readOnly />
                            <input type="number" id="response" name="response" value={1} hidden readOnly />

                            <button type="submit" id="submit" name="submit" value="updatemessage" disabled={pending}
                                className='text-slate-50 btn-primary mt-4 shadow-btn'
                            >
                                Submit
                            </button>
                            
                            {code?.message ? (
                                <p>{code.message}</p>
                                ) : null
                            }
                        </form>

                        <ul className='flex items-center justify-center'>
                            <li className='list-disc text-md text-blue-600 hover:text-blue-600/70 active:text-blue-500 m-4'>
                                <Link href="/email">Send e-mail</Link>
                            </li>
                        </ul>

                    </div>
                ) : null
            ))}
        </div>
    )
};
