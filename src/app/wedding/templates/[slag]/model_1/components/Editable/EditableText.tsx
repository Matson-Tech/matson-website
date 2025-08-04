import type React from "react";
import type {} from "react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useWedding } from "@/app/wedding/hooks/useWedding";
import { cn } from "@/lib/utils.ts";

type SupportedHTMLELements =
    | "div"
    | "p"
    | "span"
    | "button"
    | "section"
    | "a"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";

interface EditableTextProps {
    value: string;
    onSave: (newValue: string) => Promise<void> | void;
    label: string;
    className?: string;
    children?: React.ReactNode;
    multiline?: boolean;
    placeholder?: string;
    as?: SupportedHTMLELements;
}

const EditableText: React.FC<EditableTextProps> = ({
    value,
    onSave,
    label,
    className,
    children,
    multiline = false,
    placeholder = "Enter text...",
    as: Component = "div",
}) => {
    const { isLoggedIn } = useWedding();
    const [isOpen, setIsOpen] = useState(false);
    const [editValue, setEditValue] = useState(value);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [textAreaFocused, setTextAreaFocused] = useState<boolean>(false);

    const handleSave = useCallback(async () => {
        setIsSaving(true);
        try {
            await onSave(editValue);
            setIsOpen(false);
        } catch (error) {
            console.error("Error saving:", error);
        } finally {
            setIsSaving(false);
        }
    }, [onSave, editValue]);

    useEffect(() => {
        const handleEnterKeyDown = (e: globalThis.KeyboardEvent) => {
            if (e.key === "Enter" && isOpen && !textAreaFocused) {
                handleSave();
            }
        };

        window.addEventListener("keydown", handleEnterKeyDown);
        return () => window.removeEventListener("keydown", handleEnterKeyDown);
    }, [isOpen, handleSave, textAreaFocused]);

    const openDialog = () => {
        setEditValue(value);
        setIsOpen(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter" && isLoggedIn) {
            e.stopPropagation();
            openDialog();
        }
    };

    const handleCancel = () => {
        setEditValue(value);
        setIsOpen(false);
    };

    if (!isLoggedIn) {
        return <Component className={className}>{children || value}</Component>;
    }

    return (
        <>
            <Component
                className={cn(className, "editable-highlight")}
                onClick={openDialog}
                onKeyDown={handleKeyDown}
                tabIndex={0}
            >
                {children || value}
            </Component>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{label}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        {multiline ? (
                            <Textarea
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                placeholder={placeholder}
                                onFocus={() => setTextAreaFocused(true)}
                                onBlur={() => setTextAreaFocused(false)}
                                rows={4}
                            />
                        ) : (
                            <Input
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                placeholder={placeholder}
                            />
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={isSaving || editValue === value}
                        >
                            {isSaving ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EditableText;
