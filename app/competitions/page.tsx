
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function CompetitionsHomePage(){

    const competitions = await prisma.competition.findMany({
        orderBy:{
            date: "asc"
        }
    })

    console.log(competitions)
    
return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-8">

            {/* Page header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-800">
                        Muay Thai
                    </p>

                    <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Takmičenja
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Pregled takmičenja i prijava boraca.
                    </p>
                </div>

                <span className="inline-flex w-fit items-center rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-800">
                    {competitions.length}{" "}
                    {competitions.length === 1
                        ? "takmičenje"
                        : "takmičenja"}
                </span>
            </div>

            {/* Competitions list */}
            {competitions.length > 0 ? (
                <div className="grid gap-5">
                    {competitions.map((competition) => (
                        <article
                            key={competition.id}
                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md"
                        >
                            {/* Top accent */}
                            <div className="h-1.5 bg-gradient-to-r from-red-900 via-red-700 to-red-400" />

                            <div className="p-5 sm:p-7">
                                {/* Competition information */}
                                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-3 flex flex-wrap items-center gap-2">
                                            <span className="rounded-md bg-red-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-red-800">
                                                Muay Thai
                                            </span>

                                            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                                {competition.status}
                                            </span>
                                        </div>

                                        <h2 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-red-900 sm:text-2xl">
                                            {competition.name}
                                        </h2>

                                        <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-5">
                                            <div className="flex items-center gap-2">
                                                <svg
                                                    className="h-5 w-5 shrink-0 text-red-800"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                                                    />
                                                    <circle cx="12" cy="10" r="2.5" />
                                                </svg>

                                                <span>{competition.location}</span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <svg
                                                    className="h-5 w-5 shrink-0 text-red-800"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    aria-hidden="true"
                                                >
                                                    <rect
                                                        x="3"
                                                        y="5"
                                                        width="18"
                                                        height="16"
                                                        rx="2"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        d="M16 3v4M8 3v4M3 10h18"
                                                    />
                                                </svg>

                                                <span>
                                                    {new Date(
                                                        competition.date
                                                    ).toLocaleDateString("sr-RS", {
                                                        day: "2-digit",
                                                        month: "long",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="mt-4 text-sm text-slate-500">
                                            Organizator:{" "}
                                            <span className="font-medium text-slate-700">
                                                {competition.createdById}
                                            </span>
                                        </p>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex flex-col gap-3 sm:w-48 sm:shrink-0">
                                        <Link
                                            href={`/competitions/${competition.id}`}
                                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                                        >
                                            Fight Card

                                            <svg
                                                className="h-4 w-4"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 12h14m-7-7 7 7-7 7"
                                                />
                                            </svg>
                                        </Link>

                                        <Link
                                            href="/registerfighter"
                                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                                        >
                                            Register Fighters
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                /* Empty state */
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-900">
                        <svg
                            className="h-7 w-7"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            aria-hidden="true"
                        >
                            <rect
                                x="3"
                                y="5"
                                width="18"
                                height="16"
                                rx="2"
                            />
                            <path
                                strokeLinecap="round"
                                d="M16 3v4M8 3v4M3 10h18"
                            />
                        </svg>
                    </div>

                    <h2 className="mt-4 text-lg font-bold text-slate-900">
                        Nema dostupnih takmičenja
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Trenutno nema takmičenja za prikaz.
                    </p>
                </div>
            )}
        </div>
    </main>
);

}