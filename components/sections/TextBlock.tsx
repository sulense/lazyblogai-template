interface TextBlockProps {
    title?: string;
    content: string; // HTML content
    max_width?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function TextBlock({
    title,
    content,
    max_width = 'lg',
}: TextBlockProps) {
    const widthClass = {
        sm: 'max-w-2xl',
        md: 'max-w-3xl',
        lg: 'max-w-4xl',
        xl: 'max-w-5xl',
        full: 'max-w-7xl',
    }[max_width];

    return (
        <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-black">
            {/* Background Texture match other sections */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-noise opacity-[0.05]" />
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/[0.02] to-transparent" />
            </div>

            <div className={`relative z-10 mx-auto ${widthClass}`}>
                {title && (
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 tracking-tight">
                        {title}
                    </h2>
                )}

                <div
                    className="prose prose-lg md:prose-xl prose-invert max-w-none 
                        prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                        prose-p:text-gray-300 prose-p:leading-loose
                        prose-a:text-purple-400 hover:prose-a:text-purple-300 prose-a:transition-colors
                        prose-strong:text-white prose-strong:font-semibold
                        prose-ul:text-gray-300 prose-ol:text-gray-300
                        prose-li:marker:text-purple-500"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>
        </section>
    );
}
