import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
    title: "About Alex Chen | Urban Eden - Tech-Assisted Urban Gardening",
    description: "Meet Alex Chen, the engineer-turned-gardener behind Urban Eden. Master Gardener Volunteer, software engineer, and small-space specialist helping 50k+ city dwellers grow food.",
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: "About Alex Chen | Urban Eden",
        description: "The engineer who killed a $500 tree and built a gardening empire from the data.",
        type: "profile",
    },
};

export default function AboutPage() {
    // ═══════════════════════════════════════════════════════════════════
    // ENTITY SCHEMA - Enhanced with knowsAbout for SEO entity recognition
    // ═══════════════════════════════════════════════════════════════════
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Alex Chen",
        "alternateName": "The Urban Eden Guy",
        "jobTitle": "Founder & Lead Grower",
        "url": "https://urban-eden.demo.com/about",
        "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
        "sameAs": [
            "https://twitter.com/alexchen_garden",
            "https://linkedin.com/in/alexchen-demo",
            "https://www.reddit.com/user/urbaneden_alex",
            "https://www.quora.com/profile/Alex-Chen-Urban-Eden"
        ],
        "worksFor": {
            "@type": "Organization",
            "name": "Urban Eden",
            "url": "https://urban-eden.demo.com",
            "foundingDate": "2021"
        },
        "description": "Engineer-turned-urban-farmer specializing in automated hydroponics, IoT sensors, and data-driven gardening for small apartments. Master Gardener Volunteer (King County, WA).",
        "knowsAbout": [
            "Urban Gardening",
            "Container Gardening",
            "Hydroponics",
            "Vertical Farming",
            "Plant Physiology",
            "IoT Garden Sensors",
            "Automated Watering Systems",
            "Sustainable Food Systems",
            "Microclimate Management",
            "Integrated Pest Management (IPM)"
        ],
        "hasCredential": {
            "@type": "EducationalOccupationalCredential",
            "name": "Master Gardener Volunteer Certification",
            "credentialCategory": "Certification",
            "issuedBy": {
                "@type": "Organization",
                "name": "King County Master Gardener Foundation"
            },
            "dateIssued": "2022"
        }
    };

    return (
        <main className="relative min-h-screen bg-[#030303] text-white overflow-hidden">
            {/* Schema Injection */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* ═══════════════════════════════════════════════════════════════════
                ANIMATED AMBIENT BACKGROUND
            ═══════════════════════════════════════════════════════════════════ */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-emerald-600/15 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* ═══════════════════════════════════════════════════════════════════
                HERO: VISUAL IDENTITY + INTRO
                Requirement: Consistent avatar/logo for brand recognition
            ═══════════════════════════════════════════════════════════════════ */}
            <section className="relative min-h-[80vh] flex items-center justify-center px-6 pt-20">
                <div className="max-w-4xl mx-auto text-center z-10">
                    {/* Avatar - Visual Identity */}
                    <div className="relative inline-block mb-8">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-emerald-500/30 shadow-[0_0_60px_rgba(16,185,129,0.3)]">
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face"
                                alt="Alex Chen - Urban Eden Founder"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Verified Badge */}
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-[#030303]">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    {/* Name & Title */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
                        <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                            Alex Chen
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-emerald-400 font-medium mb-6">
                        The Urban Eden Guy
                    </p>

                    {/* Tagline */}
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                        Engineer. Master Gardener. The guy who killed a $500 tree and built a data-driven gardening empire from the ashes.
                    </p>

                    {/* Human-Verified Badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-10">
                        <span className="text-xl">🛡️</span>
                        <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">100% Human-Verified Content</span>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                THE ORIGIN MYTH (Backstory)
                Requirement: The specific moment the persona became an expert
            ═══════════════════════════════════════════════════════════════════ */}
            <section className="relative px-6 py-20">
                <div className="max-w-3xl mx-auto">
                    {/* Section Label */}
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <span className="text-xs text-gray-500 uppercase tracking-[0.3em]">The Origin Myth</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>

                    <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                        <p className="text-2xl md:text-3xl font-semibold text-white leading-snug">
                            The Day I Stopped Being a "Gardener"
                        </p>

                        <p>
                            It was 2019. I had just moved into my first apartment in Seattle—a 700 sq ft box with a decent balcony. I felt successful. I wanted to <em className="text-white">look</em> successful.
                        </p>

                        <p>
                            So I bought a mature Japanese Maple. It cost me <span className="text-emerald-400 font-bold">$500</span>. A fortune.
                        </p>

                        <div className="my-8 p-6 rounded-2xl bg-red-500/10 border border-red-500/20">
                            <p className="text-red-400 font-semibold text-xl mb-2">
                                Three weeks later, it was dead.
                            </p>
                            <p className="text-gray-400">
                                Just a dry, brown stick in a fancy pot. I followed the care tag perfectly. "Water weekly. Full sun." But the tag didn't know about the heat from my glass railing. It didn't know about Seattle's random wind tunnels.
                            </p>
                        </div>

                        <p>
                            That stick became my turning point. I realized that <span className="text-white font-semibold">generic advice doesn't work for specific microclimates</span>.
                        </p>

                        <p>
                            I stopped being a "gardener" who guesses at water levels. I became an <span className="text-emerald-400 font-semibold">engineer</span>. I built soil moisture sensors. I automated watering systems. I logged data like my plants' lives depended on it—because they did.
                        </p>

                        <p className="text-xl text-white font-semibold">
                            Urban Eden isn't about having a green thumb. It's about building systems that work when you're too busy to check.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                SOCIAL PROOF / MENTIONS
                Requirement: Prove the persona exists outside your domain
            ═══════════════════════════════════════════════════════════════════ */}
            <section className="relative px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">As Seen On</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
                        {/* Mock logos - would be real in production */}
                        {['Reddit', 'Quora', 'Medium', 'The Verge'].map((name) => (
                            <div key={name} className="text-gray-400 font-bold text-lg md:text-xl tracking-wide">
                                {name}
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a
                            href="https://reddit.com/r/urbanfarming"
                            target="_blank"
                            className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all"
                        >
                            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                                📢
                            </div>
                            <div>
                                <p className="text-white font-medium group-hover:text-emerald-400 transition-colors">r/urbanfarming AMA</p>
                                <p className="text-sm text-gray-500">"Best automation setup for apartments" — 2.3k upvotes</p>
                            </div>
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all"
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                🐦
                            </div>
                            <div>
                                <p className="text-white font-medium group-hover:text-emerald-400 transition-colors">Featured by @GardenTech</p>
                                <p className="text-sm text-gray-500">"The future of balcony farming" — 15k impressions</p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                HOT TAKES (Niche Opinions)
                Requirement: 3 things the persona believes that go against the grain
            ═══════════════════════════════════════════════════════════════════ */}
            <section className="relative px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    {/* Section Label */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <span className="text-xs text-gray-500 uppercase tracking-[0.3em]">Hot Takes</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>

                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Unpopular <span className="text-purple-400">Opinions</span>
                        </h2>
                        <p className="text-gray-400">Most garden gurus say X. I say Y. Here's why.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            {
                                title: "Your Finger is Not a Sensor",
                                guru: "Most gurus say: 'Feel the soil to check moisture.'",
                                take: "I say: Use a $10 capacitive sensor. Your finger has no idea what 'moist enough' means. Data beats intuition.",
                                gradient: "from-orange-500/20 to-red-500/10",
                                border: "border-orange-500/20 hover:border-orange-400/40",
                                accent: "text-orange-400"
                            },
                            {
                                title: "Native Soil is a Trap",
                                guru: "Most gurus say: 'Use native soil for authenticity.'",
                                take: "I say: In a 4th-floor apartment, 'native soil' becomes a brick. Engineered soilless mixes drain better and weigh less.",
                                gradient: "from-purple-500/20 to-pink-500/10",
                                border: "border-purple-500/20 hover:border-purple-400/40",
                                accent: "text-purple-400"
                            },
                            {
                                title: "Kill Your Darlings",
                                guru: "Most gurus say: 'Every plant can be saved with love.'",
                                take: "I say: If a plant is struggling after 2 weeks of care, compost it. You have limited space. Run a farm, not a hospital.",
                                gradient: "from-cyan-500/20 to-blue-500/10",
                                border: "border-cyan-500/20 hover:border-cyan-400/40",
                                accent: "text-cyan-400"
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`group relative rounded-3xl bg-gradient-to-br ${item.gradient} border ${item.border} p-6 transition-all duration-300 hover:scale-[1.02]`}
                            >
                                <h3 className={`text-xl font-bold mb-4 ${item.accent}`}>{item.title}</h3>
                                <p className="text-gray-500 text-sm mb-3 italic">{item.guru}</p>
                                <p className="text-gray-300 text-sm leading-relaxed">{item.take}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                ALEX CHEN'S CONTENT STANDARD (Editorial Manifesto)
                Requirement: Explain research process and AI-assisted transparency
            ═══════════════════════════════════════════════════════════════════ */}
            <section className="relative px-6 py-20">
                <div className="max-w-3xl mx-auto">
                    {/* Section Label */}
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <span className="text-xs text-gray-500 uppercase tracking-[0.3em]">Editorial Manifesto</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>

                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Alex Chen's <span className="text-emerald-400">Content Standard</span>
                        </h2>
                    </div>

                    {/* Human-Verified Statement */}
                    <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 mb-10">
                        <div className="flex items-start gap-4">
                            <span className="text-3xl">🛡️</span>
                            <div>
                                <p className="text-emerald-400 font-bold mb-2">The Human-Verified Promise</p>
                                <p className="text-gray-300 leading-relaxed">
                                    While Alex Chen guides the creative direction of Urban Eden, <strong className="text-white">every piece of advice is human-tested and verified in real soil</strong>. I use AI tools to help structure my thoughts and check grammar, but the expertise comes from 5+ years of killing plants, building sensors, and logging data.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 text-gray-300 leading-relaxed">
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <span className="text-2xl">📝</span>
                            <div>
                                <p className="text-white font-semibold mb-1">Every "Review" = I've Held the Product</p>
                                <p className="text-gray-400 text-sm">I buy the grow lights with my own money. I run them for 90 days. If they flicker, overheat, or die, you'll know.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <span className="text-2xl">🌱</span>
                            <div>
                                <p className="text-white font-semibold mb-1">Every "Guide" = I've Grown That Plant</p>
                                <p className="text-gray-400 text-sm">If I haven't harvested it from my own balcony, I won't write about it. No hypotheticals.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <span className="text-2xl">📸</span>
                            <div>
                                <p className="text-white font-semibold mb-1">Real Photos. Real Failures. Real Results.</p>
                                <p className="text-gray-400 text-sm">No stock photos of perfect farms. You'll see my dead basil, my overcrowded shelves, and my eventual successes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                CTA: NEWSLETTER
            ═══════════════════════════════════════════════════════════════════ */}
            <section className="relative px-6 py-20">
                <div className="max-w-2xl mx-auto">
                    <div className="relative rounded-3xl bg-gradient-to-br from-emerald-900/30 via-gray-900/50 to-purple-900/30 border border-white/10 p-8 md:p-12 text-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none" />

                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                Join the 'lazy' gardener revolution.
                            </h2>
                            <p className="text-gray-400 mb-8">
                                Get my free 5-day email course on setting up a self-watering balcony garden for under $100.
                            </p>

                            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="flex-1 px-5 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-emerald-500 text-black font-semibold rounded-full hover:bg-emerald-400 hover:scale-105 transition-all duration-300"
                                >
                                    Get the Course
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                FOOTER TRANSPARENCY DISCLAIMER
                Requirement: "Content curated by [Persona], a project of [Company]"
            ═══════════════════════════════════════════════════════════════════ */}
            <section className="relative px-6 py-10 border-t border-white/5">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-gray-500 text-sm">
                        Content curated by <span className="text-gray-400">Alex Chen</span>, a project of <span className="text-gray-400">Urban Eden LLC</span>.
                    </p>
                </div>
            </section>
        </main>
    );
}
