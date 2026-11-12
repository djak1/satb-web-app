import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma";

export async function POST(request: Request){
    console.log("Welcome, welcome to the Add new Gym route, what can i do for you")
    const session = await auth();
    
    if(!session?.user || !session.user.id){
        return NextResponse.redirect(new URL("/auth/signin", request.url))
    }
    if(session.user.role !== "ADMIN" && session.user.role !== "ORGANIZER"){
        return new NextResponse("You DO not have permition to add new competition", { status: 403 });
    }

    console.log(session)

    try{
        const gymDataJson = await request.json();
        console.log(gymDataJson);

        //...gymDateJson ce samo da kopira podatke iz gymDataJson i prepise ih u newClub,
        // korisna funkcija, stedi vrijeme
        const newClub = await prisma.club.create({
            data:{
                ...gymDataJson
            }
        });

        console.log(newClub);

        return NextResponse.json(newClub)

    }catch(error){
        console.log("Error creating a new Club", error)
        return new NextResponse("Internal server error", {status : 500})
    }
}