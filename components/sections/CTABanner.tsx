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
}: CTABannerProps) {

    return (
        <section className="py-20 md:py-28 px-6 bg-gradient-to-br from-purple-900/30 via-gray-900 to-blue-900/30 border-t border-gray-800">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    {headline}
                </h2>

                {description && (
                    <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        {description}
                    </p>
                )}

                {show_email_input ? (
                    <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <label htmlFor="cta-email" className="sr-only">Email address</label>
                        <input
                            id="cta-email"
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                            required
                        />
                        <button
                            type="submit"
                            className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all"
                        >
                            {button_text}
                        </button>
                    </form>
                ) : (
                    <a
                        href={button_link}
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 font-semibold text-lg rounded-full hover:bg-gray-100 transition-all"
                    >
                        <span>{button_text}</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                )}
            </div>
        </section>
    );
}
