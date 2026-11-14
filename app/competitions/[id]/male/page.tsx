
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getMaleFightCard } from "@/lib/fight-card";

type Props = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ experience?: string }>;
};

export default async function Competition({ params, searchParams }: Props) {
    const { id: competitionId } = await params;
    const { experience } = await searchParams;

    // Get competition information
    const competition = await prisma.competition.findUnique({
        where: {
            id: competitionId,
        },
    });

    // Get male fight card data
    const { groupedRegistrations } = await getMaleFightCard(
        competitionId,
        experience!
    );

    const categoryStyles: Record<
        string,
        { border: string; header: string; badge: string }
    > = {
        U8: {
            border: "border-amber-200",
            header: "bg-amber-50",
            badge: "bg-amber-100 text-amber-800",
        },
        U10: {
            border: "border-emerald-200",
            header: "bg-emerald-50",
            badge: "bg-emerald-100 text-emerald-800",
        },
        U12: {
            border: "border-blue-200",
            header: "bg-blue-50",
            badge: "bg-blue-100 text-blue-800",
        },
        U14: {
            border: "border-violet-200",
            header: "bg-violet-50",
            badge: "bg-violet-100 text-violet-800",
        },
        U16: {
            border: "border-indigo-200",
            header: "bg-indigo-50",
            badge: "bg-indigo-100 text-indigo-800",
        },
        U18: {
            border: "border-sky-200",
            header: "bg-sky-50",
            badge: "bg-sky-100 text-sky-800",
        },
        U24: {
            border: "border-cyan-200",
            header: "bg-cyan-50",
            badge: "bg-cyan-100 text-cyan-800",
        },
        MASTERS_ELITE: {
            border: "border-emerald-200",
            header: "bg-emerald-50",
            badge: "bg-emerald-100 text-emerald-800",
        },
    };

    const totalFighters = Object.values(groupedRegistrations).reduce(
        (total, weightGroups) =>
            total +
            Object.values(weightGroups).reduce(
                (categoryTotal, fighters) => categoryTotal + fighters.length,
                0
            ),
        0
    );

    return (
        <main className="mx-auto w-full max-w-7xl space-y-8">

            {/* Page header */}
            <header className="overflow-hidden rounded-xl border border-[#DCE4ED] bg-white shadow-sm">
                <div className="border-b border-[#E8EDF3] px-6 py-6 sm:px-8">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#315A83]">
                        Muay Thai Management
                    </p>

                    <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-[#142B4A]">
                                {competition?.name} – Muški Fight Card
                            </h1>

                            <p className="mt-2 text-sm text-slate-500">
                                Pregled prijavljenih boraca po uzrasnim i težinskim kategorijama.
                            </p>
                        </div>

                        <Link
                            href={`/api/competitions/${competitionId}/export/male?experience=${experience}`}
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#142B4A] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#24476B]"
                        >
                            <span>↓</span>
                            Export PDF
                        </Link>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                        {competition?.location && (
                            <p className="flex items-center gap-2">
                                <span>📍</span>
                                {competition.location}
                            </p>
                        )}

                        {competition?.date && (
                            <p className="flex items-center gap-2">
                                <span>📅</span>
                                {new Date(competition.date).toLocaleDateString("sr-RS")}
                            </p>
                        )}
                    </div>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 divide-y divide-[#E8EDF3] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    <div className="px-6 py-4">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Ukupno boraca
                        </p>
                        <p className="mt-1 text-2xl font-bold text-[#142B4A]">
                            {totalFighters}
                        </p>
                    </div>

                    <div className="px-6 py-4">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Uzrasne kategorije
                        </p>
                        <p className="mt-1 text-2xl font-bold text-[#142B4A]">
                            {Object.keys(groupedRegistrations).length}
                        </p>
                    </div>

                    <div className="px-6 py-4">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Iskustvo
                        </p>
                        <p className="mt-1 text-sm font-bold text-[#24476B]">
                            {experience === "under5" ? "Do 4 borbe" : "5 ili više borbi"}
                        </p>
                    </div>
                </div>
            </header>

            {/* Age categories */}
            <div className="space-y-6">
                {Object.entries(groupedRegistrations).map(
                    ([category, weightGroups]) => {
                        const style = categoryStyles[category] ?? {
                            border: "border-[#DCE4ED]",
                            header: "bg-[#F1F5F9]",
                            badge: "bg-[#EAF0F6] text-[#24476B]",
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
                                className={`overflow-hidden rounded-xl border ${style.border} bg-white shadow-sm`}
                            >
                                {/* Age category header */}
                                <div
                                    className={`flex flex-wrap items-center justify-between gap-3 border-b ${style.border} ${style.header} px-5 py-4 sm:px-6`}
                                >
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Uzrasna kategorija
                                        </p>
                                        <h2 className="mt-1 text-xl font-bold text-[#142B4A]">
                                            {category}
                                        </h2>
                                    </div>

                                    <span
                                        className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${style.badge}`}
                                    >
                                        {fightersCount} boraca
                                    </span>
                                </div>

                                {/* Weight categories */}
                                <div className="space-y-5 p-4 sm:p-6">
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
                                                    className="overflow-hidden rounded-lg border border-[#DCE4ED]"
                                                >
                                                    {/* Weight category header */}
                                                    <div className="flex flex-wrap items-center justify-between gap-2 bg-[#F1F5F9] px-4 py-3">
                                                        <h3 className="font-bold text-[#142B4A]">
                                                            {Number(weightCategory) === 91.5
                                                                ? "91+"
                                                                : weightCategory}{" "}
                                                            kg
                                                        </h3>

                                                        <span className="text-xs font-semibold text-slate-500">
                                                            {categoryRegistrations.length} boraca
                                                        </span>
                                                    </div>

                                                    {/* Fighters table */}
                                                    <div className="overflow-x-auto">
                                                        <table className="w-full min-w-[650px] text-left text-sm">
                                                            <thead className="bg-white text-xs uppercase tracking-wide text-slate-500">
                                                                <tr>
                                                                    <th className="px-4 py-3 font-semibold">
                                                                        Ime
                                                                    </th>
                                                                    <th className="px-4 py-3 font-semibold">
                                                                        Prezime
                                                                    </th>
                                                                    <th className="px-4 py-3 font-semibold">
                                                                        Klub
                                                                    </th>
                                                                    <th className="px-4 py-3 text-center font-semibold">
                                                                        Godina rođenja
                                                                    </th>
                                                                    <th className="px-4 py-3 text-center font-semibold">
                                                                        Broj borbi
                                                                    </th>
                                                                </tr>
                                                            </thead>

                                                            <tbody className="divide-y divide-[#E8EDF3]">
                                                                {categoryRegistrations.map(
                                                                    (registration) => (
                                                                        <tr
                                                                            key={registration.id}
                                                                            className="transition-colors hover:bg-[#F5F8FC]"
                                                                        >
                                                                            <td className="whitespace-nowrap px-4 py-3.5 font-semibold text-[#142B4A]">
                                                                                {registration.fighters.firstName}
                                                                            </td>

                                                                            <td className="whitespace-nowrap px-4 py-3.5 text-slate-700">
                                                                                {registration.fighters.lastName}
                                                                            </td>

                                                                            <td className="px-4 py-3.5 text-slate-600">
                                                                                {registration.fighters.club?.name ?? "-"}
                                                                            </td>

                                                                            <td className="whitespace-nowrap px-4 py-3.5 text-center font-medium text-slate-700">
                                                                                {registration.fighters.yearOfBirth}
                                                                            </td>

                                                                            <td className="px-4 py-3.5 text-center">
                                                                                <span className="inline-flex min-w-9 justify-center rounded-md bg-[#EAF0F6] px-2.5 py-1 text-xs font-bold text-[#24476B]">
                                                                                    {Number(registration.experience)}
                                                                                </span>
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

                {/* Empty state */}
                {totalFighters === 0 && (
                    <div className="rounded-xl border border-dashed border-[#C9D5E2] bg-white px-6 py-12 text-center">
                        <p className="text-lg font-semibold text-[#142B4A]">
                            Nema prijavljenih boraca
                        </p>
                        <p className="mt-2 text-sm text-slate-500">
                            Za izabrani filter trenutno nema prijavljenih boraca.
                        </p>
                    </div>
                )}
            </div>

            {/* Back link */}
            <div className="pt-2">
                <Link
                    href="/competitions"
                    className="inline-flex items-center gap-2 rounded-lg border border-[#DCE4ED] bg-white px-4 py-2.5 text-sm font-semibold text-[#24476B] shadow-sm transition hover:bg-[#EAF0F6]"
                >
                    <span aria-hidden="true">←</span>
                    Nazad na takmičenja
                </Link>
            </div>
        </main>
    );
}
