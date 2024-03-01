import { useState, useEffect } from 'react';

type EffectProps = {
    pathname: string;
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

