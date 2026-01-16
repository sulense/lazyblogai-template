import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// This route serves the Google Site Verification file
// Handles requests like: /google1234567890abcdef.html

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const siteId = process.env.SITE_ID;

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug;

    // Only handle Google verification files
    if (!slug.startsWith('google') || !slug.endsWith('.html')) {
        // Not a verification file, return 404 to let page.tsx handle it
        return new NextResponse(null, { status: 404 });
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
        return new NextResponse('Verification not configured', { status: 404 });
    }

    const expectedFilename = site.google_site_verification_id;

    if (slug !== expectedFilename) {
        console.log(`Verification file mismatch: expected ${expectedFilename}, got ${slug}`);
        return new NextResponse('Not Found', { status: 404 });
    }

    // Return the verification content
    // For FILE verification, the file content should be: google-site-verification: TOKEN
    const token = slug.replace('.html', '');
    const content = `google-site-verification: ${token}`;

    return new NextResponse(content, {
        status: 200,
        headers: {
            'Content-Type': 'text/html',
        },
    });
}
