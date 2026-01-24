import { NextResponse } from "next/server";
import { ContentService } from '@/lib/api';

export async function GET(
    request: Request,
    { params }: { params: { filename: string } }
) {
    const filename = params.filename;

    if (!filename.startsWith('google') || !filename.endsWith('.html')) {
        return new NextResponse('Not Found', { status: 404 });
    }

    const siteConfig = await ContentService.getConfig();

    // @ts-ignore - google_site_verification_id might not be in interface yet, I need to update interface
    const expectedFilename = siteConfig?.google_site_verification_id;

    if (!expectedFilename) {
        return new NextResponse('Verification not configured', { status: 404 });
    }

    if (filename !== expectedFilename) {
        console.log(`Verification file mismatch: expected ${expectedFilename}, got ${filename}`);
        return new NextResponse('Not Found', { status: 404 });
    }

    const content = `google-site-verification: ${filename.replace('.html', '')}`;

    return new NextResponse(content, {
        status: 200,
        headers: {
            'Content-Type': 'text/html',
        },
    });
}
