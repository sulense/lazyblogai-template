"use client";

import Link from "next/link";

export default function NotFound() {
    const primaryColor = 'var(--primary-color)';

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6">
            <div className="text-center max-w-lg space-y-8">
                {/* 404 Visual */}
                <div className="relative">
                    <h1 className="text-[150px] md:text-[200px] font-bold text-white/5 leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div
                            className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl"
                            style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)` }}
                        >
                            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        Page Not Found
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                        Let&apos;s get you back on track.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                        style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)` }}
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Back to Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/5 transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                        Go Back
                    </button>
                </div>

                {/* Decorative elements */}
                <div className="pt-8 flex items-center justify-center gap-2 text-gray-600 text-sm">
                    <span>Lost?</span>
                    <span>•</span>
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                        Browse all articles
                    </Link>
                </div>
            </div>
        </div>
    );
}
