import { StaticImageData } from "next/image";

export type UsersProps = {
    id: number;
    img: StaticImageData;
    username: string;
    email: string;
    online: number;
};

export type UsersChatProps = {
    id: number;
    username: string;
    email: string;
    online: number;
    message: string;
    room: string;
    date: string;
    img: string;
    
    boolInvitation: number;
    displayInvitation: number;
    userSender: string;
    roomSelected: string;
    response: number;
};
// to put into file form-message.tsx