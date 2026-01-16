import React from 'react';

interface IconGridItem {
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface IconGridProps {
    title?: string;
    subtitle?: string;
    items: IconGridItem[];
    layout?: 'grid' | 'feature-card';
}

export function IconGrid({
    title,
    subtitle,
    items,
    layout = 'grid',
}: IconGridProps) {
    const isFeatureCard = layout === 'feature-card';
    const gridClass = isFeatureCard
        ? 'grid-cols-1 md:grid-cols-2'
        : 'grid-cols-1 md:grid-cols-3';

    return (
        <section className="py-32 px-6 relative overflow-hidden">
            {/* Cinematic Noise Background */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className={`max-w-7xl mx-auto ${isFeatureCard ? 'max-w-6xl' : ''} relative z-10`}>
                {/* Header */}
                {(title || subtitle) && (
                    <div className="text-center mb-20 space-y-6 animate-fadeInUp">
                        {title && (
                            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                {/* Bento Grid */}
                <div className={`grid ${gridClass} gap-6`}>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`group relative rounded-3xl overflow-hidden transition-all duration-500 animate-fadeInUp
                                ${isFeatureCard
                                    ? 'p-10 bg-white/[0.03] border border-white/10 hover:border-white/20 flex flex-col items-start gap-8'
                                    : 'p-8 bg-white/[0.02] border border-white/[0.05] hover:border-white/10 hover:bg-white/[0.04]'
                                }
                            `}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Spotlight Gradient */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(800px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(139,92,246,0.15),transparent_40%)]" />
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                            {/* Icon */}
                            <div className={`relative z-10 flex items-center justify-center transition-all duration-500
                                ${isFeatureCard
                                    ? 'w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-4xl mb-2 ring-1 ring-white/10 group-hover:ring-white/30'
                                    : 'w-14 h-14 rounded-xl bg-white/5 text-3xl mb-6 group-hover:scale-110 group-hover:bg-white/10'
                                }
                            `}>
                                {item.icon}
                            </div>

                            <div className={`relative z-10 ${isFeatureCard ? 'space-y-4' : ''}`}>
                                {/* Title */}
                                <h3 className={`font-semibold text-white tracking-tight ${isFeatureCard ? 'text-3xl' : 'text-xl mb-3'}`}>
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className={`text-gray-400 leading-relaxed font-light ${isFeatureCard ? 'text-lg' : 'text-sm'}`}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
