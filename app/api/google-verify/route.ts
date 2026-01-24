import { NextResponse } from "next/server";
import { ContentService } from '@/lib/api';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const filename = url.searchParams.get('file');

    if (!filename) {
        return new NextResponse('Missing file parameter', { status: 400 });
    }

    const siteConfig = await ContentService.getConfig();

    // @ts-ignore
    const expectedFilename = siteConfig?.google_site_verification_id;

    if (!expectedFilename) {
        console.log('[Google Verify] No verification ID configured for site.');
        return new NextResponse('Verification not configured', { status: 404 });
    }

    if (filename !== expectedFilename) {
        console.log(`[Google Verify] Mismatch: expected ${expectedFilename}, got ${filename}`);
        return new NextResponse('Not Found', { status: 404 });
    }

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
