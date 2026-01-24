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
        return new Response('Atom feed not available in demo mode', { status: 404 });
    }

    const { data: posts } = (await ContentService.getPosts(1, 50)) || { data: [] };
    const seo = siteConfig.site_seo_settings;

    if (seo?.enable_atom === false) {
        return new Response('Atom feed is disabled', { status: 404 });
    }

    const simpleSiteUrl = siteConfig.custom_domain
        ? `https://${siteConfig.custom_domain}`
        : `https://${siteConfig.slug}-blog.vercel.app`;

    const feedTitle = escapeXml(seo?.site_name || siteConfig.name || 'Blog');
    const feedSubtitle = escapeXml(seo?.meta_description || 'Latest articles');
    const feedId = simpleSiteUrl;
    // Note: 'updated_at' is no longer available in the simplified post list, falling back to created_at
    // If strict atom compliance is needed, we should add updated_at to the API
    const updated = posts && posts.length > 0 ? new Date(posts[0].created_at).toISOString() : new Date().toISOString();
    const logo = seo?.org_logo_url || '';

    let xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <title>${feedTitle}</title>
    <subtitle>${feedSubtitle}</subtitle>
    <link href="${simpleSiteUrl}/atom.xml" rel="self"/>
    <link href="${simpleSiteUrl}"/>
    <updated>${updated}</updated>
    <id>${feedId}</id>`;

    if (logo) {
        xml += `
    <logo>${escapeXml(logo)}</logo>`;
    }

    if (posts && posts.length > 0) {
        for (const post of posts) {
            const postUrl = `${simpleSiteUrl}/${post.slug}`;
            const postPublished = new Date(post.created_at).toISOString();
            const title = escapeXml(post.title || 'Untitled');
            const summary = escapeXml(post.excerpt || '');
            const author = post.author_name ? `<author><name>${escapeXml(post.author_name)}</name></author>` : '';

            xml += `
    <entry>
        <title>${title}</title>
        <link href="${postUrl}"/>
        <id>${postUrl}</id>
        <updated>${postPublished}</updated>
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
