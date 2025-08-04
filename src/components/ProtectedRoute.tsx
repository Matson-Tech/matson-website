import { Navigate, useLocation } from 'react-router-dom';
import { useWedding } from '@/app/wedding/contexts/WeddingContext';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, globalIsLoading } = useWedding();
  const location = useLocation();

  if (globalIsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) {
    // Store the attempted URL for redirecting after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
