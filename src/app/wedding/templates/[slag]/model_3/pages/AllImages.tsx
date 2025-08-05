import { useLayoutEffect, useState } from "react";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import { Header } from "../components/Header";
import ImagePreview from "../components/ImagePreview";
import Loading from "../components/ui-custome/Loading/Loading";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";

const AllImages = () => {
    const { weddingData, isLoggedIn, globalIsLoading } = useWedding();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Create a grid that shows existing images and empty slots for new uploads
    const maxImages = isLoggedIn
        ? import.meta.env.VITE_GALLERY_IMAGE_LIMIT || 12
        : weddingData.gallery.length;

    useLayoutEffect(() => window.scrollTo(0, 0), []);

    if (globalIsLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-purple-200">
            <Header Fixed />
            <Gallery
                limit={maxImages}
                setSelectedImage={setSelectedImage}
                backButton
            />
            {/* Image preview modal */}
            <ImagePreview
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
            />
            <Footer className="bg-purple-100 border-t-purple-300" />
        </div>
    );
};

export default AllImages;
