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
    background = 'gradient',
    layout = 'standard',
}: StatsBarProps) {
    const isFloating = layout === 'floating';

    return (
        <section className="py-16 px-6 relative overflow-hidden border-y border-white/5 bg-black/20">
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-32 bg-purple-500/10 blur-[80px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {title && (
                    <h2 className="text-2xl font-bold text-white text-center mb-12 uppercase tracking-widest opacity-80">
                        {title}
                    </h2>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="space-y-2">
                            <div className="text-4xl md:text-5xl font-bold text-white">
                                <CountingNumber value={stat.value} />
                            </div>
                            <div className="text-sm uppercase tracking-widest text-purple-400 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
