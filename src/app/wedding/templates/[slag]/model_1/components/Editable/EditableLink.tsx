import type React from "react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useWedding } from "@/app/wedding/hooks/useWedding";
import { cn } from "@/lib/utils";
import "../../styles/linkStyle.css";

interface EditableLinkProps {
    text: string;
    link: string;
    onSave: (text: string, link: string) => void;
    label: string;
    className?: string;
    children?: React.ReactNode;
}

const EditableLink: React.FC<EditableLinkProps> = ({
    text,
    link,
    onSave,
    label,
    className,
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editText, setEditText] = useState(text);
    const [editLink, setEditLink] = useState(link);
    const { isLoggedIn } = useWedding();
    const editTextInputId = useId();
    const editLinkInputId = useId();

    const handleSave = () => {
        onSave(editText, editLink);
        setIsOpen(false);
    };

    const handleCancel = () => {
        setEditText(text);
        setEditLink(link);
        setIsOpen(false);
    };

    const handleOnEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSave();
        }
    };

    const handleOnClick = () => {
        setEditText(text);
        setEditLink(link);
        console.log(link);
    };

    const editableClassName = cn(
        "text-left w-full underline",
        isLoggedIn
            ? `cursor-pointer border-2 border-red-500 rounded transition-colors`
            : className,
    );

    if (!isLoggedIn) {
        return (
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={cn(
                    "px-1 text-wedding-gold italic text-left md:max-w-full custome_link",
                    className,
                )}
            >
                {text}
            </a>
        );
    }

    return (
        <div className={`relative group`}>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <button
                        className={`text-blue-700 ${editableClassName}`}
                        onClick={handleOnClick}
                        type="button"
                    >
                        {text || children}
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{label}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor={editTextInputId}>Text</Label>
                            <Input
                                id={editTextInputId}
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onKeyDown={handleOnEnterKeyDown}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor={editLinkInputId}>Link</Label>
                            <Input
                                id={editLinkInputId}
                                value={editLink}
                                onChange={(e) => setEditLink(e.target.value)}
                                onKeyDown={handleOnEnterKeyDown}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={editText === text && editLink === link}
                        >
                            Save
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditableLink;
