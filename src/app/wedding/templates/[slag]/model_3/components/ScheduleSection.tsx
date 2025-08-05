import { Label } from "@radix-ui/react-label";
import { Clock, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import type { ScheduleItem } from "@/types/wedding";
import messageOnUpdate, { useCase } from "@/app/wedding/utils/messageOnUpdate";
import FadeIn from "./animations/FadeIn";
import { EditableText } from "./EditableText";
import { WeddingSection } from "./WeddingSection";

export const ScheduleSection: React.FC = () => {
    const { weddingData, updateWeddingData, isLoggedIn } = useWedding();
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newItem, setNewItem] = useState<Partial<ScheduleItem>>({
        time: "",
        event: "",
        description: "",
    });

    const updateScheduleItem = async (
        id: string,
        field: keyof ScheduleItem,
        value: string,
    ) => {
        const updatedSchedule = weddingData.schedule.map((item) =>
            item.id === id ? { ...item, [field]: value } : item,
        );
        const isUpdated = await updateWeddingData({
            schedule: updatedSchedule,
        });
        messageOnUpdate(isUpdated, field);
    };

    const addScheduleItem = async () => {
        if (!newItem.time || !newItem.event) return;

        const newScheduleItem: ScheduleItem = {
            id: Date.now().toString(),
            time: newItem.time,
            event: newItem.event,
            description: newItem.description || "",
        };

        const updatedSchedule = [...weddingData.schedule, newScheduleItem];
        await updateWeddingData({ schedule: updatedSchedule });

        setNewItem({ time: "", event: "", description: "" });
        setIsAddingNew(false);
    };

    const removeScheduleItem = async (id: string) => {
        const updatedSchedule = weddingData.schedule.filter(
            (item) => item.id !== id,
        );
        const isDeleted: boolean = await updateWeddingData({
            schedule: updatedSchedule,
        });
        messageOnUpdate(isDeleted, "schedule", useCase.Delete);
    };

    return (
        <WeddingSection id="schedule" className="bg-[#ccf1c9]">
            <div className="space-y-12">
                <FadeIn delay={100}>
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif mb-2">
                            Wedding Schedule
                        </h2>
                        <p className="sub-text">
                            Join us for a day filled with love, laughter, and
                            celebration
                        </p>
                    </div>
                </FadeIn>

                <div className="max-w-4xl mx-auto space-y-6">
                    {weddingData.schedule.map((item, index) => (
                        <FadeIn key={item.id} delay={(index + 1) * 100}>
                            <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-4 flex-1">
                                            <div className="flex items-center justify-center w-12 h-12 bg-green-400 text-white rounded-full font-bold">
                                                <Clock className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <div className="flex items-center space-x-4">
                                                    <EditableText
                                                        value={item.time}
                                                        onSave={(value) =>
                                                            updateScheduleItem(
                                                                item.id,
                                                                "time",
                                                                value,
                                                            )
                                                        }
                                                        className="text-lg font-semibold text-green-400"
                                                    />
                                                    <EditableText
                                                        value={item.event}
                                                        onSave={(value) =>
                                                            updateScheduleItem(
                                                                item.id,
                                                                "event",
                                                                value,
                                                            )
                                                        }
                                                        className="text-xl font-bold text-gray-800"
                                                    />
                                                </div>
                                                <EditableText
                                                    value={item.description}
                                                    onSave={(value) =>
                                                        updateScheduleItem(
                                                            item.id,
                                                            "description",
                                                            value,
                                                        )
                                                    }
                                                    className="text-gray-600"
                                                />
                                            </div>
                                        </div>
                                        {isLoggedIn && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    removeScheduleItem(item.id)
                                                }
                                                className="ml-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeIn>
                    ))}

                    {isLoggedIn && (
                        <Card className="bg-white/60 backdrop-blur-sm border-dashed border-2 border-pink-300">
                            <CardContent className="p-6">
                                <Button
                                    onClick={() => setIsAddingNew(true)}
                                    className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Schedule Item
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Schedule Item</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <Label className="block text-sm font-medium mb-2">
                                    Time
                                </Label>
                                <Input
                                    value={newItem.time || ""}
                                    onChange={(e) =>
                                        setNewItem((prev) => ({
                                            ...prev,
                                            time: e.target.value,
                                        }))
                                    }
                                    placeholder="e.g., 5:00 PM"
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium mb-2">
                                    Event
                                </Label>
                                <Input
                                    value={newItem.event || ""}
                                    onChange={(e) =>
                                        setNewItem((prev) => ({
                                            ...prev,
                                            event: e.target.value,
                                        }))
                                    }
                                    placeholder="e.g., Ceremony"
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium mb-2">
                                    Description
                                </Label>
                                <Textarea
                                    value={newItem.description || ""}
                                    onChange={(e) =>
                                        setNewItem((prev) => ({
                                            ...prev,
                                            description: e.target.value,
                                        }))
                                    }
                                    placeholder="e.g., Wedding ceremony begins"
                                    rows={3}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsAddingNew(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={addScheduleItem}>Add Item</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </WeddingSection>
    );
};
