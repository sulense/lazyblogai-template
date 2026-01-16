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

                    {/* Background Decorations for Standard Layout */}
                    {!isOverlap && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute top-1/2 left-0 w-[50vw] h-[50vw] bg-purple-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-[-20%]" />
                            <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-blue-500/10 rounded-full blur-[100px] translate-y-[20%] translate-x-[20%]" />
                            <div className="absolute inset-0 bg-noise opacity-[0.03]" />
                        </div>
                    )}

                    <div className="relative z-10 max-w-7xl mx-auto">
                        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-24 items-center ${isOverlap ? 'lg:grid-cols-12' : ''}`}>

                            {/* Image Column */}
                            <div className={`
                        relative 
                        ${isImageLeft ? 'lg:order-1' : 'lg:order-2'} 
                        ${isOverlap
                                    ? isImageLeft ? 'lg:col-span-8 lg:col-start-1' : 'lg:col-span-8 lg:col-start-5'
                                    : ''
                                } 
                        group
                    `}>
                                <div className={`
                            relative rounded-3xl overflow-hidden shadow-2xl border border-white/10
                            ${isOverlap ? 'aspect-[16/9] lg:aspect-[21/9] min-h-[400px]' : 'aspect-square lg:aspect-[4/3]'}
                        `}>
                                    {image ? (
                                        <Image
                                            src={image}
                                            alt={title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                    ) : (
                                        // Premium Nebula Fallback
                                        <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
                                            <div className="absolute inset-0 bg-grid-white/[0.1] bg-[length:30px_30px]" />
                                            {/* Center Icon */}
                                            <div className="relative z-10 w-24 h-24 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                                                <svg className="w-10 h-10 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                                </div>
                            </div>

                            {/* Text Column */}
                            <div className={`
                        relative z-20
                        ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}
                        ${isOverlap
                                    ? isImageLeft
                                        ? 'lg:col-span-5 lg:col-start-8 lg:-ml-12 mt-[-10%] lg:mt-0'
                                        : 'lg:col-span-5 lg:col-start-1 lg:-mr-12 mt-[-10%] lg:mt-0'
                                    : ''
                                }
                    `}>
                                <div className={`
                            ${isOverlap ? 'bg-white/5 backdrop-blur-xl border border-white/10 p-8 lg:p-12 rounded-3xl shadow-2xl skew-y-0' : 'space-y-8'}
                        `}>
                                    <h2 className={`
                                font-bold text-white tracking-tighter leading-tight
                                ${isOverlap ? 'text-3xl lg:text-5xl mb-6' : 'text-4xl lg:text-6xl'}
                            `}>
                                        {title}
                                    </h2>
                                    <div
                                        className={`prose prose-invert prose-lg text-gray-300 leading-relaxed ${isOverlap ? 'max-w-none' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: content }}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
