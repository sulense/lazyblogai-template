interface TextBlockProps {
    title?: string;
    content: string;
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
        <section className="py-20 md:py-28 px-6 bg-gray-950">
            <div className={`mx-auto max-w-4xl`}>
                {/* Content Card */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 md:p-12 lg:p-16">
                    {title && (
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 pb-6 border-b border-gray-800">
                            {title}
                        </h2>
                    )}

                    {/* Force strong text white with inline style override as backup */}
                    <div className="text-white">
                        <style>{`
                            .prose strong { color: white !important; }
                            .prose b { color: white !important; }
                        `}</style>
                        <div
                            className="prose prose-lg prose-invert max-w-none 
                                prose-headings:text-white prose-headings:font-semibold
                                prose-p:text-gray-200 prose-p:leading-relaxed
                                prose-a:text-purple-400 hover:prose-a:text-purple-300
                                prose-strong:!text-white [&_strong]:!text-white
                                prose-ul:text-gray-200 prose-ol:text-gray-200
                                prose-li:text-gray-200 prose-li:marker:text-purple-400
                                [&_li]:text-gray-200 [&_p]:text-gray-200 text-gray-200"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
