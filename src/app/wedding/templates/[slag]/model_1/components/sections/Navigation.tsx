import { LogOut, Menu, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {useWedding} from "@/app/wedding/hooks/useWedding";
import { cn } from "@/lib/utils";

type NavIds =
    | "home"
    | "story"
    | "details"
    | "schedule"
    | "gallery"
    | "wishes"
    | "contact"
    | "info";

type NavItems = {
    name: string;
    id: NavIds;
};

const Navigation = () => {
    const { isLoggedIn, logout } = useWedding();
    const { weddingData } = useWedding();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<NavIds>("home");
    const activeSectionColor: string = "text-primary";

    const navItems: NavItems[] = useMemo(
        () => [
            { name: "Home", id: "home" },
            { name: "Our Story", id: "story" },
            { name: "Wedding Details", id: "details" },
            { name: "Schedule", id: "schedule" },
            { name: "Gallery", id: "gallery" },
            { name: "Wishes", id: "wishes" },
            { name: "Contact", id: "contact" },
        ],
        [],
    );

    const headerStyleObserver = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const sentinel = document.getElementById("top-sentinel");
        const header = document.getElementById("header");

        if (!sentinel || !header) return;

        const options = {
            root: null,
            threshold: 0,
        };

        headerStyleObserver.current = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        }, options);

        headerStyleObserver.current.observe(sentinel);

        return () => {
            if (headerStyleObserver.current)
                headerStyleObserver.current.disconnect();
        };
    }, []);

    const mainObserver = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "-50% 0px -50% 0px",
            threshold: 0,
        };

        mainObserver.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id as NavIds);
                }
            });
        }, options);

        navItems.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                mainObserver.current?.observe(element);
            }
        });
        mainObserver.current?.observe(document.getElementById("info"));

        return () => {
            if (mainObserver.current) mainObserver.current.disconnect();
        };
    }, [navItems]);

    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsMenuOpen(false);
    }, []);

    const toggleSidebar = useCallback(() => setIsMenuOpen((prev) => !prev), []);

    const closeSidebar = useCallback(() => setIsMenuOpen(false), []);

    return (
        <>
            <div id="top-sentinel" className="h1"></div>
            <nav
                id="header"
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-background/95 backdrop-blur-md shadow-lg"
                        : "bg-transparent"
                }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <div className="text-2xl ornament text-primary">
                                ❋
                            </div>
                            <span className="text-xl font-display font-semibold text-primary">
                                {weddingData.couple.groomName[0]} &{" "}
                                {weddingData.couple.brideName[0]}
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navItems.map(({ name, id }) => (
                                <button
                                    key={id}
                                    onClick={() => scrollToSection(id)}
                                    className={cn(
                                        "text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200 font-ibarra",
                                        activeSection === id &&
                                            `${activeSectionColor} border-b border-b-primary`,
                                    )}
                                    type="button"
                                >
                                    {name}
                                </button>
                            ))}

                            {isLoggedIn && (
                                <button
                                    onClick={logout}
                                    className="inline-flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 font-ibarra"
                                    type="button"
                                >
                                    Logout
                                    <LogOut className="w-4 h-4 ml-2" />
                                </button>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-md text-foreground hover:text-primary"
                            type="button"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>
            <div
                className={cn(
                    "fixed inset-0 z-50 md:hidden",
                    isMenuOpen
                        ? "pointer-events-auto backdrop-blur-sm"
                        : "pointer-events-none",
                )}
            >
                {/* Backdrop */}
                <div
                    className={cn(
                        "fixed inset-0 bg-black transition-opacity duration-300",
                        isMenuOpen ? "opacity-50" : "opacity-0",
                    )}
                    onClick={closeSidebar}
                    role="presentation"
                />

                {/* Sidebar */}
                <div
                    className={cn(
                        "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out",
                        isMenuOpen ? "translate-x-0" : "translate-x-full",
                    )}
                >
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <div className="text-lg font-Ibarra text-primary truncate">
                            {weddingData.couple.groomName} &{" "}
                            {weddingData.couple.brideName}
                        </div>
                        <button
                            onClick={closeSidebar}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label="Close menu"
                            type="button"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Sidebar Content */}
                    <div className="flex flex-col p-4 space-y-4">
                        {navItems.map(({ name, id }) => (
                            <button
                                key={id}
                                onClick={() => scrollToSection(id)}
                                type="button"
                                className={cn(
                                    "text-left py-3 px-4 rounded-lg text-base font-medium transition-all duration-200",
                                    activeSection === id
                                        ? "text-primary bg-primary/10 border-l-4 border-primary"
                                        : "text-gray-600 hover:text-primary hover:bg-primary/10",
                                )}
                            >
                                {name}
                            </button>
                        ))}
                        {isLoggedIn && (
                            <>
                                <hr className="border-gray-200 my-2" />
                                <button
                                    onClick={() => {
                                        logout();
                                        toggleSidebar();
                                    }}
                                    type="button"
                                    className="text-left py-3 px-4 rounded-lg text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navigation;
