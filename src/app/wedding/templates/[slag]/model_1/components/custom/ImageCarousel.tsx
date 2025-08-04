import type React from "react";
import useUpdateGallery from "@/app/wedding/hooks/useUpdateGallery.ts";
import { useWedding } from "@/app/wedding/hooks/useWedding";
import DeletableItem from "../Editable/DeletableItem";
import EditableImage from "../Editable/EditableImage";

interface imageCarouselProps {
    limit: number;
}

const ImageCarousel: React.FC<imageCarouselProps> = ({ limit }) => {
    const { updateGalleryImage } = useWedding();
    const { handleDelete, getSlots } = useUpdateGallery();
    const allSlots = getSlots(limit);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {allSlots.slice(0, limit).map((image, index) => (
                <div key={image.id} className="group relative">
                    <DeletableItem
                        className="relative w-full h-full"
                        onDelete={() => handleDelete(image.name, index)}
                        label={`Delete gallery Image ${index + 1}?`}
                        iconClassName="top-20"
                        disabled={image.name === null}
                    >
                        <div className="relative h-[500px] w-full rounded-t-full rounded-b-full overflow-hidden shadow-lg border-4 border-primary/20">
                            <EditableImage
                                onUpdate={updateGalleryImage}
                                index={index}
                                imageCaption={image.caption}
                                label={`Edit galler image ${index + 1}`}
                                ImageCaptionAvailable
                                className="relative w-full h-full"
                            >
                                {image.caption ? (
                                    <img
                                        src={image.url}
                                        alt={
                                            image.caption ||
                                            `Gallery image ${index + 1}`
                                        }
                                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 sepia-overlay"
                                    />
                                ) : (
                                    <div
                                        key={image.id}
                                        className="flex flex-col justify-center items-center bg-gray-600/20 w-full h-full"
                                    ></div>
                                )}
                                {image.caption && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-secondary/90 text-secondary-foreground p-3 rounded-b-lg text-center">
                                        <p className="text-sm font-serif">
                                            {image.caption}
                                        </p>
                                    </div>
                                )}
                            </EditableImage>
                        </div>
                    </DeletableItem>
                    <div className="absolute top-10 left-6 text-2xl ornament text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                        ❋
                    </div>
                </div>
            ))}
        </div>
    );
};
export default ImageCarousel;
