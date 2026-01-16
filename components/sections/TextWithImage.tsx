import Image from "next/image";

interface TextWithImageProps {
    title?: string;
    content: string; // HTML content
    image?: string;
    image_alt?: string;
    image_position?: 'left' | 'right';
}

export function TextWithImage({
    title,
    content,
    image,
    image_alt = '',
    image_position = 'right',
}: TextWithImageProps) {
    const isImageLeft = image_position === 'left';

    return (
        <section className="py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isImageLeft ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Text Content */}
                    <div className={`space-y-8 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'} animate-fadeInUp`}>
                        {title && (
                            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent inline-block">
                                {title}
                            </h2>
                        )}

                        <div
                            className="prose prose-lg prose-invert max-w-none 
                                prose-headings:text-white prose-headings:font-bold
                                prose-p:text-gray-300 prose-p:leading-relaxed
                                prose-li:text-gray-300
                                prose-strong:text-purple-300
                                prose-a:text-blue-400 hover:prose-a:text-blue-300"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>

                    {/* Image with Decorative Elements */}
                    {image && (
                        <div className={`relative ${isImageLeft ? 'lg:order-1' : 'lg:order-2'} animate-fadeInUp`} style={{ animationDelay: '0.2s' }}>
                            {/* Decorative Blob */}
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl -z-10 animate-blob`} />

                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                                <Image
                                    src={image}
                                    alt={image_alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                {/* Glass shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
