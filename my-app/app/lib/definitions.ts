import { StaticImageData } from "next/image";

export type UsersProps = {
    id: number;
    username: string;
    email: string;
    online: number;
    img: StaticImageData;
    boolinvitation: number;
    display: number;
    sender: string;
    selectedroom: string;
    response: number;
};

export type UsersChatProps = {
    chatid: number;
    id: number;
    username: string;
    message: string;
    online: number;
    room: string;
    date: string;
};

export type UsersToJoin = {
    chatid: number;
    id: number;
    username: string;
    email: string;
    online: number;
    img: StaticImageData;
    boolinvitation: number;
    display: number;
    sender: string;
    selectedroom: string;
    response: number;
    message: string;
    room: string;
    date: string;
};

export type EmailProps = {
    id: number;
    sender: string;
    email: string;
    textarea: string;
    bool_text: number;
};