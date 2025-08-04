import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/sections/Footer.tsx";
import GallerySection from "../components/sections/GallerySection";
import HeroSection from "../components/sections/HeroSection";
import Navigation from "../components/sections/Navigation";
import ScheduleSection from "../components/sections/ScheduleSection";
import StorySection from "../components/sections/StorySection";
import WeddingDetailsSection from "../components/sections/WeddingDetailsSection";
import WishesSection from "../components/sections/WishesSection";
import "../styles/fonts.css";
import Loading from "../components/custom/Loading";
import JewellerySection from "../components/sections/JewellerySection";
import MoreInfo from "../components/sections/MoreInfo";
import { useWedding } from "@/app/wedding/hooks/useWedding";

const Index = () => {
    const { globalIsLoading } = useWedding();

    if (globalIsLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <HeroSection />
            <StorySection />
            <WeddingDetailsSection />
            <ScheduleSection />
            <GallerySection />
            <WishesSection />
            <MoreInfo />
            <ContactSection />
            <JewellerySection />
            <Footer />
        </div>
    );
};

export default Index;
