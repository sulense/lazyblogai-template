interface QuoteProps {
    quote: string;
    source?: string;
    background?: 'dark' | 'gradient' | 'transparent';
}

export function Quote({
    quote,
    source,
    background = 'dark',
}: QuoteProps) {
    const bgClass = {
        dark: 'bg-white/5',
        gradient: 'bg-gradient-to-r from-purple-900/30 to-blue-900/30',
        transparent: 'bg-transparent',
    }[background];

    return (
        <section className={`py-16 px-6 ${bgClass}`}>
            <div className="max-w-4xl mx-auto text-center">
                {/* Quote Mark */}
                <div className="text-6xl text-purple-500/50 mb-6">"</div>

                {/* Quote Text */}
                <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed italic">
                    {quote}
                </blockquote>

                {/* Source */}
                {source && (
                    <cite className="block mt-6 text-gray-400 not-italic">
                        — {source}
                    </cite>
                )}
            </div>
        </section>
    );
}
