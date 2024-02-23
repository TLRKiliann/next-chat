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
    id: number;
    username: string;
    online: number;
    message: string;
    room: string;
    date: string;
};