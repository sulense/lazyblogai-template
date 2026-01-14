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
            className="relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            style={{
                background: isDark
                    ? "linear-gradient(135deg, #1f2937, #374151)"
                    : "linear-gradient(135deg, #e5e7eb, #f3f4f6)"
            }}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {/* Toggle knob */}
            <span
                className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center shadow-md ${isDark ? "left-1 bg-gray-800" : "left-9 bg-white"
                    }`}
            >
                {isDark ? (
                    // Moon icon
                    <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                ) : (
                    // Sun icon
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                )}
            </span>
        </button>
    );
}
