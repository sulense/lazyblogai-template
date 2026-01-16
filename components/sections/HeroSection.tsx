import Image from "next/image";

interface HeroSectionProps {
    headline: string;
    subheadline?: string;
    background_image?: string;
    cta_text?: string;
    cta_link?: string;
    overlay_opacity?: number; // 0-100
    text_alignment?: 'left' | 'center' | 'right';
    layout?: 'classic' | 'split' | 'minimal';
}

export function HeroSection({
    headline,
    subheadline,
    background_image,
    cta_text,
    cta_link,
    overlay_opacity = 60,
    text_alignment = 'center',
    layout = 'classic',
}: HeroSectionProps) {
    const isSplit = layout === 'split';
    const isMinimal = layout === 'minimal';

    const alignmentClass = {
        left: 'text-left items-start',
        center: 'text-center items-center',
        right: 'text-right items-end',
    }[isSplit ? 'left' : text_alignment];

    return (
        <section className={`relative flex items-center justify-center overflow-hidden ${isMinimal ? 'min-h-[40vh]' : 'min-h-[70vh]'}`}>

            {/* Background Layer */}
            {background_image ? (
                <>
                    <Image
                        src={background_image}
                        alt=""
                        fill
                        priority
                        className={`object-cover transition-transform duration-[20s] hover:scale-110 ${isSplit ? 'lg:w-[55%] lg:left-[45%]' : ''}`}
                        sizes="100vw"
                    />
                    {/* Overlay - lighter for split, standard for others */}
                    <div
                        className={`absolute inset-0 bg-black ${isSplit ? 'lg:bg-gradient-to-r lg:from-black lg:via-black/50 lg:to-transparent' : ''}`}
                        style={{ opacity: isSplit ? 1 : overlay_opacity / 100 }}
                    />
                </>
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 animate-gradient-xy">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-center" />
                    {/* Floating blobs for no-image state */}
                    <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
                    <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" />
                </div>
            )}

            {/* Content Container */}
            <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 py-24 flex flex-col gap-8 ${isSplit ? 'lg:flex-row lg:items-center' : alignmentClass}`}>

                <div className={`flex flex-col gap-8 ${isSplit ? 'lg:w-1/2 items-start text-left' : alignmentClass}`}>
                    <div className="space-y-6 animate-fadeInUp">
                        <h1 className={`
                            ${isMinimal ? 'text-7xl md:text-9xl tracking-tighter bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent' : 'text-5xl md:text-7xl text-white'} 
                            font-bold leading-tight drop-shadow-xl
                        `}>
                            {headline}
                        </h1>

                        {subheadline && (
                            <p className={`${isMinimal ? 'text-xl uppercase tracking-widest text-purple-300' : 'text-xl md:text-2xl text-gray-200'} max-w-2xl leading-relaxed`}>
                                {subheadline}
                            </p>
                        )}
                    </div>

                    {cta_text && cta_link && (
                        <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                            <a
                                href={cta_link}
                                className={`group relative inline-flex items-center gap-3 px-8 py-5 text-lg font-bold rounded-full transition-all hover:scale-105 shadow-xl overflow-hidden
                                    ${isMinimal ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20'}`}
                            >
                                <span className="relative z-10">{cta_text}</span>
                                <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    )}
                </div>

                {/* Optional visual elements for non-split/minimal layouts could go here */}
            </div>
        </section>
    );
}
