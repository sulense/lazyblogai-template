import Link from "next/link";
import Image from "next/image";
import { ContentService, Post } from "@/lib/api";
import { Pagination } from "../components/pagination";

export const revalidate = 60; // Revalidate every minute

export default async function Page({ searchParams }: { searchParams: { page?: string } }) {
    const siteId = process.env.SITE_ID;
    const isDemo = !siteId;
    const page = parseInt(searchParams.page || '1');
    const pageSize = 9;

    let posts: Post[] = [];
    let count = 0;

    if (!isDemo) {
        const res = await ContentService.getPosts(page, pageSize);
        if (res) {
            posts = res.data;
            count = res.meta.total;
        }
    } else {
        // Demo posts for preview mode
        posts = [
            {
                id: 'demo-1',
                title: 'The Ultimate Guide to Starting Your Journey',
                slug: 'ultimate-guide-starting',
                excerpt: 'Discover the essential steps and strategies to begin your journey with confidence. From planning to execution, we cover everything you need to know.',
                featured_image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
                category: 'Getting Started',
                read_time: '8 min read',
                author_name: 'Alex Johnson',
                author_avatar: null,
                created_at: new Date().toISOString(),
            },
            {
                id: 'demo-2',
                title: '10 Expert Tips That Will Transform Your Results',
                slug: 'expert-tips-transform-results',
                excerpt: 'Learn from industry experts and apply proven strategies that deliver real results.',
                featured_image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
                category: 'Tips & Tricks',
                read_time: '6 min read',
                author_name: 'Sarah Chen',
                author_avatar: null,
                created_at: new Date(Date.now() - 86400000).toISOString(),
            },
            {
                id: 'demo-3',
                title: 'Breaking Down the Latest Industry Trends',
                slug: 'latest-industry-trends',
                excerpt: 'Stay ahead of the curve with our comprehensive analysis of emerging trends.',
                featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
                category: 'Industry News',
                read_time: '5 min read',
                author_name: 'Mike Wilson',
                author_avatar: null,
                created_at: new Date(Date.now() - 172800000).toISOString(),
            },
            {
                id: 'demo-4',
                title: 'How to Maximize Your Productivity in 2024',
                slug: 'maximize-productivity-2024',
                excerpt: 'Practical strategies and tools to boost your efficiency and achieve more.',
                featured_image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
                category: 'Productivity',
                read_time: '7 min read',
                author_name: 'Emma Davis',
                author_avatar: null,
                created_at: new Date(Date.now() - 259200000).toISOString(),
            },
            {
                id: 'demo-5',
                title: 'The Science Behind Successful Strategies',
                slug: 'science-successful-strategies',
                excerpt: 'Understand the research and data that power the most effective approaches.',
                featured_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
                category: 'Research',
                read_time: '9 min read',
                author_name: 'Dr. James Lee',
                author_avatar: null,
                created_at: new Date(Date.now() - 345600000).toISOString(),
            },
            {
                id: 'demo-6',
                title: 'Building a Community Around Your Passion',
                slug: 'building-community-passion',
                excerpt: 'Connect with like-minded individuals and grow together.',
                featured_image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
                category: 'Community',
                read_time: '4 min read',
                author_name: 'Lisa Park',
                author_avatar: null,
                created_at: new Date(Date.now() - 432000000).toISOString(),
            },
        ];
        count = posts.length;
    }

    const totalPages = Math.ceil(count / pageSize);

    // Derive categories dynamically from posts
    const uniqueCategories = Array.from(new Set(posts.map(p => p.category))).filter(Boolean).sort();
    const categories = ["All", ...uniqueCategories];

    // Fallback for empty/demo state if no categories found
    if (categories.length === 1 && isDemo) {
        categories.push("Beginners", "Science", "Recipes", "Lifestyle", "Reviews");
    }

    const primaryColor = 'var(--primary-color)';
    const heroMain = posts[0];
    const heroSub = posts.slice(1, 3);
    const feedPosts = posts.slice(3);
    const hasContent = posts.length > 0;

    return (
        <>
            {isDemo && (
                <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-purple-500/20 py-2 text-center text-sm text-purple-300">
                    ✨ Preview Mode: Configure SITE_ID to display your content
                </div>
            )}

            {/* Empty State */}
            {!hasContent && !isDemo && (
                <section className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center max-w-md mx-auto px-6 space-y-6">
                        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/10">
                            <svg className="w-10 h-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white">No articles yet</h1>
                        <p className="text-gray-400">
                            This blog is just getting started. Check back soon for new content!
                        </p>
                    </div>
                </section>
            )}

            {/* FULL-WIDTH HERO SECTION */}
            {hasContent && (
                <>
                    <section className="relative w-full" aria-labelledby="featured-heading">
                        <h1 id="featured-heading" className="sr-only">Featured Articles</h1>

                        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[70vh]">
                            {/* Main Featured Article */}
                            <Link
                                href={`/${heroMain.slug}`}
                                className="lg:col-span-2 relative group overflow-hidden"
                                aria-label={`Read: ${heroMain.title}`}
                            >
                                {heroMain.featured_image ? (
                                    <Image
                                        src={heroMain.featured_image}
                                        alt={heroMain.title}
                                        fill
                                        priority
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 1024px) 100vw, 66vw"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                <article className="absolute bottom-0 left-0 right-0 p-8 lg:p-16 space-y-4">
                                    <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-white border border-white/20 rounded-full">
                                        {heroMain.category}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl group-hover:text-purple-200 transition-colors">
                                        {heroMain.title}
                                    </h2>
                                    {heroMain.excerpt && (
                                        <p className="text-gray-300 text-lg max-w-2xl hidden md:block">
                                            {heroMain.excerpt}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-4 text-sm text-gray-300 pt-2">
                                        {heroMain.author_avatar && (
                                            <Image
                                                src={heroMain.author_avatar}
                                                alt={heroMain.author_name || 'Author'}
                                                width={40}
                                                height={40}
                                                className="rounded-full border-2 border-white/30"
                                            />
                                        )}
                                        {heroMain.author_name && <span className="font-medium">{heroMain.author_name}</span>}
                                        <span className="text-gray-500">•</span>
                                        <time dateTime={heroMain.created_at}>{heroMain.read_time}</time>
                                    </div>
                                </article>
                            </Link>

                            {/* Secondary Featured */}
                            {heroSub.length > 0 && (
                                <div className="lg:col-span-1 flex flex-col">
                                    {heroSub.map((post, idx) => (
                                        <Link
                                            key={post.id}
                                            href={`/${post.slug}`}
                                            className="relative flex-1 min-h-[250px] lg:min-h-0 group overflow-hidden"
                                            aria-label={`Read: ${post.title}`}
                                        >
                                            {post.featured_image ? (
                                                <Image
                                                    src={post.featured_image}
                                                    alt={post.title}
                                                    fill
                                                    priority={idx === 0}
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    sizes="(max-width: 1024px) 100vw, 33vw"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                            <article className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 space-y-2">
                                                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                                                    {post.category}
                                                </span>
                                                <h3 className="text-xl lg:text-2xl font-bold text-white leading-snug group-hover:text-purple-200 transition-colors">
                                                    {post.title}
                                                </h3>
                                                <div className="flex items-center gap-2 text-xs text-gray-400 pt-1">
                                                    {post.author_name && <span>{post.author_name}</span>}
                                                    <span>•</span>
                                                    <time dateTime={post.created_at}>{post.read_time}</time>
                                                </div>
                                            </article>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* CATEGORY NAVIGATION */}
                    <nav className="border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/20 sticky top-[73px] z-40 backdrop-blur-xl transition-colors" aria-label="Article categories">
                        <div className="max-w-7xl mx-auto px-6 py-4">
                            <ul className="flex flex-wrap gap-2" role="list">
                                {categories.map((cat, idx) => (
                                    <li key={cat}>
                                        <button
                                            className={`text-sm font-medium px-5 py-2.5 rounded-full transition-all ${idx === 0
                                                ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-lg'
                                                : 'text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                                                }`}
                                            aria-current={idx === 0 ? 'page' : undefined}
                                        >
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>

                    {/* MAIN CONTENT AREA */}
                    {feedPosts.length > 0 && (
                        <div className="max-w-7xl mx-auto px-6 py-16">
                            <section className="space-y-12" aria-labelledby="latest-heading">
                                <h2 id="latest-heading" className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                    <span className="w-1 h-8 rounded-full" style={{ background: primaryColor }} />
                                    Latest Articles
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {feedPosts.map((post) => (
                                        <Link key={post.id} href={`/${post.slug}`} className="group block">
                                            <article className="space-y-4">
                                                <div className="aspect-[16/10] rounded-2xl overflow-hidden relative shadow-lg">
                                                    {post.featured_image ? (
                                                        <Image
                                                            src={post.featured_image}
                                                            alt={post.title}
                                                            fill
                                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-3 text-xs font-medium">
                                                        <span className="text-purple-400 uppercase tracking-widest">{post.category}</span>
                                                        <span className="text-gray-600">•</span>
                                                        <time dateTime={post.created_at} className="text-gray-500">{post.read_time}</time>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                                                        {post.title}
                                                    </h3>
                                                    {post.excerpt && (
                                                        <p className="text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed text-sm">
                                                            {post.excerpt}
                                                        </p>
                                                    )}
                                                </div>
                                            </article>
                                        </Link>
                                    ))}
                                </div>

                                <Pagination
                                    currentPage={page}
                                    totalPages={totalPages}
                                    baseUrl="/"
                                />
                            </section>
                        </div>
                    )}

                    {/* FULL-WIDTH RSS CTA */}
                    <section className="w-full py-20 relative overflow-hidden bg-gray-900 dark:bg-transparent" aria-labelledby="cta-heading">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-purple-900/30" />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${primaryColor}15, transparent)` }} />
                        <div className="relative max-w-3xl mx-auto px-6 text-center space-y-6">
                            <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white">
                                Never Miss an Update
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Subscribe to our RSS feed and get new articles delivered to your favorite reader.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="/rss.xml"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all hover:scale-105"
                                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)` }}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z" />
                                    </svg>
                                    RSS Feed
                                </a>
                                <a
                                    href="/atom.xml"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white border border-white/20 bg-white/5 transition-all hover:bg-white/10 hover:scale-105"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z" />
                                    </svg>
                                    Atom Feed
                                </a>
                            </div>
                            <p className="text-gray-500 text-sm">
                                Compatible with Feedly, Inoreader, and other RSS readers
                            </p>
                        </div>
                    </section>
                </>
            )}
        </>
    );
}
