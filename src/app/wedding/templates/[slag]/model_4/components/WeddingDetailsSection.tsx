import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";
import confirmationMessage from "@/app/wedding/utils/ConfimationMessage";
import Address from "./Address";
import FadeIn from "./animations/FadeIn";
import { EditableText } from "./EditableText";

export const WeddingDetailsSection: React.FC = () => {
    const { weddingData, updateWeddingData } = useWedding();

    const updateEventDetails = async (
        event: "event1" | "event2" | "toKnow1" | "toKnow2" | "toKnow3",
        field: string,
        value: string,
    ) => {
        const success: boolean = await updateWeddingData({
            weddingDetails: {
                ...weddingData.weddingDetails,
                [event]: {
                    ...(weddingData.weddingDetails[event] || {}),
                    [field]: value,
                },
            },
        });
        if (success) confirmationMessage(field);
    };

    return (
        <section id="details" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <FadeIn delay={50}>
                    <div className="m-auto text-center mb-8">
                        <h2 className="font-Arima text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
                            Wedding Details
                        </h2>
                        <p className="text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
                            Everything you need to know about our special day
                        </p>
                    </div>
                </FadeIn>
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Event 1 */}
                    <FadeIn>
                        <Card className="w-full h-full">
                            <CardHeader>
                                <EditableText
                                    value={
                                        weddingData.weddingDetails.event1.title
                                    }
                                    onSave={(value) =>
                                        updateEventDetails(
                                            "event1",
                                            "title",
                                            value,
                                        )
                                    }
                                    className="font-Arima"
                                >
                                    <CardTitle className="text-pink-600">
                                        {
                                            weddingData.weddingDetails.event1
                                                .title
                                        }
                                    </CardTitle>
                                </EditableText>
                            </CardHeader>
                            <CardContent className="space-y-1">
                                <div>
                                    <EditableText
                                        value={
                                            weddingData.weddingDetails.event1
                                                .date
                                        }
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "event1",
                                                "date",
                                                value,
                                            )
                                        }
                                    >
                                        <p>
                                            <span className="text-sm text-muted-foreground">
                                                Date & Time
                                            </span>
                                        </p>
                                        <p className="font-semibold">
                                            {
                                                weddingData.weddingDetails
                                                    .event1.date
                                            }
                                        </p>
                                    </EditableText>
                                    <EditableText
                                        value={
                                            weddingData.weddingDetails.event1
                                                .time
                                        }
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "event1",
                                                "time",
                                                value,
                                            )
                                        }
                                    >
                                        <p className="font-semibold">
                                            {
                                                weddingData.weddingDetails
                                                    .event1.time
                                            }
                                        </p>
                                    </EditableText>
                                </div>
                                <EditableText
                                    value={
                                        weddingData.weddingDetails.event1.venue
                                    }
                                    onSave={(value) =>
                                        updateEventDetails(
                                            "event1",
                                            "venue",
                                            value,
                                        )
                                    }
                                    className="max-w-sm md:max-w-full"
                                >
                                    <p>
                                        <span className="text-sm text-muted-foreground">
                                            Venue
                                        </span>
                                    </p>
                                    <p className="font-semibold">
                                        {
                                            weddingData.weddingDetails.event1
                                                .venue
                                        }
                                    </p>
                                </EditableText>
                                <Address
                                    event="event1"
                                    eventDetails={
                                        weddingData.weddingDetails.event1
                                    }
                                />
                            </CardContent>
                        </Card>
                    </FadeIn>

                    {/* Event 2 */}
                    <FadeIn delay={100}>
                        <Card>
                            <CardHeader>
                                <EditableText
                                    value={
                                        weddingData.weddingDetails.event2.title
                                    }
                                    onSave={(value) =>
                                        updateEventDetails(
                                            "event2",
                                            "title",
                                            value,
                                        )
                                    }
                                    className="font-Arima"
                                >
                                    <CardTitle className="text-pink-600">
                                        {
                                            weddingData.weddingDetails.event2
                                                .title
                                        }
                                    </CardTitle>
                                </EditableText>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div>
                                    <EditableText
                                        value={
                                            weddingData.weddingDetails.event2
                                                .date
                                        }
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "event2",
                                                "date",
                                                value,
                                            )
                                        }
                                    >
                                        <p>
                                            <span className="text-sm text-muted-foreground">
                                                Date & Time
                                            </span>
                                        </p>
                                        <p className="font-semibold">
                                            {
                                                weddingData.weddingDetails
                                                    .event2.date
                                            }
                                        </p>
                                    </EditableText>
                                    <EditableText
                                        value={
                                            weddingData.weddingDetails.event2
                                                .time
                                        }
                                        onSave={(value) =>
                                            updateEventDetails(
                                                "event2",
                                                "time",
                                                value,
                                            )
                                        }
                                    >
                                        <p className="font-semibold">
                                            {
                                                weddingData.weddingDetails
                                                    .event2.time
                                            }
                                        </p>
                                    </EditableText>
                                </div>
                                <EditableText
                                    value={
                                        weddingData.weddingDetails.event2.venue
                                    }
                                    onSave={(value) =>
                                        updateEventDetails(
                                            "event2",
                                            "venue",
                                            value,
                                        )
                                    }
                                >
                                    <p>
                                        <span className="text-sm text-muted-foreground">
                                            Venue
                                        </span>
                                    </p>
                                    <p className="font-semibold">
                                        {
                                            weddingData.weddingDetails.event2
                                                .venue
                                        }
                                    </p>
                                </EditableText>
                                <Address
                                    event="event2"
                                    eventDetails={
                                        weddingData.weddingDetails.event2
                                    }
                                />
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                {/* Things to Know */}
                <div className="grid md:grid-cols-3 gap-6">
                    <FadeIn delay={150}>
                        <Card className="h-full">
                            <CardHeader>
                                <EditableText
                                    value={
                                        weddingData.weddingDetails.toKnow1.title
                                    }
                                    onSave={(value) =>
                                        updateEventDetails(
                                            "toKnow1",
                                            "title",
                                            value,
                                        )
                                    }
                                    className="font-Arima"
                                >
                                    <CardTitle className="text-gray-800">
                                        {
                                            weddingData.weddingDetails.toKnow1
                                                .title
                                        }
                                    </CardTitle>
                                </EditableText>
                            </CardHeader>
                            <CardContent>
                                <EditableText
                                    value={
                                        weddingData.weddingDetails.toKnow1
                                            .description
                                    }
                                    onSave={(value) =>
                                        updateEventDetails(
                                            "toKnow1",
                                            "description",
                                            value,
                                        )
                                    }
                                    multiline
                                >
                                    <p className="text-gray-600">
                                        {
                                            weddingData.weddingDetails.toKnow1
                                                .description
                                        }
                                    </p>
                                </EditableText>
                            </CardContent>
                        </Card>
                    </FadeIn>
                    <FadeIn delay={200}>
                        <Card className="h-full">
                            <CardHeader>
                                <EditableText
                                    value={
                                        weddingData.weddingDetails.toKnow2.title
                                    }
                                    onSave={(value) =>
                                        updateEventDetails(
                                            "toKnow2",
                                            "title",
                                            value,
                                        )
                                    }
                                    className="font-Arima"
                                >
                                    <CardTitle className="text-gray-800">
                                        {
                                            weddingData.weddingDetails.toKnow2
                                                .title
                                        }
                                    </CardTitle>
                                </EditableText>
                            </CardHeader>
                            <CardContent>
                                <EditableText
                                    value={
                                        weddingData.weddingDetails.toKnow2
                                            .description
                                    }
                                    onSave={(value) =>
                                        updateEventDetails(
                                            "toKnow2",
                                            "description",
                                            value,
                                        )
                                    }
                                    multiline
                                >
                                    <p className="text-gray-600">
                                        {
                                            weddingData.weddingDetails.toKnow2
                                                .description
                                        }
                                    </p>
                                </EditableText>
                            </CardContent>
                        </Card>
                    </FadeIn>

                    <FadeIn delay={250}>
                        <Card className="h-full">
                            <CardHeader>
                                <EditableText
                                    value={
                                        weddingData.weddingDetails.toKnow3.title
                                    }
                                    onSave={(value) =>
                                        updateEventDetails(
                                            "toKnow3",
                                            "title",
                                            value,
                                        )
                                    }
                                    className="font-Arima"
                                >
                                    <CardTitle className="text-gray-800">
                                        {
                                            weddingData.weddingDetails.toKnow3
                                                .title
                                        }
                                    </CardTitle>
                                </EditableText>
                            </CardHeader>
                            <CardContent>
                                <EditableText
                                    value={
                                        weddingData.weddingDetails.toKnow3
                                            .description
                                    }
                                    onSave={(value) =>
                                        updateEventDetails(
                                            "toKnow3",
                                            "description",
                                            value,
                                        )
                                    }
                                    multiline
                                >
                                    <p className="text-gray-600">
                                        {
                                            weddingData.weddingDetails.toKnow3
                                                .description
                                        }
                                    </p>
                                </EditableText>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};
