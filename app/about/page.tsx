import { Metadata } from 'next';
import { ContentService, AboutPageContent } from '@/lib/api';

export const revalidate = 60;

async function getAboutData() {
    const config = await ContentService.getConfig();
    return {
        aboutContent: config?.about_page_content || null,
        siteName: config?.site_seo_settings?.site_name || config?.name || 'Our Blog',
        primaryColor: config?.primary_color || '#8b5cf6'
    };
}

export async function generateMetadata(): Promise<Metadata> {
    const { aboutContent, siteName } = await getAboutData();

    if (!aboutContent) {
        return {
            title: `About | ${siteName}`,
            description: `Learn more about ${siteName}`,
        };
    }

    return {
        title: aboutContent.seoMeta.title,
        description: aboutContent.seoMeta.description,
        keywords: aboutContent.seoMeta.keywords,
        alternates: {
            canonical: '/about',
        },
        openGraph: {
            title: aboutContent.seoMeta.title,
            description: aboutContent.seoMeta.description,
            type: "profile",
        },
    };
}

export default async function AboutPage() {
    const { aboutContent, siteName, primaryColor } = await getAboutData();

    // Fallback for missing about content
    if (!aboutContent) {
        return (
            <main className="relative min-h-screen bg-[#030303] text-white overflow-hidden">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">About Us</h1>
                        <p className="text-gray-400">About page content coming soon.</p>
                    </div>
                </div>
            </main>
        );
    }

    const { hero, catchphrase, originStory, winsAndLessons, personality, community, cta, footer } = aboutContent;

    return (
        <main className="relative min-h-screen bg-[#030303] text-white overflow-hidden">
            {/* Animated Ambient Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] animate-pulse" style={{ backgroundColor: `${primaryColor}33` }} />
                <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full blur-[180px] animate-pulse" style={{ backgroundColor: `${primaryColor}26`, animationDelay: '1s' }} />
            </div>

            {/* ═══════════════════════════════════════════════════════════════════
                HERO SECTION
            ═══════════════════════════════════════════════════════════════════ */}
            <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-20">
                <div className="max-w-4xl mx-auto text-center z-10">
                    {/* Avatar */}
                    {hero.avatarUrl && (
                        <div className="relative inline-block mb-8">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 shadow-[0_0_60px_rgba(139,92,246,0.3)]" style={{ borderColor: `${primaryColor}4D` }}>
                                <img
                                    src={hero.avatarUrl}
                                    alt={hero.headline}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Verified Badge */}
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center border-4 border-[#030303]" style={{ backgroundColor: primaryColor }}>
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    )}

                    {/* Name & Title */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
                        <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                            {hero.headline}
                        </span>
                    </h1>
                    {hero.title && (
                        <p className="text-lg md:text-xl font-medium mb-6" style={{ color: primaryColor }}>
                            {hero.title}
                        </p>
                    )}

                    {/* Location & Experience Badges */}
                    <div className="flex flex-wrap justify-center gap-4 text-gray-400 mb-8">
                        {hero.location && (
                            <span className="flex items-center gap-2">
                                <span>📍</span> {hero.location}
                            </span>
                        )}
                        {hero.yearsExperience && (
                            <span className="flex items-center gap-2">
                                <span>🏆</span> {hero.yearsExperience}+ years experience
                            </span>
                        )}
                    </div>

                    {/* Tagline */}
                    {hero.tagline && (
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed italic">
                            "{hero.tagline}"
                        </p>
                    )}

                    {/* Credentials */}
                    {hero.credentials.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2">
                            {hero.credentials.map((cred, i) => (
                                <span key={i} className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: `${primaryColor}1A`, borderColor: `${primaryColor}4D`, color: primaryColor, border: '1px solid' }}>
                                    ✓ {cred}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                CATCHPHRASE
            ═══════════════════════════════════════════════════════════════════ */}
            {catchphrase.quote && (
                <section className="relative px-6 py-12">
                    <div className="max-w-3xl mx-auto text-center">
                        <blockquote className="text-2xl md:text-3xl font-semibold text-white italic">
                            "{catchphrase.quote}"
                        </blockquote>
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════════════════════════════════
                ORIGIN STORY
            ═══════════════════════════════════════════════════════════════════ */}
            <section className="relative px-6 py-20">
                <div className="max-w-3xl mx-auto">
                    {/* Section Label */}
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <span className="text-xs text-gray-500 uppercase tracking-[0.3em]">My Story</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                        {originStory.title}
                    </h2>

                    <div className="prose prose-lg prose-invert max-w-none">
                        {originStory.narrative.split('\n\n').map((paragraph, i) => (
                            <p key={i} className="text-gray-300 leading-relaxed mb-6">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                WINS & LESSONS
            ═══════════════════════════════════════════════════════════════════ */}
            {(winsAndLessons.win || winsAndLessons.lesson) && (
                <section className="relative px-6 py-16">
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                        {winsAndLessons.win && (
                            <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-2xl">🏆</span>
                                    <h3 className="text-xl font-bold text-green-400">{winsAndLessons.win.title}</h3>
                                </div>
                                <p className="text-gray-300">{winsAndLessons.win.content}</p>
                            </div>
                        )}
                        {winsAndLessons.lesson && (
                            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-2xl">💡</span>
                                    <h3 className="text-xl font-bold text-amber-400">{winsAndLessons.lesson.title}</h3>
                                </div>
                                <p className="text-gray-300">{winsAndLessons.lesson.content}</p>
                            </div>
                        )}
                    </div>
                </section>
            )}



            {/* ═══════════════════════════════════════════════════════════════════
                COMMUNITY
            ═══════════════════════════════════════════════════════════════════ */}
            {community.platforms.length > 0 && (
                <section className="relative px-6 py-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">{community.title}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {community.platforms.map((platform, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}33`, color: primaryColor }}>
                                        🌐
                                    </div>
                                    <p className="text-gray-300 text-sm">{platform}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════════════════════════════════
                CTA
            ═══════════════════════════════════════════════════════════════════ */}
            <section className="relative px-6 py-20">
                <div className="max-w-2xl mx-auto">
                    <div className="relative rounded-3xl border border-white/10 p-8 md:p-12 text-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${primaryColor}26, transparent, ${primaryColor}1A)` }}>
                        <div className="relative z-10">
                            {cta.opener && (
                                <p className="text-gray-400 mb-4 italic">"{cta.opener}"</p>
                            )}
                            <h2 className="text-2xl md:text-3xl font-bold mb-6">
                                {cta.headline}
                            </h2>

                            <a
                                href="/"
                                className="inline-block px-8 py-4 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300"
                                style={{ backgroundColor: primaryColor }}
                            >
                                {cta.buttonText}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                FOOTER TRANSPARENCY
            ═══════════════════════════════════════════════════════════════════ */}
            {footer.transparency && (
                <section className="relative px-6 py-10 border-t border-white/5">
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-gray-500 text-sm">
                            {footer.transparency}
                        </p>
                    </div>
                </section>
            )}
        </main>
    );
}
