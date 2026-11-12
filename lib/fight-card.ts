
import { prisma } from "@/lib/prisma";

export async function getMaleFightCard(competitionId: string) {
    // Get all male registrations, including fighter and gym information
    const registrations = await prisma.competitionRegistration.findMany({
        where: {
            competitionId,
            fighters: {
                gender: "MALE",
            },
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
