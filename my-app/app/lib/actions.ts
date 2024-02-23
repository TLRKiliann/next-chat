"use server";

import { queryMessage, queryInvitation } from './db';
import { revalidatePath } from 'next/cache';

export async function mysqlQueryChatroom(prevState: {message: string} | undefined, formData: FormData) {
    try {
        const id = formData.get("id");
        const username = formData.get("username");
        const email = formData.get("email");
        const online = formData.get("online");
        const message = formData.get("message");
        const room = formData.get("room");
        const date = formData.get("date");
        const img = formData.get("img");
        const btnSubmit = formData.get("submit");
        if (btnSubmit === "insert") {
            if (id !== null && username !== null && email && online !== null && message !== null && room !== null && date !== null && img !== null) {
                const result = await queryMessage("INSERT INTO chatroom VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
                    [id, username, email, online, message, room, date, img]
                );
                if (result) {
                    revalidatePath("/chatroom");
                    return {message: "Message Sent !"}
                }
            }
        }
    }
    catch (error) {
        console.log("Error", error)
        throw error;
    }
};

// update !!! dans la table du user invité !
// sending invitation to another user + type to review !!!
export async function mysqlSendInvitation(prevState: {message: string} | undefined, formData: FormData) {
    try {
        const id = formData.get("id");
        const username = formData.get("username");
        const email = formData.get("email");
        const online = formData.get("online");
        const message = formData.get("message");
        const room = formData.get("room");
        const date = formData.get("date");
        const img = formData.get("img");
        const btnSubmit = formData.get("submit");
        if (btnSubmit === "insert") {
            if (id !== null && username !== null && email && online !== null && message !== null && room !== null && date !== null && img !== null) {
                const result = await queryInvitation("INSERT INTO chatroom VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
                    [id, username, email, online, message, room, date, img]
                );
                if (result) {
                    revalidatePath("/chatroom");
                    return {message: "Message Sent !"}
                }
            }
        }
    }
    catch (error) {
        console.log("Error", error)
        throw error;
    }
};
