import Image from 'next/image';
import Link from 'next/link';

interface HeroSectionProps {
    headline: string;
    subheadline?: string;
    background_image?: string;
    cta_text?: string;
    cta_link?: string;
    overlay_opacity?: number;
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

    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black">
            {/* Background */}
            {background_image ? (
                <>
                    <Image
                        src={background_image}
                        alt=""
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </>
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
                    {/* Animated Blobs */}
                    <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/30 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <div className="space-y-8">
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
                        {headline}
                    </h1>

                    {subheadline && (
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            {subheadline}
                        </p>
                    )}

                    {cta_text && (
                        <div className="pt-4">
                            <Link
                                href={cta_link || "/"}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur border border-white/20 text-white font-medium text-lg rounded-full hover:bg-white/20 transition-all hover:scale-105"
                            >
                                <span>{cta_text}</span>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
