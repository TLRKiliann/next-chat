import { queryChatRoom } from './db';
import { revalidatePath } from 'next/cache';

export async function mysqlQueryChatroom(prevState: {message: string} | undefined, formData: FormData) {
    try {
        const id = formData.get("id");
        const username = formData.get("username");
        const email = formData.get("email");
        const online = formData.get("online");
        const message = formData.get("message");
        const room = formData.get("room");
        const btnName = formData.get("submit");
        if (btnName === "insert") {
            if (id !== null && username !== null && email && online !== null && message !== null && room !== null) {
                const result = await queryChatRoom("INSERT INTO chatroom VALUES (?, ?, ?, ?, ?, ?)", [id, username, email, online, message, room]);
                if (result) {
                    revalidatePath("/chatroom");
                    return {message: "You are registered"}
                }
            }
        }
        if (btnName === "update") {      
            if (id !== null && username !== null && email && online !== null && message !== null && room !== null) {
                const result = await queryChatRoom("UPDATE chatroom SET id=?, username=?, email=?, online=? , message=?, room=? WHERE id=?", 
                [id, username, email, online, message, room, id]);
                if (result) {
                    revalidatePath("/chatroom");
                    return {message: "Data updated"}
                }
            } else {
                return {message: "No password to update"}
            }
        }
        if (btnName === "delete") {
            if (id !== null) {
            const result = await queryChatRoom("DELETE FROM chatroom WHERE id=?", [id]);
                if (result) {
                    revalidatePath("/chatroom");
                    return {message: "Member deleted by id"}
                }
            }
        }
    }
    catch (error) {
        console.log("Error", error)
        throw error;
    }
}