import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWedding } from "@/contexts/WeddingContext";
import UploadButton from "./UploadButton";
import ImageDropArea from "./ImageDropArea";
import { Button } from "../ui/button";

const AddNewImage = () => {
    const { weddingData, updateGalleryImage } = useWedding();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);

    const [imageCaption, setImageCaption] = useState<string>("");
    const limit = import.meta.env.VITE_GALLERY_IMAGE_LIMIT || 10;

    const handleUpdate = async () => {
        setIsLoading(true);
        await updateGalleryImage(
            image,
            imageCaption,
            weddingData.gallery.length,
        );
        setImage(null);
        setIsOpen(false);
        setIsLoading(false);
    };

    const handleCancel = () => {
        setImageCaption(imageCaption);
        setImage(null);
        setIsOpen(false);
    };

    return (
        <div className="flex items-center justify-center m-10">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <UploadButton
                        text={"Add New Image"}
                        disabled={weddingData.gallery.length >= limit}
                    />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add new image to gallery</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-caption">Caption</Label>
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
                            onClick={handleUpdate}
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
    );
};

export default AddNewImage;
