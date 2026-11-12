import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        role: "USER" | "ADMIN" | "ORGANIZER";
    }
    interface Session {
        user: {
            id: string;
            role: "USER" | "ADMIN" | "ORGANIZER";
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: "USER" | "ADMIN" | "ORGANIZER";
    }
}