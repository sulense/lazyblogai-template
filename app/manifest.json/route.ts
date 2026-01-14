import { createClient } from '@supabase/supabase-js';

function getSupabase() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
}

export async function GET() {
    const siteId = process.env.SITE_ID;

    const defaultManifest = {
        name: 'Blog',
        short_name: 'Blog',
        description: 'A niche blog site',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#8b5cf6',
        icons: [
            { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
    };

    if (!siteId || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
        return new Response(JSON.stringify(defaultManifest, null, 2), {
            headers: { 'Content-Type': 'application/manifest+json' },
        });
    }

    const supabase = getSupabase();

    // Get site info
    const { data: site } = await supabase
        .from('sites')
        .select('name, primary_color')
        .eq('id', siteId)
        .single();

    // Get SEO settings
    const { data: seo } = await supabase
        .from('site_seo_settings')
        .select('manifest_name, manifest_short_name, manifest_theme_color, manifest_background_color, manifest_display, icon_192_url, icon_512_url')
        .eq('site_id', siteId)
        .single();

    const manifest = {
        name: seo?.manifest_name || site?.name || 'Blog',
        short_name: seo?.manifest_short_name || site?.name || 'Blog',
        description: 'A niche blog site',
        start_url: '/',
        display: seo?.manifest_display || 'standalone',
        background_color: seo?.manifest_background_color || '#000000',
        theme_color: seo?.manifest_theme_color || site?.primary_color || '#8b5cf6',
        icons: [
            {
                src: seo?.icon_192_url || '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: seo?.icon_512_url || '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };

    return new Response(JSON.stringify(manifest, null, 2), {
        headers: { 'Content-Type': 'application/manifest+json' },
    });
}
