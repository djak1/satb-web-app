//Session provider given by NextAuth for access the session in  the client component
"use client";

import { SessionProvider as Provider} from "next-auth/react";

type Props = {
    children: React.ReactNode;
    session: any;
};

export default function SessionProvider({children, session}: Props){
    return <Provider session={session}>{children}</Provider>;
}

