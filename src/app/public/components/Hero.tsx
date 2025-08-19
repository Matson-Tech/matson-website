import { Button } from '@/components/ui/button';
import { ChevronDown, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';

const Hero = () => {
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Detect mobile viewport
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Scroll prompt logic
  useEffect(() => {
    const timer = setTimeout(() => setShowScrollPrompt(true), 3000);
    const onScroll = () => window.scrollY > 100 && setShowScrollPrompt(false);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const togglePlayback = useCallback(() => {
    const video = isMobile ? mobileVideoRef.current : desktopVideoRef.current;
    if (!video) return;
    if (isVideoPlaying) video.pause();
    else video.play();
    setIsVideoPlaying(!isVideoPlaying);
  }, [isVideoPlaying, isMobile]);

  const onLoaded = useCallback(() => setIsVideoLoaded(true), []);

  const scrollToNext = () =>
    window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });

  const videoSrc =
    'https://kzhbmjygrzjardgruunp.supabase.co/storage/v1/object/public/wedding_card/Untitled%20folder/Timeline%201.webm';

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden">
      {/* Loading */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-br from-rose-100 to-pink-50">
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 mx-auto animate-spin rounded-full border-4 border-rose-200 border-t-rose-500" />
            <p className="text-rose-600 font-medium">Loading experience...</p>
          </div>
        </div>
      )}

      {/* Desktop Video */}
      {!isMobile && (
        <>
          <video
            ref={desktopVideoRef}
            className="hidden sm:block absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedData={onLoaded}
            style={{ opacity: isVideoLoaded ? 1 : 0 }}
          />
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/40 z-10" />
        </>
      )}

      {/* Mobile Video */}
      {isMobile && (
        <div className="relative w-full max-w-[85vw] aspect-square mx-auto mt-6 mb-8 z-0 group">
          <video
            ref={mobileVideoRef}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 rounded-3xl shadow-2xl"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedData={onLoaded}
            style={{ opacity: isVideoLoaded ? 1 : 0 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />
          <button
            onClick={togglePlayback}
            aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            {isVideoPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white ml-0.5" />
            )}
          </button>
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 flex-1 flex items-center justify-center w-full px-4 text-center container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="transition-all duration-500 bg-white/95 text-matson-black shadow-xl rounded-3xl p-8 backdrop-blur-sm border border-white/20 sm:bg-transparent sm:text-white sm:shadow-none sm:rounded-none sm:p-0 sm:backdrop-blur-none sm:border-none">
            <h1 className="mb-6 text-3xl font-medium leading-tight tracking-tight font-serif sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Wedding planning</span>
              <span className="block bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent sm:bg-none sm:bg-gradient-to-none sm:text-white">
                starts here
              </span>
            </h1>
            <p className="mb-10 text-base leading-relaxed font-light max-w-4xl mx-auto text-gray-700 sm:text-lg md:text-xl lg:text-2xl sm:text-white/90 sm:mb-12">
              From beautiful invitation templates and wedding websites to full planning services —{' '}
              <span className="font-medium">Matson is here for all the days along the way</span>
            </p>
            <div className="flex flex-col gap-4 mb-8 sm:mb-12 sm:flex-row justify-center items-center">
              <Link to="/login" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-8 py-4 text-lg sm:text-xl font-semibold text-rose-600 border-2 border-rose-500 rounded-full bg-white/90 transition-all duration-300 shadow-lg hover:bg-rose-500 hover:text-white hover:shadow-xl transform hover:scale-105 focus:ring-4 focus:ring-rose-200 sm:border-white sm:bg-transparent sm:text-white sm:hover:bg-white sm:hover:text-matson-black sm:focus:ring-white/30"
                >
                  Get Started
                </Button>
              </Link>
            </div>
            {isMobile && (
              <div className="grid grid-cols-3 gap-4 text-xs text-gray-600 sm:hidden">
                {['Templates', 'Websites', 'Planning'].map((label, i) => (
                  <div key={i} className="text-center">
                    <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 bg-rose-100 rounded-full">
                      <span className="font-bold text-rose-500">{i + 1}</span>
                    </div>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll prompt */}
      {showScrollPrompt && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 sm:bottom-8">
          <button
            onClick={scrollToNext}
            aria-label="Scroll to next section"
            className="flex flex-col items-center space-y-2 group animate-bounce transition-all duration-300 hover:animate-pulse"
          >
            <div className="flex items-center justify-center w-12 h-12 mb-1 bg-white/10 border-2 border-white/70 rounded-full backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20 group-hover:border-white shadow-lg">
              <ChevronDown className="w-6 h-6 text-white" />
            </div>
            <span className="hidden text-sm font-medium text-white/80 sm:block group-hover:text-white transition-colors duration-300">
              Explore more
            </span>
          </button>
        </div>
      )}

      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 font-medium bg-white text-black rounded-lg"
      >
        Skip to main content
      </a>
    </div>
  );
};

export default Hero;
  