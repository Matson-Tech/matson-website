import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWedding } from '@/app/wedding/contexts/WeddingContext';
import DynamicUserWeddingPage from '../templates/DynamicUserWeddingPage';
import { toast } from '@/hooks/use-toast';

const WeddingEditPage = () => {
  const navigate = useNavigate();
  const { 
    user, 
    isLoggedIn, 
    isAuthInitialized,
    loadAllWeddingWishes 
  } = useWedding();

  // Handle authentication and data loading
  useEffect(() => {
    if (!isAuthInitialized) return;

    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please log in to edit your wedding website.",
        variant: "destructive",
      });
      
      const timer = setTimeout(() => navigate('/login'), 2000);
      return () => clearTimeout(timer);
    }

    // Load wedding wishes if user is authenticated
    loadAllWeddingWishes().catch((error) => {
      toast({
        title: "Error Loading Data",
        description: "Failed to load wedding data. Please refresh the page.",
        variant: "destructive",
      });
    });
  }, [isAuthInitialized, isLoggedIn, loadAllWeddingWishes, navigate]);

  // Loading state
  if (!isAuthInitialized || !isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {!isAuthInitialized ? 'Initializing...' : 'Redirecting to login...'}
          </p>
        </div>
      </div>
    );
  }

  return <DynamicUserWeddingPage />;
};

export default WeddingEditPage;
