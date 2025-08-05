import { Heart } from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import styles from "./Loading.module.css";

// const Loading: React.FC = () => {
//     return (
//         <div className="fixed inset-0 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center overflow-hidden">
//             {/* Floating hearts background */}
//             <div className="absolute inset-0">
//                 {[...Array(12)].map(() => (
//                     <div
//                         key={`heart-${Date.now()}`}
//                         className="absolute"
//                         style={{
//                             left: `${Math.random() * 100}%`,
//                             top: `${Math.random() * 100}%`,
//                             animation: `floatHeart ${4 + Math.random() * 3}s ease-in-out infinite`,
//                             animationDelay: `${Math.random() * 4}s`,
//                         }}
//                     >
//                         <Heart
//                             className="text-pink-200/40"
//                             size={12 + Math.random() * 16}
//                             fill="currentColor"
//                             style={{
//                                 animation: `heartbeat ${2 + Math.random() * 2}s ease-in-out infinite`,
//                                 animationDelay: `${Math.random() * 2}s`,
//                             }}
//                         />
//                     </div>
//                 ))}
//             </div>

//             {/* Main content */}
//             <div className="relative z-10 text-center">
//                 {/* Main heart with advanced pulsing animation */}
//                 <div className="relative mb-8">
//                     {/* Outer glow ring */}
//                     <div className="absolute inset-0 animate-ping opacity-30">
//                         <Heart
//                             className="mx-auto text-pink-400"
//                             size={100}
//                             fill="currentColor"
//                         />
//                     </div>
//                     {/* Middle glow ring */}
//                     <div
//                         className="absolute inset-0"
//                         style={{ animation: "pulse 1.5s ease-in-out infinite" }}
//                     >
//                         <Heart
//                             className="mx-auto text-pink-300/60"
//                             size={90}
//                             fill="currentColor"
//                         />
//                     </div>
//                     {/* Main heart */}
//                     <div
//                         className="relative"
//                         style={{
//                             animation:
//                                 "mainHeartbeat 1.2s ease-in-out infinite",
//                         }}
//                     >
//                         <Heart
//                             className="mx-auto text-pink-500"
//                             size={80}
//                             fill="currentColor"
//                         />
//                     </div>

//                     {/* Sparkle effects with improved animations */}
//                     <div
//                         className="absolute -top-4 -right-4"
//                         style={{
//                             animation: "sparkle1 3s ease-in-out infinite",
//                         }}
//                     >
//                         <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-red-400 rounded-full"></div>
//                     </div>
//                     <div
//                         className="absolute -bottom-4 -left-4"
//                         style={{
//                             animation: "sparkle2 2.5s ease-in-out infinite",
//                             animationDelay: "0.5s",
//                         }}
//                     >
//                         <div className="w-2 h-2 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full"></div>
//                     </div>
//                     <div
//                         className="absolute top-2 -left-6"
//                         style={{
//                             animation: "sparkle3 2s ease-in-out infinite",
//                             animationDelay: "1s",
//                         }}
//                     >
//                         <div className="w-1.5 h-1.5 bg-gradient-to-r from-red-400 to-pink-400 rounded-full"></div>
//                     </div>
//                     <div
//                         className="absolute -top-2 right-4"
//                         style={{
//                             animation: "sparkle1 2.8s ease-in-out infinite",
//                             animationDelay: "1.5s",
//                         }}
//                     >
//                         <div className="w-2.5 h-2.5 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
//                     </div>
//                 </div>

//                 {/* Loading text with typing effect */}
//                 <div className="space-y-4">
//                     <h2
//                         className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent"
//                         style={{
//                             animation: "textGlow 2s ease-in-out infinite",
//                         }}
//                     >
//                         Loading with Love
//                     </h2>

//                     {/* Enhanced animated dots */}
//                     <div className="flex justify-center space-x-2">
//                         {[...Array(3)].map((_, i) => (
//                             <div
//                                 key={`dot-${Date.now()}`}
//                                 className="w-3 h-3 bg-gradient-to-r from-pink-400 to-red-400 rounded-full"
//                                 style={{
//                                     animation: `dotBounce 1.4s ease-in-out infinite`,
//                                     animationDelay: `${i * 0.2}s`,
//                                 }}
//                             ></div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Enhanced progress bar with multiple animations */}
//                 <div className="mt-8 w-80 h-3 bg-pink-100 rounded-full overflow-hidden mx-auto relative">
//                     {/* Background shimmer */}
//                     <div
//                         className="absolute inset-0 bg-gradient-to-r from-pink-100 via-pink-200 to-pink-100"
//                         style={{ animation: "shimmer 2s ease-in-out infinite" }}
//                     ></div>

//                     {/* Main progress bar */}
//                     <div
//                         className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 rounded-full relative overflow-hidden"
//                         style={{
//                             animation: "progressFill 2s ease-in-out infinite",
//                         }}
//                     >
//                         {/* Sliding highlight */}
//                         <div
//                             className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
//                             style={{
//                                 animation:
//                                     "slideHighlight 2s ease-in-out infinite",
//                             }}
//                         ></div>

//                         {/* Pulsing overlay */}
//                         <div
//                             className="absolute inset-0 bg-gradient-to-r from-pink-300/30 to-red-300/30 rounded-full"
//                             style={{
//                                 animation:
//                                     "progressPulse 1.5s ease-in-out infinite",
//                             }}
//                         ></div>
//                     </div>
//                 </div>
//             </div>

//             {/* Enhanced floating elements */}
//             <div
//                 className="absolute top-1/4 left-1/4"
//                 style={{
//                     animation: "float1 4s ease-in-out infinite",
//                     animationDelay: "0s",
//                 }}
//             >
//                 <div className="w-6 h-6 bg-gradient-to-br from-pink-300/30 to-red-300/30 rounded-full blur-sm"></div>
//             </div>
//             <div
//                 className="absolute top-3/4 right-1/4"
//                 style={{
//                     animation: "float2 3.5s ease-in-out infinite",
//                     animationDelay: "1s",
//                 }}
//             >
//                 <div className="w-8 h-8 bg-gradient-to-br from-rose-300/25 to-pink-300/25 rounded-full blur-sm"></div>
//             </div>
//             <div
//                 className="absolute top-1/2 right-1/6"
//                 style={{
//                     animation: "float3 5s ease-in-out infinite",
//                     animationDelay: "2s",
//                 }}
//             >
//                 <div className="w-10 h-10 bg-gradient-to-br from-red-300/20 to-pink-300/20 rounded-full blur-md"></div>
//             </div>
//             <div
//                 className="absolute top-1/3 left-1/6"
//                 style={{
//                     animation: "float1 4.5s ease-in-out infinite",
//                     animationDelay: "0.5s",
//                 }}
//             >
//                 <div className="w-4 h-4 bg-gradient-to-br from-pink-400/25 to-rose-400/25 rounded-full blur-sm"></div>
//             </div>

//             {/* Advanced CSS animations */}
//             <style
//                 dangerouslySetInnerHTML={{
//                     __html: `
//           @keyframes floatHeart {
//             0%, 100% {
//               transform: translateY(0px) rotate(0deg) scale(1);
//               opacity: 0.3;
//             }
//             25% {
//               transform: translateY(-15px) rotate(5deg) scale(1.1);
//               opacity: 0.6;
//             }
//             50% {
//               transform: translateY(-25px) rotate(-3deg) scale(0.9);
//               opacity: 0.8;
//             }
//             75% {
//               transform: translateY(-10px) rotate(2deg) scale(1.05);
//               opacity: 0.5;
//             }
//           }

//           @keyframes heartbeat {
//             0%, 100% { transform: scale(1); }
//             50% { transform: scale(1.2); }
//           }

//           @keyframes mainHeartbeat {
//             0%, 100% {
//               transform: scale(1) rotate(0deg);
//               filter: drop-shadow(0 0 10px rgba(236, 72, 153, 0.3));
//             }
//             50% {
//               transform: scale(1.15) rotate(2deg);
//               filter: drop-shadow(0 0 20px rgba(236, 72, 153, 0.6));
//             }
//           }

//           @keyframes sparkle1 {
//             0%, 100% {
//               transform: scale(0) rotate(0deg);
//               opacity: 0;
//             }
//             50% {
//               transform: scale(1.5) rotate(180deg);
//               opacity: 1;
//             }
//           }

//           @keyframes sparkle2 {
//             0%, 100% {
//               transform: scale(0) rotate(0deg) translate(0, 0);
//               opacity: 0;
//             }
//             50% {
//               transform: scale(1.2) rotate(-180deg) translate(5px, -5px);
//               opacity: 1;
//             }
//           }

//           @keyframes sparkle3 {
//             0%, 100% {
//               transform: scale(0) rotate(0deg);
//               opacity: 0;
//             }
//             33% {
//               transform: scale(1) rotate(120deg);
//               opacity: 0.8;
//             }
//             66% {
//               transform: scale(1.3) rotate(240deg);
//               opacity: 1;
//             }
//           }

//           @keyframes textGlow {
//             0%, 100% {
//               text-shadow: 0 0 5px rgba(236, 72, 153, 0.3);
//               transform: scale(1);
//             }
//             50% {
//               text-shadow: 0 0 15px rgba(236, 72, 153, 0.6);
//               transform: scale(1.02);
//             }
//           }

//           @keyframes dotBounce {
//             0%, 80%, 100% {
//               transform: translateY(0) scale(1);
//               opacity: 0.7;
//             }
//             40% {
//               transform: translateY(-12px) scale(1.2);
//               opacity: 1;
//             }
//           }

//           @keyframes shimmer {
//             0%, 100% { opacity: 0.5; }
//             50% { opacity: 1; }
//           }

//           @keyframes progressFill {
//             0% { width: 0%; }
//             50% { width: 75%; }
//             100% { width: 100%; }
//           }

//           @keyframes slideHighlight {
//             0% { transform: translateX(-100%) skewX(-15deg); }
//             100% { transform: translateX(400%) skewX(-15deg); }
//           }

//           @keyframes progressPulse {
//             0%, 100% { opacity: 0.3; }
//             50% { opacity: 0.8; }
//           }

//           @keyframes float1 {
//             0%, 100% {
//               transform: translate(0, 0) rotate(0deg) scale(1);
//               opacity: 0.3;
//             }
//             25% {
//               transform: translate(15px, -20px) rotate(90deg) scale(1.1);
//               opacity: 0.6;
//             }
//             50% {
//               transform: translate(-10px, -30px) rotate(180deg) scale(0.9);
//               opacity: 0.8;
//             }
//             75% {
//               transform: translate(20px, -15px) rotate(270deg) scale(1.05);
//               opacity: 0.5;
//             }
//           }

//           @keyframes float2 {
//             0%, 100% {
//               transform: translate(0, 0) scale(1);
//               opacity: 0.4;
//             }
//             33% {
//               transform: translate(-25px, 20px) scale(1.2);
//               opacity: 0.7;
//             }
//             66% {
//               transform: translate(15px, -25px) scale(0.8);
//               opacity: 0.9;
//             }
//           }

//           @keyframes float3 {
//             0%, 100% {
//               transform: translate(0, 0) rotate(0deg);
//               opacity: 0.2;
//             }
//             20% {
//               transform: translate(10px, -15px) rotate(72deg);
//               opacity: 0.5;
//             }
//             40% {
//               transform: translate(-15px, -25px) rotate(144deg);
//               opacity: 0.7;
//             }
//             60% {
//               transform: translate(-20px, 10px) rotate(216deg);
//               opacity: 0.6;
//             }
//             80% {
//               transform: translate(5px, 20px) rotate(288deg);
//               opacity: 0.4;
//             }
//           }
//         `,
//                 }}
//             />
//         </div>
//     );
// };

const HEART_COUNT = 12;
const DOT_COUNT = 3;

const Loading: React.FC = () => {
    // Generate random heart positions and timings once
    const hearts = useMemo(
        () =>
            Array.from({ length: HEART_COUNT }).map((_, idx) => ({
                key: idx,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                floatDuration: `${4 + Math.random() * 3}s`,
                floatDelay: `${Math.random() * 4}s`,
                beatDuration: `${2 + Math.random() * 2}s`,
                beatDelay: `${Math.random() * 2}s`,
                size: `${12 + Math.random() * 16}px`,
            })),
        [],
    );

    const dots = useMemo(
        () =>
            Array.from({ length: DOT_COUNT }).map((_, i) => ({
                key: i,
                delay: `${i * 0.2}s`,
            })),
        [],
    );

    return (
        <div className={styles.overlay}>
            <div className={styles.background}>
                {hearts.map(
                    ({
                        key,
                        left,
                        top,
                        floatDuration,
                        floatDelay,
                        beatDuration,
                        beatDelay,
                        size,
                    }) => (
                        <div
                            key={key}
                            className={styles.floatingHeart}
                            style={{
                                left,
                                top,
                                animationDelay: floatDelay,
                                animationDuration: floatDuration,
                            }}
                        >
                            <Heart
                                size={parseFloat(size)}
                                className={styles.heartIcon}
                                style={{
                                    animationDelay: beatDelay,
                                    animationDuration: beatDuration,
                                }}
                            />
                        </div>
                    ),
                )}
            </div>

            <div className={styles.content}>
                <div className={styles.mainHeartContainer}>
                    <Heart size={100} className={styles.pingHeart} />
                    <Heart size={90} className={styles.pulseHeart} />
                    <Heart size={80} className={styles.mainHeart} />
                    <div className={styles.sparkle1} />
                    <div className={styles.sparkle2} />
                    <div className={styles.sparkle3} />
                    <div className={styles.sparkle4} />
                </div>

                <div className={styles.textContainer}>
                    <h2 className={styles.loadingText}>Loading with Love</h2>
                    <div className={styles.dotsContainer}>
                        {dots.map(({ key, delay }) => (
                            <div
                                key={key}
                                className={styles.dot}
                                style={{ animationDelay: delay }}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.progressWrapper}>
                    <div className={styles.shimmer} />
                    <div className={styles.progressBar}>
                        <div className={styles.slideHighlight} />
                        <div className={styles.progressPulse} />
                    </div>
                </div>
            </div>

            <div className={styles.floatElem1} />
            <div className={styles.floatElem2} />
            <div className={styles.floatElem3} />
            <div className={styles.floatElem4} />
        </div>
    );
};

export default Loading;
