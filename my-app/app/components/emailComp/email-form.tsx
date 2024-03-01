"use client";

import type { EmailProps, UsersProps } from '@/app/lib/definitions';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useFormState, useFormStatus } from 'react-dom';
import { emailSubmitAction } from '@/app/lib/actions';

export default function EmailForm({dataUsers, emailResponse}: {dataUsers: UsersProps[], emailResponse: EmailProps[]}) {

    const { data: session } = useSession();

    const { pending } = useFormStatus();
    const [code, formData] = useFormState(emailSubmitAction, undefined);

    const [userName, setUserName] = useState<string>("");
    const [newId, setNewId] = useState<number>(0);

    useEffect(() => {
        const nbEmail = emailResponse.length + 1;
        setNewId(nbEmail);
        return () => console.log("clean-up email (1)");
    }, []);

    useEffect(() => {
        if (session && session.user && session.user.name) {
            setUserName(session.user.name)
        };
        return () => console.log("clean-up email (2)");
    }, [session]);

    const [email, setEmail] = useState<string>("Email");
    const [textArea, setTextArea] = useState<string>("");

    const handleEmail = (event: React.ChangeEvent<HTMLSelectElement>): void => {
      const { value } = event.currentTarget;
      console.log(value, "value selected");
      setEmail(value);
    };

    const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.currentTarget;
        console.log(value, "value selected");
        setTextArea(value);
    };

    return (
        <div className='w-[440px] h-auto bg-gradient-to-r from-blue-900 from-10% 
        via-sky-700 via-50% to-blue-900 to-90% m-auto mt-28 rounded-xl'>
            
            <form action={formData} className='flex flex-col items-center justify-around'>

                <div className='flex items-center justify-center w-full h-20 '>
                    <label htmlFor="email" className='text-lg'>Select an email:</label>
                    <select name="email" id="email" value={email} onChange={handleEmail} 
                        className='text-slate-700 mx-2 px-2 py-1 rounded'>
                        {dataUsers.map((user: UsersProps) => (
                            <option key={user.id} value={user.email}>{user.email}</option>
                        ))}
                    </select>
                </div>

                <input type="number" name="id" id="id" value={newId} hidden readOnly />
                <input type="text" name="sender" id="sender" value={userName} hidden readOnly />
                {/* <input type="text" name="email" id="email" value={email} hidden readOnly /> */}

                <textarea name="textArea" id="textArea" cols={30} rows={10} placeholder="Comment here..."
                    className='text-slate-700 p-2 rounded' value={textArea} onChange={handleText}
                >
                </textarea>

                <div className='flex w-full h-20'>
                    <button type="submit" id="submit" name="submit" value="btnEmail" disabled={pending} className='btn-primary m-auto'
                    >
                        {pending ? "Pending..." : "Submit"}
                    </button>
                </div>

                {code?.message ? (
                    <p className='text-slate-50 mb-4'>{code.message}</p>
                ) : null}

            </form>

        </div>
    )
}
