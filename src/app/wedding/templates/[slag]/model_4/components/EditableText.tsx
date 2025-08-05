import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";

interface EditableTextProps {
    value: string;
    onSave: (newValue: string) => void;
    className?: string;
    multiline?: boolean;
    children: React.ReactNode;
}

export const EditableText: React.FC<EditableTextProps> = ({
    value,
    onSave,
    className = "",
    multiline = false,
    children,
}) => {
    const { isLoggedIn } = useWedding();
    const [isOpen, setIsOpen] = useState(false);
    const [editValue, setEditValue] = useState(value);

    const handleSave = () => {
        onSave(editValue);
        setIsOpen(false);
    };

    const handleCancel = () => {
        setEditValue(value);
        setIsOpen(false);
    };

    const editableClassName = isLoggedIn
        ? `${className} cursor-pointer bg-red-100 hover:bg-red-200 border border-red-300 rounded px-2 py-1 transition-colors`
        : className;

    return (
        <>
            <div
                className={editableClassName}
                onClick={() => isLoggedIn && setIsOpen(true)}
                onKeyDown={() => isLoggedIn && setIsOpen(true)}
                title={isLoggedIn ? "Click to edit" : ""}
            >
                {children}
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Content</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        {multiline ? (
                            <Textarea
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                rows={5}
                                className="w-full"
                            />
                        ) : (
                            <Input
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="w-full"
                            />
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
