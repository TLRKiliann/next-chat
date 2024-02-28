import { useState, useEffect } from 'react';

type EffectProps = {
    pathname: string;
};

type SessionUserNameProps = {
    session: {
        user: {
            name: string;
        }
    }
};

export function effectFunc({pathname}: EffectProps): string {
    
    const [customPathname, setCustomPathname] = useState<string>("");

    useEffect(() => {
        switch(pathname) {
            case "/chatroom/question":
                setCustomPathname("/question");
                break;
            case "/chatroom/info":
                setCustomPathname("/info");
                break;
            case "/chatroom/confidential":
                setCustomPathname("/confidential");
                break;
            case "/chatroom":
                setCustomPathname("/chatroom");
                break;
            default:
                console.log("end of loop (s-m)");
        };
        return () => console.log("Clean-up pathname (sm) !")
    }, []);

    return customPathname;
}

export function sessionUserName({session}: SessionUserNameProps): string {

    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        if (session && session.user && session.user.name) {
            setUserName(session.user.name);
        }
    }, [session]);

    return userName;
}
