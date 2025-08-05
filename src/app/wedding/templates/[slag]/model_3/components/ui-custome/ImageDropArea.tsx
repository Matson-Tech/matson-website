import type React from "react";
import {
    type Dispatch,
    type SetStateAction,
    useCallback,
    useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { Label } from "@/components/ui/label";

type ImageDropAreaProps = {
    setImage: Dispatch<SetStateAction<File>>;
};

const ImageDropArea: React.FC<ImageDropAreaProps> = ({ setImage }) => {
    const [preview, setPreview] = useState<string | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            if (file) {
                setImage(file);
                const url = URL.createObjectURL(file);
                setPreview(url);
            }
        },
        [setImage],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [],
        },
        multiple: false,
    });

    return (
        <div className="flex flex-col gap-4">
            <Label className="text-sm font-medium">Upload an image</Label>
            <div
                {...getRootProps()}
                className={`border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer transition-all ${
                    isDragActive
                        ? "bg-green-50 border-green-500"
                        : "hover:bg-gray-50"
                }`}
            >
                <input {...getInputProps()} />
                <p>
                    {isDragActive
                        ? "Drop the image here..."
                        : "Drag and drop an image here, or click to select"}
                </p>
            </div>

            {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover border rounded-md"
                />
            )}
        </div>
    );
};

export default ImageDropArea;
