import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Heart, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { SeasonalHoverCards } from "@/components/ui/seasonal-hover-cards"
import card1 from '@/assets/cards/1/487448073_978957434415874_7335241231066363795_n.jpg';
import card2 from '@/assets/cards/2/487121058_978957421082542_8605673069201460647_n.jpg';
import card3 from '@/assets/cards/3/487073250_978957401082544_56315459090770096_n.jpg';

const FeaturedSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Inspirational Message Box */}
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="h-full flex items-center">
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 h-full flex items-center">
                <div className="text-center lg:text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Heart className="w-12 h-12 text-primary mx-auto lg:mx-0 mb-6" />
                    <h3 className="text-2xl font-serif font-medium mb-4 text-foreground">
                      Everything you need to plan the wedding you want.
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      For all the days along the way. From the perfect invitation to your dream wedding website.
                    </p>
                  </motion.div>
                </div>
              </Card>
            </div>
          </motion.div>
   

          {/* Right Feature Modules */}
          <div className="lg:col-span-8">
            <div className="grid grid-rows-2 gap-6 h-full">
              
            <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.1 }}
  viewport={{ once: true }}
  className="group relative"
>
<SeasonalHoverCards
  cards={[
    {
      title: "Card 1",
      description: "This is the first card.",
      imageSrc: card1,
      subtitle: "Subtitle 1"
    },
    {
      title: "Card 2",
      description: "This is the second card.",
      imageSrc: card2,
      subtitle: "Subtitle 2"
    },
    {
      title: "Card 3",
      description: "This is the third card.",
      imageSrc: card3,
      subtitle: "Subtitle 3"
    }
  ]}
/>

{/* Floating View More Button */}
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  viewport={{ once: true }}
  className="absolute top-4 right-4 z-10"
>
  <Link to="/gallery">
    <Button 
      variant="outline" 
      size="sm"
      className="group bg-white/90 backdrop-blur-sm hover:bg-primary hover:text-white border-primary/30 hover:border-primary transition-all duration-300 px-4 py-2 shadow-lg hover:shadow-xl"
    >
      View More
      <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
    </Button>
  </Link>
</motion.div>
</motion.div>


              {/* Bottom: Wedding Website */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <SeasonalHoverCards
  cards={[
    {
      title: "Card 1",
      description: "This is the first card.",
      imageSrc: card1,
      subtitle: "Subtitle 1"
    },
    {
      title: "Card 2",
      description: "This is the second card.",
      imageSrc: card2,
      subtitle: "Subtitle 2"
    },
    {
      title: "Card 3",
      description: "This is the third card.",
      imageSrc: card3,
      subtitle: "Subtitle 3"
    }
  ]}
/>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;


