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
        // Default robots.txt for demo/build mode
        return new Response(`User-agent: *
Allow: /
`, { headers: { 'Content-Type': 'text/plain' } });
    }

    const supabase = getSupabase();

    // Fetch SEO settings from database
    const { data: seo } = await supabase
        .from('site_seo_settings')
        .select('robots_txt')
        .eq('site_id', siteId)
        .single();

    // Get site URL for sitemap reference
    const { data: site } = await supabase
        .from('sites')
        .select('slug, custom_domain')
        .eq('id', siteId)
        .single();

    const siteUrl = site?.custom_domain
        ? `https://${site.custom_domain}`
        : `https://${site?.slug}-blog.vercel.app`;

    let robotsTxt = seo?.robots_txt || `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml`;

    // Replace placeholder
    robotsTxt = robotsTxt.replace(/\{\{SITE_URL\}\}/g, siteUrl);

    return new Response(robotsTxt, {
        headers: { 'Content-Type': 'text/plain' },
    });
}
