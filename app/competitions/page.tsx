
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function CompetitionsHomePage() {
    const competitions = await prisma.competition.findMany({
        orderBy: {
            date: "asc",
        },
    });

    return (
        <main className="mx-auto w-full max-w-7xl space-y-8">

            {/* Page header */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#24476B]">
                        Muay Thai Management
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#142B4A] sm:text-4xl">
                        Takmičenja
                    </h1>

                    <p className="mt-2 text-sm text-slate-500 sm:text-base">
                        Pregled i upravljanje Muay Thai takmičenjima.
                    </p>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-lg border border-[#DCE4ED] bg-white px-4 py-2.5 shadow-sm">
                    <span className="text-xl font-bold text-[#142B4A]">
                        {competitions.length}
                    </span>
                    <span className="text-sm text-slate-500">
                        {competitions.length === 1
                            ? "takmičenje"
                            : "takmičenja"}
                    </span>
                </div>
            </div>

            {/* Competitions list */}
            {competitions.length > 0 ? (
                <div className="space-y-4">

                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-[#142B4A]">
                            Sva takmičenja
                        </h2>

                        <span className="text-sm text-slate-500">
                            Ukupno: {competitions.length}
                        </span>
                    </div>

                    <div className="grid gap-5">
                        {competitions.map((competition) => {
                            const statusStyles =
                                competition.status === "REGISTRATION_OPEN"
                                    ? "bg-emerald-50 text-emerald-700"
                                    : competition.status === "DRAFT"
                                    ? "bg-slate-100 text-slate-600"
                                    : "bg-blue-50 text-blue-700";

                            const statusLabel =
                                competition.status === "REGISTRATION_OPEN"
                                    ? "Otvorene prijave"
                                    : competition.status === "DRAFT"
                                    ? "U pripremi"
                                    : competition.status;

                            return (
                                <article
                                    key={competition.id}
                                    className="group overflow-hidden rounded-xl border border-[#DCE4ED] bg-white shadow-sm transition-all duration-200 hover:border-[#A9BACD] hover:shadow-md"
                                >
                                    <div className="h-1 bg-[#24476B]" />

                                    <div className="flex flex-col gap-6 p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between">

                                        {/* Competition information */}
                                        <div className="min-w-0 flex-1">

                                            <div className="mb-3 flex flex-wrap items-center gap-2">
                                                <span className="rounded-md bg-[#EAF0F6] px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-[#24476B]">
                                                    Muay Thai
                                                </span>

                                                <span
                                                    className={`rounded-md px-2.5 py-1 text-xs font-semibold ${statusStyles}`}
                                                >
                                                    {statusLabel}
                                                </span>
                                            </div>

                                            <h2 className="text-xl font-bold text-[#142B4A] transition-colors group-hover:text-[#315A83] sm:text-2xl">
                                                {competition.name}
                                            </h2>

                                            {/* Location and date */}
                                            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-6">

                                                <div className="flex items-center gap-2">
                                                    <svg
                                                        className="h-5 w-5 shrink-0 text-[#315A83]"
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
                                                        className="h-5 w-5 shrink-0 text-[#315A83]"
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

                                            {/* Organizer */}
                                            <p className="mt-5 text-xs text-slate-400">
                                                Organizator:{" "}
                                                <span className="font-medium text-slate-600">
                                                    {competition.createdById}
                                                </span>
                                            </p>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="flex flex-col gap-3 sm:flex-row lg:w-52 lg:shrink-0 lg:flex-col">

                                            <Link
                                                href={`/competitions/${competition.id}`}
                                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#142B4A] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#24476B] focus:outline-none focus:ring-2 focus:ring-[#315A83] focus:ring-offset-2"
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
                                                className="inline-flex items-center justify-center rounded-lg border border-[#DCE4ED] bg-white px-5 py-3 text-sm font-semibold text-[#24476B] transition-colors hover:border-[#A9BACD] hover:bg-[#F4F6F9] focus:outline-none focus:ring-2 focus:ring-[#315A83] focus:ring-offset-2"
                                            >
                                                Register Fighters
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            ) : (

                /* Empty state */
                <div className="rounded-xl border border-dashed border-[#C8D4E1] bg-white px-6 py-16 text-center">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF0F6] text-[#24476B]">
                        <svg
                            className="h-8 w-8"
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

                    <h2 className="mt-5 text-lg font-bold text-[#142B4A]">
                        Nema dostupnih takmičenja
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Trenutno nema takmičenja za prikaz.
                    </p>
                </div>
            )}
        </main>
    );
}
