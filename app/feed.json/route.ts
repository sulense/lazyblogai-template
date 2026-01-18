import { ContentService } from '@/lib/api';

export async function GET() {
    const config = await ContentService.getConfig();
    if (!config) {
        return new Response('Site configuration not found', { status: 404 });
    }

    const { site_seo_settings: seo } = config;

    // Check if JSON Feed is disabled
    if (seo?.enable_json_feed === false) {
        return new Response('JSON feed is disabled', { status: 404 });
    }

    // Fetch latest 50 posts
    const postsRes = await ContentService.getPosts(1, 50);
    const posts = postsRes?.data || [];

    const siteUrl = config.custom_domain
        ? `https://${config.custom_domain}`
        : `https://${config.slug}.vercel.app`; // Fallback approximate URL if slug used

    const feed = {
        version: "https://jsonfeed.org/version/1.1",
        title: seo?.site_name || config.name || 'Blog',
        home_page_url: siteUrl,
        feed_url: `${siteUrl}/feed.json`,
        description: seo?.meta_description || 'Latest articles',
        icon: seo?.org_logo_url || undefined,
        favicon: `${siteUrl}/favicon.ico`,
        items: posts.map(post => ({
            id: post.id,
            url: `${siteUrl}/${post.slug}`,
            title: post.title,
            content_html: `${post.excerpt || ''} <br/> <a href="${siteUrl}/${post.slug}">Read more</a>`,
            summary: post.excerpt,
            image: post.featured_image,
            date_published: new Date(post.created_at).toISOString(),
            // date_modified: new Date(post.updated_at || post.created_at).toISOString(), // Updated_at not in interface yet
            author: post.author_name ? { name: post.author_name } : undefined,
            tags: post.category ? [post.category] : undefined,
        }))
    };

    return new Response(JSON.stringify(feed, null, 2), {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
