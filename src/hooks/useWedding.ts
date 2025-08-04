import { useContext } from 'react';
import { WeddingContext } from '@/app/wedding/contexts/WeddingContext';

const useWedding = () => {
  const context = useContext(WeddingContext);
  
  if (context === undefined) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  
  return context;
};

export default useWedding;
