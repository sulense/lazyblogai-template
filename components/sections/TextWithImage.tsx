import Image from "next/image";

interface TextWithImageProps {
    title?: string;
    content: string; // HTML content
    image?: string;
    image_alt?: string;
    image_position?: 'left' | 'right';
    layout?: 'standard' | 'overlap' | 'card';
}

export function TextWithImage({
    title,
    content,
    image,
    image_alt = '',
    image_position = 'right',
    layout = 'standard',
}: TextWithImageProps) {
    const isImageLeft = image_position === 'left';
    const isOverlap = layout === 'overlap';
    const isCard = layout === 'card';

    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 -ml-20" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-20 translate-y-1/3" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`}>

                    {/* Text Content */}
                    <div className={`space-y-8 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                        {title && (
                            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                                {title}
                            </h2>
                        )}
                        <div
                            className="prose prose-lg prose-invert max-w-none text-gray-300"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>

                    {/* Image */}
                    <div className={`relative ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                            {image ? (
                                <Image
                                    src={image}
                                    alt={image_alt || title || ''}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                                    <div className="p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10">
                                        <svg className="w-12 h-12 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
