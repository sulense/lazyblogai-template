import Image from "next/image";

interface TextWithImageProps {
    title: string;
    content: string;
    image?: string;
    image_alt?: string;
    image_position?: 'left' | 'right';
    layout?: 'standard' | 'overlap' | 'card';
}

export function TextWithImage({
    title,
    content,
    image,
    image_alt = "",
    image_position = 'left',
}: TextWithImageProps) {
    const isImageLeft = image_position === 'left';

    return (
        <section className="py-20 md:py-28 px-6 bg-gray-950">
            <div className="max-w-6xl mx-auto">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>

                    {/* Image */}
                    <div className={`${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
                            {image ? (
                                <Image
                                    src={image}
                                    alt={image_alt || title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Text */}
                    <div className={`${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            {title}
                        </h2>
                        <div
                            className="prose prose-lg prose-invert max-w-none prose-p:text-gray-300 prose-p:leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
