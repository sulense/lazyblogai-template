import { createClient } from '@supabase/supabase-js';

function getSupabase() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
}

export async function GET() {
    const siteId = process.env.SITE_ID;

    const defaultLlmsTxt = `# LLMs.txt - AI Crawler Instructions
# This site allows AI crawlers to read and summarize content.
# For more info: https://llmstxt.org/`;

    if (!siteId || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
        return new Response(defaultLlmsTxt, { headers: { 'Content-Type': 'text/plain' } });
    }

    const supabase = getSupabase();

    const { data: seo } = await supabase
        .from('site_seo_settings')
        .select('llms_txt')
        .eq('site_id', siteId)
        .single();

    return new Response(seo?.llms_txt || defaultLlmsTxt, {
        headers: { 'Content-Type': 'text/plain' },
    });
}
