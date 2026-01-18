import { ContentService } from '@/lib/api';

export async function GET() {
    const siteConfig = await ContentService.getConfig();

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

    if (!siteConfig) {
        return new Response(JSON.stringify(defaultManifest, null, 2), {
            headers: { 'Content-Type': 'application/manifest+json' },
        });
    }

    const seo = siteConfig.site_seo_settings;

    const manifest = {
        name: seo?.manifest_name || siteConfig.name || 'Blog',
        short_name: seo?.manifest_short_name || siteConfig.name || 'Blog',
        description: 'A niche blog site',
        start_url: '/',
        display: seo?.manifest_display || 'standalone',
        background_color: seo?.manifest_background_color || '#000000',
        theme_color: seo?.manifest_theme_color || siteConfig.primary_color || '#8b5cf6',
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
