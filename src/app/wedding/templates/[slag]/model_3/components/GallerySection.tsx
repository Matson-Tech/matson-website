import { Camera } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FadeIn from "./animations/FadeIn";
import Gallery from "./Gallery";
import ImagePreview from "./ImagePreview";
import { WeddingSection } from "./WeddingSection";

export const GallerySection = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const limit = 3;

    return (
        <WeddingSection id="gallery" className="bg-[#e4c9f1]">
            <Gallery limit={limit} setSelectedImage={setSelectedImage}>
                <FadeIn delay={500} direction="up">
                    <div className="text-center">
                        <Button
                            asChild
                            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3"
                        >
                            <Link to="/gallery">
                                <Camera className="h-5 w-5 mr-2" />
                                View All Photos
                            </Link>
                        </Button>
                    </div>
                </FadeIn>
            </Gallery>
            <ImagePreview
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
            />
        </WeddingSection>
    );
};
