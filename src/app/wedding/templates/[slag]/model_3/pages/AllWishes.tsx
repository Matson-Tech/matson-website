import { ArrowLeft, Heart, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FadeIn from "../components/animations/FadeIn";
import { Header } from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "../components/ui-custome/Loading/Loading";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";
import Footer from "../components/Footer";

const AllWishes = () => {
    const { weddingWishes, loadAllWeddingWishes, globalIsLoading } =
        useWedding();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadWish = async () => {
            await loadAllWeddingWishes();
            setIsLoading(false);
        };
        loadWish();
    }, [loadAllWeddingWishes]);

    if (globalIsLoading || isLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-200">
            {/* Header */}
            <Header />
            <div className="container mx-auto px-4 py-24">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center space-y-4">
                        <FadeIn direction="left" delay={100}>
                            <Button asChild variant="outline" className="mb-4">
                                <Link to="/">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Wedding Website
                                </Link>
                            </Button>
                        </FadeIn>
                        <FadeIn direction="up" delay={200}>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif">
                                All Wedding Wishes
                            </h1>
                        </FadeIn>
                        <FadeIn direction="up" delay={300}>
                            <p className="text-lg text-gray-600">
                                Beautiful messages from our loved ones
                            </p>
                        </FadeIn>
                    </div>

                    {/* Wishes Grid */}
                    {weddingWishes.length === 0 ? (
                        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                            <CardContent className="p-12 text-center">
                                <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    No wishes yet
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Be the first to send your beautiful wishes!
                                </p>
                                <Button
                                    asChild
                                    className="bg-pink-500 hover:bg-pink-600"
                                >
                                    <Link to="/#wishes">Send a Wish</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                            {weddingWishes.map((wish, index) => (
                                <FadeIn
                                    key={`${wish.id}-fade`}
                                    delay={100 * (index + 1)}
                                >
                                    <Card
                                        key={wish.id || index}
                                        className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow h-full"
                                    >
                                        <CardHeader>
                                            <CardTitle className="flex items-center space-x-2 text-lg">
                                                <Heart className="h-5 w-5 text-pink-500" />
                                                <span>{wish.name}</span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-700 italic leading-relaxed">
                                                "{wish.message}"
                                            </p>
                                        </CardContent>
                                    </Card>
                                </FadeIn>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AllWishes;
