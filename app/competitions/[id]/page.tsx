
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function CompetitionPage({ params }: Props) {
    const { id } = await params;

    const competition = await prisma.competition.findUnique({
        where: {
            id: id,
        },
    });

    if (!competition) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl space-y-8">

                {/* Competition header */}
                <header className="rounded-2xl bg-gradient-to-r from-slate-950 via-red-950 to-slate-900 px-6 py-8 text-white shadow-lg sm:px-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
                        Muay Thai Championship
                    </p>

                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                        {competition.name}
                    </h1>

                    <p className="mt-3 text-slate-300">
                        {competition.location}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                        {new Date(competition.date).toLocaleDateString("sr-RS")}
                    </p>
                </header>

                {/* Fight Card selection */}
                <section>
                    <h2 className="mb-2 text-2xl font-bold text-slate-900">
                        Fight Cards
                    </h2>

                    <p className="mb-6 text-slate-600">
                        Izaberite Fight Card prema polu takmičara.
                    </p>

                    <div className="grid gap-5 sm:grid-cols-2">

                        {/* Male Fight Card */}
                        <Link
                            href={`/competitions/${id}/male`}
                            className="group rounded-2xl border-2 border-blue-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-md"
                        >
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl">
                                🥊
                            </div>

                            <h3 className="text-xl font-bold text-slate-900">
                                Men's Fight Card
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Prikaži muške takmičare grupisane po starosnim
                                i težinskim kategorijama.
                            </p>

                            <span className="mt-5 inline-block font-semibold text-blue-700 group-hover:text-blue-900">
                                Otvori Fight Card →
                            </span>
                        </Link>

                        {/* Female Fight Card */}
                        <Link
                            href={`/competitions/${id}/female`}
                            className="group rounded-2xl border-2 border-pink-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-pink-500 hover:shadow-md"
                        >
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-xl">
                                🥊
                            </div>

                            <h3 className="text-xl font-bold text-slate-900">
                                Women's Fight Card
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Prikaži takmičarke grupisane po starosnim
                                i težinskim kategorijama.
                            </p>

                            <span className="mt-5 inline-block font-semibold text-pink-700 group-hover:text-pink-900">
                                Otvori Fight Card →
                            </span>
                        </Link>

                    </div>
                </section>

                {/* Back to competitions */}
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
