import { useState } from "react";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";
import { WeddingSection } from "./WeddingSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import type { WeddingWish } from "@/types/wedding";
import FadeIn from "./animations/FadeIn";
import { Label } from "@/components/ui/label";

export const WishesSection = () => {
    const { weddingWishes, addWish } = useWedding();
    const [isAddingWish, setIsAddingWish] = useState(false);
    const [wishForm, setWishForm] = useState<WeddingWish>({
        id: "",
        name: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitWish = async () => {
        if (!wishForm.name.trim() || !wishForm.message.trim()) {
            toast.error("Please fill in both name and message");
            return;
        }

        setIsSubmitting(true);
        try {
            await addWish(wishForm);
            toast.success("Thank you for your beautiful wish!");
            setWishForm({ id: "", name: "", message: "" });
            setIsAddingWish(false);
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.log(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <WeddingSection
            id="wishes"
            className="bg-gradient-to-br from-rose-100 to-pink-200"
        >
            <div className="space-y-12">
                <div className="text-center">
                    <FadeIn delay={100}>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif mb-4">
                            Wedding Wishes
                        </h2>
                    </FadeIn>
                    <FadeIn delay={200}>
                        <p className="sub-text">
                            Share your love and best wishes for our special day
                        </p>
                    </FadeIn>
                </div>

                {/* Recent wishes */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {weddingWishes.slice(0, 3).map((wish, index) => (
                        <FadeIn
                            key={`fade-${wish.id}`}
                            delay={(index + 1) * 100}
                        >
                            <Card
                                key={wish.id || index}
                                className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2 text-lg">
                                        <Heart className="h-5 w-5 text-pink-500" />
                                        <span>{wish.name}</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 italic">
                                        "{wish.message}"
                                    </p>
                                </CardContent>
                            </Card>
                        </FadeIn>
                    ))}
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <FadeIn delay={200} direction="left">
                        <Button
                            onClick={() => setIsAddingWish(true)}
                            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3"
                        >
                            <Send className="h-5 w-5 mr-2" />
                            Send Your Wishes
                        </Button>
                    </FadeIn>
                    <FadeIn delay={200} direction="right">
                        <Button
                            asChild
                            variant="outline"
                            className="border-pink-300 text-pink-600 hover:bg-pink-50 px-8 py-3"
                        >
                            <Link to="/wishes">
                                <MessageCircle className="h-5 w-5 mr-2" />
                                View All Wishes
                            </Link>
                        </Button>
                    </FadeIn>
                </div>

                {/* Add wish modal */}
                <Dialog open={isAddingWish} onOpenChange={setIsAddingWish}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-center text-pink-600">
                                Send Your Wedding Wishes
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <Label className="block text-sm font-medium mb-2">
                                    Your Name
                                </Label>
                                <Input
                                    value={wishForm.name}
                                    onChange={(e) =>
                                        setWishForm({
                                            ...wishForm,
                                            name: e.target.value,
                                        })
                                    }
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium mb-2">
                                    Your Message
                                </Label>
                                <Textarea
                                    value={wishForm.message}
                                    onChange={(e) =>
                                        setWishForm({
                                            ...wishForm,
                                            message: e.target.value,
                                        })
                                    }
                                    placeholder="Share your heartfelt wishes..."
                                    rows={4}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsAddingWish(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmitWish}
                                disabled={isSubmitting}
                                className="bg-pink-500 hover:bg-pink-600"
                            >
                                {isSubmitting ? "Sending..." : "Send Wish"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </WeddingSection>
    );
};
