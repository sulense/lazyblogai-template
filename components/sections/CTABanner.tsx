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
    return (
        <section className="py-24 px-6 relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-black border-t border-white/10">
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-purple-600/20 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            </div>

            <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    {headline}
                </h2>

                {description && (
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {description}
                    </p>
                )}

                {show_email_input ? (
                    <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto pt-4">
                        <label htmlFor="cta-email" className="sr-only">Email address</label>
                        <input
                            id="cta-email"
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 bg-black/50 backdrop-blur border border-white/20 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                        <button
                            type="submit"
                            className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-all hover:scale-105"
                        >
                            {button_text}
                        </button>
                    </form>
                ) : (
                    <div className="pt-4">
                        <a
                            href={button_link}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all hover:scale-105"
                        >
                            <span>{button_text}</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
