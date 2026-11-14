
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { logout } from "@/lib/auth";

export default function Navbar() {
    const { data: session } = useSession();
    const pathname = usePathname();

    const navLinkClass = (href: string) => {
        const isActive =
            pathname === href ||
            (href !== "/" && pathname.startsWith(href));

        return `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
            isActive
                ? "bg-[#294666] text-white"
                : "text-slate-300 hover:bg-[#203B5B] hover:text-white"
        }`;
    };

    return (
        <aside className="flex min-h-screen w-[250px] shrink-0 flex-col bg-[#142B4A] text-white">

            {/* Logo */}
            <div className="flex h-20 items-center px-6">
                <Link href="/" className="text-lg font-bold tracking-wide">
                    FIGHT MANAGER
                    <span className="mt-1 block text-[10px] font-medium tracking-[0.2em] text-slate-400">
                        ADMIN PANEL
                    </span>
                </Link>
            </div>

            <div className="mx-4 border-t border-[#36506D]" />

            {/* Navigation */}
            <nav className="flex-1 space-y-6 px-3 py-6">

                <div>
                    <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Main menu
                    </p>

                    <div className="space-y-1">
                        <Link href="/competitions" className={navLinkClass("/competitions")}>
                            <span>🏆</span>
                            Competitions
                        </Link>

                        {session && (
                            <>
                                <Link href="/admin" className={navLinkClass("/admin")}>
                                    <span>⚙️</span>
                                    Admin
                                </Link>

                                <Link
                                    href="/registerfighter"
                                    className={navLinkClass("/registerfighter")}
                                >
                                    <span>👤</span>
                                    Register Fighter
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* User section */}
            <div className="border-t border-[#36506D] p-4">
                {session ? (
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 px-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#36506D] font-semibold">
                                {(session.user?.name || "A").charAt(0).toUpperCase()}
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold">
                                    {session.user?.name || "Administrator"}
                                </p>
                                <p className="text-xs text-slate-400">
                                    Administrator
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={logout}
                            className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-300 transition-colors hover:bg-[#203B5B] hover:text-white"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <Link
                        href="/auth/signin"
                        className="block rounded-lg bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#142B4A] transition-colors hover:bg-slate-200"
                    >
                        Sign In
                    </Link>
                )}
            </div>
        </aside>
    );
}
