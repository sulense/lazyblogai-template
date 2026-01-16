import Image from "next/image";
import Link from 'next/link';

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
    overlay_opacity = 50,
    text_alignment = 'center',
    layout = 'classic'
}: HeroSectionProps) {
    const isSplit = layout === 'split';
    const isMinimal = layout === 'minimal';
    const alignmentClass = text_alignment === 'left' ? 'items-start text-left' :
        text_alignment === 'right' ? 'items-end text-right' :
            'items-center text-center';

    return (
        <section className={`relative w-full overflow-hidden ${isMinimal ? 'min-h-[60vh]' : 'min-h-[85vh]'} flex items-center justify-center bg-black`}>
            {/* Background Layer */}
            {background_image ? (
                <>
                    <Image
                        src={background_image}
                        alt=""
                        fill
                        priority
                        className={`object-cover transition-transform duration-[20s] hover:scale-110`}
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </>
            ) : (
                <div className="absolute inset-0 bg-[#050505] overflow-hidden">
                    {/* Nebula Blobs - Guaranteed Soft Glow */}
                    <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/30 rounded-full blur-[120px] animate-blob mix-blend-screen" />
                    <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/30 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen" />
                    <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-fuchsia-600/20 rounded-full blur-[150px] animate-blob animation-delay-4000 mix-blend-screen" />

                    {/* Grid Overlay */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.15] bg-center" />
                </div>
            )}

            {/* Content Container */}
            <div className="relative z-10 px-6 w-full max-w-7xl mx-auto flex flex-col justify-center h-full">
                <div className={`flex flex-col gap-8 ${isSplit ? 'lg:flex-row lg:items-center' : 'items-center text-center'} max-w-5xl mx-auto`}>
                    <div className={`space-y-8 animate-fadeInUp ${isSplit ? 'lg:w-1/2' : ''}`}>
                        <h1 className={`
                            ${isMinimal ? 'text-7xl md:text-9xl tracking-tighter bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent' : 'text-5xl md:text-7xl text-white'} 
                            font-bold leading-tight drop-shadow-xl
                        `}>
                            {headline}
                        </h1>

                        {subheadline && (
                            <p className={`${isMinimal ? 'text-xl uppercase tracking-widest text-purple-200' : 'text-xl md:text-2xl text-gray-300'} leading-relaxed max-w-2xl ${!isSplit && 'mx-auto'}`}>
                                {subheadline}
                            </p>
                        )}

                        {cta_text && (
                            <div className={`flex ${!isSplit && 'justify-center'}`}>
                                <Link
                                    href={cta_link || "/"}
                                    className={`
                                        group relative px-8 py-4 rounded-full font-medium text-lg transition-all duration-300
                                        ${isMinimal
                                            ? 'bg-white text-black hover:bg-gray-200 hover:scale-105 shadow-xl shadow-white/10'
                                            : 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/40 hover:scale-105 shadow-lg shadow-purple-500/20'
                                        }
                                        flex items-center gap-2
                                    `}
                                >
                                    <span>{cta_text}</span>
                                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Optional visual elements for non-split/minimal layouts could go here */}
        </section>
    );
}
