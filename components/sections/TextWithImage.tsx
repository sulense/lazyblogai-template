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
        <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isImageLeft ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Text Content */}
                    <div className={`space-y-6 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                        {title && (
                            <h2 className="text-3xl md:text-4xl font-bold text-white">
                                {title}
                            </h2>
                        )}

                        <div
                            className="prose prose-lg prose-invert max-w-none 
                                prose-headings:text-white prose-headings:font-bold
                                prose-p:text-gray-300 prose-p:leading-relaxed
                                prose-a:text-purple-400 hover:prose-a:text-purple-300
                                prose-strong:text-white"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>

                    {/* Image */}
                    {image && (
                        <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                            <Image
                                src={image}
                                alt={image_alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            {/* Subtle gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
