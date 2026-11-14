
"use client";

import { FormEvent } from "react";

export default function AdminPage() {

    const handleAddGymSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dataFormAddGym = new FormData(e.currentTarget);

        const gymData = {
            name: dataFormAddGym.get("clubname"),
            state: dataFormAddGym.get("clubstate"),
            city: dataFormAddGym.get("clubcity"),
            country: dataFormAddGym.get("clubcountry"),
        };

        try {
            await fetch("/api/admin/addnewgym", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(gymData),
            });
        } catch {
            console.log("Internal server error");
        }
    };

    const handleAddCompetitionSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const competitionDataHTML = new FormData(e.currentTarget);

        const competitionData = {
            name: competitionDataHTML.get("competitionname"),
            location: competitionDataHTML.get("competitionlocation"),
            date: competitionDataHTML.get("competitiondate"),
            registrationDeadline: competitionDataHTML.get("competitiondeadline"),
            status: competitionDataHTML.get("competitionstatus"),
        };

        try {
            await fetch("/api/admin/addnewcompetition", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(competitionData),
            });
        } catch (error) {
            console.log("Internal server error");
        }
    };

    const inputClass =
        "w-full rounded-lg border border-[#DCE4ED] bg-white px-4 py-3 text-sm text-[#142B4A] outline-none transition placeholder:text-slate-400 focus:border-[#315A83] focus:ring-2 focus:ring-[#315A83]/20";

    const labelClass =
        "block text-sm font-semibold text-slate-700";

    return (
        <main className="mx-auto w-full max-w-7xl space-y-8">

            {/* Page header */}
            <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#24476B]">
                    Administration
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#142B4A] sm:text-4xl">
                    Admin Panel
                </h1>

                <p className="mt-2 text-sm text-slate-500 sm:text-base">
                    Upravljanje takmičenjima i sportskim klubovima.
                </p>
            </div>

            {/* Forms */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                {/* Competition form */}
                <form
                    onSubmit={handleAddCompetitionSubmit}
                    className="rounded-xl border border-[#DCE4ED] bg-white p-6 shadow-sm sm:p-8"
                >
                    <div className="mb-7 border-b border-[#E8EDF3] pb-5">
                        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-[#EAF0F6] text-[#24476B]">
                            <svg
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                aria-hidden="true"
                            >
                                <rect x="3" y="5" width="18" height="16" rx="2" />
                                <path strokeLinecap="round" d="M16 3v4M8 3v4M3 10h18" />
                            </svg>
                        </div>

                        <h2 className="text-xl font-bold text-[#142B4A]">
                            Novo takmičenje
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Unesi osnovne informacije o novom takmičenju.
                        </p>
                    </div>

                    <div className="space-y-5">

                        <div className="space-y-2">
                            <label htmlFor="competitionname" className={labelClass}>
                                Naziv takmičenja
                            </label>
                            <input
                                type="text"
                                name="competitionname"
                                id="competitionname"
                                required
                                className={inputClass}
                                placeholder="Npr. Serbian Open 2026"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="competitionlocation" className={labelClass}>
                                Lokacija
                            </label>
                            <input
                                type="text"
                                name="competitionlocation"
                                id="competitionlocation"
                                required
                                className={inputClass}
                                placeholder="Grad, država"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                            <div className="space-y-2">
                                <label htmlFor="competitiondate" className={labelClass}>
                                    Datum takmičenja
                                </label>
                                <input
                                    type="date"
                                    name="competitiondate"
                                    id="competitiondate"
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="competitiondeadline" className={labelClass}>
                                    Rok za prijavu
                                </label>
                                <input
                                    type="date"
                                    name="competitiondeadline"
                                    id="competitiondeadline"
                                    required
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="competitionstatus" className={labelClass}>
                                Status takmičenja
                            </label>

                            <select
                                name="competitionstatus"
                                id="competitionstatus"
                                className={inputClass}
                            >
                                <option value="">Izaberi status</option>
                                <option value="DRAFT">DRAFT</option>
                                <option value="REGISTRATION_OPEN">REGISTRATION_OPEN</option>
                                <option value="REGISTRATION_CLOSED">REGISTRATION_CLOSED</option>
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="FINISHED">FINISHED</option>
                                <option value="CANCELLED">CANCELLED</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[#142B4A] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#24476B] focus:outline-none focus:ring-2 focus:ring-[#315A83] focus:ring-offset-2"
                        >
                            Registruj takmičenje
                        </button>
                    </div>
                </form>

                {/* Club form */}
                <form
                    onSubmit={handleAddGymSubmit}
                    className="rounded-xl border border-[#DCE4ED] bg-white p-6 shadow-sm sm:p-8"
                >
                    <div className="mb-7 border-b border-[#E8EDF3] pb-5">
                        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-[#EAF0F6] text-[#24476B]">
                            <svg
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01"
                                />
                            </svg>
                        </div>

                        <h2 className="text-xl font-bold text-[#142B4A]">
                            Novi klub
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Unesi informacije o klubu ili sportskoj organizaciji.
                        </p>
                    </div>

                    <div className="space-y-5">

                        <div className="space-y-2">
                            <label htmlFor="clubname" className={labelClass}>
                                Naziv kluba
                            </label>
                            <input
                                type="text"
                                name="clubname"
                                id="clubname"
                                className={inputClass}
                                placeholder="Naziv sportskog kluba"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="clubstate" className={labelClass}>
                                Država / region
                            </label>
                            <input
                                type="text"
                                name="clubstate"
                                id="clubstate"
                                className={inputClass}
                                placeholder="Npr. Vojvodina"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="clubcity" className={labelClass}>
                                Grad
                            </label>
                            <input
                                type="text"
                                name="clubcity"
                                id="clubcity"
                                className={inputClass}
                                placeholder="Npr. Novi Sad"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="clubcountry" className={labelClass}>
                                Zemlja
                            </label>
                            <input
                                type="text"
                                name="clubcountry"
                                id="clubcountry"
                                className={inputClass}
                                placeholder="Npr. Srbija"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[#142B4A] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#24476B] focus:outline-none focus:ring-2 focus:ring-[#315A83] focus:ring-offset-2"
                        >
                            Registruj klub
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}