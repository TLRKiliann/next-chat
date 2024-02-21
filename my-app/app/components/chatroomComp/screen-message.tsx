"use client";

import React, { useState } from 'react'

export default function ScreenMessage() {

    const [allMsgUser, setAllMsgUser] = useState<DataUserMsg[]>([]);


    return (               
        <div className='flex justify-between w-full h-[calc(100%-80px)]'>
            
            {/* <div className='w-full h-full overflow-scroll scroll-smooth bg-yellow-600'>
                <p className='text-slate-600 bg-slate-100 m-4 p-2 rounded-tr-lg rounded-bl-lg rounded-br-lg'>
                    Left screen
                </p>
            </div> */}

            {/* `{session.user?.name ? "items-end" : "items-start"}` */}
            <div className='flex flex-col items-end justify-content 
                w-full h-full overflow-scroll scroll-smooth bg-slate-50'>

                {allMsgUser.map((allMsg: DataUserMsg) => (
                    <div key={`${allMsg.id}`} 
                        className='w-[50%] text-slate-600 bg-slate-200 m-4 p-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg'>
                        
                        <p className='text-lg text-slate-800 mb-2'>{allMsg.message}</p>

                        <div className='flex items-center justify-between text-sm text-slate-500'>
                            <p>{allMsg.session}</p>
                            <p>{allMsg.id.toLocaleString()}</p>
                        </div>

                    </div>
                ))}

            </div>

        </div>

    )
}
