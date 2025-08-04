import React from 'react';
import { Toaster } from '@/components/ui/toaster';

const WeddingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white">
      <Toaster />
      {children}
    </div>
  );
};

export default WeddingLayout;
