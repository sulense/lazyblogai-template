import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ContentService } from "@/lib/api";
import { ArticleSchema, BreadcrumbSchema } from "../../components/structured-data";
import { Metadata } from "next";
import { proxyImage, proxyContentImages } from "@/lib/image-proxy";

export const revalidate = 60;

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await ContentService.getPostBySlug(params.slug);
    if (!post) return { title: "Not Found" };

    const title = post.seo_title || post.title;
    const description = post.seo_description || post.excerpt || post.content?.substring(0, 155) || '';
    const image = proxyImage(post.featured_image || null);

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

export default async function SlugPage({ params }: Props) {
    const post = await ContentService.getPostBySlug(params.slug);
    const site = await ContentService.getConfig();

    if (!post) {
        notFound();
    }

    // Fetch related posts from same category
    const relatedPosts = await ContentService.getRelatedPosts(post.category, post.slug);

    // Inject IDs into H2 tags for TOC navigation
    const processContent = (htmlContent: string) => {
        let processed = htmlContent;
        if (!processed) return { processed: '', headings: [] };

        // 1. First, white-label all images
        processed = proxyContentImages(processed);

        const unescapeHtml = (text: string): string => {
            return text
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&#x27;/g, "'")
                .replace(/&#x2F;/g, '/')
                .replace(/&nbsp;/g, ' ')
                .replace(/&amp;/g, '&');
        };

        let previousContent = '';
        let iterations = 0;
        while (previousContent !== processed && iterations < 3) {
            previousContent = processed;
            processed = unescapeHtml(processed);
            iterations++;
        }

        const headings: { id: string; text: string }[] = [];
        const regex = /<h2([^>]*)>(.*?)<\/h2>/gi;

        processed = processed.replace(regex, (match, attrs, text) => {
            const cleanText = text.replace(/<[^>]+>/g, '');
            const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            headings.push({ id, text: cleanText });
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
        { name: post.category, url: `${siteUrl}/category/${post.category?.toLowerCase()}` },
        { name: post.title, url: articleUrl },
    ];

    return (
        <>
            {/* Structured Data */}
            <ArticleSchema
                headline={post.title}
                url={articleUrl}
                datePublished={post.created_at}
                author={{ name: post.author_name || site?.name || 'Author' }}
                image={post.featured_image || undefined}
                description={post.excerpt || post.content?.substring(0, 155) || ''}
            />
            <BreadcrumbSchema items={breadcrumbs} />

            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    {post.featured_image ? (
                        <Image
                            src={proxyImage(post.featured_image)}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-900" />
                    )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/25 to-transparent dark:from-[#0a0a0b] dark:via-black/50 dark:to-transparent" />
            </div>

            <article className="relative -mt-32 z-10">
                <div className="max-w-4xl mx-auto px-6">

                    {/* Breadcrumb Navigation */}
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex items-center gap-2 text-sm flex-wrap" role="list">
                            <li>
                                <Link href="/" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">Home</Link>
                            </li>
                            <li className="text-gray-400 dark:text-gray-600">/</li>
                            <li>
                                <span className="text-gray-600 dark:text-gray-400">{post.category}</span>
                            </li>
                            <li className="text-gray-400 dark:text-gray-600">/</li>
                            <li className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]" aria-current="page">
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

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-8">
                            {post.title}
                        </h1>

                        {/* Author & Meta */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-6 border-y border-gray-200 dark:border-white/10">
                            <div className="flex items-center gap-4">
                                {(post.author_avatar || site?.logo_url) ? (
                                    <Image
                                        src={proxyImage(post.author_avatar || site?.logo_url || '')}
                                        alt={post.author_name || 'Author'}
                                        width={56}
                                        height={56}
                                        className="rounded-full border-2 border-gray-100 dark:border-white/10"
                                    />
                                ) : (
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                                        {(post.author_name || site?.name || 'A')[0]}
                                    </div>
                                )}
                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-white">{post.author_name || site?.name}</div>
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
                        <div className="lg:col-span-8 prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-purple-600 dark:prose-a:text-purple-400 hover:prose-a:text-purple-500 dark:hover:prose-a:text-purple-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-li:text-gray-600 dark:prose-li:text-gray-300">
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
                                    <nav className="bg-gray-50 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-2xl p-6 transition-colors" aria-labelledby="toc-heading">
                                        <h2 id="toc-heading" className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                                            Table of Contents
                                        </h2>
                                        <ol className="space-y-3" role="list">
                                            {headings.map((heading, idx) => (
                                                <li key={idx}>
                                                    <a
                                                        href={`#${heading.id}`}
                                                        className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors text-sm leading-snug block"
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
                                            {
                                                name: 'Twitter',
                                                icon: 'X',
                                                url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(articleUrl)}`
                                            },
                                            {
                                                name: 'Facebook',
                                                icon: 'f',
                                                url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`
                                            },
                                            {
                                                name: 'LinkedIn',
                                                icon: 'in',
                                                url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`
                                            },
                                        ].map(platform => (
                                            <a
                                                key={platform.name}
                                                href={platform.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Share on ${platform.name}`}
                                                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-black dark:bg-white/5 dark:hover:bg-white/10 dark:text-gray-400 dark:hover:text-white flex items-center justify-center transition-colors font-semibold text-sm"
                                            >
                                                {platform.icon}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </aside>
                    </div>

                    {/* Author Box */}
                    {post.author_name && (
                        <section className="bg-gray-50 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/[0.02] border border-gray-200 dark:border-white/10 rounded-3xl p-8 mt-16 transition-colors" aria-labelledby="author-heading">
                            <div className="flex flex-col sm:flex-row items-start gap-6">
                                {(post.author_avatar || site?.logo_url) ? (
                                    <Image
                                        src={post.author_avatar || site?.logo_url || ''}
                                        alt={post.author_name || site?.name || 'Author'}
                                        width={80}
                                        height={80}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-3xl">
                                        {(post.author_name || site?.name || 'A')[0]}
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h2 id="author-heading" className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Written by {post.author_name || site?.name}
                                    </h2>
                                    {/* Author Bio is missing in generic Post type, I might need to add it or ignore */}
                                    <button
                                        className="mt-4 px-5 py-2.5 rounded-full text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-white/20 dark:text-white dark:hover:bg-white/5 transition-colors"
                                    >
                                        View all articles
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <section className="mt-16" aria-labelledby="related-heading">
                            <h2 id="related-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                                <span className="w-1 h-8 rounded-full bg-purple-500" />
                                Related Articles
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPosts.map((related) => (
                                    <Link key={related.id} href={`/${related.slug}`} className="group block">
                                        <article className="space-y-3">
                                            <div className="aspect-[16/10] rounded-xl overflow-hidden relative">
                                                {related.featured_image ? (
                                                    <Image
                                                        src={related.featured_image}
                                                        alt={related.title}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                                                )}
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                                                    {related.category}
                                                </span>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors line-clamp-2">
                                                    {related.title}
                                                </h3>
                                                <span className="text-sm text-gray-500">{related.read_time}</span>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Back to Home */}
                    <div className="text-center py-16">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors font-medium"
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
