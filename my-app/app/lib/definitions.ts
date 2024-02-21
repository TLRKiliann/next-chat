import { StaticImageData } from "next/image";

export type UsersProps = {
    id: number;
    img: StaticImageData;
    username: string;
    email: string;
    onLine: boolean;
};

export type UsersChatProps = {
    id: string;
    username: string;
    email: string;
    online: boolean;
    message: string;
    room: string;
};