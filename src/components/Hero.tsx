import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import heroImage from '@/assets/hero-wedding.jpg';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl font-medium mb-6 leading-tight">
            Wedding planning starts here
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
            From beautiful invitation templates and wedding websites to full planning services — Matson is here for all the days along the way
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            
            <Link to="/gallery">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-matson-black text-lg px-8 py-4 rounded-full font-medium bg-transparent"
              >
                Browse card templates
              </Button>
            </Link>
            <Link to="/website">  
            <Button 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-matson-black text-lg px-8 py-4 rounded-full font-medium bg-transparent"
              >
              Browse website templates
            </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-8 border border-white/50 rounded-full flex items-center justify-center">
          <ChevronDown className="w-4 h-4 text-white/50" />
        </div>
      </div>
    </div>
  );
};

export default Hero;