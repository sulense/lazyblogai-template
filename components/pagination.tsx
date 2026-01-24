import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string; // e.g., "/" or "/category/seo"
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
    // If only 1 page, don't show pagination
    if (totalPages <= 1) return null;

    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    // Helper to build URL, handling query params if needed
    // Assuming baseUrl doesn't have query params for now, or just handle ?page param
    const getPageUrl = (page: number) => {
        const separator = baseUrl.includes('?') ? '&' : '?';
        return `${baseUrl}${separator}page=${page}`;
    };

    return (
        <nav className="flex items-center justify-center gap-2 mt-12 mb-8" aria-label="Pagination">
            {/* Previous Button */}
            {prevPage ? (
                <Link
                    href={getPageUrl(prevPage)}
                    className="p-3 rounded-xl bg-[#1f2020] border border-white/10 text-white hover:bg-white/10 transition-colors"
                    aria-label="Previous page"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
            ) : (
                <span className="p-3 rounded-xl bg-[#1f2020] border border-white/5 text-gray-600 cursor-not-allowed">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </span>
            )}

            {/* Page Numbers */}
            <div className="flex items-center gap-2 px-4">
                <span className="text-sm font-medium text-gray-400">
                    Page <span className="text-white">{currentPage}</span> of <span className="text-white">{totalPages}</span>
                </span>
            </div>

            {/* Next Button */}
            {nextPage ? (
                <Link
                    href={getPageUrl(nextPage)}
                    className="p-3 rounded-xl bg-[#1f2020] border border-white/10 text-white hover:bg-white/10 transition-colors"
                    aria-label="Next page"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            ) : (
                <span className="p-3 rounded-xl bg-[#1f2020] border border-white/5 text-gray-600 cursor-not-allowed">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </span>
            )}
        </nav>
    );
}
