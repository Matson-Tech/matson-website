import { HeartIcon } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import scrollToElement from "@/app/wedding/utils/scrollToElement";

export const Header: React.FC = () => {
    const { isLoggedIn, logout, weddingData } = useWedding();
    const [loveColor, setLoveColor] = useState<string>("black");
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setLoveColor(isScrolled ? "#DB2777" : "black");
    }, [isScrolled]);

    const scrollToSection = (sectionId: string) => {
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
        if (location.pathname !== "/") {
            navigate("/", { state: { scrollTo: sectionId } });
            return;
        }
        scrollToElement(sectionId);
    };

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false);
        toast({ title: "You have logged out!" });
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 transition-all duration-300",
                isScrolled
                    ? "py-4 bg-white border-b border-gray-200/20 shadow-sm"
                    : "py-3 bg-transparent",
            )}
        >
            <nav className="flex container mx-auto px-4 md:px-6 items-center justify-between">
                <Link
                    to="/"
                    className={cn(
                        "text-xl font-Pacifico",
                        isScrolled ? "text-pink-500" : "text-black",
                    )}
                >
                    <button
                        onClick={() => scrollToSection("hero")}
                        className="flex flex-row gap-2"
                        type="button"
                    >
                        <HeartIcon color={loveColor} width={25} />
                        {weddingData.couple.groomName[0]} &{" "}
                        {weddingData.couple.brideName[0]} Wedding
                        <HeartIcon color={loveColor} width={25} />
                    </button>
                </Link>

                <div className="hidden md:flex space-x-6 font-light">
                    <button
                        onClick={() => scrollToSection("hero")}
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase"
                        type="button"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => scrollToSection("story")}
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase"
                        type="button"
                    >
                        Our Story
                    </button>
                    <button
                        onClick={() => scrollToSection("details")}
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase"
                        type="button"
                    >
                        Details
                    </button>
                    <button
                        onClick={() => scrollToSection("schedule")}
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase"
                        type="button"
                    >
                        Schedule
                    </button>
                    <button
                        onClick={() => scrollToSection("gallery")}
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase"
                        type="button"
                    >
                        Gallery
                    </button>
                    <button
                        onClick={() => scrollToSection("wishes")}
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase"
                        type="button"
                    >
                        Wishes
                    </button>
                    <button
                        onClick={() => scrollToSection("contact")}
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase"
                        type="button"
                    >
                        Contact
                    </button>
                    <div className="flex items-center space-x-4">
                        {isLoggedIn && (
                            <Button onClick={handleLogout} variant="outline">
                                Logout
                            </Button>
                        )}
                    </div>
                </div>
                <button
                    className="md:hidden flex items-center"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                    type="button"
                >
                    <span
                        className={cn(
                            "block w-6 transition-all duration-300",
                            isMobileMenuOpen ? "opacity-0" : "opacity-100",
                        )}
                    >
                        <span className="block w-6 h-0.5 bg-foreground mb-1.5" />
                        <span className="block w-6 h-0.5 bg-foreground mb-1.5" />
                        <span className="block w-4 h-0.5 bg-foreground" />
                    </span>
                </button>
            </nav>

            <div
                className={cn(
                    "fixed bg-white inset-0 z-40 flex flex-col pt-24 px-6 duration-500 transition-opacity transform ease-in-out md:hidden w-screen h-screen",
                    isMobileMenuOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-full opacity-0",
                )}
            >
                <button
                    className="absolute top-5 right-5 p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Close menu"
                    type="button"
                >
                    <span className="block w-6 h-0.5 bg-foreground transform rotate-45 translate-y-0.5" />
                    <span className="block w-6 h-0.5 bg-foreground transform -rotate-45" />
                </button>

                <nav className="flex flex-col space-y-6 text-lg bg-white font-light">
                    <button
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase text-center border-b"
                        onClick={() => scrollToSection("hero")}
                        type="button"
                    >
                        Home
                    </button>
                    <button
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase text-center border-b"
                        onClick={() => scrollToSection("story")}
                        type="button"
                    >
                        Our Story
                    </button>
                    <button
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase text-center border-b"
                        onClick={() => scrollToSection("details")}
                        type="button"
                    >
                        Details
                    </button>
                    <button
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase text-center border-b"
                        onClick={() => scrollToSection("schedule")}
                        type="button"
                    >
                        Schedule
                    </button>
                    <button
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase text-center border-b"
                        onClick={() => scrollToSection("gallery")}
                        type="button"
                    >
                        Gallery
                    </button>
                    <button
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase text-center border-b"
                        onClick={() => scrollToSection("wishes")}
                        type="button"
                    >
                        Wishes
                    </button>
                    <button
                        className="text-gray-700 hover:text-pink-600 transition-colors uppercase text-center border-b"
                        onClick={() => scrollToSection("contact")}
                        type="button"
                    >
                        Contact
                    </button>
                    {isLoggedIn && (
                        <button
                            className="text-gray-700 hover:text-pink-600 transition-colors uppercase text-center border-b"
                            onClick={handleLogout}
                            type="button"
                        >
                            {isLoggedIn ? "Logout" : "Login"}
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
};
