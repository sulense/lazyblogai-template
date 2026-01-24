"use client";

import { useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    title?: string;
    subtitle?: string;
    items: FAQItem[];
}

export function FAQSection({
    title = "Frequently Asked Questions",
    subtitle,
    items,
}: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-16 px-6">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                {(title || subtitle) && (
                    <div className="text-center mb-12 space-y-4">
                        {title && (
                            <h2 className="text-3xl md:text-4xl font-bold text-white">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-lg text-gray-400">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                {/* FAQ Items */}
                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="border border-white/10 rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left bg-white/5 hover:bg-white/10 transition-colors"
                            >
                                <span className="font-medium text-white pr-4">
                                    {item.question}
                                </span>
                                <svg
                                    className={`w-5 h-5 text-purple-400 transition-transform flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {openIndex === index && (
                                <div className="px-6 py-4 bg-black/20">
                                    <p className="text-gray-400 leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
