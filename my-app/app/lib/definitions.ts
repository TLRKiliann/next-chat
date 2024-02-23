import { StaticImageData } from "next/image";

export type UsersProps = {
    id: number;
    username: string;
    email: string;
    online: number;
    img: StaticImageData;
    boolInvitation: number;
    displayInvitation: number;
    userSender: string;
    roomSelected: string;
    response?: number;
};

export type UsersChatProps = {
    id: number;
    username: string;
    online: number;
    message: string;
    room: string;
    date: string;
};