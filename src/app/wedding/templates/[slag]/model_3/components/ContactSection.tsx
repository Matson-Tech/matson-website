import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";
import type { WeddingContact } from "@/app/wedding/types/wedding";
import messageOnUpdate from "@/app/wedding/utils/messageOnUpdate";
import Address from "./Address";
import FadeIn from "./animations/FadeIn";
import { EditableText } from "./EditableText";
import { WeddingSection } from "./WeddingSection";

export const ContactSection = () => {
    const { weddingData, updateWeddingData } = useWedding();

    const updateContact = async (
        field: keyof WeddingContact,
        value: string,
    ) => {
        const isUpdated = await updateWeddingData({
            contact: { ...weddingData.contact, [field]: value },
        });
        messageOnUpdate(isUpdated, field);
    };

    return (
        <WeddingSection
            id="contact"
            className="bg-gradient-to-br from-indigo-100 to-blue-200"
        >
            <div className="space-y-12">
                <div className="text-center">
                    <FadeIn delay={100}>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif mb-4">
                            Get In Touch
                        </h2>
                    </FadeIn>
                    <FadeIn delay={150}>
                        <p className="sub-text">
                            Have questions? We'd love to hear from you
                        </p>
                    </FadeIn>
                </div>
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {/* Phone */}
                    <FadeIn delay={100} direction="right">
                        <Card className="text-center bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow h-full">
                            <CardContent className="p-6 space-y-4">
                                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">
                                        Phone
                                    </h3>
                                    <EditableText
                                        value={weddingData.contact.phone}
                                        onSave={(value) =>
                                            updateContact("phone", value)
                                        }
                                        className="text-gray-600"
                                    />
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        window.open(
                                            `tel:${weddingData.contact.phone}`,
                                        )
                                    }
                                    className="w-full"
                                >
                                    Call Us
                                </Button>
                            </CardContent>
                        </Card>
                    </FadeIn>
                    {/* Email */}
                    <FadeIn delay={200} direction="right">
                        <Card className="text-center bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow h-full">
                            <CardContent className="p-6 space-y-4">
                                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">
                                        Email
                                    </h3>
                                    <EditableText
                                        value={weddingData.contact.email}
                                        onSave={(value) =>
                                            updateContact("email", value)
                                        }
                                        className="text-gray-600 break-all"
                                    />
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        window.open(
                                            `mailto:${weddingData.contact.email}`,
                                        )
                                    }
                                    className="w-full"
                                >
                                    Email Us
                                </Button>
                            </CardContent>
                        </Card>
                    </FadeIn>

                    {/* Address */}
                    <FadeIn delay={300} direction="right">
                        <Card className="text-center bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow h-full">
                            <CardContent className="p-6 space-y-4">
                                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">
                                        Address
                                    </h3>
                                    <Address
                                        event="contact"
                                        eventDetails={weddingData.contact}
                                        className="text-gray-600 text-sm"
                                    />
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        window.open(
                                            weddingData.contact.addressMapLink,
                                            "_blank",
                                        )
                                    }
                                    className="w-full"
                                >
                                    View Map
                                </Button>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>
            </div>
        </WeddingSection>
    );
};
