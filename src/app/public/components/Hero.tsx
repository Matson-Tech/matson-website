import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollPrompt(true);
    }, 3000);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollPrompt(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative h-[90vh] w-full overflow-hidden select-none">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover brightness-90"
        src={"https://kzhbmjygrzjardgruunp.supabase.co/storage/v1/object/public/wedding_card/Untitled%20folder/Timeline%201.webm"}
        autoPlay
        loop
        muted
        playsInline
      >
        Your browser does not support the video tag.
      </video>

      {/* Dark gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>

      {/* Content anchored at bottom center */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 max-w-4xl w-full px-6 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white font-semibold leading-tight mb-4 drop-shadow-lg">
          Wedding planning starts here
        </h1>
<p className="text-white/90 max-w-3xl mx-auto text-sm sm:text-base md:text-lg mb-8 font-light drop-shadow-md">
          From beautiful invitation templates and wedding websites to full planning services — Matson is here for all the days along the way
        </p>
        <Link to="/login">
          <Button
            size="lg"
            className="
              bg-white text-black font-semibold px-12 py-4 rounded-full shadow-lg 
              hover:bg-gray-100 transition-all duration-300
              focus:outline-none focus:ring-4 focus:ring-white/50
              active:scale-95 transform
              inline-block
            "
          >
            Get Started
          </Button>
        </Link>
      </div>

      {/* Scroll prompt at bottom center */}
      {showScrollPrompt && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="flex flex-col items-center space-y-1">
            <div className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center bg-white/20 backdrop-blur-md">
              <ChevronDown className="w-6 h-6 text-white" />
            </div>
            <span className="hidden sm:block text-white/80 text-sm font-medium drop-shadow-sm">
              Scroll down
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
