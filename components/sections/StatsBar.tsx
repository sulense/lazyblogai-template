interface StatItem {
    value: string;
    label: string;
    icon?: string;
}

interface StatsBarProps {
    title?: string;
    stats: StatItem[];
    background?: 'gradient' | 'dark' | 'transparent';
}

export function StatsBar({
    title,
    stats,
    background = 'gradient',
}: StatsBarProps) {
    const bgClass = {
        gradient: 'bg-gradient-to-r from-purple-900/50 via-indigo-900/50 to-blue-900/50',
        dark: 'bg-white/5',
        transparent: 'bg-transparent',
    }[background];

    return (
        <section className={`py-12 px-6 ${bgClass}`}>
            <div className="max-w-7xl mx-auto">
                {title && (
                    <h2 className="text-2xl font-bold text-white text-center mb-8">
                        {title}
                    </h2>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center space-y-2"
                        >
                            {stat.icon && (
                                <div className="text-3xl mb-2">{stat.icon}</div>
                            )}
                            <div className="text-3xl md:text-4xl font-bold text-white">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-400 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
