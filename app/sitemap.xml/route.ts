import { ContentService } from '@/lib/api';

export async function GET() {
    const siteConfig = await ContentService.getConfig();

    if (!siteConfig) {
        // Default sitemap for demo/build mode
        return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://example.com</loc>
    </url>
</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
    }

    const siteUrl = siteConfig.custom_domain
        ? `https://${siteConfig.custom_domain}`
        : `https://${siteConfig.slug || 'demo'}-blog.vercel.app`;

    const posts = await ContentService.getSitemapPaths();
    const now = new Date().toISOString();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${siteUrl}</loc>
        <lastmod>${now}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>`;

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
