import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useWedding from "@/hooks/useWedding";
import WishCard from "../custom/WishCard";
import WishForm from "../custom/WishForm";
import HeroDecoration from "../decorations/HeroDecoration";
import LetterDecoration from "../decorations/LetterDecoration";

const WishesSection = () => {
    const { weddingWishes } = useWedding();

    return (
        <section id="wishes" className="relative py-20 wedding-gradient">
            <HeroDecoration />
            <LetterDecoration />
            <div className="container mx-auto px-4 z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="text-3xl ornament mb-8 text-primary">
                            ✤
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
                            Guest Wishes
                        </h2>
                        <p className="text-lg text-muted-foreground font-serif">
                            Share your blessings with us
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Wish Form */}
                        <WishForm />
                        {/* Recent Wishes */}
                        <div className="border-2 border-primary/20 bg-background/80 p-6 rounded-lg">
                            <h3 className="text-xl font-display font-semibold text-primary mb-6 text-center">
                                Recent Wishes
                            </h3>
                            <div className="space-y-4 mb-6">
                                {weddingWishes.length > 0 ? (
                                    weddingWishes
                                        .slice(0, 3)
                                        .map((wish) => (
                                            <WishCard
                                                key={wish.id}
                                                name={wish.name}
                                                message={wish.message}
                                            />
                                        ))
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

                            {weddingWishes.length > 0 && (
                                <div className="text-center">
                                    <Link to="/wishes">
                                        <Button
                                            variant="outline"
                                            className="font-serif"
                                        >
                                            View All Wishes
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WishesSection;
