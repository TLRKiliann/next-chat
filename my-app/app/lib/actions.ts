"use server";

import { queryMessage, queryInvitation } from './db';
import { revalidatePath } from 'next/cache';

export async function mysqlQueryChatroom(prevState: {message: string} | undefined, formData: FormData) {
    try {
        const id = formData.get("id");
        const username = formData.get("username");
        const online = formData.get("online");
        const message = formData.get("message");
        const room = formData.get("room");
        const date = formData.get("date");
        const btnSubmit = formData.get("submit");
        if (btnSubmit === "insert") {
            if (id !== null && username !== null && online !== null && message !== null && room !== null && date !== null) {
                const result = await queryMessage("INSERT INTO chatroom VALUES (?, ?, ?, ?, ?, ?)", 
                    [id, username, online, message, room, date]
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
        const userSender = formData.get("usersender");
        /* const info = formData.get("info");
        const question = formData.get("question");
        const confidential = formData.get("confidential"); */
        const displayInvitation = formData.get("displayInvitation");
        const selectedRoom = formData.get("selectedroom");
        const btnSubmitInvitation = formData.get("submit");
        if (btnSubmitInvitation === "updatemessage") {
            if (id !== null && userSender !== null && selectedRoom !== null && displayInvitation !== null) {
                const result = await queryInvitation("UPDATE userschat SET sender=?, display=?, \
                    selectedroom=? WHERE id=?",
                    [userSender, displayInvitation, selectedRoom, id]
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
