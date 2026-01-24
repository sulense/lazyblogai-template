import { ContentService } from '@/lib/api';

export async function GET() {
    const siteConfig = await ContentService.getConfig();

    if (!siteConfig) {
        // Default robots.txt for demo/build mode
        return new Response(`User-agent: *
Allow: /
`, { headers: { 'Content-Type': 'text/plain' } });
    }

    const simpleSiteUrl = siteConfig.custom_domain
        ? `https://${siteConfig.custom_domain}`
        : `https://${siteConfig.slug}-blog.vercel.app`;

    const seo = siteConfig.site_seo_settings;

    let robotsTxt = seo?.robots_txt || `User-agent: *
Allow: /

Sitemap: ${simpleSiteUrl}/sitemap.xml`;

    // Replace placeholder
    robotsTxt = robotsTxt.replace(/\{\{SITE_URL\}\}/g, simpleSiteUrl);

    return new Response(robotsTxt, {
        headers: { 'Content-Type': 'text/plain' },
    });
}
