import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { ArticleSchema, BreadcrumbSchema } from "../../components/structured-data";
import { Metadata } from "next";

export const revalidate = 60;

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
    content: string | null;
    excerpt: string | null;
    featured_image: string | null;
    category: string;
    read_time: string;
    author_name: string | null;
    author_avatar: string | null;
    author_bio: string | null;
    meta_title: string | null;
    meta_description: string | null;
    og_image: string | null;
    created_at: string;
    is_published: boolean;
}

interface Props {
    params: { slug: string };
}

async function getPost(slug: string): Promise<Post | null> {
    const siteId = process.env.SITE_ID;
    if (!siteId || !process.env.NEXT_PUBLIC_SUPABASE_URL) return null;

    const supabase = getSupabase();
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('site_id', siteId)
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

    if (error || !data) return null;
    return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getPost(params.slug);
    if (!post) return { title: "Post Not Found" };

    const title = post.meta_title || post.title;
    const description = post.meta_description || post.excerpt || post.content?.substring(0, 155) || '';
    const image = post.og_image || post.featured_image;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime: post.created_at,
            authors: post.author_name ? [post.author_name] : undefined,
            images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: image ? [image] : undefined,
        },
    };
}

// Extract headings for Table of Contents from HTML
function extractHeadings(content: string): { id: string; text: string }[] {
    const headings: { id: string; text: string }[] = [];
    // Match h2 tags: <h2 ...>Text</h2>
    const regex = /<h2[^>]*>(.*?)<\/h2>/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
        const text = match[1].replace(/<[^>]+>/g, ''); // Strip any inner tags
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        headings.push({ id, text });
    }

    return headings;
}

export default async function BlogPostPage({ params }: Props) {
    const post = await getPost(params.slug);

    if (!post) {
        notFound();
    }

    // Inject IDs into H2 tags for TOC navigation
    const processContent = (htmlContent: string) => {
        // First, unescape any HTML entities if they exist (e.g. &lt;div&gt; -> <div>)
        // This handles cases where the AI output or DB storage escaped the tags
        let processed = htmlContent;

        // Helper function to unescape HTML entities
        const unescapeHtml = (text: string): string => {
            return text
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&#x27;/g, "'")
                .replace(/&#x2F;/g, '/')
                .replace(/&nbsp;/g, ' ')
                .replace(/&amp;/g, '&'); // Must be last to avoid double-unescaping
        };

        // Check if content looks like it's escaped HTML (starts with &lt; or contains visible HTML text patterns)
        // Apply unescaping multiple times in case of double-encoding
        let previousContent = '';
        let iterations = 0;
        while (previousContent !== processed && iterations < 3) {
            previousContent = processed;
            processed = unescapeHtml(processed);
            iterations++;
        }

        const headings: { id: string; text: string }[] = [];

        // Regex to match h2 tags and capture attributes and content
        // This regex handles existing attributes and ensures we don't duplicate ids
        const regex = /<h2([^>]*)>(.*?)<\/h2>/gi;

        processed = processed.replace(regex, (match, attrs, text) => {
            // Strip tags from text for the ID
            const cleanText = text.replace(/<[^>]+>/g, '');
            const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

            headings.push({ id, text: cleanText });

            // If the tag already has an ID, leave it (or overwrite it, but let's assume we want our generated one)
            // Simpler approach: Just force our ID.
            return `<h2 id="${id}"${attrs}>${text}</h2>`;
        });

        return { processed, headings };
    };

    const { processed: contentHtml, headings } = post.content
        ? processContent(post.content)
        : { processed: '', headings: [] };

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
    const articleUrl = `${siteUrl}/${post.slug}`;
    const primaryColor = 'var(--primary-color)';

    const breadcrumbs = [
        { name: 'Home', url: siteUrl },
        { name: post.category, url: `${siteUrl}/category/${post.category.toLowerCase()}` },
        { name: post.title, url: articleUrl },
    ];

    return (
        <>
            {/* Structured Data */}
            <ArticleSchema
                headline={post.title}
                url={articleUrl}
                datePublished={post.created_at}
                author={{ name: post.author_name || 'Author' }}
                image={post.featured_image || undefined}
                description={post.excerpt || post.content?.substring(0, 155) || ''}
            />
            <BreadcrumbSchema items={breadcrumbs} />

            {/* Full-width Hero Image */}
            <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
                {post.featured_image ? (
                    <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-black/50 to-transparent" />
            </div>

            <article className="relative -mt-32 z-10">
                <div className="max-w-4xl mx-auto px-6">

                    {/* Breadcrumb Navigation */}
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex items-center gap-2 text-sm flex-wrap" role="list">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
                            </li>
                            <li className="text-gray-600">/</li>
                            <li>
                                <span className="text-gray-400">{post.category}</span>
                            </li>
                            <li className="text-gray-600">/</li>
                            <li className="text-white font-medium truncate max-w-[200px]" aria-current="page">
                                {post.title}
                            </li>
                        </ol>
                    </nav>

                    {/* Article Header */}
                    <header className="mb-12">
                        <span
                            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
                            style={{ background: primaryColor, color: 'white' }}
                        >
                            {post.category}
                        </span>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
                            {post.title}
                        </h1>

                        {/* Author & Meta */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-6 border-y border-white/10">
                            <div className="flex items-center gap-4">
                                {post.author_avatar ? (
                                    <Image
                                        src={post.author_avatar}
                                        alt={post.author_name || 'Author'}
                                        width={56}
                                        height={56}
                                        className="rounded-full border-2 border-white/10"
                                    />
                                ) : (
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                                        {(post.author_name || 'A')[0]}
                                    </div>
                                )}
                                <div>
                                    <div className="font-semibold text-white">{post.author_name || 'Author'}</div>
                                    <time dateTime={post.created_at} className="text-sm text-gray-500">
                                        {new Date(post.created_at).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </time>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-400 sm:ml-auto">
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {post.read_time}
                                </span>
                            </div>
                        </div>
                    </header>

                    {/* Two Column Layout: Content + TOC */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Main Content */}
                        <div className="lg:col-span-8 prose prose-lg prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-purple-400 hover:prose-a:text-purple-300 prose-strong:text-white prose-li:text-gray-300">
                            {contentHtml ? (
                                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                            ) : (
                                <p className="text-gray-400">No content available.</p>
                            )}
                        </div>

                        {/* Sidebar with TOC */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-32 space-y-8">

                                {/* Table of Contents */}
                                {headings.length > 0 && (
                                    <nav className="bg-white/5 border border-white/10 rounded-2xl p-6" aria-labelledby="toc-heading">
                                        <h2 id="toc-heading" className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                                            Table of Contents
                                        </h2>
                                        <ol className="space-y-3" role="list">
                                            {headings.map((heading, idx) => (
                                                <li key={idx}>
                                                    <a
                                                        href={`#${heading.id}`}
                                                        className="text-gray-400 hover:text-white transition-colors text-sm leading-snug block"
                                                    >
                                                        {heading.text}
                                                    </a>
                                                </li>
                                            ))}
                                        </ol>
                                    </nav>
                                )}

                                {/* Share Widget */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                                        Share Article
                                    </h2>
                                    <div className="flex gap-3">
                                        {[
                                            { name: 'Twitter', icon: 'X' },
                                            { name: 'Facebook', icon: 'f' },
                                            { name: 'LinkedIn', icon: 'in' },
                                        ].map(platform => (
                                            <button
                                                key={platform.name}
                                                aria-label={`Share on ${platform.name}`}
                                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors font-semibold text-sm"
                                            >
                                                {platform.icon}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </aside>
                    </div>

                    {/* Author Box */}
                    {post.author_name && (
                        <section className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-8 mt-16" aria-labelledby="author-heading">
                            <div className="flex flex-col sm:flex-row items-start gap-6">
                                {post.author_avatar ? (
                                    <Image
                                        src={post.author_avatar}
                                        alt={post.author_name}
                                        width={80}
                                        height={80}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-3xl">
                                        {post.author_name[0]}
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h2 id="author-heading" className="text-lg font-semibold text-white mb-2">
                                        Written by {post.author_name}
                                    </h2>
                                    {post.author_bio && (
                                        <p className="text-gray-400 mb-4 leading-relaxed">{post.author_bio}</p>
                                    )}
                                    <button
                                        className="px-5 py-2.5 rounded-full text-sm font-semibold border border-white/20 text-white hover:bg-white/5 transition-colors"
                                    >
                                        View all articles
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Back to Home */}
                    <div className="text-center py-16">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to all articles
                        </Link>
                    </div>
                </div>
            </article>
        </>
    );
}
