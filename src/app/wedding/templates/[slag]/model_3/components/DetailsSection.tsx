import { Clock, Gift, MapPin, Music, Shirt } from "lucide-react";
import { type ReactElement, useId } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";
import type { WeddingEvent, WeddingToKnow } from "@/app/wedding/types/wedding";
import messageOnUpdate from "@/app/wedding/utils/messageOnUpdate";
import Address from "./Address";
import FadeIn from "./animations/FadeIn";
import { EditableText } from "./EditableText";
import { WeddingSection } from "./WeddingSection";

export const DetailsSection = () => {
    const { weddingData, updateWeddingData } = useWedding();

    const updateEventDetails = async (
        event: "event1" | "event2" | "toKnow1" | "toKnow2" | "toKnow3",
        field: keyof WeddingEvent | keyof WeddingToKnow,
        value: string,
    ) => {
        const isUpdated: boolean = await updateWeddingData({
            weddingDetails: {
                ...weddingData.weddingDetails,
                [event]: {
                    ...(weddingData.weddingDetails[event] || {}),
                    [field]: value,
                },
            },
        });
        messageOnUpdate(isUpdated, field);
    };

    type InfoCard = {
        id: string;
        icon: ReactElement;
        title: string;
        description: string;
        attr: "toKnow1" | "toKnow2" | "toKnow3";
    };

    const infoCards: Array<InfoCard> = [
        {
            id: useId(),
            icon: <Shirt className="h-6 w-6" />,
            title: weddingData.weddingDetails.toKnow2.title,
            description: weddingData.weddingDetails.toKnow2.description,
            attr: "toKnow2",
        },
        {
            id: useId(),
            icon: <Gift className="h-6 w-6" />,
            title: weddingData.weddingDetails.toKnow1.title,
            description: weddingData.weddingDetails.toKnow1.description,
            attr: "toKnow1",
        },
        {
            id: useId(),
            icon: <Music className="h-6 w-6" />,
            title: weddingData.weddingDetails.toKnow3.title,
            description: weddingData.weddingDetails.toKnow3.description,
            attr: "toKnow3",
        },
    ];

    return (
        <WeddingSection id="details" className="bg-white">
            <div className="space-y-12">
                <FadeIn delay={100}>
                    <div className="m-auto text-center mb-8">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2">
                            Wedding Details
                        </h2>
                        <p className="sub-text">
                            Everything you need to know about our special day
                        </p>
                    </div>
                </FadeIn>

                {/* Event Details */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Event 1 */}
                    <FadeIn delay={200} direction="right">
                        <Card className="border-pink-200 shadow-lg">
                            <CardHeader className="bg-pink-50">
                                <CardTitle className="flex items-center space-x-2 text-pink-700">
                                    <MapPin className="h-5 w-5" />
                                    <EditableText
                                        value={
                                            weddingData.weddingDetails.event1
                                                .title
                                        }
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "event1",
                                                "title",
                                                value,
                                            )
                                        }
                                    />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-gray-500" />
                                    <EditableText
                                        value={`${weddingData.weddingDetails.event1.date}`}
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "event1",
                                                "date",
                                                value,
                                            )
                                        }
                                    />
                                    <span> at </span>
                                    <EditableText
                                        value={`${weddingData.weddingDetails.event1.time}`}
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "event1",
                                                "time",
                                                value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4 text-gray-500" />
                                    <EditableText
                                        value={
                                            weddingData.weddingDetails.event1
                                                .venue
                                        }
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "event1",
                                                "venue",
                                                value,
                                            )
                                        }
                                        className="font-medium text-gray-800"
                                    />
                                </div>
                                <Address
                                    event="event2"
                                    eventDetails={
                                        weddingData.weddingDetails.event2
                                    }
                                    className="text-gray-600 text-sm"
                                />
                            </CardContent>
                        </Card>
                    </FadeIn>
                    {/* Event 2 */}
                    <FadeIn delay={300} direction="left">
                        <Card className="border-blue-200 shadow-lg">
                            <CardHeader className="bg-blue-50">
                                <CardTitle className="flex items-center space-x-2 text-blue-700">
                                    <MapPin className="h-5 w-5" />
                                    <EditableText
                                        value={
                                            weddingData.weddingDetails.event2
                                                .title
                                        }
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "event2",
                                                "title",
                                                value,
                                            )
                                        }
                                    />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-gray-500" />
                                    <EditableText
                                        value={`${weddingData.weddingDetails.event2.date}`}
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "event2",
                                                "date",
                                                value,
                                            )
                                        }
                                    />
                                    <span> at </span>
                                    <EditableText
                                        value={`${weddingData.weddingDetails.event2.time}`}
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "event2",
                                                "time",
                                                value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4 text-gray-500" />
                                    <EditableText
                                        value={
                                            weddingData.weddingDetails.event2
                                                .venue
                                        }
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "event2",
                                                "venue",
                                                value,
                                            )
                                        }
                                        className="font-medium text-gray-800"
                                    />
                                </div>
                                <Address
                                    event="event2"
                                    eventDetails={
                                        weddingData.weddingDetails.event2
                                    }
                                    className="text-gray-600 text-sm"
                                />
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {infoCards.map((card, index) => (
                        <FadeIn
                            key={`fade-${card.id}`}
                            delay={300 + (index + 1) * 100}
                        >
                            <Card
                                key={card.id}
                                className="text-center shadow-lg hover:shadow-xl transition-shadow h-full"
                            >
                                <CardHeader>
                                    <div className="flex justify-center mb-2 text-pink-500">
                                        {card.icon}
                                    </div>
                                    <CardTitle className="text-lg">
                                        <EditableText
                                            value={card.title}
                                            onSave={(value) =>
                                                updateEventDetails(
                                                    card.attr,
                                                    "title",
                                                    value,
                                                )
                                            }
                                        />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <EditableText
                                        value={card.description}
                                        onSave={(value) =>
                                            updateEventDetails(
                                                card.attr,
                                                "description",
                                                value,
                                            )
                                        }
                                        multiline
                                        className="text-gray-600 text-sm"
                                    />
                                </CardContent>
                            </Card>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </WeddingSection>
    );
};
