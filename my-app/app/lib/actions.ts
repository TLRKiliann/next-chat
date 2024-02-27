"use server";

import { queryMessage, queryInvitation } from './db';
import { revalidatePath } from 'next/cache';

export async function mysqlQueryChatroom(prevState: {message: string} | undefined, formData: FormData) {
    try {
        const newId = formData.get("id");
        const username = formData.get("username");
        const online = formData.get("online");
        const message = formData.get("message");
        const room = formData.get("room");
        const date = formData.get("date");
        const btnSubmit = formData.get("submit");
        if (btnSubmit === "insert") {
            if (newId !== null && username !== null && online !== null && message !== null && room !== null && date !== null) {
                const result = await queryMessage(`INSERT INTO ${room.slice(1)} VALUES (?, ?, ?, ?, ?, ?)`, 
                    [newId, username, online, message, room, date]
                );
                if (result) {
                    revalidatePath("/chatroom");
                    return {message: "Message Sent !"}
                }
            }
        }
    }
    catch (error) {
        console.log("Error: ", error)
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
                    revalidatePath("/chatroom");
                    return {message: "Invitation Sent !"};
                }
            }
        }
    }
    catch (error) {
        console.log("Error: ", error);
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
                            return {message: "Invitation Sent !"};
                        }
                    }
                }
            }
        }
    }
    catch (error) {
        console.log("Error: ", error);
        throw error;
    }
};

// when user return to chatroom from info - question - confidential
export default async function returnToChatRoom(prevState: {message: string} | undefined, formData: FormData) {
    try {
        const id = formData.get("id");
        const sender = formData.get("sender");
        const selectedroom = formData.get("selectedroom");
        const response = formData.get("response");
        const btnBackToChatRoom = formData.get("submit");
        if (btnBackToChatRoom === "btnBackToMain") {
            if (id !== null && sender !== null && selectedroom !== null && response !== null) {
                const queryChange = await queryInvitation("UPDATE userschat SET id=?, sender=?, selectedroom=?, response=? WHERE id=?", 
                [id, sender, selectedroom, response, id]);
                if (queryChange) {
                    revalidatePath("/chatroom")
                    return {message: "Back to chatroom..."};
                }
            }
        }
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
};