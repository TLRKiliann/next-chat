import type { Metadata } from 'next';
//import type { Metadata } from 'next/types';
import React from 'react';
//import { useSession } from "next-auth/react";
//import { redirect, useRouter } from 'next/navigation';
//import { userschat } from '@/app/lib/data';
import FormMessage from '@/app/components/chatroomComp/form-message';
import { queryChatRoom } from '@/app/lib/db';
import ScreenMessage from '@/app/components/chatroomComp/screen-message';
import UserOnline from '@/app/components/chatroomComp/user-online';

export const metadata: Metadata = {
    title: {
      absolute: "Chatroom"
    },
    description: "default room"
};

export default async function ChatRoom() {

    const request = await queryChatRoom("SELECT * FROM chatroom", []);
    const data = JSON.stringify(request);
    console.log(data, "data");

    const req = await queryChatRoom("SELECT * FROM usersonline", []);
    const usersOnline = JSON.stringify(req);
    console.log(usersOnline, "data");

    /*
    const { pending } = useFormStatus();
    const [ code, formAction ] = useFormState(queryDecksCart, undefined)
    //action={formAction}

    const data: string = JSON.stringify(request);
  
    if (!data) {
      throw new Error("Error: data not loaded for baker's decks");
    } */

    // session
/*     const {data: session} = useSession();

    console.log(session?.user?.name, "username");

    if (!session) {
        redirect("/login")
    };

    const router = useRouter();

    const handleLogout = () => {
        router.push("/logout");
    }; */

/*     const [users] = useState<UsersProps[]>(userschat);
    
    const [message, setMessage] = useState<string>("");
    const [allMsgUser, setAllMsgUser] = useState<DataUserMsg[]>([]);

    const derivatedState = useMemo(() => message, [message]);
 */


/*     const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        const date = new Date();
        const userMessage: DataUserMsg = {
            id: date, session: session.user?.name || "", message: derivatedState
        }
        setAllMsgUser(prevState => [...prevState, userMessage]);
        setMessage("");
    }; */

    return (
        <div className='w-full h-screen'>
            
            <div className='flex w-full h-[calc(100%-70px)]'>

                <UserOnline usersOnline={JSON.parse(usersOnline)}/>

                <div className='w-full h-full'>

                    <ScreenMessage data={JSON.parse(data)}/>
                    
                    <FormMessage />

                </div>

            </div>

        </div>
    )
};
