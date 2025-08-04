import { useEffect, useState } from "react";
import FadeIn from "../animations/FadeIn";

const FloatingElement = ({
    children,
    delay = 0,
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) => (
    <div
        className={`absolute animate-float ${className}`}
        style={{ animationDelay: `${delay}s` }}
    >
        {children}
    </div>
);

const Sparkle = ({
    top,
    left,
    delay,
}: {
    top: string;
    left: string;
    delay: number;
}) => (
    <div
        className="absolute w-2 h-2 bg-wedding-gold rounded-full animate-sparkle"
        style={{
            top,
            left,
            animationDelay: `${delay}s`,
        }}
    >
        <div className="absolute inset-0 bg-wedding-amber rounded-full animate-ping"></div>
    </div>
);

const DriftingParticle = ({
    delay,
    size = "w-1 h-1",
}: {
    delay: number;
    size?: string;
}) => (
    <div
        className={`absolute ${size} bg-wedding-gold/30 rounded-full animate-drift`}
        style={{
            top: `${Math.random() * 100}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
        }}
    />
);

const Loading: React.FC = () => {
    const [loadingText, setLoadingText] = useState(
        "Preparing your special day",
    );
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const texts = [
            "Preparing your special day",
            "Blessing this union",
            "Gathering loved ones",
            "Creating magical moments",
        ];

        let textIndex = 0;
        const textInterval = setInterval(() => {
            textIndex = (textIndex + 1) % texts.length;
            setLoadingText(texts[textIndex]);
        }, 2000);

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.random() * 3;
            });
        }, 100);

        return () => {
            clearInterval(textInterval);
            clearInterval(progressInterval);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-wedding-sand via-wedding-gold/20 to-wedding-bronze/30 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-wedding-bronze rounded-full animate-pulse-slow"></div>
                <div
                    className="absolute top-3/4 right-1/4 w-24 h-24 border border-wedding-amber rounded-full animate-pulse-slow"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute top-1/2 right-1/3 w-16 h-16 border border-wedding-gold rounded-full animate-pulse-slow"
                    style={{ animationDelay: "2s" }}
                ></div>
            </div>

            {/* Drifting Particles */}
            {Array.from({ length: 15 }).map((_, i) => (
                <DriftingParticle
                    key={i}
                    delay={i * 0.5}
                    size={i % 3 === 0 ? "w-2 h-2" : "w-1 h-1"}
                />
            ))}

            {/* Sparkles */}
            <Sparkle top="20%" left="15%" delay={0} />
            <Sparkle top="30%" left="85%" delay={1} />
            <Sparkle top="70%" left="10%" delay={2} />
            <Sparkle top="60%" left="90%" delay={1.5} />
            <Sparkle top="40%" left="75%" delay={0.5} />
            <Sparkle top="80%" left="60%" delay={2.5} />

            {/* Floating Elements */}
            <FloatingElement delay={0} className="top-16 left-8">
                <div className="w-8 h-8 border-2 border-wedding-bronze/40 rounded-full"></div>
            </FloatingElement>
            <FloatingElement delay={1} className="top-32 right-12">
                <div className="w-6 h-6 bg-wedding-gold/30 rounded-full"></div>
            </FloatingElement>
            <FloatingElement delay={2} className="bottom-32 left-16">
                <div className="w-4 h-4 bg-wedding-amber/40 rounded-full"></div>
            </FloatingElement>
            <FloatingElement delay={1.5} className="bottom-16 right-8">
                <div className="w-10 h-10 border border-wedding-bronze/30 rounded-full"></div>
            </FloatingElement>

            {/* Swaying Elements */}
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 animate-sway">
                <div className="w-1 h-20 bg-gradient-to-b from-wedding-bronze/40 to-transparent"></div>
                <div className="w-6 h-6 bg-wedding-gold/50 rounded-full -mt-2 mx-auto"></div>
            </div>

            {/* Main Content */}
            <div className="flex items-center justify-center min-h-screen relative z-10">
                <div className="text-center ">
                    {/* Traditional Mandala Design */}
                    <FadeIn>
                        <div className="mb-12">
                            <div className="relative inline-block">
                                <div className="w-32 h-32 mx-auto mb-6 relative">
                                    {/* Outer mandala ring */}
                                    <div className="absolute inset-0 border-2 border-wedding-bronze/30 rounded-full animate-pulse-slow">
                                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-wedding-gold rounded-full"></div>
                                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-wedding-gold rounded-full"></div>
                                        <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-wedding-gold rounded-full"></div>
                                        <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-wedding-gold rounded-full"></div>
                                    </div>

                                    {/* Middle ring with petals */}
                                    <div
                                        className="absolute inset-3 bg-wedding-gold/10 rounded-full animate-pulse-slow border border-wedding-bronze/40"
                                        style={{ animationDelay: "0.5s" }}
                                    >
                                        {/* Petal decorations */}
                                        {Array.from({ length: 8 }).map(
                                            (_, i) => (
                                                <div
                                                    key={`petal_${i}`}
                                                    className="absolute w-1 h-3 bg-wedding-bronze/60 rounded-full"
                                                    style={{
                                                        top: "50%",
                                                        left: "50%",
                                                        transformOrigin:
                                                            "center",
                                                        transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-16px)`,
                                                    }}
                                                />
                                            ),
                                        )}
                                    </div>

                                    {/* Inner lotus center */}
                                    <div
                                        className="absolute inset-6 bg-wedding-amber/20 rounded-full animate-pulse-slow border-2 border-wedding-dark/20"
                                        style={{ animationDelay: "1s" }}
                                    >
                                        <div className="absolute inset-3 flex items-center justify-center">
                                            {/* Lotus symbol */}
                                            <svg
                                                className="w-12 h-12 text-wedding-dark/80"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <title>descoration</title>
                                                <path d="M12 2C12.8 2 13.6 2.3 14.2 2.8C14.8 3.3 15.2 4 15.4 4.8C15.8 4.3 16.4 4 17 4C17.8 4 18.6 4.3 19.2 4.8C19.8 5.3 20.2 6 20.4 6.8C21.2 6.4 22 6.8 22.2 7.6C22.4 8.4 22.1 9.2 21.6 9.8C21.1 10.4 20.4 10.8 19.6 11C20.1 11.6 20.4 12.4 20.2 13.2C20 14 19.2 14.4 18.4 14.2C17.8 14 17.3 13.6 16.8 13.1C16.3 13.6 15.6 14 14.8 14.2C14 14.4 13.2 14 13 13.2C12.8 12.4 13.1 11.6 13.6 11C12.8 10.8 12.1 10.4 11.6 9.8C11.1 9.2 10.8 8.4 11 7.6C11.2 6.8 12 6.4 12.8 6.8C13 6 13.4 5.3 14 4.8C13.4 4.3 12.8 4 12 4C11.2 4 10.6 4.3 10 4.8C10.6 5.3 11 6 11.2 6.8C12 6.4 12.8 6.8 13 7.6C13.2 8.4 12.9 9.2 12.4 9.8C11.9 10.4 11.2 10.8 10.4 11C10.9 11.6 11.2 12.4 11 13.2C10.8 14 10 14.4 9.2 14.2C8.4 14 7.7 13.6 7.2 13.1C6.7 13.6 6 14 5.2 14.2C4.4 14.4 3.6 14 3.4 13.2C3.2 12.4 3.5 11.6 4 11C3.2 10.8 2.5 10.4 2 9.8C1.5 9.2 1.2 8.4 1.4 7.6C1.6 6.8 2.4 6.4 3.2 6.8C3.4 6 3.8 5.3 4.4 4.8C5 4.3 5.8 4 6.6 4C7.2 4 7.8 4.3 8.4 4.8C8.6 4 9 3.3 9.6 2.8C10.2 2.3 11 2 11.8 2C11.9 2 12 2 12 2Z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Sparkle accents */}
                                <div className="absolute -top-3 -right-3">
                                    <div className="w-3 h-3 bg-wedding-gold animate-sparkle rounded-full"></div>
                                </div>
                                <div className="absolute -bottom-3 -left-3">
                                    <div
                                        className="w-2 h-2 bg-wedding-amber animate-sparkle rounded-full"
                                        style={{ animationDelay: "1s" }}
                                    ></div>
                                </div>
                                <div className="absolute -top-3 -left-3">
                                    <div
                                        className="w-2 h-2 bg-wedding-bronze animate-sparkle rounded-full"
                                        style={{ animationDelay: "0.5s" }}
                                    ></div>
                                </div>
                                <div className="absolute -bottom-3 -right-3">
                                    <div
                                        className="w-3 h-3 bg-wedding-gold animate-sparkle rounded-full"
                                        style={{ animationDelay: "1.5s" }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Traditional Wedding Symbol */}
                    <FadeIn>
                        <div className="mb-8">
                            <div className="text-center">
                                <div className="text-6xl md:text-8xl text-wedding-dark/80 mb-4 font-light">
                                    ❈
                                </div>

                                {/* Traditional Decorative Border */}
                                <div className="flex items-center justify-center mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-px bg-wedding-bronze/60"></div>
                                        <span className="text-wedding-bronze text-2xl">
                                            ❋
                                        </span>
                                        <div className="w-12 h-px bg-wedding-bronze/60"></div>
                                        <span className="text-wedding-dark/70 text-xl">
                                            ♦
                                        </span>
                                        <div className="w-12 h-px bg-wedding-bronze/60"></div>
                                        <span className="text-wedding-bronze text-2xl">
                                            ❋
                                        </span>
                                        <div className="w-8 h-px bg-wedding-bronze/60"></div>
                                    </div>
                                </div>

                                {/* Sacred Blessing Text */}
                                <p className="text-lg md:text-xl text-wedding-dark/70 font-light tracking-wide italic">
                                    May you be blessed with a long life
                                </p>
                                <p className="text-sm md:text-base text-wedding-dark/60 font-light mt-1">
                                    Sacred Union
                                </p>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Loading Text */}
                    <FadeIn delay={100}>
                        <div>
                            <p className="text-xl text-wedding-dark/80 mb-4 font-light">
                                {loadingText}
                            </p>

                            {/* Progress Bar */}
                            <div className="w-64 mx-auto bg-wedding-sand/50 rounded-full h-2 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-wedding-gold to-wedding-amber transition-all duration-300 ease-out"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Enhanced Decorative Elements */}
                    <FadeIn delay={200}>
                        <div>
                            <div className="flex items-center justify-center space-x-6 text-wedding-bronze mb-6">
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-px bg-current animate-pulse"></div>
                                    <span className="text-xl">❋</span>
                                    <div className="w-8 h-px bg-current animate-pulse"></div>
                                </div>
                                <span className="text-3xl text-wedding-dark/70">
                                    ❦
                                </span>
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-px bg-current animate-pulse"></div>
                                    <span className="text-xl">❋</span>
                                    <div className="w-4 h-px bg-current animate-pulse"></div>
                                </div>
                            </div>

                            {/* Sanskrit blessing */}
                            <div className="text-center">
                                <p className="text-wedding-dark/60 text-sm tracking-wider font-light">
                                    May you both grow together in harmony and
                                    strength
                                </p>
                                <p className="text-wedding-dark/50 text-xs mt-1 italic">
                                    Light, Prosperity & Peace
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* Bottom decorative elements */}
            <div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 "
                style={{ animationDelay: "2.5s" }}
            >
                <div className="flex space-x-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-2 h-2 bg-wedding-gold rounded-full animate-pulse"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Loading;
