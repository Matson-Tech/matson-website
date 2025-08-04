import { Plus, Trash2 } from "lucide-react";
import HeroDecoration from "../decorations/HeroDecoration.tsx";
import EditableText from "../Editable/EditableText.tsx";
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
import useUpdateSchedule from "@/app/wedding/hooks/useUpdateSchedule";
import {useWedding} from "@/app/wedding/hooks/useWedding";
import RingDecoration from "../decorations/RingDecoration";

const ScheduleSection = () => {
    const { weddingData, isLoggedIn } = useWedding();

    const {
        updateScheduleItem,
        addScheduleItem,
        removeScheduleItem,
        setIsAddingItem,
        isAddingItem,
        newItem,
        setNewItem,
    } = useUpdateSchedule();

    return (
        <section id="schedule" className="relative py-20 wedding-gradient">
            <HeroDecoration />
            <RingDecoration />
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="text-3xl ornament mb-8 text-primary">
                            ✤
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
                            Wedding Schedule
                        </h2>
                        <p className="text-lg text-muted-foreground font-serif">
                            Timeline of our special day
                        </p>
                    </div>

                    <div className="space-y-6">
                        {weddingData.schedule.map((item) => (
                            <Card
                                key={item.id}
                                className="border-2 border-primary/20 bg-background/80"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-6 flex-1">
                                            <div className="text-center min-w-[100px]">
                                                <EditableText
                                                    value={item.time}
                                                    onSave={(value) =>
                                                        updateScheduleItem(
                                                            item.id,
                                                            "time",
                                                            value,
                                                        )
                                                    }
                                                    as="div"
                                                    label={`Edit ${item.event} time`}
                                                    className="text-2xl font-bold text-primary font-display"
                                                />
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
                                                    as="h3"
                                                    label={`Edit ${item.event} title`}
                                                    className="text-xl font-semibold text-foreground mb-2 font-display"
                                                />
                                                <EditableText
                                                    value={item.description}
                                                    onSave={(value) =>
                                                        updateScheduleItem(
                                                            item.id,
                                                            "description",
                                                            value,
                                                        )
                                                    }
                                                    as="p"
                                                    label={`Edit ${item.event} description`}
                                                    className="text-muted-foreground font-serif"
                                                />
                                            </div>
                                        </div>

                                        {isLoggedIn &&
                                            weddingData.schedule.length > 1 && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        removeScheduleItem(
                                                            item.id,
                                                        )
                                                    }
                                                    className="ml-4 text-destructive hover:text-destructive"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {isLoggedIn && (
                            <div className="text-center">
                                <Button
                                    onClick={() => setIsAddingItem(true)}
                                    className="bg-primary hover:bg-primary/90"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Schedule Item
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Item Dialog */}
            <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add Schedule Item</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="time_input"
                                className="text-sm font-medium mb-2 block"
                            >
                                Time
                            </label>
                            <Input
                                id="time_input"
                                value={newItem.time}
                                onChange={(e) =>
                                    setNewItem({
                                        ...newItem,
                                        time: e.target.value,
                                    })
                                }
                                placeholder="e.g., 4:00 PM"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="event_input"
                                className="text-sm font-medium mb-2 block"
                            >
                                Event
                            </label>
                            <Input
                                id="event_input"
                                value={newItem.event}
                                onChange={(e) =>
                                    setNewItem({
                                        ...newItem,
                                        event: e.target.value,
                                    })
                                }
                                placeholder="e.g., Ceremony"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="description_textarea"
                                className="text-sm font-medium mb-2 block"
                            >
                                Description
                            </label>
                            <Textarea
                                id="description_textarea"
                                value={newItem.description}
                                onChange={(e) =>
                                    setNewItem({
                                        ...newItem,
                                        description: e.target.value,
                                    })
                                }
                                placeholder="Brief description..."
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsAddingItem(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={addScheduleItem}
                            disabled={!newItem.time || !newItem.event}
                        >
                            Add Item
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default ScheduleSection;
