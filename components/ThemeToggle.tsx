"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check localStorage or system preference
        const stored = localStorage.getItem("theme");
        if (stored) {
            setIsDark(stored === "dark");
        } else {
            // Default to dark mode
            setIsDark(true);
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const html = document.documentElement;
        if (isDark) {
            html.classList.add("dark");
            html.classList.remove("light");
            localStorage.setItem("theme", "dark");
        } else {
            html.classList.add("light");
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark, mounted]);

    if (!mounted) {
        // Prevent hydration mismatch - render placeholder
        return <div className="w-16 h-8" />;
    }

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-105 active:scale-95 backdrop-blur-md flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDark ? (
                <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
            ) : (
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )}
        </button>
    );
}
