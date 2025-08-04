import { Upload } from "lucide-react";
import { useWedding } from "@/app/wedding/hooks/useWedding";

const HoverUploadIcon: React.FC = () => {
    const { isLoggedIn } = useWedding();

    if (!isLoggedIn) return;

    return (
        <div className="group absolute inset-0 bg-black/50 opacity-100 transition-opacity flex flex-col items-center space-y-2 justify-center cursor-pointer">
            <div className="bg-white rounded-full p-3 group-hover:bg-gray-300 transition-colors">
                <Upload className="h-6 w-6 text-gray-700" />
            </div>
            <span className="text-sm text-white text-center">Upload Image</span>
        </div>
    );
};

export default HoverUploadIcon;
