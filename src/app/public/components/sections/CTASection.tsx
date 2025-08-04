import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Globe, Star, Award } from "lucide-react";
import AnimatedBackground from "../animations/AnimatedBackground";
import { fadeInUp, cardHover, underlineAnimation } from "../animations/MotionVariants";

const CTASection = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden">
      <AnimatedBackground variant="cta" />
      
      <div className="container mx-auto px-4 text-center relative">
        <motion.div 
          className="max-w-6xl mx-auto"
          {...fadeInUp}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-serif font-medium mb-10 text-white leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to start planning your 
            <span className="block mt-4 relative">
              <span className="relative z-10">dream wedding?</span>
              <motion.div 
                className="absolute -bottom-4 left-0 right-0 h-4 bg-white/30 rounded-full"
                {...underlineAnimation}
              />
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-2xl text-white/90 mb-16 leading-relaxed font-light max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Join thousands of couples who have trusted Matson to make their wedding day absolutely perfect with our premium designs and expert support.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-8 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div {...cardHover}>
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 text-xl px-12 py-6 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Heart className="w-6 h-6 mr-3" />
                Browse card templates
              </Button>
            </motion.div>
            
            <motion.div {...cardHover}>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary text-xl px-12 py-6 rounded-full font-semibold bg-transparent backdrop-blur-sm transition-all duration-300"
              >
                <Globe className="w-6 h-6 mr-3" />
                Browse website templates
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div 
            className="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-300 fill-current" />
              <span className="font-medium">5000+ Happy Couples</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-300" />
              <span className="font-medium">Premium Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-300 fill-current" />
              <span className="font-medium">Kerala's #1 Choice</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
