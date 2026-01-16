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
        gradient: 'bg-black', // Overridden by Nebula effects
        dark: 'bg-black',
        purple: 'bg-black',
    }[background];

    return (
        <section className={`relative py-32 px-6 overflow-hidden border-t border-white/10 bg-[#050505]`}>

            {/* Warp Core Background Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-purple-600/20 rounded-full blur-[100px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] bg-center bg-fixed" />
                <div className="absolute inset-0 bg-noise opacity-[0.05]" />
            </div>

            <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
                <div className="space-y-6">
                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight drop-shadow-2xl">
                        {headline}
                    </h2>
                    {description && (
                        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                            {description}
                        </p>
                    )}
                </div>

                {show_email_input ? (
                    <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <label htmlFor="cta-email" className="sr-only">Email address</label>
                        <div className="relative flex-1 group">
                            {/* Input Glow */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-30 group-hover:opacity-100 transition duration-500 blur-md" />
                            <input
                                id="cta-email"
                                type="email"
                                placeholder="Enter your email"
                                className="relative w-full px-8 py-5 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-lg"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="relative px-10 py-5 bg-white text-black font-bold text-lg rounded-2xl hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)]"
                        >
                            {button_text}
                        </button>
                    </form>
                ) : (
                    <div className="pt-8">
                        <a
                            href={button_link}
                            className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-bold text-xl rounded-full transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)]"
                        >
                            <span>{button_text}</span>
                            <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
