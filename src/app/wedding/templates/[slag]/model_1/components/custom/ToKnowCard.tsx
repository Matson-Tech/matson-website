import { useUpdateWeddingDetails } from "@/app/wedding/hooks/useUpdateWeddingDetails";
import type { WeddingToKnow } from "@/app/wedding/types/wedding";
import EditableText from "../Editable/EditableText";
import { Card, CardContent } from "@/components/ui/card";

interface ToKnowCardProps {
    toKnowName: "toKnow1" | "toKnow2" | "toKnow3";
    data: WeddingToKnow;
}

const ToKnowCard: React.FC<ToKnowCardProps> = ({ toKnowName, data }) => {
    const { updateEventDetails } = useUpdateWeddingDetails();
    return (
        <Card className="border border-primary/20 bg-background/60">
            <CardContent className="p-6 text-center">
                <EditableText
                    value={data.title}
                    onSave={(value) =>
                        updateEventDetails(toKnowName, "title", value)
                    }
                    as="h4"
                    label={`Update ${data.title} title`}
                    className="text-xl font-display font-semibold text-primary mb-4"
                />
                <EditableText
                    value={data.description}
                    onSave={(value) =>
                        updateEventDetails(toKnowName, "description", value)
                    }
                    multiline
                    as="p"
                    label={`Update ${data.title} content`}
                    className="text-foreground font-serif leading-relaxed"
                />
            </CardContent>
        </Card>
    );
};

export default ToKnowCard;
