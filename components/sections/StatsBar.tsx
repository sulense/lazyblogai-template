"use client";

import { useEffect, useState, useRef } from 'react';

interface StatItem {
    value: string;
    label: string;
    icon?: string;
}

interface StatsBarProps {
    title?: string;
    stats: StatItem[];
    background?: 'gradient' | 'dark' | 'transparent';
    layout?: 'standard' | 'floating';
}

function CountingNumber({ value }: { value: string }) {
    const [displayValue, setDisplayValue] = useState("0");
    const [hasAnimated, setHasAnimated] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimated) {
                setHasAnimated(true);
            }
        });

        if (elementRef.current) observer.observe(elementRef.current);
        return () => observer.disconnect();
    }, [hasAnimated]);

    useEffect(() => {
        if (!hasAnimated) return;

        const numberMatch = value.match(/\d+/);
        if (!numberMatch) {
            setDisplayValue(value);
            return;
        }

        const target = parseInt(numberMatch[0]);
        const suffix = value.replace(/\d+/, '');
        const prefix = value.substring(0, value.indexOf(numberMatch[0]));

        const duration = 2000;
        const steps = 60;
        const stepTime = duration / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += target / steps;
            if (current >= target) {
                setDisplayValue(value);
                clearInterval(timer);
            } else {
                setDisplayValue(`${prefix}${Math.floor(current)}${suffix}`);
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [hasAnimated, value]);

    return <div ref={elementRef}>{displayValue}</div>;
}

export function StatsBar({
    title,
    stats,
    layout = 'standard',
}: StatsBarProps) {
    const isFloating = layout === 'floating';

    return (
        <section className={`py-16 md:py-20 px-6 ${isFloating ? 'bg-transparent' : 'bg-gray-900 border-y border-gray-800'}`}>
            <div className="max-w-4xl mx-auto">
                {title && (
                    <h2 className="text-xl font-semibold text-white text-center mb-12 uppercase tracking-wider">
                        {title}
                    </h2>
                )}

                <div className={`
                    flex flex-col sm:flex-row flex-wrap justify-center sm:justify-around items-center gap-8 md:gap-12
                    ${isFloating ? 'bg-gray-900/80 backdrop-blur border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl' : ''}
                `}>
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center min-w-[120px]">
                            <div className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                                <CountingNumber value={stat.value} />
                            </div>
                            <div className="text-sm text-purple-400 font-medium uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
