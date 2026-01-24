import Image from "next/image";
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
    cta_link = "/",
    layout = 'classic'
}: HeroSectionProps) {

    return (
        <section className="relative px-4 pt-4 md:px-6 md:pt-6">
            <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden rounded-3xl max-w-5xl mx-auto shadow-2xl ring-1 ring-white/10 bg-gray-900">
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
                        {/* Stronger Gradient Overlay for readability and seamless blend */}
                        <div className="absolute inset-0 bg-black/20" /> {/* Base tint */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-80" /> {/* Bottom blend only */}
                    </>
                ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0a0b] to-black">
                        {/* Decorative gradient orbs */}
                        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen" />
                        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen" />
                    </div>
                )}

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 flex flex-col items-center">
                    <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl max-w-3xl">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 tracking-tight drop-shadow-xl">
                            {headline}
                        </h1>

                        {subheadline && (
                            <p className="text-xl md:text-2xl text-gray-100 mb-12 leading-relaxed font-light drop-shadow-md">
                                {subheadline}
                            </p>
                        )}

                        {cta_text && (
                            <Link
                                href={cta_link}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
                            >
                                <span>{cta_text}</span>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
