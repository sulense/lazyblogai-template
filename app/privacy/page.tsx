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
        title: `Privacy Policy | ${siteName}`,
        description: `Learn how ${siteName} collects, uses, and protects your personal information.`,
        alternates: {
            canonical: '/privacy',
        },
    };
}

export default async function PrivacyPage() {
    const { siteName, primaryColor, customDomain, slug } = await getSiteData();
    const siteUrl = customDomain ? `https://${customDomain}` : `https://${slug}.lazyblog.app`;
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
                            Privacy Policy
                        </span>
                    </h1>
                    <p className="text-lg text-gray-400">
                        Your privacy matters to us
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="relative px-6 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="prose prose-lg prose-invert max-w-none">
                        <p className="text-gray-300"><strong>Effective Date:</strong> {effectiveDate}</p>

                        <p className="text-gray-300 leading-relaxed mt-6">
                            At {siteName}, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Information We Collect</h2>
                        <p className="text-gray-300 leading-relaxed">We may collect the following types of information:</p>
                        <ul className="text-gray-300 mt-4 space-y-2">
                            <li><strong>Personal Information:</strong> Name, email address, and other information you voluntarily provide when subscribing to our newsletter or contacting us.</li>
                            <li><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, pages visited, and time spent on pages.</li>
                            <li><strong>Cookies:</strong> Small data files stored on your device to improve your browsing experience.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mt-10 mb-4">How We Use Your Information</h2>
                        <p className="text-gray-300 leading-relaxed">We use the collected information to:</p>
                        <ul className="text-gray-300 mt-4 space-y-2">
                            <li>Provide and maintain our website</li>
                            <li>Send newsletters and updates (if subscribed)</li>
                            <li>Analyze website usage to improve our content</li>
                            <li>Respond to your inquiries</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Third-Party Services</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We may use third-party services such as Google Analytics, advertising networks, and email service providers. These services may collect information about your visits to our site.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Your Rights</h2>
                        <p className="text-gray-300 leading-relaxed">You have the right to:</p>
                        <ul className="text-gray-300 mt-4 space-y-2">
                            <li>Access your personal data</li>
                            <li>Request correction or deletion of your data</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Disable cookies in your browser settings</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Contact Us</h2>
                        <p className="text-gray-300 leading-relaxed">
                            If you have questions about this Privacy Policy, please contact us at {contactEmail}.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
