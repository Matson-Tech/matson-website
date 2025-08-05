import { X } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";

type ImagePreviewProps = {
    selectedImage: string | null;
    setSelectedImage: Dispatch<SetStateAction<string | null>>;
};

const ImagePreview: React.FC<ImagePreviewProps> = ({
    selectedImage,
    setSelectedImage,
}) => {
    return (
        <Dialog
            open={!!selectedImage}
            onOpenChange={() => setSelectedImage(null)}
        >
            <DialogContent
                className="md:max-w-4xl md:w-fit max-w-96 p-1 md:p-0 rounded-sm overflow-hidden"
                closeButton={false}
            >
                <DialogClose asChild>
                    <button
                        className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                        type="button"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </DialogClose>
                <div className="relative">
                    {selectedImage && (
                        <img
                            src={selectedImage}
                            alt="Gallery preview"
                            className="w-full h-auto max-h-[80vh] object-contain"
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ImagePreview;
