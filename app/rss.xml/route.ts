import { createClient } from '@supabase/supabase-js';

function getSupabase() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
}

function escapeXml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export async function GET() {
    const siteId = process.env.SITE_ID;

    if (!siteId || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
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

    const supabase = getSupabase();

    // Get site info and SEO settings
    const [{ data: site }, { data: seo }, { data: posts }] = await Promise.all([
        supabase
            .from('sites')
            .select('name, slug, custom_domain')
            .eq('id', siteId)
            .single(),
        supabase
            .from('site_seo_settings')
            .select('site_name, meta_description, rss_title, rss_description, enable_rss, org_logo_url')
            .eq('site_id', siteId)
            .single(),
        supabase
            .from('posts')
            .select('title, slug, excerpt, category, author_name, created_at, featured_image')
            .eq('site_id', siteId)
            .eq('is_published', true)
            .order('created_at', { ascending: false })
            .limit(50)
    ]);

    // Check if RSS is disabled
    if (seo?.enable_rss === false) {
        return new Response('RSS feed is disabled', { status: 404 });
    }

    const siteUrl = site?.custom_domain
        ? `https://${site.custom_domain}`
        : `https://${site?.slug || 'demo'}-blog.vercel.app`;

    const feedTitle = escapeXml(seo?.rss_title || seo?.site_name || site?.name || 'Blog');
    const feedDescription = escapeXml(seo?.rss_description || seo?.meta_description || 'Latest articles and updates');
    const feedImage = seo?.org_logo_url || '';
    const now = new Date().toUTCString();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
        <title>${feedTitle}</title>
        <link>${siteUrl}</link>
        <description>${feedDescription}</description>
        <language>en-us</language>
        <lastBuildDate>${now}</lastBuildDate>
        <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
        <generator>LazyBlog AI</generator>`;

    // Add channel image if available
    if (feedImage) {
        xml += `
        <image>
            <url>${escapeXml(feedImage)}</url>
            <title>${feedTitle}</title>
            <link>${siteUrl}</link>
        </image>`;
    }

    // Add posts as items
    if (posts && posts.length > 0) {
        for (const post of posts) {
            const postUrl = `${siteUrl}/${post.slug}`;
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
