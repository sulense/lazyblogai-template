interface OrganizationSchemaProps {
    name: string;
    url: string;
    logo?: string;
    sameAs?: string[];
}

export function OrganizationSchema({ name, url, logo, sameAs }: OrganizationSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name,
        url,
        ...(logo && { logo }),
        ...(sameAs && sameAs.length > 0 && { sameAs }),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface WebSiteSchemaProps {
    name: string;
    url: string;
    description?: string;
}

export function WebSiteSchema({ name, url, description }: WebSiteSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name,
        url,
        ...(description && { description }),
        potentialAction: {
            '@type': 'SearchAction',
            target: `${url}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface ArticleSchemaProps {
    headline: string;
    url: string;
    datePublished: string;
    dateModified?: string;
    author?: { name: string; url?: string };
    image?: string;
    description?: string;
    publisher?: { name: string; logo?: string };
}

export function ArticleSchema({
    headline,
    url,
    datePublished,
    dateModified,
    author,
    image,
    description,
    publisher,
}: ArticleSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline,
        url,
        datePublished,
        ...(dateModified && { dateModified }),
        ...(description && { description }),
        ...(image && { image }),
        ...(author && {
            author: {
                '@type': 'Person',
                name: author.name,
                ...(author.url && { url: author.url }),
            },
        }),
        ...(publisher && {
            publisher: {
                '@type': 'Organization',
                name: publisher.name,
                ...(publisher.logo && { logo: publisher.logo }),
            },
        }),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface AuthorSchemaProps {
    name: string;
    url?: string;
    image?: string;
    description?: string;
    sameAs?: string[];
    jobTitle?: string;
}

export function AuthorSchema({
    name,
    url,
    image,
    description,
    sameAs,
    jobTitle,
}: AuthorSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name,
        ...(url && { url }),
        ...(image && { image }),
        ...(description && { description }),
        ...(jobTitle && { jobTitle }),
        ...(sameAs && sameAs.length > 0 && { sameAs }),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface FAQItem {
    question: string;
    answer: string;
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
