import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";
import { EditableText } from "./EditableText";
import EditableLink from "./editable/EditableLink";
import MapsIconButton from "./ui-custom/MapsIconButton";
import FadeIn from "./animations/FadeIn";

export const ContactSection: React.FC = () => {
    const { weddingData, updateWeddingData } = useWedding();

    const updateContact = (
        field: "phone" | "email" | "address",
        value: string,
    ) => {
        updateWeddingData({
            contact: { ...weddingData.contact, [field]: value },
        });
    };

    return (
        <section id="contact" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="font-Arima text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
                    Contact Us
                </h2>

                <div className="max-w-2xl mx-auto">
                    <FadeIn>
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-Arima text-center text-pink-600">
                                    Get in Touch
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <span className="text-md text-muted-foreground">
                                        Phone
                                    </span>
                                    <EditableText
                                        value={weddingData.contact.phone}
                                        onSave={(value) =>
                                            updateContact("phone", value)
                                        }
                                        className="ml-2"
                                    >
                                        <span className="ml-2 text-gray-600">
                                            {weddingData.contact.phone}
                                        </span>
                                    </EditableText>
                                </div>

                                <div>
                                    <span className="text-md text-muted-foreground">
                                        Email
                                    </span>
                                    <EditableText
                                        value={weddingData.contact.email}
                                        onSave={(value) =>
                                            updateContact("email", value)
                                        }
                                        className="ml-2"
                                    >
                                        <span className="ml-2 text-gray-600">
                                            {weddingData.contact.email}
                                        </span>
                                    </EditableText>
                                </div>

                                <div>
                                    <p>
                                        <span className="text-md text-muted-foreground">
                                            Address
                                        </span>
                                    </p>
                                    <div className="flex justify-between">
                                        <EditableLink
                                            text={weddingData.contact.address}
                                            link={
                                                weddingData.contact
                                                    .addressMapLink
                                            }
                                            onSave={(value) =>
                                                updateContact("address", value)
                                            }
                                            className="ml-2 max-w-64"
                                            label="Edit Address and Link"
                                        >
                                            <span>
                                                {weddingData.contact.address}
                                            </span>
                                        </EditableLink>
                                        <div>
                                            <MapsIconButton
                                                onClick={() => {
                                                    window.open(
                                                        weddingData.contact
                                                            .addressMapLink,
                                                        "_blank",
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};
