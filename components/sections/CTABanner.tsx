interface CTABannerProps {
    headline: string;
    description?: string;
    button_text: string;
    button_link?: string;
    show_email_input?: boolean;
    background?: 'gradient' | 'dark' | 'purple';
}

export function CTABanner({
    headline,
    description,
    button_text,
    button_link = '#',
    show_email_input = true,
    background = 'gradient',
}: CTABannerProps) {
    const bgClass = {
        gradient: 'bg-gradient-to-r from-purple-800 via-indigo-900 to-blue-900',
        dark: 'bg-black/90',
        purple: 'bg-gradient-to-r from-purple-600 to-indigo-600',
    }[background];

    return (
        <section className={`py-24 px-6 relative overflow-hidden ${bgClass}`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Animated Glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />

            <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-xl">
                    {headline}
                </h2>

                {description && (
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        {description}
                    </p>
                )}

                {show_email_input ? (
                    <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto pt-4">
                        <label htmlFor="cta-email" className="sr-only">Email address</label>
                        <div className="relative flex-1 group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-50 group-hover:opacity-100 transition duration-300 blur-sm" />
                            <input
                                id="cta-email"
                                type="email"
                                placeholder="Enter your email"
                                className="relative w-full px-6 py-4 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-medium"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="relative px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-all hover:scale-105 shadow-xl shadow-purple-900/20 group overflow-hidden"
                        >
                            <span className="relative z-10">{button_text}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </form>
                ) : (
                    <div className="pt-4">
                        <a
                            href={button_link}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl shadow-purple-900/20 overflow-hidden"
                        >
                            <span className="relative z-10">{button_text}</span>
                            <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
