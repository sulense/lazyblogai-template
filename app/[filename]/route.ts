import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// This route serves the Google Site Verification file
// URL pattern: /googleXXXXXXXXXXXX.html

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const siteId = process.env.SITE_ID;

export async function GET(
    request: Request,
    { params }: { params: { filename: string } }
) {
    const filename = params.filename;

    // Validate it looks like a Google verification file
    if (!filename.startsWith('google') || !filename.endsWith('.html')) {
        return new NextResponse('Not Found', { status: 404 });
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
        return new NextResponse('Not Found', { status: 404 });
    }

    // The verification file content is just: google-site-verification: TOKEN
    // For FILE method, the filename IS the token
    const expectedFilename = site.google_site_verification_id;

    if (filename !== expectedFilename) {
        console.log(`Verification file mismatch: expected ${expectedFilename}, got ${filename}`);
        return new NextResponse('Not Found', { status: 404 });
    }

    // Return the verification content
    // For FILE verification, the file should contain: google-site-verification: TOKEN
    const token = filename.replace('.html', '').replace('google', '');
    const content = `google-site-verification: ${filename.replace('.html', '')}`;

    return new NextResponse(content, {
        status: 200,
        headers: {
            'Content-Type': 'text/html',
        },
    });
}
