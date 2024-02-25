"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FormSelectRoom() {

    const router = useRouter();
    const [selectVal, setSelectVal] = useState("security");
  
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.currentTarget;
      console.log(value, "value selected");
      setSelectVal(value);
    }
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);
      const finalVal = formData.get("room");
  
      if (finalVal === "development") {
        router.push(`/chatroom/development`);
      } else if (finalVal === "programming") {
        router.push(`/chatroom/programming`);
      } else {
        console.log("Nothing choosen !")
        router.push(`/chatroom/security`);
      }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} 
            className='flex flex-col items-center justify-between h-[120px] mt-40 p-4'>

            <label htmlFor="room">Select a room:
            <select name="room" id="room" value={selectVal} onChange={handleSelect} 
                className='text-slate-800 mx-2 px-2 py-1'>
                <option value="security">Security</option>
                <option value="development">Development</option>
                <option value="programming">Programming</option>
            </select>
            </label>

            <button type="submit" className='btn-primary shadow-light'>Submit</button>

        </form>
    )
}
