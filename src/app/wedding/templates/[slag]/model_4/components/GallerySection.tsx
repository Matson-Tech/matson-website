import type React from "react";
import { useNavigate } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";
import FadeIn from "./animations/FadeIn";
import EditableImage from "./editable/EditableImage";
import { Button } from "@/components/ui/button";

export const GallerySection: React.FC = () => {
    const { weddingData, updateGalleryImage } = useWedding();
    const navigate = useNavigate();

    return (
        <section id="gallery" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <FadeIn delay={50}>
                    <div className="m-auto text-center mb-8">
                        <h2 className="font-Arima text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
                            Gallery
                        </h2>
                        <p className="md:text-lg text-md text-muted-foreground max-w-2xl mx-auto">
                            Moments captured through our journey together
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {weddingData.gallery.slice(0, 3).map((photo, index) => (
                        <FadeIn
                            delay={100 * (index + 1)}
                            key={`fade-${photo.id}`}
                        >
                            <div
                                key={photo.id}
                                className="relative group cursor-pointer"
                            >
                                <EditableImage
                                    key={`editable-${photo.id}`}
                                    index={index}
                                    onUpdate={updateGalleryImage}
                                    label={`Edit gallery Image ${index + 1}`}
                                    imageCaption={photo.caption}
                                    isImageCaptionAvailable
                                    iconClassName="bottom-10"
                                >
                                    <AspectRatio ratio={4 / 3}>
                                        <img
                                            src={photo.url}
                                            alt={
                                                photo.caption || "Wedding photo"
                                            }
                                            className="object-cover rounded-lg shadow-lg transition-transform group-hover:scale-105 h-full w-full"
                                        />
                                    </AspectRatio>
                                </EditableImage>
                                {photo.caption && (
                                    <p className="text-center text-gray-600 mt-2 text-sm">
                                        {photo.caption}
                                    </p>
                                )}
                            </div>
                        </FadeIn>
                    ))}
                </div>
                <div className="mt-8 mx-auto text-center">
                    <Button
                        variant="outline"
                        onClick={() => navigate("/gallery")}
                    >
                        View All Images
                    </Button>
                </div>
            </div>
        </section>
    );
};
