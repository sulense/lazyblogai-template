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
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

    return (
        <section className="py-20 md:py-28 px-6 bg-gray-950">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                {(title || subtitle) && (
                    <div className="text-center mb-16">
                        {title && (
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                {/* Grid */}
                <div className={`grid ${gridClass} gap-6`}>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`
                                bg-gray-900/50 border border-gray-800 rounded-2xl 
                                transition-all duration-300 hover:border-gray-700 hover:bg-gray-900/70
                                ${isFeatureCard ? 'p-10' : 'p-8'}
                            `}
                        >
                            {/* Icon */}
                            <div className={`
                                flex items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 mb-6
                                ${isFeatureCard ? 'w-16 h-16 text-3xl' : 'w-12 h-12 text-2xl'}
                            `}>
                                {item.icon}
                            </div>

                            {/* Title */}
                            <h3 className={`font-semibold text-white mb-3 ${isFeatureCard ? 'text-2xl' : 'text-xl'}`}>
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className={`text-gray-400 leading-relaxed ${isFeatureCard ? 'text-base' : 'text-sm'}`}>
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
