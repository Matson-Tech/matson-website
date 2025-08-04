import { useEffect } from "react";
import BackButton from "../components/custom/BackButton";
import Loading from "../components/custom/Loading";
import WishCard from "../components/custom/WishCard";
import HeroDecoration from "../components/decorations/HeroDecoration";
import LetterDecoration from "../components/decorations/LetterDecoration";
import Footer from "../components/sections/Footer";
import useWedding from "@/hooks/useWedding";

const Wishes: React.FC = () => {
    const { weddingWishes, loadAllWeddingWishes, globalIsLoading } =
        useWedding();

    useEffect(() => {
        loadAllWeddingWishes();
    }, [loadAllWeddingWishes]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    if (globalIsLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <section className="h-full flex-grow relative py-10 wedding-gradient">
                <HeroDecoration />
                <LetterDecoration />
                <div className="container mx-auto px-4 z-10">
                    <div className="relative max-w-5xl mx-auto">
                        <div className="absolute">
                            <BackButton />
                        </div>
                        <div className="text-center mb-16">
                            <div className="text-3xl ornament mb-8 text-primary">
                                ✤
                            </div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
                                Guest Wishes
                            </h2>
                            <p className="text-lg text-muted-foreground font-serif">
                                Blessings from our loved ones
                            </p>
                        </div>
                        <div>
                            {weddingWishes.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {weddingWishes.map((wish) => (
                                        <WishCard
                                            key={wish.id}
                                            name={wish.name}
                                            message={wish.message}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl ornament mb-4 text-primary/60">
                                        ❋
                                    </div>
                                    <p className="text-muted-foreground font-serif">
                                        Be the first to share your wishes!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Wishes;
