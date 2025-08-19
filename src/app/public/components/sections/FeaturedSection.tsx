import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { SeasonalHoverCards } from "@/components/ui/seasonal-hover-cards";

interface CardData {
  title: string;
  description: string;
  imageSrc: string;
  subtitle: string;
}

const dummyWeddingWebsites: CardData[] = [
  {
    title: "Classic Romance",
    description: "A timeless template with elegant fonts and soft backgrounds for a romantic touch.",
    imageSrc: "https://kzhbmjygrzjardgruunp.supabase.co/storage/v1/object/public/wedding_card/wedding-website/form_1755518130382_668c605b-b9ba-46cb-981c-7cb94970f1db.webp",
    subtitle: "Romantic Theme",
  },
  {
    title: "Modern Minimalist",
    description: "Crisp lines and plenty of white space give this template a chic, modern vibe.",
    imageSrc: "https://kzhbmjygrzjardgruunp.supabase.co/storage/v1/object/public/wedding_card/wedding-website/form_1755518155153_cbc031b1-699a-4643-a365-b05f3083488e.webp",
    subtitle: "Minimal Theme",
  },
  {
    title: "Rustic Charm",
    description: "Earthy tones and wood textures make this template perfect for rustic outdoor weddings.",
    imageSrc: "https://kzhbmjygrzjardgruunp.supabase.co/storage/v1/object/public/wedding_card/wedding-website/form_1755518168134_80674f70-5956-4ffd-9c68-2e9ff46095d7.webp",
    subtitle: "Rustic Theme",
  },
];

const extractImageUrl = (imagePath: any): string => {
  const fallbackImage = '/placeholder.svg';

  if (!imagePath || !Array.isArray(imagePath) || imagePath.length === 0) {
    return fallbackImage;
  }

  try {
    const firstImage = imagePath[0];

    if (typeof firstImage === 'string') {
      try {
        const parsed = JSON.parse(firstImage);
        return parsed.url || fallbackImage;
      } catch {
        return firstImage || fallbackImage;
      }
    } else if (typeof firstImage === 'object' && firstImage !== null) {
      return firstImage.url || fallbackImage;
    }

    return fallbackImage;
  } catch (error) {
    console.warn('Error extracting image URL:', error);
    return fallbackImage;
  }
};

const FeaturedSection = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [websites, setWebsites] = useState<CardData[]>(dummyWeddingWebsites);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('invitation_card')
          .select('card_name, description, image_path, price')
          .limit(3)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          const transformedCards: CardData[] = data.map((card) => ({
            title: card.card_name || 'Untitled Card',
            description: card.description || `${card.card_name || 'Wedding'} invitation template`,
            imageSrc: extractImageUrl(card.image_path),
            subtitle: card.price ? `₹${card.price}` : 'Price on request',
          }));
          setCards(transformedCards);
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
        toast({
          title: "Error",
          description: "Failed to load featured cards. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [toast]);

  const getCardsToDisplay = (arr: CardData[]) => (isMobile ? arr.slice(0, 1) : arr);

  if (loading) {
    return (
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground">Loading featured templates...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className={`grid gap-6 sm:gap-8 ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-12 items-stretch'}`}>
          {/* Inspirational Card */}
          <motion.div
            className={`${isMobile ? '' : 'lg:col-span-4'} order-1`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card
              className="p-8 sm:p-10 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-[520px] lg:h-[670px] flex flex-col justify-between"
            >
              <div className="text-center lg:text-left w-full flex flex-col justify-between h-full">
                <div>
                  <Heart className="w-10 h-10 sm:w-14 sm:h-14 text-primary mx-auto lg:mx-0 mb-6" />
                  <h3 className="text-xl sm:text-3xl font-serif font-semibold mb-4 leading-tight">
                    Everything you need to plan the wedding you want.
                  </h3>
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                    From the perfect invitation card to your dream wedding website.
                  </p>
                </div>
                <div className="mt-6">
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full sm:w-auto px-8 py-3 text-base font-semibold rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    Start Planning
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Feature Modules */}
          <div className={`${isMobile ? 'space-y-6' : 'lg:col-span-8 grid grid-rows-2 gap-6'} order-2`}>
            {/* Wedding Websites */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <SeasonalHoverCards cards={getCardsToDisplay(websites)} />
              <div className={`${isMobile ? 'mt-3' : 'absolute top-4 right-4'}`}>
                <Link to="/website">
                  <Button
                    variant={isMobile ? "default" : "outline"}
                    size={isMobile ? "lg" : "sm"}
                    className={`${isMobile ? 'w-full py-3 rounded-full text-sm font-medium' : 'bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl text-xs sm:text-sm'}`}
                  >
                    {isMobile ? "Explore Websites" : "View More"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Wedding Cards */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <SeasonalHoverCards cards={getCardsToDisplay(cards)} />
              <div className={`${isMobile ? 'mt-3' : 'absolute top-4 right-4'}`}>
                <Link to="/gallery">
                  <Button
                    variant={isMobile ? "default" : "outline"}
                    size={isMobile ? "lg" : "sm"}
                    className={`${isMobile ? 'w-full py-3 rounded-full text-sm font-medium' : 'bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl text-xs sm:text-sm'}`}
                  >
                    {isMobile ? "Explore Cards" : "View More"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
