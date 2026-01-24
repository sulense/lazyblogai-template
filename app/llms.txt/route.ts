import { ContentService } from '@/lib/api';

export async function GET() {
    const config = await ContentService.getConfig();

    const defaultLlmsTxt = `# LLMs.txt - AI Crawler Instructions
# This site allows AI crawlers to read and summarize content.
# For more info: https://llmstxt.org/`;

    if (!config) {
        return new Response(defaultLlmsTxt, { headers: { 'Content-Type': 'text/plain' } });
    }

    const { site_seo_settings: seo } = config;

    return new Response(seo?.llms_txt || defaultLlmsTxt, {
        headers: { 'Content-Type': 'text/plain' },
    });
}
