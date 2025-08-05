import { Plus, Trash2 } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";
import type { ScheduleItem } from "@/app/wedding/types/wedding";
import FadeIn from "./animations/FadeIn";
import { EditableText } from "./EditableText";

export const ScheduleSection: React.FC = () => {
    const { weddingData, updateWeddingData, isLoggedIn } = useWedding();

    const updateScheduleItem = (
        id: string,
        field: keyof ScheduleItem,
        value: string,
    ) => {
        const updatedSchedule = weddingData.schedule.map((item) =>
            item.id === id ? { ...item, [field]: value } : item,
        );
        updateWeddingData({ schedule: updatedSchedule });
    };

    const addScheduleItem = () => {
        const newItem: ScheduleItem = {
            id: Date.now().toString(),
            time: "1:00 PM",
            event: "Dinner",
            description: "Food and Drinks",
        };
        updateWeddingData({
            schedule: [...weddingData.schedule, newItem],
        });
    };

    const removeScheduleItem = (id: string) => {
        const updatedSchedule = weddingData.schedule.filter(
            (item) => item.id !== id,
        );
        updateWeddingData({ schedule: updatedSchedule });
    };

    return (
        <section id="schedule" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-Arima text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Wedding Schedule
                    </h2>
                    <p className="md:text-lg text-md text-muted-foreground max-w-2xl mx-auto">
                        Here's how our special day will unfold
                    </p>
                    {isLoggedIn && (
                        <Button onClick={addScheduleItem} className="mb-8">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Schedule Item
                        </Button>
                    )}
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {weddingData.schedule.map((item, index) => (
                        <FadeIn delay={100 * index + 1} key={`${item.id}-fade`}>
                            <Card key={item.id} className="relative">
                                {isLoggedIn && (
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="absolute top-2 right-2 z-10"
                                        onClick={() =>
                                            removeScheduleItem(item.id)
                                        }
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <div className="md:w-32">
                                            <EditableText
                                                value={item.time}
                                                onSave={(value) =>
                                                    updateScheduleItem(
                                                        item.id,
                                                        "time",
                                                        value,
                                                    )
                                                }
                                            >
                                                <div className="bg-pink-100 text-pink-800 px-3 py-2 rounded-lg font-semibold text-center">
                                                    {item.time}
                                                </div>
                                            </EditableText>
                                        </div>
                                        <div className="flex-1">
                                            <EditableText
                                                value={item.event}
                                                onSave={(value) =>
                                                    updateScheduleItem(
                                                        item.id,
                                                        "event",
                                                        value,
                                                    )
                                                }
                                                className="font-Arima"
                                            >
                                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                    {item.event}
                                                </h3>
                                            </EditableText>
                                            <EditableText
                                                value={item.description}
                                                onSave={(value) =>
                                                    updateScheduleItem(
                                                        item.id,
                                                        "description",
                                                        value,
                                                    )
                                                }
                                                multiline
                                            >
                                                <p className="text-gray-600">
                                                    {item.description}
                                                </p>
                                            </EditableText>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};
