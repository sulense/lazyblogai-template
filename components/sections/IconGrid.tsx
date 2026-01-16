interface IconGridItem {
    icon: string; // Emoji or icon name
    title: string;
    description: string;
}

interface IconGridProps {
    title?: string;
    subtitle?: string;
    items: IconGridItem[];
    columns?: 2 | 3 | 4;
    layout?: 'standard' | 'feature-card';
}

export function IconGrid({
    title,
    subtitle,
    items,
    columns = 3,
    layout = 'standard',
}: IconGridProps) {
    const isFeatureCard = layout === 'feature-card';

    // Feature cards force 2 columns for better readability
    const effectiveColumns = isFeatureCard ? 2 : columns;

    const gridClass = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    }[effectiveColumns];

    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl -z-10" />

            <div className={`max-w-7xl mx-auto ${isFeatureCard ? 'max-w-6xl' : ''}`}>
                {/* Header */}
                {(title || subtitle) && (
                    <div className="text-center mb-16 space-y-6 animate-fadeInUp">
                        {title && (
                            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                {/* Grid */}
                <div className={`grid ${gridClass} gap-8`}>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`group relative rounded-3xl backdrop-blur-sm transition-all duration-300 animate-fadeInUp
                                ${isFeatureCard
                                    ? 'p-10 bg-white/5 hover:bg-white/10 border border-white/10 text-left flex flex-col items-start gap-6 hover:translate-x-2'
                                    : 'p-8 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10'
                                }
                            `}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Icon */}
                            <div className={`relative flex items-center justify-center transition-all duration-300 shadow-lg
                                ${isFeatureCard
                                    ? 'w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-4xl mb-2'
                                    : 'w-16 h-16 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/5 mb-6 text-3xl group-hover:scale-110 group-hover:rotate-3'
                                }
                            `}>
                                {item.icon}
                            </div>

                            <div className={isFeatureCard ? 'space-y-3' : ''}>
                                {/* Title */}
                                <h3 className={`relative font-bold text-white transition-colors group-hover:text-purple-300 ${isFeatureCard ? 'text-2xl' : 'text-xl mb-3'}`}>
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className={`relative text-gray-400 leading-relaxed transition-colors group-hover:text-gray-300 ${isFeatureCard ? 'text-lg' : 'text-base'}`}>
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
