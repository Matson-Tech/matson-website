import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Background from "../components/Background";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";
import Footer from "../components/Footer";

const AllWishes = () => {
    const { weddingWishes, loadAllWeddingWishes } = useWedding();

    useEffect(() => {
        loadAllWeddingWishes();
    }, [loadAllWeddingWishes]);

    return (
        <Background>
            <Header isNotIndexPage />
            <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 py-20 px-4">
                <div className="md:container mx-auto md:max-w-4xl">
                    <div className="backdrop-blur-md bg-white/30 rounded-3xl p-8 border border-white/20 shadow-2xl">
                        <div className="flex flex-col gap-4 mb-8">
                            <Link to="/" className="w-fit">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="backdrop-blur-sm bg-white/50"
                                >
                                    <ArrowLeft size={16} className="mr-2" />
                                    Back to Home
                                </Button>
                            </Link>
                            <div className="font-bold text-center">
                                <h1 className="text-3xl text-gray-800 font-Faculty-Glyphic mb-4">
                                    Wedding Wishes
                                </h1>
                                <p className="text-xs text-muted-foreground">
                                    Beautiful messages from our loved ones
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-flow-row md:grid-cols-2 gap-4">
                            {weddingWishes.length === 0 ? (
                                <p className="text-center text-gray-600">
                                    No wishes yet. Be the first to leave a wish!
                                </p>
                            ) : (
                                weddingWishes.map((wish) => (
                                    <Card
                                        key={`card-${wish.id}`}
                                        className="backdrop-blur-sm bg-white/20 rounded-2xl border border-white/20"
                                    >
                                        <CardHeader>
                                            <CardTitle>
                                                <span className="font-semibold text-gray-800 mb-2 font-Faculty-Glyphic">
                                                    {wish.name}
                                                </span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-700">
                                                {wish.message}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Background>
    );
};

export default AllWishes;
