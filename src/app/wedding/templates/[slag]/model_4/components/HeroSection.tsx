import type React from "react";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";
import uploadImage from "@/app/wedding/utils/UploadImage";
import { EditableText } from "./EditableText";
import EditableImage from "./editable/EditableImage";
import { Quote } from "lucide-react";

export const HeroSection: React.FC = () => {
    const { weddingData, updateWeddingData, user } = useWedding();

    const updateQuote = (newQuote: string) => {
        updateWeddingData({
            couple: { ...weddingData.couple, weddingQuote: newQuote },
        });
    };

    const updateGroomName = (newName: string) => {
        updateWeddingData({
            couple: { ...weddingData.couple, groomName: newName },
        });
    };

    const updateBrideName = (newName: string) => {
        updateWeddingData({
            couple: { ...weddingData.couple, brideName: newName },
        });
    };

    const updateHeroImage = async (file: File) => {
        const imageUrl = await uploadImage(file, user, "hero_image");
        updateWeddingData({
            couple: { ...weddingData.couple, image: imageUrl },
        });
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 pt-20"
        >
            <EditableImage
                label="Update Cover Image"
                onUpdate={updateHeroImage}
                className=""
            >
                <div className="absolute w-full h-full inset-0 z-0 pointer-events-none object-cover">
                    <img
                        src={weddingData.couple.image}
                        alt="Wedding Background"
                        className="w-full h-full object-cover blur-sm"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
            </EditableImage>
            <div className="text-center px-4 max-w-4xl mx-auto z-10">
                <div className="mb-8">
                    <EditableText
                        value={weddingData.couple.weddingQuote}
                        onSave={updateQuote}
                        multiline
                        className="font-Pacifico text-2xl md:text-5xl font-bold text-white italic leading-relaxed"
                    >
                        <p className="font-Arima font-normal text-2xl md:text-5xl text-white italic leading-relaxed capitalize">
                            {weddingData.couple.weddingQuote}.
                        </p>
                    </EditableText>
                </div>

                <div className="space-y-4">
                    <EditableText
                        value={weddingData.couple.groomName}
                        onSave={updateGroomName}
                        className="text-4xl md:text-6xl font-light text-white block "
                    >
                        <h1 className="text-4xl md:text-6xl font-Pacifico text-white ">
                            {weddingData.couple.groomName}
                        </h1>
                    </EditableText>

                    <div className="text-3xl md:text-5xl text-pink-600 font-normal">
                        &
                    </div>

                    <EditableText
                        value={weddingData.couple.brideName}
                        onSave={updateBrideName}
                        className="text-4xl md:text-6xl font-light text-white block"
                    >
                        <h1 className="text-4xl md:text-6xl font-Pacifico text-white">
                            {weddingData.couple.brideName}
                        </h1>
                    </EditableText>
                </div>
            </div>
        </section>
    );
};
