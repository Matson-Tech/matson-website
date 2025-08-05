import { useEffect } from "react";
import Background from "../components/Background";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Header from "../components/Header";
import AddNewImage from "../components/ui-custome/AddNewImage";

const GalleryPage = () => {
    const imageLimit = import.meta.env.VITE_GALLERY_IMAGE_LIMIT || 10;

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return (
        <Background>
            <Header isNotIndexPage />
            <Gallery limit={imageLimit}>
                <AddNewImage />
            </Gallery>
            <Footer />
        </Background>
    );
};

export default GalleryPage;
