import type React from "react";
import HeroDecoration from "../decorations/HeroDecoration.tsx";
import LampDecoration from "../decorations/LampDecoration.tsx";
import {useWedding} from "@/app/wedding/hooks/useWedding";
import EventCard from "../custom/EventCard";
import ToKnowCard from "../custom/ToKnowCard";

const WeddingDetailsSection: React.FC = () => {
    const { weddingData } = useWedding();

    return (
        <section id="details" className="relative py-20 bg-card">
            <HeroDecoration />
            <LampDecoration />
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="text-3xl ornament mb-8 text-primary">
                            ✤
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
                            Wedding Details
                        </h2>
                        <p className="text-lg text-muted-foreground font-serif">
                            Join us for these special moments
                        </p>
                    </div>

                    {/* Events */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {/* Event 1 */}
                        <EventCard
                            event={weddingData.weddingDetails.event1}
                            eventName="event1"
                        />
                        {/* Event 2 */}
                        <EventCard
                            event={weddingData.weddingDetails.event2}
                            eventName="event2"
                        />
                    </div>

                    {/* Good to Know */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <ToKnowCard
                            toKnowName="toKnow1"
                            data={weddingData.weddingDetails.toKnow1}
                        />
                        <ToKnowCard
                            toKnowName="toKnow2"
                            data={weddingData.weddingDetails.toKnow2}
                        />
                        <ToKnowCard
                            toKnowName="toKnow3"
                            data={weddingData.weddingDetails.toKnow3}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WeddingDetailsSection;
