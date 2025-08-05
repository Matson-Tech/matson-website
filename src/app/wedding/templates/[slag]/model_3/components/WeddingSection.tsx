interface WeddingSectionProps {
    id: string;
    className?: string;
    children: React.ReactNode;
}

export const WeddingSection = ({
    id,
    className = "",
    children,
}: WeddingSectionProps) => {
    return (
        <section
            id={id}
            className={`min-h-screen py-8 sm:py-12 md:py-16 px-0 flex flex-col justify-center ${className}`}
        >
            <div className="container mx-auto max-w-6xl h-full flex flex-col justify-center">
                {children}
            </div>
        </section>
    );
};
