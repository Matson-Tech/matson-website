import type React from "react";
import { EditableText } from "./EditableText";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";

export const MoreInfoSection: React.FC = () => {
    const { weddingData, updateWeddingData } = useWedding();

    const updateTitle = (newTitle: string) => {
        updateWeddingData({
            moreInfo: { ...weddingData.moreInfo, title: newTitle },
        });
    };

    const updateContent = (newContent: string) => {
        updateWeddingData({
            moreInfo: { ...weddingData.moreInfo, content: newContent },
        });
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <EditableText
                        value={weddingData.moreInfo.title}
                        onSave={updateTitle}
                        className="font-Arima text-3xl md:text-4xl font-bold text-gray-800 mb-8 block"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                            {weddingData.moreInfo.title}
                        </h2>
                    </EditableText>

                    <EditableText
                        value={weddingData.moreInfo.content}
                        onSave={updateContent}
                        multiline
                        className="text-gray-600 leading-relaxed text-lg block"
                    >
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {weddingData.moreInfo.content}
                        </p>
                    </EditableText>
                </div>
            </div>
        </section>
    );
};
