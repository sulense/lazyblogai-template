export const BRAIN_API_URL = process.env.NEXT_PUBLIC_BRAIN_API_URL || 'https://www.lazyblogai.com';
export const SITE_ID = process.env.SITE_ID;

if (!SITE_ID && process.env.NODE_ENV === 'production') {
    console.warn("SITE_ID environment variable is missing!");
}

async function fetchBrain<T>(endpoint: string, params?: Record<string, string>): Promise<T | null> {
    if (!SITE_ID) return null;

    try {
        const url = new URL(`${BRAIN_API_URL}/api/sites/${SITE_ID}/${endpoint}`);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        }

        const res = await fetch(url.toString(), {
            next: { revalidate: 60 },
            headers: {
                // 'x-api-key': process.env.BRAIN_API_KEY || ''
            }
        });

        if (!res.ok) {
            console.error(`Brain API Error: ${res.status} ${res.statusText}`);
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error("Failed to fetch from Brain API:", error);
        return null;
    }
}

export interface SiteSeoSettings {
    site_name: string | null;
    meta_title: string | null;
    meta_description: string | null;
    rss_title: string | null;
    rss_description: string | null;
    enable_rss: boolean;
    org_logo_url: string | null;
    enable_atom: boolean;
    manifest_name: string | null;
    manifest_short_name: string | null;
    manifest_theme_color: string | null;
    manifest_background_color: string | null;
    manifest_display: string | null;
    icon_192_url: string | null;
    icon_512_url: string | null;
    robots_txt: string | null;
    ads_txt: string | null;
    llms_txt: string | null;
    enable_json_feed: boolean;
    schema_json: string | null;
    og_image_url: string | null;
    og_type: string | null;
    twitter_card: string | null;
    twitter_handle: string | null;
    favicon_url: string | null;
    apple_touch_icon_url: string | null;
    head_scripts: string | null;
    body_scripts: string | null;
    org_name: string | null;
}

export interface SiteConfig {
    name: string;
    slug: string;
    custom_domain: string | null;
    primary_color: string;
    font_family: string;
    logo_url: string | null;
    description: string | null;
    google_site_verification_id?: string | null;
    site_seo_settings?: SiteSeoSettings;
}

export interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content?: string;
    featured_image: string | null;
    category: string;
    read_time: string;
    author_name: string | null;
    author_avatar: string | null;
    created_at: string;
    seo_title?: string;
    seo_description?: string;
}

export interface PostListResponse {
    data: Post[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }
}

export const ContentService = {
    async getConfig(): Promise<SiteConfig | null> {
        return fetchBrain<SiteConfig>('config');
    },

    async getPosts(page = 1, limit = 9, category?: string, query?: string): Promise<PostListResponse | null> {
        const params: Record<string, string> = {
            page: page.toString(),
            limit: limit.toString()
        };
        if (category) params.category = category;
        if (query) params.q = query;

        return fetchBrain<PostListResponse>('posts', params);
    },

    async getPostBySlug(slug: string): Promise<Post | null> {
        return fetchBrain<Post>(`posts/${slug}`);
    },

    async getRelatedPosts(category: string, excludeSlug: string, limit = 3): Promise<Post[]> {
        // Fetch posts in category (limit + 1 to account for exclusion)
        const res = await this.getPosts(1, limit + 2, category);
        if (!res) return [];

        return res.data
            .filter(p => p.slug !== excludeSlug)
            .slice(0, limit);
    },

    async getSitemapPaths(): Promise<{ slug: string; created_at: string }[] | null> {
        return fetchBrain<{ slug: string; created_at: string }[]>('sitemap');
    }
};
