import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useEffect, useState } from "react";
import FadeIn from "../components/animations/FadeIn";
import DeletableItem from "../components/editable/DeletableItem";
import EditableImage from "../components/editable/EditableImage";
import { Header } from "../components/Header";
import Loading from "../components/Loading";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";
import deleteImage from "@/app/wedding/utils/deleteImage";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ImageDropArea from "../components/ui-custom/ImageDropArea";

const Gallery = () => {
    const {
        weddingData,
        globalIsLoading,
        updateGalleryImage,
        user,
        updateWeddingData,
        isLoggedIn,
    } = useWedding();
    const [isOpen, setIsOpen] = useState(false);
    const [imageCaption, setImageCaption] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const limit: number = import.meta.env.VITE_GALLERY_IMAGE_LIMIT || 10;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleDelete = async (name: string, indexToRemove: number) => {
        setIsLoading(true);
        const updatedGallery = [...weddingData.gallery];
        updatedGallery.splice(indexToRemove, 1);

        const updated = await deleteImage(user, name);

        if (!updated) {
            return;
        }

        updateWeddingData({ gallery: updatedGallery });
        setIsLoading(false);
    };

    const handlAdd = async () => {
        setIsLoading(true);
        await updateGalleryImage(
            image,
            imageCaption,
            weddingData.gallery.length,
        );
        setIsOpen(false);
        setImage(null);
        setImageCaption("");
        setIsLoading(false);
    };

    const handleCancel = () => {
        setImageCaption(imageCaption);
        setImage(null);
        setIsOpen(false);
    };

    if (globalIsLoading) {
        return <Loading />;
    }

    return (
        <>
            <Header />
            <section id="galleryPage" className="py-20 bg-gray-50">
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
                        {weddingData.gallery
                            .slice(0, limit)
                            .map((photo, index) => (
                                <FadeIn
                                    delay={100 * (index + 1)}
                                    key={`fade-${photo.id}`}
                                >
                                    <div
                                        key={photo.id}
                                        className="relative group cursor-pointer"
                                    >
                                        <DeletableItem
                                            onDelete={() => {
                                                handleDelete(image.name, index);
                                            }}
                                            key={`delete-${photo.id}`}
                                        >
                                            <EditableImage
                                                key={`editable-${photo.id}`}
                                                index={index}
                                                onUpdate={updateGalleryImage}
                                                label={`Edit gallery Image ${index + 1}`}
                                                imageCaption={photo.caption}
                                                isImageCaptionAvailable
                                            >
                                                <AspectRatio ratio={4 / 3}>
                                                    <img
                                                        src={photo.url}
                                                        alt={
                                                            photo.caption ||
                                                            "Wedding photo"
                                                        }
                                                        className="object-cover rounded-lg shadow-lg transition-transform group-hover:scale-105 h-full w-full"
                                                    />
                                                </AspectRatio>
                                            </EditableImage>
                                        </DeletableItem>
                                        {photo.caption && (
                                            <p className="text-center text-gray-600 mt-2 text-sm">
                                                {photo.caption}
                                            </p>
                                        )}
                                    </div>
                                </FadeIn>
                            ))}
                    </div>
                </div>
                {isLoggedIn && (
                    <div className="flex items-center justify-center m-10">
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    value={"Add New Image"}
                                    disabled={
                                        weddingData.gallery.length >= limit
                                    }
                                    className="bg-pink-600 hover:bg-pink-500"
                                >
                                    Add New Image
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>
                                        Add new image to gallery
                                    </DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-caption">
                                            Caption
                                        </Label>
                                        <Input
                                            id="edit-caption"
                                            value={imageCaption}
                                            onChange={(e) =>
                                                setImageCaption(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <ImageDropArea setImage={setImage} />
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={handleCancel}
                                        className="rounded-sm"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handlAdd}
                                        variant="default"
                                        className="rounded-sm"
                                        disabled={!image}
                                    >
                                        {isLoading ? "Uploading..." : "Add"}
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
            </section>
        </>
    );
};

export default Gallery;
