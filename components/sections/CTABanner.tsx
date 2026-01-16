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
        gradient: 'bg-gradient-to-r from-purple-900/50 via-indigo-900/50 to-blue-900/50',
        dark: 'bg-white/5',
        purple: 'bg-gradient-to-r from-purple-600 to-indigo-600',
    }[background];

    return (
        <section className={`py-16 px-6 ${bgClass}`}>
            <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    {headline}
                </h2>

                {description && (
                    <p className="text-lg text-gray-300">
                        {description}
                    </p>
                )}

                {show_email_input ? (
                    <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                        <label htmlFor="cta-email" className="sr-only">Email address</label>
                        <input
                            id="cta-email"
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
                            required
                        />
                        <button
                            type="submit"
                            className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
                        >
                            {button_text}
                        </button>
                    </form>
                ) : (
                    <a
                        href={button_link}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
                    >
                        {button_text}
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                )}
            </div>
        </section>
    );
}
