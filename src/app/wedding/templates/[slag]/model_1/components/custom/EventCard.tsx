import { Calendar, Clock, MapPin } from "lucide-react";
import { useUpdateWeddingDetails } from "@/app/wedding/hooks/useUpdateWeddingDetails";
import type { WeddingEvent } from "@/types/wedding";
import EditableText from "../Editable/EditableText";
import { Card, CardContent } from "@/components/ui/card";
import EditableLink from "../Editable/EditableLink";

interface EventCardProps {
    event: WeddingEvent;
    eventName: "event1" | "event2";
}
const EventCard: React.FC<EventCardProps> = ({ event, eventName }) => {
    const { updateEventAddress, updateEventDetails } =
        useUpdateWeddingDetails();

    return (
        <Card className="border-2 border-primary/20 bg-background/80">
            <CardContent className="p-8 text-center">
                <div className="text-2xl ornament mb-4 text-primary">❋</div>
                <EditableText
                    value={event.title}
                    onSave={(value) =>
                        updateEventDetails(eventName, "title", value)
                    }
                    as="h3"
                    label={`Update ${event.title} title`}
                    className="text-2xl font-display font-semibold text-primary mb-6"
                />

                <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <EditableText
                            value={event.date}
                            onSave={(value) =>
                                updateEventDetails(eventName, "date", value)
                            }
                            as="span"
                            label={`Update ${event.title} date`}
                            className="font-semibold"
                        />
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                        <Clock className="w-5 h-5 text-primary" />
                        <EditableText
                            value={event.time}
                            onSave={(value) =>
                                updateEventDetails(eventName, "time", value)
                            }
                            as="span"
                            label={`Update ${event.title} time`}
                            className="font-semibold"
                        />
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        <div className="text-center">
                            <EditableText
                                value={event.venue}
                                onSave={(value) =>
                                    updateEventDetails(
                                        eventName,
                                        "venue",
                                        value,
                                    )
                                }
                                as="div"
                                label={`Update ${event.title} venue`}
                                className="font-semibold"
                            />
                            <EditableLink
                                text={event.address}
                                link={event.addressMapLink}
                                onSave={(text, link) =>
                                    updateEventAddress(eventName, text, link)
                                }
                                label={`Update ${event.title} venue address`}
                                className="text-sm text-primary mt-1"
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default EventCard;
