"use client";

import type { UsersProps } from '@/app/lib/definitions';
import React, { useState } from 'react';

export default function EmailForm({dataUsers}: {dataUsers: UsersProps[]}) {

    const [email, setEmail] = useState<string>("");
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
            
            <form action="" className='flex flex-col items-center justify-around'>

                <div className='flex items-center justify-center w-full h-20 '>
                    <label htmlFor="email" className='text-lg'>Select an email:</label>
                    <select name="email" id="email" value={email} onChange={handleEmail} 
                        className='text-slate-800 mx-2 px-2 py-1'>
                        {dataUsers.map((user: UsersProps) => (
                            <option key={user.id} value={user.email}>{user.email}</option>
                        ))}
                    </select>
                </div>

                <textarea name="emailtext" id="emailtext" cols={30} rows={10} placeholder="Comment here..."
                    className='text-slate-700 p-2 rounded' value={textArea} onChange={handleText}
                >
                </textarea>

                <div className='flex w-full h-20'>
                    <button type="submit" className='btn-primary m-auto'>Submit</button>
                </div>

            </form>

        </div>
    )
}
