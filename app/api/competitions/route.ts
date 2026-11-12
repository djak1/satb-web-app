import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";


export async function GET(request: Request){

    const session = await auth();

    if(!session?.user || !session.user.id){
        return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    try{
        const competitions = await prisma.competition.findMany({
            orderBy: {
                date: "asc"
            }
        })
        console.log(competitions)
        return NextResponse.json(competitions)
    }
    catch(error){
        return NextResponse.json(
            {error: "Failed to fetch competitions"},
            {status: 500}
        )}
1}