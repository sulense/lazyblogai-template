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
        return new Response('Atom feed not available in demo mode', { status: 404 });
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
            .select('site_name, meta_description, enable_atom, org_logo_url')
            .eq('site_id', siteId)
            .single(),
        supabase
            .from('posts')
            .select('title, slug, excerpt, content, category, author_name, created_at, updated_at')
            .eq('site_id', siteId)
            .eq('is_published', true)
            .order('created_at', { ascending: false })
            .limit(50)
    ]);

    // Check if Atom is disabled
    if (seo?.enable_atom === false) {
        return new Response('Atom feed is disabled', { status: 404 });
    }

    const siteUrl = site?.custom_domain
        ? `https://${site.custom_domain}`
        : `https://${site?.slug || 'demo'}-blog.vercel.app`;

    const feedTitle = escapeXml(seo?.site_name || site?.name || 'Blog');
    const feedSubtitle = escapeXml(seo?.meta_description || 'Latest articles');
    const feedId = siteUrl;
    const updated = posts && posts.length > 0 ? new Date(posts[0].updated_at || posts[0].created_at).toISOString() : new Date().toISOString();
    const logo = seo?.org_logo_url || '';

    let xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <title>${feedTitle}</title>
    <subtitle>${feedSubtitle}</subtitle>
    <link href="${siteUrl}/atom.xml" rel="self"/>
    <link href="${siteUrl}"/>
    <updated>${updated}</updated>
    <id>${feedId}</id>`;

    if (logo) {
        xml += `
    <logo>${escapeXml(logo)}</logo>`;
    }

    if (posts && posts.length > 0) {
        for (const post of posts) {
            const postUrl = `${siteUrl}/${post.slug}`;
            const postUpdated = new Date(post.updated_at || post.created_at).toISOString();
            const postPublished = new Date(post.created_at).toISOString();
            const title = escapeXml(post.title || 'Untitled');
            const summary = escapeXml(post.excerpt || '');
            const author = post.author_name ? `<author><name>${escapeXml(post.author_name)}</name></author>` : '';

            xml += `
    <entry>
        <title>${title}</title>
        <link href="${postUrl}"/>
        <id>${postUrl}</id>
        <updated>${postUpdated}</updated>
        <published>${postPublished}</published>
        <summary>${summary}</summary>
        ${author}
        <content type="html"><![CDATA[${post.excerpt || ''} <br/> <a href="${postUrl}">Read more</a>]]></content>
    </entry>`;
        }
    }

    xml += `
</feed>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/atom+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
