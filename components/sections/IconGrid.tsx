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
}

export function IconGrid({
    title,
    subtitle,
    items,
    columns = 3,
}: IconGridProps) {
    const gridClass = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    }[columns];

    return (
        <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                {(title || subtitle) && (
                    <div className="text-center mb-12 space-y-4">
                        {title && (
                            <h2 className="text-3xl md:text-4xl font-bold text-white">
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
                <div className={`grid ${gridClass} gap-8`}>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-white mb-2">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
