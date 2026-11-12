import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { calculateMuayThaiCategories } from "@/lib/muay-thai-categories";



export async function POST(request: Request){

    const session = await auth()

    if(!session?.user || !session.user.id){
        return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    try{
        const data = await request.json()
        //callfunction to calculate aged and weight category
        const categories = calculateMuayThaiCategories(data.gender, Number(data.weight), Number(data.yearOfBirth))
        console.log(data)
        console.log(categories)

        const fighter = await prisma.fighter.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                gender: data.gender,
                yearOfBirth: Number(data.yearOfBirth),
                createdById: session.user.id,
                clubId: data.clubId
            },
        });

        const createdFighter_Id = fighter.id;

        const competitionRegistration = await prisma.competitionRegistration.create({
            data:{
                competitionId: data.competitionId,
                fighterId: createdFighter_Id,
                weight: Number(data.weight),
                experience: data.experience,
                agedCategory: categories.ageCategory,
                weightCategory: categories.weightCategory
            }
        })
        console.log(competitionRegistration)

        return NextResponse.json(
            {
                success: true,
                message: "Registracija je uspešno završena",
                competitionRegistration,
            },
            {status: 201}
        )
    }catch(error){
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Došlo je do greške prilikom registracije." },
            { status: 500 }
        );
    }
}