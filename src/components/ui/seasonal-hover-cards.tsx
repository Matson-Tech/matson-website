import React from 'react';
import { cn } from "@/lib/utils";

export interface SeasonCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  className?: string;
}

interface SeasonalHoverCardsProps {
  cards: SeasonCardProps[];
  className?: string;
}

const SeasonCard = ({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  className,
}: SeasonCardProps) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-end p-4 w-full md:w-1/3 h-[250px] lg:h-[320px] bg-black rounded-lg overflow-hidden shadow-lg transition-all duration-500 hover:w-2/3",
        className
      )}
    >
      <img
        src={imageSrc}
        className="absolute inset-0 w-full h-full object-cover object-center"
        alt={imageAlt || title}
      />
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative md:absolute md:bottom-20 z-10 space-y-2">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-sm text-gray-300">{subtitle}</p>
      </div>
      <div className="mt-4 transform translate-y-6 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
        <p className="text-lg text-white">{description}</p>
      </div>
    </div>
  );
};

export const SeasonalHoverCards = ({
  cards,
  className,
}: SeasonalHoverCardsProps) => {
  return (
    <div className={cn("flex flex-col md:flex-row gap-4 w-full", className)}>
      {cards.map((card, index) => (
        <SeasonCard key={index} {...card} />
      ))}
    </div>
  );
};