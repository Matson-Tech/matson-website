import type React from "react";
import { useEffect, useState } from "react";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";

interface MapsIconButtonProps {
    onClick?: () => void;
    className?: string;
}
const MapsIconButton: React.FC<MapsIconButtonProps> = ({
    onClick,
    className,
}) => {
    const { isLoggedIn } = useWedding();
    const [hovered, setIsHovered] = useState<boolean>(false);
    const [color, setColor] = useState("white");

    useEffect(() => {
        setColor(hovered ? "#e5e7eb" : "white");
    }, [hovered]);

    if (isLoggedIn) {
        return;
    }

    return (
        <button
            className={`w-8 p-1 border-2 border-gray-200 rounded-md ${hovered ? "bg-gray-200" : "bg-white"} ${className}`}
            type="button"
            onClick={onClick}
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
        >
            <svg
                viewBox="0 0 192 192"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className=""
            >
                <title>Map Icon</title>
                <g id={"map-icon"} stroke-width="0"></g>
                <g
                    id={"map-icon-tracerCarrier"}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></g>
                <g id={"map-icon-path"}>
                    <path
                        fill="#e60076"
                        stroke="#e60076"
                        stroke-width="12"
                        d="M96 22a51.88 51.88 0 0 0-36.77 15.303A52.368 52.368 0 0 0 44 74.246c0 16.596 4.296 28.669 20.811 48.898a163.733 163.733 0 0 1 20.053 28.38C90.852 163.721 90.146 172 96 172c5.854 0 5.148-8.279 11.136-20.476a163.723 163.723 0 0 1 20.053-28.38C143.704 102.915 148 90.841 148 74.246a52.37 52.37 0 0 0-15.23-36.943A51.88 51.88 0 0 0 96 22Z"
                    ></path>
                    <circle
                        cx="96"
                        cy="74"
                        r="20"
                        stroke={color}
                        stroke-width="12"
                        fill={color}
                    ></circle>
                </g>
            </svg>
        </button>
    );
};

export default MapsIconButton;
