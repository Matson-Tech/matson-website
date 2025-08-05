import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";
import messageOnUpdate from "@/app/wedding/utils/messageOnUpdate";
import FadeIn from "./animations/FadeIn";
import { EditableText } from "./EditableText";
import { WeddingSection } from "./WeddingSection";

export const MoreInfoSection = () => {
    const { weddingData, updateWeddingData } = useWedding();

    const updateTitle = async (newTitle: string) => {
        const isUpdated: boolean = await updateWeddingData({
            moreInfo: { ...weddingData.moreInfo, title: newTitle },
        });
        messageOnUpdate(isUpdated, "title");
    };

    const updateContent = async (newContent: string) => {
        const isUpdated: boolean = await updateWeddingData({
            moreInfo: { ...weddingData.moreInfo, content: newContent },
        });
        messageOnUpdate(isUpdated, "content");
    };

    return (
        <WeddingSection
            id="info"
            className="bg-gradient-to-br from-green-100 to-teal-200"
        >
            <FadeIn>
                <div className="max-w-4xl mx-auto">
                    <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
                        <CardHeader className="text-center">
                            <FadeIn delay={100}>
                                <CardTitle className="flex items-center justify-center space-x-2">
                                    <Info className="h-6 w-6 text-teal-600" />
                                    <EditableText
                                        value={weddingData.moreInfo.title}
                                        onSave={updateTitle}
                                        className="text-xl md:text-3xl font-bold text-gray-800 font-serif"
                                    />
                                </CardTitle>
                            </FadeIn>
                        </CardHeader>
                        <CardContent className="p-8">
                            <FadeIn delay={100}>
                                <EditableText
                                    value={weddingData.moreInfo.content}
                                    onSave={updateContent}
                                    multiline
                                    className="text-lg text-gray-700 leading-relaxed text-center"
                                />
                            </FadeIn>
                        </CardContent>
                    </Card>
                </div>
            </FadeIn>
        </WeddingSection>
    );
};
