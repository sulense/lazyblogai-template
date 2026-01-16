import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// API endpoint for Google Site Verification
// Called by middleware when URL matches /googleXXXX.html pattern

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const siteId = process.env.SITE_ID;

export async function GET(request: Request) {
    const url = new URL(request.url);
    const filename = url.searchParams.get('file');

    if (!filename) {
        return new NextResponse('Missing file parameter', { status: 400 });
    }

    // Get the site's verification ID
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data: site } = await supabase
        .from('sites')
        .select('google_site_verification_id')
        .eq('id', siteId)
        .single();

    // Check if this matches the expected verification file
    if (!site?.google_site_verification_id) {
        console.log('[Google Verify] No verification ID configured for site:', siteId);
        return new NextResponse('Verification not configured', { status: 404 });
    }

    const expectedFilename = site.google_site_verification_id;

    if (filename !== expectedFilename) {
        console.log(`[Google Verify] Mismatch: expected ${expectedFilename}, got ${filename}`);
        return new NextResponse('Not Found', { status: 404 });
    }

    // Return the verification content
    // For FILE verification, the file content should be: google-site-verification: TOKEN
    const token = filename.replace('.html', '');
    const content = `google-site-verification: ${token}`;

    console.log('[Google Verify] Serving verification file:', filename);

    return new NextResponse(content, {
        status: 200,
        headers: {
            'Content-Type': 'text/html',
        },
    });
}
