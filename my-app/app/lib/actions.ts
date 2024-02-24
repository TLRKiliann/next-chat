"use server";

import { redirect } from 'next/navigation';
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

// sending invitation to another user
export async function mysqlSendInvitation(prevState: {message: string} | undefined, formData: FormData) {
    try {
        const id = formData.get("id");
        const userSender = formData.get("usersender");
        const display = formData.get("displayinvitation");
        const selectedRoom = formData.get("selectedroom");
        const response = formData.get("response");
        const btnSubmitInvitation = formData.get("submit");
        if (btnSubmitInvitation === "updatemessage") {
            if (id !== null && userSender !== null && selectedRoom !== null && display !== null && response !== null) {
                const result = await queryInvitation("UPDATE userschat SET id=?, sender=?, display=?, \
                    selectedroom=?, response=? WHERE id=?",
                    [id, userSender, display, selectedRoom, response, id]
                );
                if (result) {
                    console.log(result, "result");
                    revalidatePath("/chatroom");
                    return {message: "Invitation Sent !"}
                }
            }
        }
    }
    catch (error) {
        console.log("Error", error)
        throw error;
    }
};

// receiver sending response to sender & update display value
export async function mysqlResponseInvitation(prevState: {message: string} | undefined, formData: FormData) {
    try {
        const id = formData.get("id");
        const userSender = formData.get("usersender");
        const display = formData.get("display");
        const selectedRoom = formData.get("selectedroom");
        const response = formData.get("response");
        const otherid = formData.get("otherid");
        const otherdisplay = formData.get("otherdisplay");
        const btnSubmitInvitation = formData.get("submit");
        if (btnSubmitInvitation === "responseInvite") {
            if (id !== null && userSender !== null && selectedRoom !== null && display !== null && response !== null) {
                const result = await queryInvitation("UPDATE userschat SET id=?, sender=?, display=?, \
                    selectedroom=?, response=? WHERE id=?", [id, userSender, display, selectedRoom, response, id]
                );
                if (result) {
                    if (otherid !== null && otherdisplay !== null) {
                        const secondquery = await queryInvitation("UPDATE userschat SET id=?, display=? WHERE id=?", 
                            [otherid, otherdisplay, otherid]);
                        if (secondquery) {
                            revalidatePath("/chatroom");
                            return {message: "Invitation Sent !"}
                        }
                    }
                }
            }
        }
    }
    catch (error) {
        console.log("Error", error)
        throw error;
    }
};