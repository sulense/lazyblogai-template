import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');

    // Use a shared secret for revalidation security
    // In production, this should be an environment variable like process.env.REVALIDATION_TOKEN
    // For now we accept a generic "brain" token or check site specific logic if needed
    if (secret !== 'brain_reval_secret_123') {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const path = searchParams.get('path') || '/';

    try {
        revalidatePath(path);
        revalidatePath('/', 'layout'); // clear everything to be safe
        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (err) {
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}
