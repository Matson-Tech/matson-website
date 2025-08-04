import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { WeddingProvider } from '../wedding/contexts/WeddingProvider';
import { Loader2 } from 'lucide-react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

interface PublicLayoutProps {
  children: React.ReactNode;
}

const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-12 w-12 animate-spin text-pink-500" />
      <p className="text-gray-600">Loading your wedding details...</p>
    </div>
  </div>
);

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <WeddingProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </div>
    </WeddingProvider>
  );
};

export default PublicLayout;
