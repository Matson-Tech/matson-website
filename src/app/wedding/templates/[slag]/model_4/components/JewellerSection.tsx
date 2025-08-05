import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";
import FadeIn from "./animations/FadeIn";

export const JewellerSection: React.FC = () => {
    const { weddingData } = useWedding();

    return (
        <section className="py-20 bg-gray-50">
            <FadeIn delay={100}>
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl flex flex-col items-center text-center mx-auto">
                        <h2 className="font-Arima  text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            {weddingData.jeweller.title}
                        </h2>
                        <div className="flex flex-col justify-center items-center w-full rounded-md overflow-hidden max-w-2xl">
                            <img
                                src="/jewellery/ad-1.jpg"
                                alt="Edimannickal Gold and Diamonds ad"
                            />
                            <Card className="bg-white/80 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-2xl text-yellow-700 font-Arima">
                                        {weddingData.jeweller.shopName}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                        {weddingData.jeweller.description}
                                    </p>

                                    <Button
                                        onClick={() =>
                                            window.open(
                                                weddingData.jeweller.website,
                                                "_blank",
                                            )
                                        }
                                        className="bg-yellow-600 hover:bg-yellow-700"
                                    >
                                        Visit Our Jeweller
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </section>
    );
};
