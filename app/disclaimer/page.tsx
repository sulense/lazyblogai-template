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
        title: `Disclaimer | ${siteName}`,
        description: `Important disclaimers and disclosures for ${siteName}.`,
        alternates: {
            canonical: '/disclaimer',
        },
    };
}

export default async function DisclaimerPage() {
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
                            Disclaimer
                        </span>
                    </h1>
                    <p className="text-lg text-gray-400">
                        Important information about our content
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="relative px-6 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="prose prose-lg prose-invert max-w-none">
                        <p className="text-gray-300"><strong>Effective Date:</strong> {effectiveDate}</p>

                        <h2 className="text-2xl font-bold text-white mt-10 mb-4">General Disclaimer</h2>
                        <p className="text-gray-300 leading-relaxed">
                            The information provided on {siteName} is for general informational and educational purposes only. It is not intended as professional advice. Always seek qualified professional guidance for specific situations.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Affiliate Disclosure</h2>
                        <p className="text-gray-300 leading-relaxed">
                            {siteName} participates in affiliate marketing programs. This means we may earn commissions on qualifying purchases made through links on our website. This comes at no additional cost to you.
                        </p>
                        <p className="text-gray-300 leading-relaxed mt-4">
                            When we recommend products or services, we only suggest those we genuinely believe will benefit our readers. Our opinions remain our own and are not influenced by affiliate partnerships.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Sponsored Content</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Some content on this website may be sponsored or contain paid promotions. We clearly disclose when content is sponsored. Sponsored content represents the views of the sponsor and may not reflect our own opinions.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-10 mb-4">No Guarantees</h2>
                        <p className="text-gray-300 leading-relaxed">We make no representations or warranties about:</p>
                        <ul className="text-gray-300 mt-4 space-y-2">
                            <li>The accuracy or completeness of information</li>
                            <li>Results you may achieve from following our advice</li>
                            <li>The availability or functionality of linked third-party sites</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mt-10 mb-4">External Links</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Our website contains links to external sites. We are not responsible for the content, privacy practices, or terms of service of these external sites.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Contact</h2>
                        <p className="text-gray-300 leading-relaxed">
                            If you have questions about this disclaimer, please contact us at {contactEmail}.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
