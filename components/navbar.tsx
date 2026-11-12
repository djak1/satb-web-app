"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";


export default function Navbar() {
    const {data: session} = useSession()
    return (
    <nav className="bg-red-950 shadow-lg border-b border-red-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center min-h-20">

            {/* Logo and brand */}
            <div className="flex">
            <Link
                href="/"
                className="flex items-center gap-3 py-3"
            >
                <span className="text-lg sm:text-xl font-bold text-white tracking-wide">
                COMPETITION MANAGEMENT
                </span>
            </Link>
            </div>

            {/* Navigation links */}
            <div className="flex items-center gap-1 sm:gap-3">

            <Link
                href="/competitions"
                className="px-4 py-3 text-base font-semibold tracking-wide text-red-100 rounded-lg hover:text-white hover:bg-red-800 transition-colors duration-200"
            >
                Competitions
            </Link>
            <div className="h-7 w-px bg-red-800 mx-1" />

            {session ? (
                <>
                <Link
                    href="/admin"
                    className="px-4 py-3 text-base font-semibold tracking-wide text-red-100 rounded-lg hover:text-white hover:bg-red-800 transition-colors duration-200"
                >
                    Admin
                </Link>
                <div className="h-7 w-px bg-red-800 mx-1" />

                <Link
                    href="/registerfighter"
                    className="px-4 py-3 text-base font-semibold tracking-wide text-red-100 rounded-lg hover:text-white hover:bg-red-800 transition-colors duration-200"
                >
                    Register Fighter
                </Link>
                <div className="h-7 w-px bg-red-800 mx-1" />

                <button
                    onClick={logout}
                    className="px-4 py-3 text-base font-semibold tracking-wide text-white rounded-lg bg-red-800 hover:bg-red-700 transition-colors duration-200"
                >
                    Sign Out
                </button>
                </>
            ) : (
                <Link
                href="/auth/signin"
                className="px-4 py-2 rounded-md text-sm font-semibold text-white bg-red-800 hover:bg-red-700 transition-colors duration-200"
                >
                Sign In
                </Link>
            )}

            </div>
        </div>
        </div>
    </nav>
    );
}