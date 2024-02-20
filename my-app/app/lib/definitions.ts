import { StaticImageData } from "next/image";

export type UsersProps = {
    id: number;
    img: StaticImageData;
    username: string;
    email: string;
    onLine: boolean;
};