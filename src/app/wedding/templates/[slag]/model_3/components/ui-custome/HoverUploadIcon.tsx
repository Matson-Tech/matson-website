import { Upload } from "lucide-react";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";

const HoverUploadIcon: React.FC = () => {
    const { isLoggedIn } = useWedding();

    if (!isLoggedIn) return;

    return (
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
            <div className="bg-white rounded-full p-3 hover:bg-gray-100 transition-colors">
                <Upload className="h-6 w-6 text-gray-700" />
            </div>
        </div>
    );
};

export default HoverUploadIcon;
