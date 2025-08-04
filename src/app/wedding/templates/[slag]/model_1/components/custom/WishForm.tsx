import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useWedding from "@/hooks/useWedding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const WishForm: React.FC = () => {
    const { addWish } = useWedding();
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !message.trim()) {
            toast.error("Please fill in both name and message");
            return;
        }

        const newWish = {
            id: `${Date.now()}-${crypto.randomUUID()}`,
            name: name.trim(),
            message: message.trim(),
        };

        setIsSubmitting(true);
        try {
            await addWish(newWish);
            toast.success("Thank you for your wishes!");
            setName("");
            setMessage("");
        } catch (error) {
            toast.error("Failed to submit wish. Please try again.");
            console.log("Error sending wish: ", error.message);
        }
    };

    return (
        <div>
            <div className="border-2 border-primary/20 bg-background/80 rounded-lg h-full p-6 flex flex-col">
                <h3 className="text-xl font-display font-semibold text-primary mb-6 text-center">
                    Leave Your Wishes
                </h3>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 flex flex-col flex-grow justify-between"
                >
                    <div className="flex flex-col flex-grow space-y-4">
                        <div>
                            <Input
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="font-serif"
                            />
                        </div>
                        <div className="flex flex-grow">
                            <Textarea
                                placeholder="Your wishes for the couple..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="font-serif resize-none "
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 font-serif"
                        disabled={isSubmitting}
                    >
                        <Heart className="w-4 h-4 mr-2" />
                        {isSubmitting ? "Sending..." : "Send Wishes"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default WishForm;
