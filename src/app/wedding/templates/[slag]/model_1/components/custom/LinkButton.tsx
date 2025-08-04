import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LinkButtonProps {
    to: string;
    text?: string;
    children?: ReactNode;
    className?: string;
}
const LinkButton: React.FC<LinkButtonProps> = ({
    to,
    text,
    className,
    children,
}) => {
    return (
        <Link to={to}>
            <button
                className={cn(
                    "group border-b-2 border-cTernaryForeground/20 hover:border-cTernaryForeground rounded-none hover:bg-inherit py-4 px-0 hover:px-4 transition-all duration-200 hover:tracking-wide text-inherit",
                    className,
                )}
                type="button"
            >
                {text || children}
            </button>
        </Link>
    );
};

export default LinkButton;
