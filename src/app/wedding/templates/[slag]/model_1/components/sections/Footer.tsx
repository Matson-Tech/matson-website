import { HeartIcon } from "lucide-react";
import useWedding from "@/hooks/useWedding";
import FooterDecoration from "../decorations/FooterDecoration";

const Footer = () => {
    const { weddingData } = useWedding();
    return (
        <footer className="relative py-8 text-center bg-primary">
            <FooterDecoration />
            <div className="container text-white mx-auto px-4 space-y-4">
                <div className="inline-flex items-center space-x-1 font-ibarra text-xl">
                    <p>{weddingData.couple.groomName}</p>
                    <HeartIcon size={20} />
                    <p>{weddingData.couple.brideName}</p>
                </div>
                <p className="text-sm">
                    Thank you for being a part of our wedding.
                </p>
                <p className="text-xs font-ibarra text-accent-foreground">
                    © {new Date().getFullYear()} Matson Wedding Websites
                </p>
            </div>
        </footer>
    );
};

export default Footer;
