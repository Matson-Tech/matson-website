import { Button } from "@/components/ui/button";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";
import messageOnUpdate from "@/app/wedding/utils/messageOnUpdate";
import FadeIn from "./animations/FadeIn";
import { EditableText } from "./EditableText";
import { WeddingSection } from "./WeddingSection";

export const HeroSection = () => {
    const { weddingData, updateWeddingData } = useWedding();

    const scrollToRSVP = () => {
        const element = document.getElementById("wishes");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const updateWeddingQuote = async (newQuote: string) => {
        const isUpdated = await updateWeddingData({
            couple: {
                ...weddingData.couple,
                weddingQuote: newQuote,
            },
        });
        messageOnUpdate(isUpdated, "wedding quote");
    };

    const updateBrideName = async (newName: string) => {
        const isUpdated = await updateWeddingData({
            couple: {
                ...weddingData.couple,
                brideName: newName,
            },
        });
        messageOnUpdate(isUpdated, "bride name");
    };

    const updateGroomName = async (newName: string) => {
        const isUpdated = await updateWeddingData({
            couple: {
                ...weddingData.couple,
                groomName: newName,
            },
        });
        messageOnUpdate(isUpdated, "groom name");
    };

    const updateCeremonyDate = async (newDate: string) => {
        const isUpdated = await updateWeddingData({
            weddingDetails: {
                ...weddingData.weddingDetails,
                event1: {
                    ...weddingData.weddingDetails.event1,
                    date: newDate,
                },
            },
        });
        messageOnUpdate(
            isUpdated,
            `${weddingData.weddingDetails.event1.title} date`,
        );
    };

    const updateCeremonyVenue = async (newVenue: string) => {
        const isUpdated = await updateWeddingData({
            weddingDetails: {
                ...weddingData.weddingDetails,
                event1: {
                    ...weddingData.weddingDetails.event1,
                    venue: newVenue,
                },
            },
        });
        messageOnUpdate(
            isUpdated,
            `${weddingData.weddingDetails.event1.title} venue`,
        );
    };

    const updateCeremonyTime = async (newTime: string) => {
        const isUpdated = await updateWeddingData({
            weddingDetails: {
                ...weddingData.weddingDetails,
                event1: {
                    ...weddingData.weddingDetails.event1,
                    time: newTime,
                },
            },
        });
        messageOnUpdate(
            isUpdated,
            `${weddingData.weddingDetails.event1.title} time`,
        );
    };

    return (
        <WeddingSection
            id="hero"
            className="bg-gradient-to-br from-pink-100 to-rose-200 min-h-screen flex items-center justify-center relative overflow-hidden"
        >
            {/* Decorative border pattern */}
            <div className="absolute inset-0 border-8 border-pink-300 border-dashed opacity-20 m-8 rounded-lg"></div>

            <div className="text-center z-10 space-y-8">
                {/* Wedding Quote */}
                <FadeIn delay={100}>
                    <EditableText
                        value={weddingData.couple.weddingQuote}
                        onSave={updateWeddingQuote}
                        multiline
                        className="text-lg md:text-xl text-gray-700 italic max-w-2xl mx-auto leading-relaxed"
                    />
                </FadeIn>

                {/* Couple Names */}
                <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-4">
                        <FadeIn direction="left" delay={200}>
                            <EditableText
                                value={weddingData.couple.groomName}
                                onSave={updateGroomName}
                                className="text-4xl md:text-6xl font-bold text-gray-800 font-serif"
                            />
                        </FadeIn>
                        <span className="text-3xl md:text-5xl text-pink-500">
                            &
                        </span>
                        <FadeIn direction="right" delay={200}>
                            <EditableText
                                value={weddingData.couple.brideName}
                                onSave={updateBrideName}
                                className="text-4xl md:text-6xl font-bold text-gray-800 font-serif"
                            />
                        </FadeIn>
                    </div>
                </div>

                {/* Wedding Date and Venue */}
                <div className="space-y-2">
                    <FadeIn direction="down" delay={300}>
                        <EditableText
                            value={weddingData.weddingDetails.event1.date}
                            onSave={updateCeremonyDate}
                            className="text-xl md:text-2xl text-gray-700 font-medium"
                        />
                    </FadeIn>
                    <FadeIn direction="down" delay={400}>
                        <div className="w-full text-lg md:text-xl text-gray-600">
                            <EditableText
                                value={weddingData.weddingDetails.event1.time}
                                onSave={updateCeremonyTime}
                                className="inline"
                            />
                            <span className="inline">{" at "}</span>
                            <EditableText
                                value={weddingData.weddingDetails.event1.venue}
                                onSave={updateCeremonyVenue}
                                className="inline"
                            />
                        </div>
                    </FadeIn>
                </div>

                {/* RSVP Button */}
                <FadeIn direction="down" delay={500}>
                    <Button
                        onClick={scrollToRSVP}
                        className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Send Your Wishes
                    </Button>
                </FadeIn>

                {/* Decorative illustration placeholder */}
                <div className="absolute bottom-10 left-10 opacity-30">
                    <div className="w-20 h-20 border-2 border-pink-400 rounded-full flex items-center justify-center">
                        <span className="text-pink-400 text-2xl select-none">
                            💐
                        </span>
                    </div>
                </div>
                <div className="absolute top-20 right-10 opacity-30">
                    <div className="w-16 h-16 border-2 border-pink-400 rounded-full flex items-center justify-center">
                        <span className="text-pink-400 text-xl select-none">
                            💍
                        </span>
                    </div>
                </div>
            </div>
        </WeddingSection>
    );
};
