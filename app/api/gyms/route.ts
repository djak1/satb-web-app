import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(request: Request){
    const session = await auth();
    
        if(!session?.user || !session.user.id){
            return NextResponse.redirect(new URL("/auth/signin", request.url));
        }
    
    try{
        const gyms = await prisma.club.findMany();
        return NextResponse.json(gyms)

        } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch gyms" },
            { status: 500 }
        );
    }
}