import { auth } from "@/auth";
import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"


export async function POST(request: Request){
    console.log("Welcome")
    const session = await auth()
    console.log(session)


    if(!session?.user || !session.user.id)
    {
        return NextResponse.redirect(new URL("/auth/signin", request.url))
    }

    try{
        const competitionData = await request.json();
        console.log("competitionData-inRoute",competitionData)

        const newCompetition = await prisma.competition.create({
            data:{
                    name: competitionData.name,
                    location: competitionData.location,
                    date: new Date(`${competitionData.date}T00:00:00.000Z`),
                    registrationDeadline: new Date(
                        `${competitionData.registrationDeadline}T00:00:00.000Z`
                    ),
                    status: competitionData.status,
                    createdById: session.user.id
            }
        });
        console.log("full-Data-newCompetition-inRoute",competitionData)

        return NextResponse.json(newCompetition)
    }catch(error){
        console.log("Internal Error", error)
        return new NextResponse("Error during Add Competion", {status: 500})
    }
}