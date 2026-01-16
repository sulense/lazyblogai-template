import { createClient } from '@supabase/supabase-js';

function getSupabase() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
}

export async function GET() {
    const siteId = process.env.SITE_ID;

    if (!siteId || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
        return new Response('JSON feed not available in demo mode', { status: 404 });
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
            .select('site_name, meta_description, enable_json_feed, org_logo_url')
            .eq('site_id', siteId)
            .single(),
        supabase
            .from('posts')
            .select('id, title, slug, excerpt, content, category, author_name, created_at, updated_at, featured_image')
            .eq('site_id', siteId)
            .eq('is_published', true)
            .order('created_at', { ascending: false })
            .limit(50)
    ]);

    // Check if JSON Feed is disabled
    if (seo?.enable_json_feed === false) {
        return new Response('JSON feed is disabled', { status: 404 });
    }

    const siteUrl = site?.custom_domain
        ? `https://${site.custom_domain}`
        : `https://${site?.slug || 'demo'}-blog.vercel.app`;

    const feed = {
        version: "https://jsonfeed.org/version/1.1",
        title: seo?.site_name || site?.name || 'Blog',
        home_page_url: siteUrl,
        feed_url: `${siteUrl}/feed.json`,
        description: seo?.meta_description || 'Latest articles',
        icon: seo?.org_logo_url || undefined,
        favicon: `${siteUrl}/favicon.ico`,
        items: (posts || []).map(post => ({
            id: post.id,
            url: `${siteUrl}/${post.slug}`,
            title: post.title,
            content_html: `${post.excerpt || ''} <br/> <a href="${siteUrl}/${post.slug}">Read more</a>`,
            summary: post.excerpt,
            image: post.featured_image,
            date_published: new Date(post.created_at).toISOString(),
            date_modified: new Date(post.updated_at || post.created_at).toISOString(),
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
