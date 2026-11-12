import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { AgedCategories } from "@/app/generated/prisma";
export default async function Competition({params}: Promise<{id: string}>){

    const competitionId = (await params).id
    console.log("comId:", competitionId)
    
    //Get the name, location, dedline.. al info from competition - just in case for visualisation later
    const competition = await prisma.competition.findUnique({
        where:{
            id: competitionId
        }
    })

    console.log(competition)
    
    //Get all registration from competitionRegistration, and include relation figters to get all names 
    const registrations = await prisma.competitionRegistration.findMany({
        where:{
            competitionId: competitionId,
            fighters: {
                gender: 'FEMALE'
            }
        },
        include:{
            fighters: true
        }
    })
    console.log(registrations)

    const groupedRegistrations = registrations.reduce(
        /**
         * 
         * @param groups object that will contain groups
         * @param registration  the current element from registrations array
         * @returns groups of aged categories
         */
        (groups, registration) => { //groups - object
            const category = registration.agedCategory;
            const weightCategory = Number(registration.weightCategory);

            if(!groups[category]){ //If group for specificc category does not exist
                groups[category] = []; //Create it
            }

            if(!groups[category][weightCategory]){ //If group for specificc category does not exist
                groups[category][weightCategory] = []; //Create it
            }

            groups[category][weightCategory].push(registration); //push -add element at the end of the array

            return groups;
        }, {} as Partial<
                Record<
                AgedCategories,
                Record<number, typeof registrations>
            >
        >
    )
    console.log(Object.entries(groupedRegistrations)) 

    
    const categoryStyles: Record<
        string,
        { border: string; header: string; badge: string }
    > = {
        U8: {
            border: "border-amber-300",
            header: "bg-amber-50",
            badge: "bg-amber-100 text-amber-800",
        },
        U10: {
            border: "border-emerald-300",
            header: "bg-emerald-50",
            badge: "bg-emerald-100 text-emerald-800",
        },
        U12: {
            border: "border-blue-300",
            header: "bg-blue-50",
            badge: "bg-blue-100 text-blue-800",
        },
        U14: {
            border: "border-violet-300",
            header: "bg-violet-50",
            badge: "bg-violet-100 text-violet-800",
        },
        U16: {
            border: "border-indigo-300",
            header: "bg-indigo-50",
            badge: "bg-indigo-100 text-indigo-800",
        },
        U18: {
            border: "border-rose-300",
            header: "bg-rose-50",
            badge: "bg-rose-100 text-rose-800",
        },
        U24: {
            border: "border-sky-300",
            header: "bg-sky-50",
            badge: "bg-sky-100 text-sky-800",
        },
        MASTERS_ELITE: {
            border: "border-emerald-300",
            header: "bg-emerald-50",
            badge: "bg-emerald-100 text-emerald-800",
        },
    };

    
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">

                {/* Header */}
                <header className="rounded-2xl bg-gradient-to-r from-slate-950 via-red-950 to-slate-900 px-6 py-8 text-white shadow-lg sm:px-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
                        Muay Thai Championship
                    </p>

                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                        {competition?.name} — Fight Card
                    </h1>

                    <p className="mt-3 text-slate-300">
                        {competition?.location}
                    </p>

                    {competition?.date && (
                        <p className="mt-1 text-sm text-slate-400">
                            {new Date(competition.date).toLocaleDateString("sr-RS")}
                        </p>
                    )}
                </header>

                {/* Age categories */}
                <div className="space-y-6">
                    {Object.entries(groupedRegistrations).map(
                        ([category, weightGroups]) => {
                            const style = categoryStyles[category] ?? {
                                border: "border-slate-200",
                                header: "bg-slate-100",
                                badge: "bg-slate-100 text-slate-700",
                            };

                            const fightersCount = Object.values(
                                weightGroups ?? {}
                            ).reduce(
                                (total, fighters) => total + fighters.length,
                                0
                            );

                            return (
                                <section
                                    key={category}
                                    className={`overflow-hidden rounded-2xl border-2 ${style.border} bg-white shadow-sm`}
                                >
                                    {/* Age category header */}
                                    <div
                                        className={`flex flex-wrap items-center justify-between gap-3 border-b-2 ${style.border} ${style.header} px-5 py-4 sm:px-6`}
                                    >
                                        <h2 className="text-xl font-bold text-slate-900">
                                            {category}
                                        </h2>

                                        <span
                                            className={`rounded-full px-3 py-1 text-sm font-semibold ${style.badge}`}
                                        >
                                            {fightersCount} boraca
                                        </span>
                                    </div>

                                    {/* Weight categories */}
                                    <div className="space-y-4 p-4 sm:p-6">
                                        {Object.entries(weightGroups ?? {})
                                            .sort(
                                                ([a], [b]) =>
                                                    Number(a) - Number(b)
                                            )
                                            .map(
                                                ([
                                                    weightCategory,
                                                    categoryRegistrations,
                                                ]) => (
                                                    <div
                                                        key={weightCategory}
                                                        className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                                                    >
                                                        {/* Weight category header */}
                                                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-4 py-3">
                                                            <h3 className="text-base font-bold text-slate-800">
                                                                {weightCategory} kg
                                                            </h3>

                                                            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                                                {categoryRegistrations.length} boraca
                                                            </span>
                                                        </div>

                                                        {/* Fighters table */}
                                                        <div className="overflow-x-auto">
                                                            <table className="w-full min-w-[550px] text-left text-sm">
                                                                <thead className="bg-slate-50 text-[10px] text-xs uppercase tracking-wide text-slate-500">
                                                                    <tr>
                                                                        <th className="px-4 py-3 font-semibold">
                                                                            Ime
                                                                        </th>
                                                                        <th className="px-4 py-3 font-semibold">
                                                                            Prezime
                                                                        </th>
                                                                        <th className="px-4 py-3 font-semibold">
                                                                            Godina rođenja
                                                                        </th>
                                                                        <th className="px-4 py-3 font-semibold">
                                                                            Iskustvo
                                                                        </th>
                                                                        <th className="px-4 py-3 font-semibold">
                                                                            Težina
                                                                        </th>
                                                                    </tr>
                                                                </thead>

                                                                <tbody className="divide-y divide-slate-100">
                                                                    {categoryRegistrations.map(
                                                                        (registration) => (
                                                                            <tr
                                                                                key={registration.id}
                                                                                className="transition-colors hover:bg-red-50/60"
                                                                            >
                                                                                <td className="whitespace-nowrap px-4 py-3.5 font-semibold text-slate-900">
                                                                                    {registration.fighters.firstName}
                                                                                </td>

                                                                                <td className="whitespace-nowrap px-4 py-3.5 text-slate-700">
                                                                                    {registration.fighters.lastName}
                                                                                </td>

                                                                                <td className="px-4 py-3.5 text-slate-600">
                                                                                    {registration.fighters.yearOfBirth}
                                                                                </td>

                                                                                <td className="px-4 py-3.5">
                                                                                    <span className="inline-flex min-w-8 justify-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                                                                                        {Number(registration.experience)}
                                                                                    </span>
                                                                                </td>

                                                                                <td className="whitespace-nowrap px-4 py-3.5 font-semibold text-slate-800">
                                                                                    {weightCategory} kg
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                    </div>
                                </section>
                            );
                        }
                    )}
                </div>

                {/* Back link */}
                <div className="pt-2">
                    <Link
                        href="/competitions"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-800"
                    >
                        <span aria-hidden="true">←</span>
                        Nazad na takmičenja
                    </Link>
                </div>
            </div>
        </main>
    );

}