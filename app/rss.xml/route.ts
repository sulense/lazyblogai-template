import { ContentService } from '@/lib/api';

function escapeXml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export async function GET() {
    const siteConfig = await ContentService.getConfig();

    if (!siteConfig) {
        // Default RSS for demo/build mode
        return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Blog</title>
        <link>https://example.com</link>
        <description>A niche blog</description>
    </channel>
</rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
    }

    const { data: posts } = (await ContentService.getPosts(1, 50)) || { data: [] };
    const seo = siteConfig.site_seo_settings;

    // Check if RSS is disabled
    if (seo?.enable_rss === false) {
        return new Response('RSS feed is disabled', { status: 404 });
    }

    const simpleSiteUrl = siteConfig.custom_domain
        ? `https://${siteConfig.custom_domain}`
        : `https://${siteConfig.slug}-blog.vercel.app`;

    const feedTitle = escapeXml(seo?.rss_title || seo?.site_name || siteConfig.name || 'Blog');
    const feedDescription = escapeXml(seo?.rss_description || seo?.meta_description || 'Latest articles and updates');
    const feedImage = seo?.org_logo_url || '';
    const now = new Date().toUTCString();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
        <title>${feedTitle}</title>
        <link>${simpleSiteUrl}</link>
        <description>${feedDescription}</description>
        <language>en-us</language>
        <lastBuildDate>${now}</lastBuildDate>
        <atom:link href="${simpleSiteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
        <generator>LazyBlog AI</generator>`;

    // Add channel image if available
    if (feedImage) {
        xml += `
        <image>
            <url>${escapeXml(feedImage)}</url>
            <title>${feedTitle}</title>
            <link>${simpleSiteUrl}</link>
        </image>`;
    }

    // Add posts as items
    if (posts && posts.length > 0) {
        for (const post of posts) {
            const postUrl = `${simpleSiteUrl}/${post.slug}`;
            const pubDate = new Date(post.created_at).toUTCString();
            const title = escapeXml(post.title || 'Untitled');
            const description = escapeXml(post.excerpt || '');
            const category = post.category ? `<category>${escapeXml(post.category)}</category>` : '';
            const author = post.author_name ? `<author>${escapeXml(post.author_name)}</author>` : '';
            const enclosure = post.featured_image
                ? `<enclosure url="${escapeXml(post.featured_image)}" type="image/jpeg"/>`
                : '';

            xml += `
        <item>
            <title>${title}</title>
            <link>${postUrl}</link>
            <guid isPermaLink="true">${postUrl}</guid>
            <pubDate>${pubDate}</pubDate>
            <description>${description}</description>
            ${category}
            ${author}
            ${enclosure}
        </item>`;
        }
    }

    xml += `
    </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
