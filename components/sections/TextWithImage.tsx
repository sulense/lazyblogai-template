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
    const isOverlap = layout === 'overlap';
    const isCard = layout === 'card';

    return (
        <section className="py-24 px-6 relative overflow-hidden bg-black">
            {/* Background Decorations */}
            {!isOverlap && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/2 left-0 w-[50vw] h-[50vw] bg-purple-500/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/4" />
                    <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/4 translate-x-1/4" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] bg-center" />
                    <div className="absolute inset-0 bg-noise opacity-[0.05]" />
                </div>
            )}

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className={`
                    grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center
                    ${isOverlap ? '' : ''}
                `}>
                    {/* Image Column */}
                    <div className={`
                        relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group
                        ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}
                    `}>
                        {image ? (
                            <>
                                <Image
                                    src={image}
                                    alt={image_alt || title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            </>
                        ) : (
                            // Nebula Fallback
                            <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center">
                                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
                                <div className="absolute inset-0 bg-grid-white/[0.1] bg-[length:30px_30px]" />
                                <div className="relative z-10 w-24 h-24 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        )}

                        {/* Overlap Card Logic (if we want to keep it simpler, we just stack, but let's stick to clean split for now to guarantee no breakage) */}
                    </div>

                    {/* Text Column */}
                    <div className={`
                        space-y-8
                        ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}
                        ${isCard ? 'bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10' : ''}
                    `}>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter leading-none">
                            {title}
                        </h2>
                        <div
                            className="prose prose-invert prose-lg text-gray-300 leading-relaxed max-w-none"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
