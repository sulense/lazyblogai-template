/**
 * Converts a raw Supabase Storage URL to a proxied local URL (white-labeled).
 * 
 * Input: https://fmsylpaaluexiqxgpfrv.supabase.co/storage/v1/object/public/blog-assets/image.webp
 * Output: /images/blog-assets/image.webp
 * 
 * @param url The original image URL
 * @returns The white-labeled URL or the original if not a Supabase URL
 */
export function proxyImage(url: string | null | undefined): string {
    if (!url) return '';

    // Check if it's a Supabase Storage URL
    if (url.includes('supabase.co/storage/v1/object/public')) {
        // Extract the path after 'public/'
        // Pattern: .../public/[bucket]/[folder]/[file]
        const parts = url.split('/storage/v1/object/public/');
        if (parts.length === 2) {
            return `/images/${parts[1]}`;
        }
    }

    return url;
}

/**
 * Replaces all Supabase Storage URLs in an HTML content string with proxied URLs.
 * Useful for blog post content.
 * 
 * @param htmlContent The full HTML content
 * @returns HTML with white-labeled image sources
 */
export function proxyContentImages(htmlContent: string): string {
    if (!htmlContent) return '';

    // Global replace for the Supabase URL pattern
    const regex = /https:\/\/[^/]+\.supabase\.co\/storage\/v1\/object\/public\//g;
    return htmlContent.replace(regex, '/images/');
}
