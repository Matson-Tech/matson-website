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
    <section className="relative w-full overflow-hidden select-none min-h-[600px] sm:min-h-[700px] md:min-h-[800px]">
      
      {/* Full background video for desktop and tablets */}
      <video
        className="hidden sm:block absolute inset-0 w-full h-full object-cover z-0"
        src={"https://kzhbmjygrzjardgruunp.supabase.co/storage/v1/object/public/wedding_card/Untitled%20folder/Timeline%201.webm"}
        autoPlay
        loop
        muted
        playsInline
      >
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay for full screen video */}
      <div className="hidden sm:block absolute inset-0 bg-black/50 z-0"></div>

      {/* Mobile view: square video box at top */}
      <div className="sm:hidden relative w-full max-w-[400px] aspect-square mx-auto overflow-hidden rounded-xl shadow-lg">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={"https://kzhbmjygrzjardgruunp.supabase.co/storage/v1/object/public/wedding_card/Untitled%20folder/Timeline%201.webm"}
          autoPlay
          loop
          muted
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Text content below video on mobile, and over video on larger screens */}
      <div className="relative z-10 container mx-auto px-4 mt-6 sm:mt-0 text-center w-full max-w-5xl">
        <h1 className="font-serif text-4xl md:text-7xl font-medium mb-4 leading-tight text-matson-black sm:text-white">
          Wedding planning starts here
        </h1>
        <p className="text-lg md:text-2xl mb-8 font-light leading-relaxed text-matson-black/90 sm:text-white/90 max-w-3xl mx-auto">
          From beautiful invitation templates and wedding websites to full planning services — Matson is here for all the days along the way
        </p>
        <div className="flex justify-center">
          <Link to="/login">
            <Button
              size="lg"
              className="border-2 border-matson-black text-matson-black hover:bg-matson-black hover:text-white text-xl px-12 py-4 rounded-full font-medium bg-transparent sm:border-white sm:text-white sm:hover:bg-white sm:hover:text-matson-black transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>

      {/* Animated scroll prompt */}
      {showScrollPrompt && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-opacity duration-500">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 border-2 border-white/70 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm">
              <ChevronDown className="w-5 h-5 text-white" />
            </div>
            <span className="text-white/80 text-sm font-medium hidden sm:block">Scroll down</span>
          </div>
        </div>
      )}

    </section>
  );
};

export default Hero;
