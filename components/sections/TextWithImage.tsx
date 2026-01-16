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
        <section className={`py-24 px-6 overflow-hidden ${isCard ? 'bg-white/5' : ''}`}>
            <div className={`max-w-7xl mx-auto ${isOverlap ? 'relative' : ''}`}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isImageLeft ? 'lg:flex-row-reverse' : ''}`}>

                    {/* Text Content */}
                    <div className={`
                        space-y-8 animate-fadeInUp 
                        ${isImageLeft ? (isOverlap ? 'lg:order-2 lg:-ml-24 z-10' : 'lg:order-2') : (isOverlap ? 'lg:order-1 lg:-mr-24 z-10' : 'lg:order-1')}
                        ${isOverlap ? 'bg-black/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl' : ''}
                    `}>
                        {title && (
                            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent inline-block">
                                {title}
                            </h2>
                        )}

                        <div
                            className="prose prose-lg prose-invert max-w-none 
                                prose-headings:text-white prose-headings:font-bold
                                prose-p:text-gray-300 prose-p:leading-relaxed
                                prose-li:text-gray-300
                                prose-strong:text-purple-300
                                prose-a:text-blue-400 hover:prose-a:text-blue-300"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>

                    {/* Image or Pattern */}
                    <div className={`relative ${isImageLeft ? 'lg:order-1' : 'lg:order-2'} ${isOverlap ? 'h-full min-h-[400px]' : ''} animate-fadeInUp`} style={{ animationDelay: '0.2s' }}>
                        {image ? (
                            <div className={`relative aspect-[4/3] w-full ${isOverlap ? 'h-full' : ''} rounded-3xl overflow-hidden shadow-2xl group border border-white/5`}>
                                <Image
                                    src={image}
                                    alt={image_alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent mix-blend-overlay" />
                            </div>
                        ) : (
                            // Fallback Geometric Pattern if no image
                            <div className={`relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900 border border-white/10 shadow-2xl flex items-center justify-center ${isOverlap ? 'h-full' : ''}`}>
                                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                                {/* Placeholder Icon */}
                                <div className="relative z-10 p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white/50">
                                    <svg className="w-16 h-16 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        )}

                        {/* Decorative background blob for Standard layout */}
                        {!isOverlap && (
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl -z-10`} />
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}
