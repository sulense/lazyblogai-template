import Image from "next/image";
import Link from "next/link";

interface CategoryItem {
    name: string;
    slug: string;
    image?: string;
    post_count?: number;
    description?: string;
}

interface CategoryShowcaseProps {
    title?: string;
    subtitle?: string;
    categories: CategoryItem[];
    columns?: 2 | 3 | 4;
}

export function CategoryShowcase({
    title = "Explore Topics",
    subtitle,
    categories,
    columns = 3,
}: CategoryShowcaseProps) {
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
                <div className={`grid ${gridClass} gap-6`}>
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            href={`/category/${category.slug}`}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
                        >
                            {/* Background */}
                            {category.image ? (
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-indigo-900" />
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                                <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                                    {category.name}
                                </h3>

                                {category.description && (
                                    <p className="text-sm text-gray-300 line-clamp-2">
                                        {category.description}
                                    </p>
                                )}

                                {typeof category.post_count === 'number' && (
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                                        {category.post_count} article{category.post_count !== 1 ? 's' : ''}
                                    </p>
                                )}
                            </div>

                            {/* Hover Arrow */}
                            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
