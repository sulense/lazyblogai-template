interface IconGridItem {
    icon: string;
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
    const effectiveColumns = isFeatureCard ? 2 : columns;

    const gridClass = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    }[effectiveColumns];

    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-purple-500/10 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                {(title || subtitle) && (
                    <div className="text-center mb-16 space-y-4">
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
                            className={`group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300
                                ${isFeatureCard ? 'p-10 flex flex-col items-start gap-6' : ''}
                            `}
                        >
                            {/* Icon */}
                            <div className={`flex items-center justify-center transition-all duration-300 group-hover:scale-110
                                ${isFeatureCard
                                    ? 'w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-3xl mb-2'
                                    : 'w-14 h-14 rounded-xl bg-white/5 border border-white/10 text-2xl mb-6'
                                }
                            `}>
                                {item.icon}
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className={`font-bold text-white mb-3 ${isFeatureCard ? 'text-2xl' : 'text-xl'}`}>
                                    {item.title}
                                </h3>
                                <p className={`text-gray-400 leading-relaxed ${isFeatureCard ? 'text-lg' : 'text-base'}`}>
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
