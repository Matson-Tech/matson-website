import type React from "react";
import { useId, useState } from "react";
import { useWedding } from "@/app/wedding/hooks/useWedding";
import HoverUploadIcon from "../custom/HoverUploadIcon";
import ImageDropArea from "../custom/ImageDropArea";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type EditableImageProps = {
    onUpdate: (
        newImage: File | null,
        imageCaption?: string,
        index?: number,
    ) => Promise<void>;
    children: React.ReactNode;
    className?: string;
    label?: string;
    ImageCaptionAvailable?: boolean;
    imageCaption?: string;
    index?: number;
};

const EditableImage: React.FC<EditableImageProps> = ({
    onUpdate,
    index,
    className,
    ImageCaptionAvailable: isImageCaptionAvailable = false,
    imageCaption = null,
    label = "Edit Image",
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn } = useWedding();
    const [editedImageCaption, setEditedImageCaption] = useState<string>(
        imageCaption || "",
    );
    const [image, setImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const editCaptionId = useId();

    const handleUpdate = async () => {
        setIsLoading(true);
        await onUpdate(image, editedImageCaption, index);
        setImage(null);
        setIsOpen(false);
        setIsLoading(false);
    };

    const handleCancel = () => {
        setEditedImageCaption(imageCaption);
        setImage(null);
        setIsOpen(false);
    };

    const isUpdateDisabled = (
        isLoading: boolean,
        image: File,
        imageCaption: string,
        editedImageCaption: string,
    ): boolean => {
        return (
            isLoading ||
            (!image &&
                (!isImageCaptionAvailable ||
                    imageCaption === editedImageCaption))
        );
    };

    if (!isLoggedIn) {
        return <span className={`${className}`}>{children}</span>;
    }

    return (
        <div className={`relative group ${className}`}>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <span>{children}</span>
                </DialogTrigger>
                <DialogTrigger asChild>
                    <button
                        className="p-0 m-0 block max-w-fit max-h-fit"
                        type="button"
                    >
                        <HoverUploadIcon />
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{label}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            {isImageCaptionAvailable && (
                                <>
                                    <Label htmlFor={editCaptionId}>
                                        Caption
                                    </Label>
                                    <Input
                                        id={editCaptionId}
                                        value={editedImageCaption}
                                        onChange={(e) =>
                                            setEditedImageCaption(
                                                e.target.value,
                                            )
                                        }
                                    />
                                </>
                            )}
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
                            disabled={isUpdateDisabled(
                                isLoading,
                                image,
                                imageCaption,
                                editedImageCaption,
                            )}
                        >
                            {isLoading ? "Uploading..." : "Update"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditableImage;
