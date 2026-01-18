import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Pagination } from "../../../components/pagination";
import { ContentService } from "@/lib/api";

export const revalidate = 60; // Revalidate every minute

interface Props {
    params: { slug: string };
    searchParams: { page?: string };
}

// Decode URL-friendly slug back to category name if needed, or use as is
function normalizeCategory(slug: string): string {
    return decodeURIComponent(slug).replace(/-/g, ' ');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const categoryName = normalizeCategory(params.slug);
    const title = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

    return {
        title: `${title} - Archives`,
        description: `Read all articles about ${title}.`,
    };
}

export default async function CategoryPage({ params, searchParams }: Props) {
    const page = parseInt(searchParams.page || '1');
    const categoryName = normalizeCategory(params.slug);

    // Fetch posts for this category
    const res = await ContentService.getPosts(page, 9, categoryName);

    // If no posts found (and it's first page), or API failed, 404
    // But simplistic check: if no data, 404
    if (!res || (res.data.length === 0 && page === 1)) {
        notFound();
    }

    const posts = res.data;
    const { total, totalPages } = res.meta;

    const displayTitle = categoryName;

    return (
        <main className="min-h-screen">
            {/* Category Hero */}
            <section className="relative py-20 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-3 text-sm text-purple-400 font-medium mb-4">
                            <Link href="/" className="hover:text-purple-300 transition-colors">Home</Link>
                            <span>/</span>
                            <span>Categories</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            {displayTitle}
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl">
                            Explore our latest insights, guides, and articles about {displayTitle}.
                        </p>
                    </div>
                </div>

                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-purple-600/10 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-600/10 blur-[100px] pointer-events-none" />
            </section>

            {/* Posts Grid */}
            <section className="pb-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link key={post.id} href={`/${post.slug}`} className="group block h-full">
                                <article className="bg-[#1f2020] rounded-2xl border border-white/5 overflow-hidden h-full flex flex-col hover:border-purple-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/10">
                                    {/* Image */}
                                    <div className="aspect-[16/10] relative overflow-hidden">
                                        {post.featured_image ? (
                                            <Image
                                                src={post.featured_image}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                                <svg className="w-12 h-12 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                                                {post.category}
                                            </span>
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {post.read_time}
                                            </span>
                                        </div>

                                        <h2 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-purple-300 transition-colors">
                                            {post.title}
                                        </h2>

                                        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                                            <div className="flex items-center gap-2">
                                                {post.author_avatar ? (
                                                    <div className="relative w-6 h-6 rounded-full overflow-hidden">
                                                        <Image src={post.author_avatar} alt={post.author_name || 'Author'} fill className="object-cover" />
                                                    </div>
                                                ) : (
                                                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500" />
                                                )}
                                                <span className="text-xs text-gray-400 font-medium">
                                                    {post.author_name || 'Admin'}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                {new Date(post.created_at).toLocaleDateString(undefined, {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>

                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        baseUrl={`/category/${params.slug}`}
                    />
                </div>
            </section>
        </main>
    );
}
