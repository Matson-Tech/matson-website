import { ExternalLink, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";
import { WeddingSection } from "./WeddingSection";
import FadeIn from "./animations/FadeIn";

export const JewellerSection = () => {
    const { weddingData } = useWedding();

    return (
        <WeddingSection
            id="jeweller"
            className="bg-gradient-to-br from-yellow-100 to-amber-200"
        >
            <div className="max-w-2xl mx-auto">
                <FadeIn delay={100}>
                    <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-2 border-yellow-300">
                        <CardHeader className="text-center bg-gradient-to-r from-yellow-400 to-amber-400 text-white">
                            <CardTitle className="flex items-center justify-center space-x-2 text-2xl md:text-3xl font-bold">
                                <Gem className="h-8 w-8" />
                                <span>{weddingData.jeweller.title}</span>
                            </CardTitle>
                        </CardHeader>
                        <img src="/jewellery/ad-1.jpg" alt="jewellery" />
                        <CardContent className="p-8 text-center space-y-6">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {weddingData.jeweller.description}
                            </p>

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {weddingData.jeweller.shopName}
                                </h3>
                                <FadeIn delay={200}>
                                    <Button
                                        onClick={() =>
                                            window.open(
                                                weddingData.jeweller.website,
                                                "_blank",
                                            )
                                        }
                                        className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white px-8 py-3 text-lg"
                                    >
                                        <ExternalLink className="h-5 w-5 mr-2" />
                                        Visit Our Jeweller
                                    </Button>
                                </FadeIn>
                            </div>

                            {/* Decorative elements */}
                            <div className="flex justify-center space-x-4 pt-4">
                                <div className="w-6 h-6 bg-yellow-400 rounded-full opacity-60"></div>
                                <div className="w-4 h-4 bg-amber-400 rounded-full opacity-60"></div>
                                <div className="w-6 h-6 bg-yellow-400 rounded-full opacity-60"></div>
                            </div>
                        </CardContent>
                    </Card>
                </FadeIn>
            </div>
        </WeddingSection>
    );
};
