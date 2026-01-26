import { Metadata } from 'next';
import { ContentService } from '@/lib/api';

export const revalidate = 60;

async function getSiteData() {
    const config = await ContentService.getConfig();
    return {
        siteName: config?.site_seo_settings?.site_name || config?.name || 'Our Site',
        primaryColor: config?.primary_color || '#8b5cf6',
        customDomain: config?.custom_domain || null,
        slug: config?.slug || ''
    };
}

export async function generateMetadata(): Promise<Metadata> {
    const { siteName } = await getSiteData();

    return {
        title: `Terms of Service | ${siteName}`,
        description: `Read the terms and conditions for using ${siteName}.`,
        alternates: {
            canonical: '/terms',
        },
    };
}

export default async function TermsPage() {
    const { siteName, primaryColor, customDomain, slug } = await getSiteData();
    const contactEmail = `contact@${customDomain || `${slug}.lazyblog.app`}`;
    const effectiveDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <main className="relative min-h-screen bg-[#030303] text-white overflow-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] animate-pulse" style={{ backgroundColor: `${primaryColor}33` }} />
                <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full blur-[180px] animate-pulse" style={{ backgroundColor: `${primaryColor}26`, animationDelay: '1s' }} />
            </div>

            {/* Hero */}
            <section className="relative min-h-[40vh] flex items-center justify-center px-6 pt-20">
                <div className="max-w-4xl mx-auto text-center z-10">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                        <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                            Terms of Service
                        </span>
                    </h1>
                    <p className="text-lg text-gray-400">
                        Please read these terms carefully
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="relative px-6 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="prose prose-lg prose-invert max-w-none">
                        <p className="text-gray-300"><strong>Effective Date:</strong> {effectiveDate}</p>

                        <p className="text-gray-300 leading-relaxed mt-6">
                            Welcome to {siteName}. By accessing or using our website, you agree to be bound by these Terms of Service.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Use of Content</h2>
                        <p className="text-gray-300 leading-relaxed">All content on this website is for informational purposes only. You may not:</p>
                        <ul className="text-gray-300 mt-4 space-y-2">
                            <li>Reproduce, distribute, or republish content without permission</li>
                            <li>Use content for commercial purposes without consent</li>
                            <li>Modify or create derivative works</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mt-10 mb-4">User Conduct</h2>
                        <p className="text-gray-300 leading-relaxed">When using our website, you agree to:</p>
                        <ul className="text-gray-300 mt-4 space-y-2">
                            <li>Provide accurate information</li>
                            <li>Not engage in any unlawful activities</li>
                            <li>Not attempt to harm or disrupt our services</li>
                            <li>Respect intellectual property rights</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Disclaimer</h2>
                        <p className="text-gray-300 leading-relaxed">
                            The content on {siteName} is provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or usefulness of any information.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Limitation of Liability</h2>
                        <p className="text-gray-300 leading-relaxed">
                            {siteName} shall not be liable for any damages arising from your use of this website or reliance on any information provided.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Changes to Terms</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the new terms.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Contact</h2>
                        <p className="text-gray-300 leading-relaxed">
                            For questions about these Terms, contact us at {contactEmail}.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
