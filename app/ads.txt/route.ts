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
        return new Response('', { headers: { 'Content-Type': 'text/plain' } });
    }

    const supabase = getSupabase();

    const { data: seo } = await supabase
        .from('site_seo_settings')
        .select('ads_txt')
        .eq('site_id', siteId)
        .single();

    return new Response(seo?.ads_txt || '', {
        headers: { 'Content-Type': 'text/plain' },
    });
}
