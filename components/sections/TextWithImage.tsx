import Image from "next/image";

interface TextWithImageProps {
    title: string;
    content: string;
    image?: string;
    image_alt?: string;
    image_position?: 'left' | 'right';
    layout?: 'standard' | 'overlap' | 'card';
}

export function TextWithImage({
    title,
    content,
    image,
    image_alt = "",
    image_position = 'left',
    layout = 'standard'
}: TextWithImageProps) {
    const isImageLeft = image_position === 'left';

    // --- LAYOUT: CARD (Glassmorphism, Constrained) ---
    if (layout === 'card') {
        return (
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden bg-gray-900/40 backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-purple-900/20 hover:border-purple-500/30 transition-all duration-500 group">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-0 relative z-10`}>
                            {/* Image Side */}
                            <div className={`relative h-64 lg:h-auto ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                                {image ? (
                                    <Image
                                        src={image}
                                        alt={image_alt || title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gray-800" />
                                )}
                            </div>

                            {/* Content Side */}
                            <div className={`p-8 md:p-12 lg:p-16 flex flex-col justify-center ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                                <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                    {title}
                                </h2>
                                <div
                                    className="prose prose-lg prose-invert max-w-none 
                                        prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg
                                        prose-headings:text-white"
                                    dangerouslySetInnerHTML={{ __html: content }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // --- LAYOUT: OVERLAP (Magazine Style) ---
    if (layout === 'overlap') {
        return (
            <section className="py-20 md:py-32 px-6 bg-gray-950 overflow-hidden">
                <div className="max-w-6xl mx-auto relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Image Layer */}
                        <div className={`
                            relative z-0 lg:col-span-7 h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden
                            ${isImageLeft ? 'lg:col-start-1' : 'lg:col-start-6'}
                        `}>
                            {image && (
                                <Image
                                    src={image}
                                    alt={image_alt || title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                />
                            )}
                            <div className="absolute inset-0 bg-black/20" />
                        </div>

                        {/* Content Layer (Floating) */}
                        <div className={`
                            relative z-10 lg:col-span-6 bg-gray-900/90 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-gray-800 shadow-2xl
                            -mt-20 lg:mt-0 
                            ${isImageLeft ? 'lg:col-start-7 lg:-ml-20' : 'lg:col-start-1 lg:row-start-1 lg:-mr-20'}
                        `}>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                                {title}
                            </h2>
                            <div
                                className="prose prose-lg prose-invert max-w-none prose-p:text-gray-300"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // --- LAYOUT: STANDARD (Fallback) ---
    return (
        <section className="py-20 md:py-28 px-6 bg-gray-950">
            <div className="max-w-6xl mx-auto">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
                    {/* Image */}
                    <div className={`${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 shadow-xl ring-1 ring-white/10">
                            {image ? (
                                <Image
                                    src={image}
                                    alt={image_alt || title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Text */}
                    <div className={`${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                            {title}
                        </h2>
                        <div
                            className="prose prose-lg prose-invert max-w-none prose-p:text-gray-300 prose-p:leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
