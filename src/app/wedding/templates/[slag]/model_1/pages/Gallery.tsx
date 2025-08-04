import type React from "react";
import { useEffect } from "react";
import BackButton from "../components/custom/BackButton";
import ImageCarousel from "../components/custom/ImageCarousel.tsx";
import FlowerDecoration from "../components/decorations/FlowerDecoration.tsx";
import useWedding from "@/hooks/useWedding";

const Gallery: React.FC = () => {
    const { isLoggedIn, weddingData } = useWedding();
    const imageLimit = isLoggedIn
        ? import.meta.env.VITE_GALLERY_IMAGE_LIMIT
        : weddingData.gallery.length;

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    return (
        <section id="gallery" className="relative py-10 bg-card">
            <FlowerDecoration />
            <div className="container mx-auto px-4">
                <div className="relative max-w-6xl mx-auto">
                    <div className="absolute">
                        <BackButton />
                    </div>
                    <div className="text-center mb-16">
                        <div className="text-3xl ornament mb-8 text-primary">
                            ✤
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
                            Our Gallery
                        </h2>
                        <p className="text-lg text-muted-foreground font-serif">
                            Capturing precious moments
                        </p>
                    </div>
                    <ImageCarousel limit={imageLimit} />
                </div>
            </div>
        </section>
    );
};

export default Gallery;
