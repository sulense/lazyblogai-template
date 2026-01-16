import Image from "next/image";

interface HeroSectionProps {
    headline: string;
    subheadline?: string;
    background_image?: string;
    cta_text?: string;
    cta_link?: string;
    overlay_opacity?: number; // 0-100
    text_alignment?: 'left' | 'center' | 'right';
}

export function HeroSection({
    headline,
    subheadline,
    background_image,
    cta_text,
    cta_link,
    overlay_opacity = 60,
    text_alignment = 'center',
}: HeroSectionProps) {
    const alignmentClass = {
        left: 'text-left items-start',
        center: 'text-center items-center',
        right: 'text-right items-end',
    }[text_alignment];

    return (
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            {/* Background Image or Animated Gradient */}
            {background_image ? (
                <>
                    <Image
                        src={background_image}
                        alt=""
                        fill
                        priority
                        className="object-cover transition-transform duration-[20s] hover:scale-110"
                        sizes="100vw"
                    />
                    <div
                        className="absolute inset-0 bg-black"
                        style={{ opacity: overlay_opacity / 100 }}
                    />
                </>
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 animate-gradient-xy">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                    {/* Floating blobs for no-image state */}
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
                </div>
            )}

            {/* Content Container */}
            <div className={`relative z-10 max-w-5xl mx-auto px-6 py-24 flex flex-col gap-8 ${alignmentClass}`}>
                <div className="space-y-6 animate-fadeInUp">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight drop-shadow-lg">
                        {headline}
                    </h1>

                    {subheadline && (
                        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed font-light drop-shadow-md">
                            {subheadline}
                        </p>
                    )}
                </div>

                {cta_text && cta_link && (
                    <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        <a
                            href={cta_link}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all hover:scale-105 shadow-xl overflow-hidden"
                        >
                            <span className="relative z-10">{cta_text}</span>
                            <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            {/* Inner glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
