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
        // Default sitemap for demo/build mode
        return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://example.com</loc>
    </url>
</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
    }

    const supabase = getSupabase();

    // Get site info
    const { data: site } = await supabase
        .from('sites')
        .select('slug, custom_domain')
        .eq('id', siteId)
        .single();

    const siteUrl = site?.custom_domain
        ? `https://${site.custom_domain}`
        : `https://${site?.slug || 'demo'}-blog.vercel.app`;

    // Get all published posts
    const { data: posts } = await supabase
        .from('posts')
        .select('slug, created_at')
        .eq('site_id', siteId)
        .eq('is_published', true)
        .order('created_at', { ascending: false });

    const now = new Date().toISOString();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${siteUrl}</loc>
        <lastmod>${now}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>`;

    // Add all posts
    if (posts) {
        for (const post of posts) {
            xml += `
    <url>
        <loc>${siteUrl}/${post.slug}</loc>
        <lastmod>${post.created_at}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`;
        }
    }

    xml += `
</urlset>`;

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml' },
    });
}
