import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { Metadata } from "next";

export const revalidate = 0; // Search results shouldn't be cached

function getSupabase() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
}

interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    featured_image: string | null;
    category: string;
    read_time: string;
    author_name: string | null;
    created_at: string;
}

interface Props {
    searchParams: { q?: string };
}

export const metadata: Metadata = {
    title: 'Search Results',
    description: 'Search for articles and guides.',
    robots: {
        index: false, // Don't index search results
        follow: false,
    },
};

export default async function SearchPage({ searchParams }: Props) {
    const query = searchParams.q || '';
    const siteId = process.env.SITE_ID;
    const supabase = getSupabase();
    let posts: Post[] = [];
    let hasSearched = query.length > 0;

    if (hasSearched && siteId && process.env.NEXT_PUBLIC_SUPABASE_URL) {
        // Use Supabase ILIKE for simple search
        // For production, Full Text Search (FTS) is recommended
        const { data, error } = await supabase
            .from('posts')
            .select('id, title, slug, excerpt, featured_image, category, read_time, author_name, created_at')
            .eq('site_id', siteId)
            .eq('is_published', true)
            .ilike('title', `%${query}%`)
            .order('created_at', { ascending: false })
            .limit(20);

        if (data) {
            posts = data;
        }
    }

    return (
        <main className="min-h-screen py-20 px-6">
            <div className="container mx-auto max-w-4xl">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-white mb-6">Search</h1>
                    <form action="/search" method="get" className="max-w-xl mx-auto relative">
                        <input
                            type="text"
                            name="q"
                            defaultValue={query}
                            placeholder="Search articles..."
                            className="w-full px-6 py-4 bg-[#2a2b2b] text-white rounded-2xl border border-white/10 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-lg placeholder:text-gray-500"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>
                </header>

                {hasSearched && (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between text-sm text-gray-400 pb-4 border-b border-white/10">
                            <span>{posts.length} result{posts.length !== 1 ? 's' : ''} for "{query}"</span>
                        </div>

                        {posts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {posts.map((post) => (
                                    <Link key={post.id} href={`/${post.slug}`} className="group block">
                                        <article className="bg-[#1f2020] rounded-xl border border-white/5 overflow-hidden hover:border-purple-500/30 transition-all flex flex-col h-full">
                                            {post.featured_image && (
                                                <div className="relative aspect-video overflow-hidden">
                                                    <Image
                                                        src={post.featured_image}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-5 flex-1 flex flex-col">
                                                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">
                                                    {post.category}
                                                </span>
                                                <h2 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-purple-300 transition-colors">
                                                    {post.title}
                                                </h2>
                                                {post.excerpt && (
                                                    <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">
                                                        {post.excerpt}
                                                    </p>
                                                )}
                                                <div className="text-xs text-gray-500 mt-auto">
                                                    {new Date(post.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="text-gray-500 mb-4">No results found</div>
                                <p className="text-sm text-gray-600">Try searching for different keywords</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
