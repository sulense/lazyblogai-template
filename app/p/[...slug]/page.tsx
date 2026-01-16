import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { renderSections, Section } from "../../../components/sections";

export const revalidate = 60; // Revalidate every minute

function getSupabase() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
}

interface PageData {
    id: string;
    title: string;
    slug: string;
    page_type: string;
    sections: Section[];
    meta_title: string | null;
    meta_description: string | null;
    og_image: string | null;
    is_published: boolean;
}

async function getPage(slug: string): Promise<PageData | null> {
    const siteId = process.env.SITE_ID;
    if (!siteId || !process.env.NEXT_PUBLIC_SUPABASE_URL) return null;

    const supabase = getSupabase();

    const { data, error } = await supabase
        .from('site_pages')
        .select('*')
        .eq('site_id', siteId)
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

    if (error || !data) return null;

    return {
        ...data,
        sections: (data.sections || []) as Section[],
    };
}

// Generate metadata for the page
export async function generateMetadata({
    params,
}: {
    params: { slug: string[] };
}): Promise<Metadata> {
    const slug = params.slug?.[0] || '';
    const page = await getPage(slug);

    if (!page) {
        return { title: 'Page Not Found' };
    }

    return {
        title: page.meta_title || page.title,
        description: page.meta_description || undefined,
        openGraph: page.og_image ? {
            images: [{ url: page.og_image }],
        } : undefined,
    };
}

export default async function StaticPage({
    params,
}: {
    params: { slug: string[] };
}) {
    const slug = params.slug?.[0] || '';

    // Skip if this looks like a blog post slug (handled by [slug]/page.tsx)
    // Pages use specific slugs like 'about', 'contact', 'privacy', 'terms'
    const reservedPageSlugs = ['about', 'contact', 'privacy', 'terms', 'faq', 'categories'];

    // If not a reserved page slug, let the blog post route handle it
    if (!reservedPageSlugs.includes(slug) && !slug.startsWith('p-')) {
        notFound();
    }

    const page = await getPage(slug);

    if (!page) {
        notFound();
    }

    return (
        <main className="min-h-screen">
            {renderSections(page.sections)}
        </main>
    );
}
