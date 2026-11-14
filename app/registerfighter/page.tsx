
"use client";

import { FormEvent, useEffect, useState } from "react";

type Competition = {
    id: string;
    name: string;
};

type Gym = {
    id: string;
    name: string;
};

export default function RegisterFighterPage() {
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [gyms, setGyms] = useState<Gym[]>([]);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState<boolean | null>(null);

    useEffect(() => {
        async function fetchCompetitions() {
            const response = await fetch("/api/competitions");
            const data = await response.json();

            setCompetitions(data);
        }

        fetchCompetitions();
    }, []);

    useEffect(() => {
        async function fetchGyms() {
            const response = await fetch("api/gyms");
            const data = await response.json();

            setGyms(data);
        }

        fetchGyms();
    }, []);

    function handleGymsChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedGymId = event.target.value;
        console.log("Selected GYM ID:", selectedGymId);
    }

    function handleCompetitionChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedCompetitionId = event.target.value;
        console.log("Selected competition ID:", selectedCompetitionId);
    }

    const handleFighterRegistrationSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const form = e.currentTarget;
        const fighterDataHTML = new FormData(form);

        const data = {
            competitionId: fighterDataHTML.get("selectcompetition"),
            firstName: fighterDataHTML.get("firstname"),
            lastName: fighterDataHTML.get("lastname"),
            gender: fighterDataHTML.get("gender"),
            yearOfBirth: fighterDataHTML.get("birthyear"),
            clubId: fighterDataHTML.get("gym"),
            weight: fighterDataHTML.get("weight"),
            experience: fighterDataHTML.get("experience"),
        };

        try {
            const response = await fetch("/api/registerfighter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                setSuccess(false);
                setMessage(result.message ?? "Registracija nije uspela.");
                return;
            }

            setSuccess(true);
            setMessage("Prijava borca je uspešno obavljena.");
            form.reset();
        } catch (error) {
            setSuccess(false);
            setMessage("Greška pri povezivanju sa serverom.");
        }
    };

    const findRegisteredCompetitions = async () => {
        console.log("Lets try to read competitons from database");

        try {
            await fetch("api/competitions/", {});
        } catch (error) {}
    };

    const inputClass =
        "mt-2 w-full rounded-lg border border-[#DCE4ED] bg-white px-4 py-3 text-sm text-[#142B4A] outline-none transition placeholder:text-slate-400 focus:border-[#315A83] focus:ring-2 focus:ring-[#315A83]/20";

    const labelClass = "block text-sm font-semibold text-slate-700";

    return (
        <main className="mx-auto w-full max-w-5xl space-y-8">

            {/* Page header */}
            <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#24476B]">
                    Fighter Management
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#142B4A] sm:text-4xl">
                    Prijava borca
                </h1>

                <p className="mt-2 text-sm text-slate-500 sm:text-base">
                    Unos podataka borca i prijava za izabrano takmičenje.
                </p>
            </div>

            {/* Registration form */}
            <form
                onSubmit={handleFighterRegistrationSubmit}
                className="overflow-hidden rounded-xl border border-[#DCE4ED] bg-white shadow-sm"
            >
                <div className="space-y-8 p-6 sm:p-8">

                    {/* Competition and club */}
                    <section>
                        <div className="mb-5 flex items-center gap-3 border-b border-[#E8EDF3] pb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF0F6] text-[#24476B]">
                                <span className="text-lg">🏆</span>
                            </div>

                            <div>
                                <h2 className="font-bold text-[#142B4A]">
                                    Takmičenje i klub
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Izbor takmičenja i matičnog kluba
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="selectcompetition"
                                    className={labelClass}
                                >
                                    Takmičenje
                                </label>

                                <select
                                    name="selectcompetition"
                                    id="selectcompetition"
                                    onChange={handleCompetitionChange}
                                    className={inputClass}
                                >
                                    <option value="">Izaberi takmičenje</option>

                                    {competitions.map((competition) => (
                                        <option
                                            key={competition.id}
                                            value={competition.id}
                                        >
                                            {competition.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="gym" className={labelClass}>
                                    Klub
                                </label>

                                <select
                                    name="gym"
                                    id="gym"
                                    onChange={handleGymsChange}
                                    className={inputClass}
                                >
                                    <option value="">Izaberi klub</option>

                                    {gyms.map((gym) => (
                                        <option key={gym.id} value={gym.id}>
                                            {gym.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Personal information */}
                    <section>
                        <div className="mb-5 flex items-center gap-3 border-b border-[#E8EDF3] pb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF0F6] text-[#24476B]">
                                <span className="text-lg">👤</span>
                            </div>

                            <div>
                                <h2 className="font-bold text-[#142B4A]">
                                    Lični podaci borca
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Osnovne informacije o takmičaru
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label htmlFor="firstname" className={labelClass}>
                                    Ime
                                </label>

                                <input
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    required
                                    placeholder="Ime borca"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label htmlFor="lastname" className={labelClass}>
                                    Prezime
                                </label>

                                <input
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    required
                                    placeholder="Prezime borca"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label htmlFor="gender" className={labelClass}>
                                    Pol
                                </label>

                                <select
                                    name="gender"
                                    id="gender"
                                    required
                                    className={inputClass}
                                >
                                    <option value="">Izaberi pol</option>
                                    <option value="MALE">Muški</option>
                                    <option value="FEMALE">Ženski</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="birthyear" className={labelClass}>
                                    Godina rođenja
                                </label>

                                <input
                                    type="text"
                                    name="birthyear"
                                    id="birthyear"
                                    required
                                    placeholder="Npr. 2005"
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Competition information */}
                    <section>
                        <div className="mb-5 flex items-center gap-3 border-b border-[#E8EDF3] pb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF0F6] text-[#24476B]">
                                <span className="text-lg">🥊</span>
                            </div>

                            <div>
                                <h2 className="font-bold text-[#142B4A]">
                                    Takmičarski podaci
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Težina i prethodno takmičarsko iskustvo
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label htmlFor="weight" className={labelClass}>
                                    Težina (kg)
                                </label>

                                <input
                                    type="text"
                                    name="weight"
                                    id="weight"
                                    required
                                    placeholder="Npr. 67.5"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label htmlFor="experience" className={labelClass}>
                                    Broj prethodnih borbi
                                </label>

                                <input
                                    type="text"
                                    name="experience"
                                    id="experience"
                                    required
                                    placeholder="Ukupan broj borbi"
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Submit */}
                    <div className="border-t border-[#E8EDF3] pt-6">
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[#142B4A] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#24476B] focus:outline-none focus:ring-2 focus:ring-[#315A83] focus:ring-offset-2"
                        >
                            Registruj borca
                        </button>

                        {message && (
                            <p
                                role="status"
                                className={`mt-4 rounded-lg border px-4 py-3 text-sm font-medium ${
                                    success
                                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                        : "border-red-200 bg-red-50 text-red-700"
                                }`}
                            >
                                {message}
                            </p>
                        )}
                    </div>
                </div>
            </form>
        </main>
    );
}
