import type { UsersProps } from '@/app/lib/definitions';
import React, { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import { mysqlResponseInvitation } from '@/app/lib/actions';
import { useSession } from "next-auth/react";

type ResponseReceiverProps = {
    newMapping: UsersProps[];
    acceptInvite: boolean;
    refuseInvite: boolean;
    senderResponse: UsersProps | undefined;
    handleAccept: () => void;
    handleRefuse: () => void;
    handleRouteToChange: () => void;
}

export default function ResponseReceiver({
    newMapping, 
    acceptInvite, 
    refuseInvite, 
    handleAccept, 
    handleRefuse,
    handleRouteToChange,
    senderResponse }: ResponseReceiverProps) {

    const {pending} = useFormStatus();
    const [code, formData] = useFormState(mysqlResponseInvitation, undefined);

    const {data: session} = useSession();

    const [userName, setUserName] = useState<string>("");
    console.log(userName, "userName");

    useEffect(() => {
        if (session && session.user && session.user.name) {
            setUserName(session.user.name);
        }
        return () => console.log("clean-up response-receive");
    }, [session]);

    return (
        <>
            {newMapping.map((user: UsersProps) => (
                (user.display === 1) && (user.username === userName) ? (
                    <div key={user.id} className='fixed z-10 top-0 left-0 w-[400px] text-slate-600
                        bg-slate-200 rounded-br-xl shadow-lg'>
                        
                        <h2 className='text-xl font-bold text-center my-2'>Invitation</h2>
                        
                        <p className='px-10 py-2'>
                            <span className='text-red-600'>
                                {user.sender} 
                            </span>
                            &nbsp;sent an invitation to you for gooing to&nbsp;
                            <span className='text-red-600'>
                                {user.selectedroom}&nbsp;
                            </span>
                            room.
                        </p>

                        <h2 className="font-bold mb-2 px-10 py-2">
                            Accept ?
                        </h2>

                        <div className='flex items-center justify-around w-[200px] m-auto'>

                            <span>
                                <label htmlFor="accept">Yes</label>
                                <input type="checkbox" id="accept" name="accept" 
                                    checked={acceptInvite} onChange={handleAccept} className='ml-2'/>
                            </span>

                            <span>
                                <label htmlFor="refuse">No</label>
                                <input type="checkbox" id="refuse" name="refuse" 
                                    checked={refuseInvite} onChange={handleRefuse} className='ml-2' />              
                            </span>

                        </div>

                        <form action={formData}>
                            {acceptInvite === true && refuseInvite === false ? (
                                <>
                                    <input type="number" id="otherid" name="otherid" value={user.id} hidden readOnly />
                                    <input type="number" id="otherdisplay" name="otherdisplay" value={0} hidden readOnly />
                                    
                                    <input type="number" id="id" name="id" 
                                        value={senderResponse?.id ? senderResponse.id : ""} hidden readOnly />
                                    <input type="string" id="selectedroom" name="selectedroom" 
                                        value={user.selectedroom} hidden readOnly />
                                    <input type="number" id="display" name="display" value={0} hidden readOnly />
                                    <input type="string" id="usersender" name="usersender" value={user.username} hidden readOnly />
                                    <input type="number" id="reponse" name="response" value={1} hidden readOnly />                                
                                </>
                                ) : null
                            }

                            {refuseInvite === true && acceptInvite === false ? (
                                <>
                                    <input type="number" id="otherid" name="otherid" value={user.id} hidden readOnly />
                                    <input type="number" id="otherdisplay" name="otherdisplay" value={0} hidden readOnly />

                                    <input type="number" id="id" name="id" 
                                        value={senderResponse?.id ? senderResponse.id : ""} hidden readOnly />
                                    <input type="string" id="selectedroom" name="selectedroom" 
                                        value={user.selectedroom} hidden readOnly />
                                    <input type="number" id="display" name="display" value={0} hidden readOnly />
                                    <input type="string" id="usersender" name="usersender" value={user.username} hidden readOnly />
                                    <input type="number" id="reponse" name="response" value={0} hidden readOnly />   
                                </>
                                ) : null
                            }
                            
                            <div className='flex items-center justify-center mt-6 mb-2'>
                                {acceptInvite === false}
                                <button type="submit" id="submit" name="submit" value="responseInvite"
                                    onClick={handleRouteToChange} 
                                    disabled={pending || (acceptInvite === false) && (refuseInvite === false)}
                                    className='text-slate-50 btn-primary shadow-btn'
                                >
                                    {pending ? "Pending..." : "Submit"}
                                </button>
                            </div>
                            {code?.message ? (
                                <p className='text-center text-indigo-500 mb-2'>{code.message}</p>
                                ) : null
                            }
                        </form>
                    </div>
                ) : null
            ))}
        </>
    )
}
