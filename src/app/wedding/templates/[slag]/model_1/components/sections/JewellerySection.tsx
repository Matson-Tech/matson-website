import { ExternalLink } from "lucide-react";
import useWedding from "@/hooks/useWedding";
import BangleDecoration from "../decorations/BangleDecoration";
import FlowerDecoration from "../decorations/FlowerDecoration";

const JewellerySection = () => {
    const { weddingData } = useWedding();

    return (
        <section id="wishes" className="relative py-20 bg-card">
            <FlowerDecoration />
            <BangleDecoration />
            <div className="container flex items-center mx-auto px-4 z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Text Content */}
                    <div className="text-center mb-16">
                        <div className="text-3xl ornament mb-8 text-primary">
                            ✤
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
                            {weddingData.jeweller.title}
                        </h2>
                    </div>
                    <div className="group grid max-w-xl gap-2 place-items-center">
                        {/* Image/Ad Banner Slot */}
                        <div className="group w-full border-2 border-primary/20 bg-background/80 group-hover:bg-secondary/10 duration-200 rounded-lg h-full p-2 md:p-6 flex flex-col">
                            <a
                                href={weddingData.jeweller.website}
                                className="underno-underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="w-full bg-primary rounded-lg flex items-center justify-center border-2 border-primary overflow-hidden">
                                    <img
                                        src="/jewellery/ad-1.jpg"
                                        alt="jewellery"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </a>
                        </div>
                        <div className="w-full">
                            <div className="group border-2 border-primary/20 bg-background/80 group-hover:bg-secondary/10 duration-200 rounded-lg h-full p-6 flex flex-col">
                                <p className="text-lg text-gray-700 mb-6">
                                    {weddingData.jeweller.description}
                                </p>
                                <h3 className="text-2xl font-serif text-amber-800 mb-4">
                                    {weddingData.jeweller.shopName}
                                </h3>
                                <a
                                    href={weddingData.jeweller.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium"
                                >
                                    Visit Our Store
                                    <ExternalLink className="w-4 h-4 ml-2" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default JewellerySection;
