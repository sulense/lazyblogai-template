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
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            {background_image ? (
                <Image
                    src={background_image}
                    alt=""
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900" />
            )}

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black"
                style={{ opacity: overlay_opacity / 100 }}
            />

            {/* Content */}
            <div className={`relative z-10 max-w-4xl mx-auto px-6 py-20 flex flex-col gap-6 ${alignmentClass}`}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    {headline}
                </h1>

                {subheadline && (
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                        {subheadline}
                    </p>
                )}

                {cta_text && cta_link && (
                    <a
                        href={cta_link}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-all hover:scale-105 shadow-lg mt-4"
                    >
                        {cta_text}
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                )}
            </div>
        </section>
    );
}
