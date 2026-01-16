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

        // Parse number from string (e.g. "500+" -> 500)
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
}: StatsBarProps) {
    const bgClass = {
        gradient: 'bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900',
        dark: 'bg-black/40 backdrop-blur-md',
        transparent: 'bg-transparent',
    }[background];

    return (
        <section className={`py-12 border-y border-white/5 relative overflow-hidden ${bgClass}`}>
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-50" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {title && (
                    <h2 className="text-2xl font-bold text-white text-center mb-12 uppercase tracking-widest opacity-80">
                        {title}
                    </h2>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`text-center space-y-2 p-4 ${index % 2 !== 0 ? 'md:border-none' : ''}`} // Reset borders for mobile grid logic if needed, but simple divide-x works for row
                        >
                            {stat.icon && (
                                <div className="text-4xl mb-4 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                                    {stat.icon}
                                </div>
                            )}
                            <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-white to-purple-200 bg-clip-text text-transparent">
                                <CountingNumber value={stat.value} />
                            </div>
                            <div className="text-sm font-medium text-purple-300 uppercase tracking-widest">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
