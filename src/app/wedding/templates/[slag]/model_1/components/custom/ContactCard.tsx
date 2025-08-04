import { useWedding } from "@/app/wedding/hooks/useWedding";
import { Card, CardContent } from "@/components/ui/card";

interface ContactCardProps {
    title: string;
    Icon: React.ElementType;
    link?: string;
    children?: React.ReactNode;
}

const ContactCard: React.FC<ContactCardProps> = ({
    title,
    link,
    Icon,
    children,
}) => {
    const { isLoggedIn } = useWedding();

    const openLinkInNewTab = () => {
        if (!isLoggedIn && link) {
            window.open(link, "_blabk", "noopener noreferrer");
        }
    };

    return (
        <Card
            className="group border-2 border-primary/20 hover:bg-secondary/20 cursor-pointer"
            onClick={openLinkInNewTab}
        >
            <CardContent className="p-6 text-center">
                <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-display font-semibold text-foreground mb-2">
                    {title}
                </h3>
                {children}
            </CardContent>
        </Card>
    );
};

export default ContactCard;
