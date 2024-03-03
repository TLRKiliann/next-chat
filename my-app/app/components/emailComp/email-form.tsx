"use client";

import type { EmailProps, UsersProps } from '@/app/lib/definitions';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useFormState, useFormStatus } from 'react-dom';
import { emailSubmitAction } from '@/app/lib/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EmailForm({dataUsers, emailResponse}: {dataUsers: UsersProps[], emailResponse: EmailProps[]}) {

    const { data: session } = useSession();

    const { pending } = useFormStatus();
    const [code, formData] = useFormState(emailSubmitAction, undefined);

    const [userName, setUserName] = useState<string>("");
    const [newId, setNewId] = useState<number>(0);
    const [email, setEmail] = useState<string>("Email");
    const [textArea, setTextArea] = useState<string>("");

    useEffect(() => {
        const timer = setTimeout(() => {
            const nbEmail = emailResponse.length + 1;
            setNewId(nbEmail);
        }, 2000);
        return () => console.log("clean-up email (1)");
    }, [emailResponse]);

    useEffect(() => {
        if (session && session.user && session.user.name) {
            setUserName(session.user.name)
        };
        return () => console.log("clean-up email (2)");
    }, [session]);

    const handleEmail = (event: React.ChangeEvent<HTMLSelectElement>): void => {
      const { value }: HTMLSelectElement = event.currentTarget;
      setEmail(value);
    };

    const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const { value }: HTMLTextAreaElement = event.currentTarget;
        setTextArea(value);
    };

    const handleTimer = () => {
        toast.success("Message sent !", {
            autoClose: 2000,
            position: 'top-center'
        });
        setTextArea("");
    }

    //console.log(newId, "new ID");
    
    if (code?.message) {
        console.log(code?.message);
    };

    return (
        <div className='md:w-[440px] xl:w-[600px] h-auto bg-gradient-to-r from-blue-900 from-10% 
        via-sky-700 via-50% to-blue-900 to-90% rounded-xl'>
            
            <form action={formData} className='flex flex-col px-10'>

                <div className='flex items-center justify-between w-full py-4'>
                    <label htmlFor="email" className='text-lg'>Select an email:</label>
                    <select name="email" id="email" value={email} onChange={handleEmail} 
                        className='text-slate-700 px-2 py-1 rounded'>
                        {dataUsers.map((user: UsersProps) => (
                            <option key={user.id} value={user.email}>{user.email}</option>
                        ))}
                    </select>
                </div>

                <input type="number" name="id" id="id" value={newId} hidden readOnly />
                <input type="text" name="sender" id="sender" value={userName} hidden readOnly />

                <textarea name="textArea" id="textArea" cols={30} rows={10} placeholder="Comment here..."
                    className='text-slate-700 p-2 rounded' value={textArea} onChange={handleText}
                >
                </textarea>

                <input type="number" name="bool_text" id="bool_text" value={0} hidden readOnly />
                
                <input type="reset" id="refresher" hidden />

                <div className='flex w-full py-4'>
                    <button type="submit" id="submit" name="submit" value="btnEmail" disabled={pending}
                        onClick={handleTimer}
                        className='font-bold btn-primary m-auto'
                    >
                        {pending ? "Pending..." : "Submit"}
                    </button>
                </div>

                {/* {code?.message ? (
                    <p className='text-cyan-400 text-center mb-4'>{code.message}</p>
                ) : null} */}

            </form>

        </div>
    )
}
