import { Link } from "react-router-dom";
import ImageCarousel from "../custom/ImageCarousel.tsx";
import FlowerDecoration from "../decorations/FlowerDecoration.tsx";
import { Button } from "@/components/ui/button";

const GallerySection = () => {
    const imageLimit = 3;

    return (
        <section id="gallery" className="relative py-20 bg-card">
            <FlowerDecoration />
            <div className="container mx-auto px-4 z-10">
                <div className="max-w-6xl mx-auto">
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
                    <div className="text-center">
                        <Link to="/gallery">
                            <Button variant="outline" className="font-serif">
                                View All Photos
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
