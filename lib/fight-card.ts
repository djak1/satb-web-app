
import { prisma } from "@/lib/prisma";

export async function getMaleFightCard(competitionId: string, experience: string) {
    // Get all male registrations, including fighter and gym information
    
    let experienceFilter = {};
    if(experience === "under5"){
        experienceFilter = {lt:5}
    } else if(experience === "5plus") {
        experienceFilter = {gte:5}
    }
    
    
    const registrations = await prisma.competitionRegistration.findMany({
        where: {
            competitionId,
            fighters: {
                gender: "MALE",
            },
            experience: experienceFilter
        },
        include: {
            fighters: {
                include: {
                    club: true,
                },
            },
        },
    });

    // Type of one registration
    type Registration = (typeof registrations)[number];

    // Group registrations by age and weight category
    const groupedRegistrations: Record<
        string,
        Record<number, Registration[]>
    > = {};

    for (const registration of registrations) {
        const ageCategory = registration.agedCategory;
        const weightCategory = Number(registration.weightCategory);

        if (!groupedRegistrations[ageCategory]) {
            groupedRegistrations[ageCategory] = {};
        }

        if (!groupedRegistrations[ageCategory][weightCategory]) {
            groupedRegistrations[ageCategory][weightCategory] = [];
        }

        groupedRegistrations[ageCategory][weightCategory].push(registration);
    }

    return {
        registrations,
        groupedRegistrations,
    };
}

export async function getFemaleFightCard(
    competitionId: string,
    experience: string,
) {
    let experienceFilter = {};

    if (experience === "under5") {
        experienceFilter = { lt: 5 };
    } else if (experience === "5plus") {
        experienceFilter = { gte: 5 };
    }

    const registrations = await prisma.competitionRegistration.findMany({
        where: {
            competitionId,
            fighters: {
                gender: "FEMALE",
            },
            experience: experienceFilter,
        },
        include: {
            fighters: {
                include: {
                    club: true,
                },
            },
        },
    });

    type Registration = (typeof registrations)[number];

    const groupedRegistrations: Record<
        string,
        Record<number, Registration[]>
    > = {};

    for (const registration of registrations) {
        const ageCategory = registration.agedCategory;
        const weightCategory = Number(registration.weightCategory);

        if (!groupedRegistrations[ageCategory]) {
            groupedRegistrations[ageCategory] = {};
        }

        if (!groupedRegistrations[ageCategory][weightCategory]) {
            groupedRegistrations[ageCategory][weightCategory] = [];
        }

        groupedRegistrations[ageCategory][weightCategory].push(registration);
    }

    return {
        registrations,
        groupedRegistrations,
    };
}