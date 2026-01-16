import { HeroSection } from "./HeroSection";
import { TextBlock } from "./TextBlock";
import { TextWithImage } from "./TextWithImage";
import { IconGrid } from "./IconGrid";
import { StatsBar } from "./StatsBar";
import { ContactForm } from "./ContactForm";
import { FAQSection } from "./FAQSection";
import { CTABanner } from "./CTABanner";
import { Quote } from "./Quote";
import { CategoryShowcase } from "./CategoryShowcase";

// Section type definitions
export interface Section {
    id: string;
    type: string;
    enabled: boolean;
    order: number;
    data: Record<string, any>;
}

// Map section types to components
const sectionComponents: Record<string, React.ComponentType<any>> = {
    hero: HeroSection,
    text_block: TextBlock,
    text_with_image: TextWithImage,
    icon_grid: IconGrid,
    stats_bar: StatsBar,
    contact_form: ContactForm,
    faq: FAQSection,
    cta_banner: CTABanner,
    quote: Quote,
    category_showcase: CategoryShowcase,
};

// Render a single section
export function renderSection(section: Section) {
    const Component = sectionComponents[section.type];

    if (!Component) {
        console.warn(`Unknown section type: ${section.type}`);
        return null;
    }

    return <Component key={section.id} {...section.data} />;
}

// Render all sections for a page
export function renderSections(sections: Section[]) {
    return sections
        .filter(s => s.enabled)
        .sort((a, b) => a.order - b.order)
        .map(section => (
            <div key={section.id} data-section-id={section.id} data-section-type={section.type}>
                {renderSection(section)}
            </div>
        ));
}

// Export all section components for direct use
export {
    HeroSection,
    TextBlock,
    TextWithImage,
    IconGrid,
    StatsBar,
    ContactForm,
    FAQSection,
    CTABanner,
    Quote,
    CategoryShowcase,
};

// Section type names for UI
export const sectionTypeLabels: Record<string, string> = {
    hero: "Hero Section",
    text_block: "Text Block",
    text_with_image: "Text with Image",
    icon_grid: "Feature Grid",
    stats_bar: "Stats Bar",
    contact_form: "Contact Form",
    faq: "FAQ",
    cta_banner: "Call to Action",
    quote: "Quote",
    category_showcase: "Category Showcase",
};
