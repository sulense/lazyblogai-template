import { ContentService } from '@/lib/api';

export async function GET() {
    const siteConfig = await ContentService.getConfig();

    if (!siteConfig) {
        return new Response('', { headers: { 'Content-Type': 'text/plain' } });
    }

    const adsTxt = siteConfig.site_seo_settings?.ads_txt || '';

    return new Response(adsTxt, {
        headers: { 'Content-Type': 'text/plain' },
    });
}
