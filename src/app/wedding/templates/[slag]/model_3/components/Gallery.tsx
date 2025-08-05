import { ArrowLeft, Camera } from "lucide-react";
import {
    type Dispatch,
    type ReactNode,
    type SetStateAction,
    useState,
} from "react";
import { Link } from "react-router-dom";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";
import deleteImage from "@/app/wedding/utils/deleteImage";
import messageOnUpdate, { useCase } from "@/app/wedding/utils/messageOnUpdate";
import FadeIn from "./animations/FadeIn";
import DeletableItem from "./Editable/DeleteableItem";
import EditableImage from "./Editable/EditableImage";
import { Button } from "@/components/ui/button";

interface GalleryProps {
    limit: number;
    setSelectedImage: Dispatch<SetStateAction<string | null>>;
    backButton?: boolean;
    children?: ReactNode;
}

const Gallery: React.FC<GalleryProps> = ({
    limit,
    setSelectedImage,
    backButton = false,
    children,
}) => {
    const {
        weddingData,
        isLoggedIn,
        user,
        updateWeddingData,
        updateGalleryImage,
    } = useWedding();
    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

    const handleDelete = async (name: string, indexToRemove: number) => {
        const updatedGallery = [...weddingData.gallery];
        updatedGallery.splice(indexToRemove, 1);

        const updated = await deleteImage(user, name);

        if (!updated) {
            return;
        }

        const isUpdated = await updateWeddingData({ gallery: updatedGallery });
        messageOnUpdate(isUpdated, "photo", useCase.Delete);
    };

    const handleUpdate = async (
        newImage: File | null,
        imageCaption?: string,
        index?: number,
    ) => {
        setUploadingIndex(index);
        await updateGalleryImage(newImage, imageCaption, index);
        setUploadingIndex(null);
    };

    const allSlots = Array.from({ length: limit }, (_, index) => {
        return (
            weddingData.gallery[index] || {
                id: `empty-${index}`,
                url: "",
                caption: null,
                name: null,
            }
        );
    });

    return (
        <div className="container mx-auto px-4 py-24">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    {backButton && (
                        <Button asChild variant="outline" className="mb-4">
                            <Link to="/">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Wedding Website
                            </Link>
                        </Button>
                    )}

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif">
                        Wedding Gallery
                    </h1>
                    <p className="sub-text">
                        Our beautiful moments captured in time
                    </p>
                </div>

                {/* Images Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allSlots.map((image, index) => (
                        <FadeIn
                            key={`fade-${image.id}`}
                            delay={(index + 1) * 100}
                        >
                            <DeletableItem
                                onDelete={() => handleDelete(image.name, index)}
                                iconClassName={
                                    index >= weddingData.gallery.length &&
                                    "hidden"
                                }
                            >
                                <EditableImage
                                    onUpdate={handleUpdate}
                                    key={`${image.id}-editable`}
                                    index={index}
                                    label={`Edit gallery image ${index + 1}`}
                                    imageCaption={image.caption}
                                    ImageCaptionAvailable
                                    className="relative"
                                >
                                    <div
                                        key={image.id}
                                        className="relative group aspect-square bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                                    >
                                        {image.url && (
                                            <img
                                                src={image.url}
                                                alt={
                                                    image.caption ||
                                                    `Gallery image ${index + 1}`
                                                }
                                                className="w-full h-full object-cover cursor-pointer"
                                                onClick={() =>
                                                    setSelectedImage(image.url)
                                                }
                                                onKeyDown={() =>
                                                    setSelectedImage(image.url)
                                                }
                                            />
                                        )}
                                        {/* Image caption */}
                                        {image.caption && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2">
                                                <p className="text-xs">
                                                    {image.caption}
                                                </p>
                                            </div>
                                        )}
                                        {isLoggedIn && ( // Empty slot
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300">
                                                {isLoggedIn && (
                                                    <span className="cursor-pointer flex flex-col items-center space-y-2 p-4 hover:bg-gray-50 transition-colors rounded-lg">
                                                        {uploadingIndex ===
                                                        index ? (
                                                            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                                        ) : (
                                                            <>
                                                                <Camera className="h-8 w-8 text-gray-400" />
                                                                <span className="text-sm text-gray-500 text-center">
                                                                    Upload Photo
                                                                </span>
                                                            </>
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </EditableImage>
                            </DeletableItem>
                        </FadeIn>
                    ))}
                </div>
                {children}
            </div>
        </div>
    );
};

export default Gallery;
