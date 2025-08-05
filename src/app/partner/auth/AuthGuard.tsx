
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Heart, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type AuthGuardProps = {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: 'partner' | 'admin';
};

export default function AuthGuard({ children, requireAuth = true, requiredRole = 'partner' }: AuthGuardProps) {
  const { user, loading, session } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(true);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyRole = async () => {
      // Skip if we're still loading the initial auth state
      if (loading) return;

      // If we've already done the initial check and the user hasn't changed, skip
      if (initialCheckDone && user) return;

      if (requireAuth) {
        // Only redirect if we're certain the user is not logged in
        if (!user) {
          // Only show the error if we've completed the initial check
          if (initialCheckDone) {
            toast.error("Please log in to access this page");
            navigate("/partner/auth");
          }
          return;
        }

        try {
          // Fetch user role from profiles table
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

          if (error || !profile) {
            console.error('Error fetching user role:', error);
            throw new Error("Error verifying your account permissions");
          }

          setRole(profile.role);

          // Check if user has required role
          if (profile.role !== requiredRole && profile.role !== 'admin') {
            navigate("/");
            return;
          }

          // For partners, verify their account is approved
          if (profile.role === 'partner') {
            const { data: partnerProfile, error: partnerError } = await supabase
              .from('partner_profile')
              .select('verified')
              .eq('partner_id', user.id)
              .single();

            if (partnerError || !partnerProfile?.verified) {
              navigate("/");
              return;
            }
          }
          
          // If we get here, all checks passed
          setVerifying(false);
          setInitialCheckDone(true);
          
        } catch (error: any) {
          console.error('Auth verification error:', error);
          if (initialCheckDone) {
            if (error.message === "You don't have permission to access this page" || 
                error.message === "Your partner account is pending approval") {
              navigate("/");
            } else {
              toast.error(error.message || "Authentication error");
              await supabase.auth.signOut();
              navigate("/partner/auth");
            }
          }
        }
      } else if (!requireAuth && user) {
        // If user is logged in but this is a public route, redirect to dashboard
        if (initialCheckDone) {
          navigate("/partner/dashboard");
        }
      } else {
        // For public routes when user is not logged in
        setVerifying(false);
        setInitialCheckDone(true);
      }
    };

    verifyRole();
  }, [user, loading, navigate, requireAuth, requiredRole, initialCheckDone]);

  // Show loading state while verifying or if we haven't completed the initial check
  if (loading || (!initialCheckDone && requireAuth) || verifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg mb-6 animate-pulse mx-auto">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
              <Heart className="w-3 h-3 text-white" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying access...</h2>
          <p className="text-gray-600">Please wait while we verify your permissions</p>
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if ((requireAuth && !user) || (!requireAuth && user)) {
    return null;
  }

  // If role check passed, render children
  return <>{children}</>;
}
