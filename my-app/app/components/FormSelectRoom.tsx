"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FormSelectRoom() {

    const router = useRouter();
    const [selectVal, setSelectVal] = useState("chatroom");
  
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
      const { value }: HTMLSelectElement = event.currentTarget;
      setSelectVal(value);
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      const form: HTMLFormElement = event.currentTarget;
      const formData: FormData = new FormData(form);
      const finalVal: FormDataEntryValue | null = formData.get("room");
      if (finalVal === "development") {
        router.push(`/chatroom/development`);
      } else if (finalVal === "programming") {
        router.push(`/chatroom/programming`);
      } else if (finalVal === "security") {
        router.push(`/chatroom/security`);
      } else {
        console.log("chatroom by default")
        router.push(`/chatroom`);
      }
    };

    return (
        <form onSubmit={(event) => handleSubmit(event)} 
            className='flex flex-col items-center justify-between bg-slate-900/60 w-[400px] h-auto 
              m-auto p-10 rounded-xl shadow-inside'>

            <div className='flex items-center justify-between mb-10'>
              <label htmlFor="room" className='text-xl'>Select a room:</label>
              <select name="room" id="room" value={selectVal} onChange={handleSelect} 
                  className='text-slate-800 mx-2 px-2 py-1'>
                  <option value="chatroom">Chatroom</option>
                  <option value="development">Development</option>
                  <option value="programming">Programming</option>
                  <option value="security">Security</option>
              </select>

            </div>

            <button type="submit" className='btn-primary'>Submit</button>

        </form>
    )
}
