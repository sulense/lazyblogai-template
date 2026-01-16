"use client";

import { useEffect, useState, useRef } from 'react';
import React from 'react';

interface StatItem {
    value: string;
    label: string;
    icon?: React.ReactNode;
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
        <section className={`
            relative py-20 lg:py-28 overflow-hidden
            ${isFloating
                ? 'py-32 bg-transparent'
                : 'border-y border-white/10 bg-white/[0.03] backdrop-blur-md shadow-2xl'
            }
        `}>
            {/* Ambient Background Glow for Standard Layout */}
            {!isFloating && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[200px] bg-purple-500/10 blur-[80px] rounded-full" />
                </div>
            )}

            <div className={`max-w-7xl mx-auto px-6 relative z-10`}>
                {title && (
                    <h2 className="text-2xl font-bold text-white text-center mb-12 uppercase tracking-widest opacity-80">
                        {title}
                    </h2>
                )}

                <div className={`
                    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12
                    ${isFloating ? 'bg-black/80 backdrop-blur-xl rounded-3xl p-12 border border-white/10 shadow-2xl' : ''}
                `}>
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center justify-center text-center space-y-2 group
                                ${!isFloating && index !== stats.length - 1 ? 'lg:border-r lg:border-white/5' : ''}
                            `}
                        >
                            <div className="text-4xl lg:text-5xl font-bold font-mono tracking-tighter text-white tabular-nums group-hover:scale-110 transition-transform duration-300">
                                <CountingNumber value={stat.value} />
                            </div>
                            <div className="text-sm uppercase tracking-widest text-purple-400 font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
