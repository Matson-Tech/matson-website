import { UploadCloud } from "lucide-react";
import { useState } from "react";

interface UploadButtonProp {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
}

const UploadButton: React.FC<UploadButtonProp> = ({
    text = "Upload",
    onClick,
    disabled,
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    return (
        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onClick={onClick}
            disabled={disabled}
            className="relative group overflow-hidden w-fit px-6 py-3 text-black border-b-2 hover:border-black shadow-sm transition-all transform duration-200 active:scale-95 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-500 disabled:hover:border-gray-200"
            title={disabled ? "Hit image upload limit" : ""}
            type="button"
        >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full group-hover:translate-x-0 bg-white opacity-10" />
            <div className="relative z-10 flex items-center transition-all">
                <div
                    className={`w-2 h-2 overflow-hidden transition-all duration-200 ${isHovered ? "w-5 h-5 mr-2" : ""}`}
                >
                    <UploadCloud
                        className={`w-5 h-5 opacity-100 mt-2 transition-all duration-200 ${isHovered ? "-translate-y-2" : ""}`}
                    />
                </div>
                <span className="font-semibold tracking-widest transition-all">
                    {text}
                </span>
            </div>
        </button>
    );
};

export default UploadButton;
