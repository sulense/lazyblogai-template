import "./globals.css";
import { createClient } from "@supabase/supabase-js";
import { Inter, Roboto, Lora } from "next/font/google";
import { Metadata } from "next";
import { OrganizationSchema, WebSiteSchema } from "../components/structured-data";
import { ThemeToggle } from "../components/ThemeToggle";

// Font configurations
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-roboto" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

function getSupabase() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
}

async function getSiteConfig() {
    const siteId = process.env.SITE_ID;
    if (!siteId || !process.env.NEXT_PUBLIC_SUPABASE_URL) return null;

    const supabase = getSupabase();

    const { data: site } = await supabase
        .from("sites")
        .select("primary_color, font_family, name, slug, custom_domain")
        .eq("id", siteId)
        .single();

    const { data: seo } = await supabase
        .from("site_seo_settings")
        .select("*")
        .eq("site_id", siteId)
        .single();

    return { site, seo };
}

export async function generateMetadata(): Promise<Metadata> {
    const config = await getSiteConfig();
    const site = config?.site;
    const seo = config?.seo;

    const siteUrl = site?.custom_domain
        ? `https://${site.custom_domain}`
        : `https://${site?.slug || 'demo'}-blog.vercel.app`;

    return {
        title: seo?.meta_title || site?.name || "Niche Blog",
        description: seo?.meta_description || "A generated niche blog site",
        metadataBase: new URL(siteUrl),
        alternates: {
            canonical: siteUrl,
        },
        openGraph: {
            title: seo?.meta_title || site?.name || "Niche Blog",
            description: seo?.meta_description || "A generated niche blog site",
            url: siteUrl,
            siteName: seo?.site_name || site?.name || "Niche Blog",
            images: seo?.og_image_url ? [{ url: seo.og_image_url, width: 1200, height: 630 }] : [],
            type: (seo?.og_type as "website" | "article") || "website",
        },
        twitter: {
            card: (seo?.twitter_card as "summary_large_image" | "summary") || "summary_large_image",
            title: seo?.meta_title || site?.name || "Niche Blog",
            description: seo?.meta_description || "A generated niche blog site",
            images: seo?.og_image_url ? [seo.og_image_url] : [],
            creator: seo?.twitter_handle,
        },
        robots: {
            index: true,
            follow: true,
            "max-image-preview": "large",
        },
        icons: {
            icon: seo?.favicon_url || "/favicon.ico",
            apple: seo?.apple_touch_icon_url || "/apple-touch-icon.png",
        },
        manifest: "/manifest.json",
        verification: {
            google: seo?.google_site_verification,
        },
    };
}

interface RootLayoutProps {
    children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
    const configData = await getSiteConfig();
    const site = configData?.site;
    const seo = configData?.seo;

    const primaryColor = site?.primary_color || "#8b5cf6";
    const fontFamilySpec = site?.font_family || "Inter";
    // Prioritize SEO site name (AI generated) over project name
    const siteName = seo?.site_name || site?.name || "My Blog";
    const siteUrl = site?.custom_domain
        ? `https://${site.custom_domain}`
        : `https://${site?.slug || 'demo'}-blog.vercel.app`;

    let fontVariable = inter.variable;
    let fontFamilyCss = "var(--font-inter)";

    if (fontFamilySpec === 'Roboto') {
        fontVariable = roboto.variable;
        fontFamilyCss = "var(--font-roboto)";
    } else if (fontFamilySpec === 'Lora') {
        fontVariable = lora.variable;
        fontFamilyCss = "var(--font-lora)";
    }


    return (
        <html lang="en" className={fontVariable} suppressHydrationWarning>
            <head>
                {/* Theme initialization script to prevent FOUC */}
                <script dangerouslySetInnerHTML={{
                    __html: `
                        (function() {
                            var theme = localStorage.getItem('theme') || 'dark';
                            document.documentElement.classList.add(theme);
                        })();
                    `
                }} />
                <style dangerouslySetInnerHTML={{
                    __html: `
            :root {
              --primary-color: ${primaryColor};
              --font-family-main: ${fontFamilyCss};
            }
          `
                }} />
                {/* Custom Schema JSON-LD */}
                {seo?.schema_json && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: seo.schema_json }}
                    />
                )}
                {/* Fallback: Auto-generated structured data if no custom schema */}
                {!seo?.schema_json && (
                    <>
                        <OrganizationSchema
                            name={seo?.org_name || siteName}
                            url={siteUrl}
                            logo={seo?.org_logo_url}
                        />
                        <WebSiteSchema
                            name={siteName}
                            url={siteUrl}
                            description={seo?.meta_description}
                        />
                    </>
                )}
                {/* Custom Head Scripts (GA, Search Console, etc.) */}
                {seo?.head_scripts && (
                    <div dangerouslySetInnerHTML={{ __html: seo.head_scripts }} />
                )}
            </head>
            <body className="min-h-screen bg-[#0a0a0b] flex flex-col">
                {/* Ambient background */}
                <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: primaryColor }} />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: primaryColor }} />
                </div>

                {/* Skip to content link for accessibility */}
                <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-4 py-2 rounded z-50">
                    Skip to content
                </a>

                {/* Navigation */}
                <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/40">
                    <nav className="max-w-7xl mx-auto px-6 py-4" aria-label="Main navigation">
                        <div className="flex items-center justify-between">
                            <a href="/" className="flex items-center gap-3 group" aria-label={`${siteName} home`}>
                                {seo?.org_logo_url ? (
                                    <img
                                        src={seo.org_logo_url}
                                        alt={siteName}
                                        className="w-10 h-10 rounded-xl object-cover shadow-lg transition-transform group-hover:scale-110"
                                    />
                                ) : (
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg"
                                        style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` }}
                                    >
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                        </svg>
                                    </div>
                                )}
                                <span className="text-xl font-bold text-white tracking-tight">{siteName}</span>
                            </a>

                            <div className="flex items-center gap-4">
                                <ThemeToggle />
                                <button
                                    className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 shadow-lg hover:shadow-xl hover:scale-105"
                                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)` }}
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </nav>
                </header>

                <main id="main-content" className="flex-grow">
                    {children}
                </main>

                {/* Footer */}
                <footer className="border-t border-white/10 mt-auto bg-black/30" role="contentinfo">
                    <div className="max-w-7xl mx-auto px-6 py-12">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-3">
                                {seo?.org_logo_url ? (
                                    <img
                                        src={seo.org_logo_url}
                                        alt={siteName}
                                        className="w-8 h-8 rounded-lg object-cover"
                                    />
                                ) : (
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                                        style={{ background: primaryColor }}
                                    >
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                )}
                                <span className="font-bold text-white text-lg">{siteName}</span>
                            </div>
                            <div className="text-sm text-gray-400">
                                &copy; {new Date().getFullYear()} {siteName}. All rights reserved. <span className="opacity-50 text-xs ml-2">v1.1</span>
                            </div>
                        </div>
                    </div>
                </footer>
                {/* Custom Body Scripts */}
                {seo?.body_scripts && (
                    <div dangerouslySetInnerHTML={{ __html: seo.body_scripts }} />
                )}
            </body>
        </html>
    );
}
