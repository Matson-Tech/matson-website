import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils"; // Assuming you have a classname utility
import "../../styles/fadeIn.css";

interface FadeInProps {
    /** The content to be rendered inside the component. */
    children: React.ReactNode;
    /** Additional CSS classes to apply to the container. */
    className?: string;
    /** The direction from which the element should fade in. */
    direction?: "up" | "down" | "left" | "right" | "none";
    /** The delay in milliseconds before the animation starts. */
    delay?: number;
    /** The duration of the fade-in animation in milliseconds. */
    duration?: number;
    /** The percentage of the element that must be visible to trigger the animation. */
    threshold?: number;
    /** If true, the animation will only run once. */
    once?: boolean;
    /** An optional ref to be forwarded to the container div. */
    ref?: React.Ref<HTMLDivElement>;
}

const FadeIn = React.memo<FadeInProps>(
    ({
        children,
        className,
        direction = "up",
        delay = 0,
        duration = 500,
        threshold = 0.1,
        once = true,
        ref: forwardedRef,
    }) => {
        const [isInView, setIsInView] = useState(false);
        const internalRef = useRef<HTMLDivElement>(null);
        // Use the forwardedRef if provided, otherwise use the internalRef
        const ref = (forwardedRef ??
            internalRef) as React.RefObject<HTMLDivElement>;

        useEffect(() => {
            const element = ref.current;
            if (!element) return;

            const observer = new IntersectionObserver(
                (entries, obs) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setIsInView(true);
                            if (once) {
                                obs.disconnect(); // Disconnect after the first time it comes into view
                            }
                        } else if (!once) {
                            setIsInView(false); // Reset if it goes out of view and 'once' is false
                        }
                    });
                },
                { threshold },
            );

            observer.observe(element);

            return () => {
                observer.disconnect(); // Cleanup on unmount
            };
        }, [once, threshold, ref]);

        // Define CSS custom properties for dynamic values
        const style = {
            "--fade-in-duration": `${duration}ms`,
            "--fade-in-delay": `${delay}ms`,
        } as React.CSSProperties;

        return (
            <div
                ref={ref}
                className={cn("fade-in-container", className)}
                data-state={isInView ? "visible" : "hidden"}
                data-direction={direction}
                style={style}
            >
                {children}
            </div>
        );
    },
);

FadeIn.displayName = "FadeIn";

export default FadeIn;
