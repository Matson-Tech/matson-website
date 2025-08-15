import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { flushSync } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/app/wedding/types/custom-types";
import { WeddingContext } from "./WeddingContext";
import type { AuthUser, WeddingData, WeddingWish, ScheduleItem } from "@/types/wedding";
import uploadImage from "@/utils/UploadImage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* -------------------- Default Wedding Data -------------------- */
const defaultWeddingData: WeddingData = {
  couple: {
    groomName: "Alec Richelieu",
    brideName: "Zola Bekker",
    weddingQuote: "Together We Journey – Two souls, one path, endless love.",
    image: "/couple/white.png",
  },
  story: {
    title: "The A to Z's of Alec & Zola",
    content:
      "We met on a beautiful autumn day in the local coffee shop. What started as a chance encounter over spilled coffee became the beginning of our forever love story. After three wonderful years together, Alec proposed during a romantic sunset at our favorite beach, and Zola said yes with tears of joy.",
    image: "/couple/white.png",
  },
  weddingDetails: {
    event1: {
      title: "Ceremony",
      date: "June 10, 2030",
      time: "5:00 PM",
      venue: "Spring Events Patio",
      address: "123 Spring Events Street, City, State 12345",
      addressMapLink: "https://maps.app.goo.gl/JDeNeY5MxbVFCeXK6",
    },
    event2: {
      title: "Reception",
      date: "June 10, 2030",
      time: "7:30 PM",
      venue: "Spring Events Ballroom",
      address: "123 Spring Events Street, City, State 12345",
      addressMapLink: "https://maps.app.goo.gl/JDeNeY5MxbVFCeXK6",
    },
    toKnow1: {
      title: "Dress Code",
      description:
        "Semi-formal attire requested. Ladies: cocktail dresses or elegant separates. Gentlemen: suit and tie or dress shirt with slacks.",
    },
    toKnow2: {
      title: "Gift Registry",
      description:
        "Your presence is our present! If you wish to give a gift, we have a registry at Target and Amazon.",
    },
    toKnow3: {
      title: "Song Requests",
      description:
        "Help us create the perfect playlist! Send us your song requests and we'll make sure to play your favorites.",
    },
  },
  schedule: [
    { id: "1", time: "4:30 PM", event: "Guest Arrival", description: "Welcome drinks and mingling" },
    { id: "2", time: "5:00 PM", event: "Ceremony", description: "Wedding ceremony begins" },
    { id: "3", time: "6:00 PM", event: "Cocktail Hour", description: "Photos and cocktails" },
    { id: "4", time: "7:30 PM", event: "Reception", description: "Dinner and dancing" },
  ],
  gallery: [
    { id: "0", url: "/couple/white.png", caption: null, name: null },
    { id: "1", url: "/couple/white.png", caption: null, name: null },
    { id: "2", url: "/couple/white.png", caption: null, name: null },
  ],
  moreInfo: {
    title: "Additional Information",
    content:
      "For dietary restrictions, please contact us at least one week before the wedding. We will have vegetarian and gluten-free options available. Children are welcome at both the ceremony and reception.",
  },
  contact: {
    phone: "+1 (555) 123-4567",
    email: "wedding@aleczola.com",
    address: "123 Main Street, City, State 12345",
    addressMapLink: "https://maps.app.goo.gl/JDeNeY5MxbVFCeXK6",
  },
  jeweller: {
    title: "Our Wedding Jeweller",
    description: "Discover exquisite wedding rings and jewellery collections from our trusted partner.",
    shopName: "Diamond Dreams Jewellers",
    website: "https://www.diamonddreamsjewellers.com",
  },
};

/* -------------------- Utilities -------------------- */
const transformScheduleToArray = (schedule: any): ScheduleItem[] => {
  if (Array.isArray(schedule)) return schedule;
  if (schedule && typeof schedule === "object") {
    const scheduleArray: ScheduleItem[] = [];
    Object.keys(schedule).forEach((key) => {
      const numKey = parseInt(key);
      if (!isNaN(numKey) && schedule[key] && typeof schedule[key] === "object") {
        const item = schedule[key];
        if (item.id && item.time && item.event) {
          scheduleArray.push({
            id: item.id,
            time: item.time,
            event: item.event,
            description: item.description || "",
          });
        }
      }
    });
    return scheduleArray;
  }
  return [];
};

const sanitizeWeddingData = (data: WeddingData): WeddingData => ({
  ...data,
  schedule: transformScheduleToArray(data.schedule),
  gallery: Array.isArray(data.gallery) ? data.gallery : [],
});

const persistUserToLocalStorage = (userData: AuthUser) => {
  localStorage.setItem("wedding_user", JSON.stringify(userData));
  localStorage.setItem("wedding_isLoggedIn", "true");
  localStorage.setItem("wedding_userId", userData.id);
};

const clearAuthLocalStorage = () => {
  localStorage.removeItem("wedding_user");
  localStorage.removeItem("wedding_isLoggedIn");
  localStorage.removeItem("wedding_userId");
};

const cloneData = <T,>(data: T): T => {
  if (typeof structuredClone === "function") {
    try {
      return structuredClone(data);
    } catch {
      return JSON.parse(JSON.stringify(data));
    }
  } else {
    return JSON.parse(JSON.stringify(data));
  }
};

/* -------------------- Context Hook -------------------- */
export const useWedding = () => {
  const context = React.useContext(WeddingContext);
  if (!context) {
    throw new Error("useWedding must be used within a WeddingProvider");
  }
  return context;
};

/* -------------------- WeddingProvider -------------------- */
interface ProviderProps {
  children: ReactNode;
}

export const WeddingProvider: React.FC<ProviderProps> = ({ children }) => {
    // State declarations with explicit types
    const [weddingData, setWeddingData] = useState<WeddingData>(defaultWeddingData);
    const [weddingWishes, setWeddingWishes] = useState<WeddingWish[]>([]);
    const [user, setUser] = useState<AuthUser | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAuthInitialized, setIsAuthInitialized] = useState<boolean>(false);
    const [globalIsLoading, setGlobalIsLoading] = useState<boolean>(true);
  
    const location = useLocation();
    const navigate = useNavigate();
  
    /** Helper: Save data to Supabase */
    // Helper function to transform schedule object to array
    const transformScheduleToArray = (schedule: any): ScheduleItem[] => {
      if (Array.isArray(schedule)) {
        return schedule;
      }
      
      if (schedule && typeof schedule === 'object') {
        // Convert object with numeric keys to array
        const scheduleArray: ScheduleItem[] = [];
        
        // Extract items with numeric keys
        Object.keys(schedule).forEach(key => {
          const numKey = parseInt(key);
          if (!isNaN(numKey) && schedule[key] && typeof schedule[key] === 'object') {
            const item = schedule[key];
            if (item.id && item.time && item.event) {
              scheduleArray.push({
                id: item.id,
                time: item.time,
                event: item.event,
                description: item.description || ''
              });
            }
          }
        });
        
        return scheduleArray;
      }
      
      return [];
    };

    const saveData = useCallback(
      async (data: WeddingData): Promise<boolean> => {
        if (!user?.id) {
          console.error("No user logged in");
          return false;
        }
        try {
          // Sanitize data before saving to ensure schedule is always an array
          const sanitizedData = {
            ...data,
            schedule: transformScheduleToArray(data.schedule),
            gallery: Array.isArray(data.gallery) ? data.gallery : []
          };
          
          const { error } = await supabase.from("web_entries").upsert(
            {
              user_id: user.id,
              web_data: sanitizedData as unknown as Json,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id" }
          );
          if (error) {
            console.error("Error saving wedding data:", error);
            return false;
          }

          // If template_id is provided, update user_profile table
          if (data.template_id) {
            const { error: profileError } = await supabase
              .from("user_profile")
              .update({ 
                template_id: data.template_id,
                updated_at: new Date().toISOString()
              })
              .eq("user_id", user.id);
            
            if (profileError) {
              console.error("Error updating user profile template:", profileError);
              // Don't return false here as the main data was saved successfully
            }
          }

          return true;
        } catch (error) {
          console.error("Error saving wedding data:", error);
          return false;
        }
      },
      [user]
    );
  
    /** Load wedding data by user id */
    const loadWeddingData = useCallback(
      async (userId: string): Promise<void> => {
        if (!userId || userId === "default") {
          console.log("No valid user ID provided, skipping data load. Id is:", userId);
          return;
        }
  
        try {
          const { data, error } = await supabase
            .from("web_entries")
            .select("web_data")
            .eq("user_id", userId)
            .maybeSingle();
  
          if (error) {
            console.error("Error loading wedding data:", error);
            return;
          }

          // Load template_id from user_profile
          const { data: profileData, error: profileError } = await supabase
            .from("user_profile")
            .select("template_id")
            .eq("user_id", userId)
            .single();
    
          if (!data?.web_data) {
            console.log("No data found for user:", userId);
            // Create initial wedding data for new users
            const success = await saveData(defaultWeddingData);
            if (success) {
              setWeddingData(defaultWeddingData);
            }
            return;
          }
    
          // Sanitize loaded data to ensure schedule and gallery are always arrays
          let loadedData = data.web_data as WeddingData;
          loadedData = {
            ...loadedData,
            schedule: transformScheduleToArray(loadedData.schedule),
            gallery: Array.isArray(loadedData.gallery) ? loadedData.gallery : [],
            // Add template_id from user_profile if available
            template_id: profileData?.template_id || loadedData.template_id
          };
          
          setWeddingData(loadedData); // Fixed: use loadedData instead of sanitizedData
    
          // If on wishes path, load wishes for this user variant
          if (location.pathname === "/wishes") {
            try {
              const { data: wishes, error: wishError } = await supabase
                .from("guest_wishes")
                .select("id, name, message")
                .eq("variant", userId)
                .order("created_at", { ascending: false })
                .limit(3);
  
              if (wishError) {
                console.error("Error loading wish data: ", wishError);
              } else {
                setWeddingWishes(wishes || []);
              }
            } catch (err) {
              console.error("Error loading wish data:", err);
            }
          }
        } catch (error) {
          console.error("Error loading wedding data:", error);
        } 
      },
      [location.pathname]
    );
  
    /** Load all wedding wishes - for admin or general show */
    const loadAllWeddingWishes = useCallback(async (): Promise<void> => {
      try {
        // Use user ID if available, otherwise skip loading
        if (!user?.id) {
          console.log("No user ID available, skipping wish loading");
          setWeddingWishes([]);
          return;
        }
  
        const { data, error } = await supabase
          .from("guest_wishes")
          .select("id, name, message")
          .eq("variant", user.id)
          .order("created_at", { ascending: false });
  
        if (error) {
          console.error("Error loading all wishes (Supabase error):", error);
          return;
        }
  
        setWeddingWishes(data || []);
      } catch (error) {
        console.error("Error loading all wishes:", error);
      }
    }, [user?.id]);
  
    /** Update wedding data partially and save */
    const updateWeddingData = useCallback(
      async (data: Partial<WeddingData>): Promise<boolean> => {
        const previousData = structuredClone(weddingData);
        const updated = { ...weddingData, ...data };
        setWeddingData(updated);
  
        const success = await saveData(updated);
        if (!success) {
          // revert on failure
          setWeddingData(previousData);
        }
        return success;
      },
      [weddingData, saveData]
    );
  
    /** Update a gallery image by index with a file upload */
    const updateGalleryImage = useCallback(
      async (file: File | null, imageCaption: string | null, index: number): Promise<void> => {
        const imageId = `${Date.now()}-${crypto.randomUUID()}`;
        const imageName = `gallery_image_${imageId}`;
  
        const updatedGallery = [...weddingData.gallery];
  
        // Add new image if index is out of range
        if (index >= updatedGallery.length) {
          updatedGallery.push({
            id: imageId,
            url: "",
            caption: imageCaption,
            name: imageName,
          });
        }
  
        if (file) {
          const imageUrl = await uploadImage(file, user, imageName);
          if (!imageUrl) {
            toast.error("Image upload failed");
            return;
          }
          updatedGallery[index].url = imageUrl;
        }
  
        updatedGallery[index].caption = imageCaption;
  
        await updateWeddingData({ gallery: updatedGallery });
      },
      [updateWeddingData, user, weddingData.gallery]
    );
  
    /** Add a guest wish */
    const addWish = useCallback(
      async (wish: Omit<WeddingWish, "id">): Promise<boolean> => {
        try {
          if (!user?.id) {
            console.error("Cannot add wish: No authenticated user");
            toast.error("You must be logged in to add a wish.");
            return false;
          }

        // Fix variant to user.id to align with load filter
        const { error } = await supabase.from("guest_wishes").insert({
          name: wish.name,
          message: wish.message,
          variant: user.id,
          created_at: new Date().toISOString(),
        });

        if (error) {
          toast.error("Failed to add your wish. Please try again.");
          return false;
        }

        await loadAllWishes();
        return true;
      } catch {
        toast.error("Failed to add your wish. Please try again.");
        return false;
      }
    },
    [user?.id, loadAllWishes]
  );

  /* -------- Handle auth state changes -------- */
  const handleAuthStateChange = useCallback(
    async (_event: string, session: Session | null) => {
      flushSync(() => setSession(session));

      if (!session?.user) {
        clearAuthLocalStorage();
        loadInProgress.current = false;
        wishesLoaded.current = false;
        currentLoadedUserId.current = null;

        flushSync(() => {
          setUser(null);
          setIsLoggedIn(false);
          setIsAuthInitialized(true);
          setGlobalLoading(false);
          setWeddingData(defaultWeddingData);
          setWeddingWishes([]);
        });
        return;
      }

      if (currentLoadedUserId.current === session.user.id && loadInProgress.current) {
        setIsAuthInitialized(true);
        setGlobalLoading(false);
        return;
      }

      try {
        const { data: profileData } = await supabase
          .from("user_profile")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

        const userData: AuthUser = {
          id: session.user.id,
          email: session.user.email || "",
          isAuthenticated: true,
          bride_name: profileData?.bride_name || "",
          groom_name: profileData?.groom_name || "",
          phone_number: profileData?.phone_number || "",
        };

        persistUserToLocalStorage(userData);

        flushSync(() => {
          setUser(userData);
          setIsLoggedIn(true);
          setIsAuthInitialized(true);
          setGlobalLoading(false);
        });

        if (!loadInProgress.current || currentLoadedUserId.current !== session.user.id) {
          await loadWeddingData(session.user.id);
        }
      } catch (error) {
        console.error("[handleAuthStateChange] Error in auth state change handler:", error);
        const fallbackUser: AuthUser = {
          id: session.user.id,
          email: session.user.email || "",
          isAuthenticated: true,
          bride_name: "",
          groom_name: "",
          phone_number: "",
        };
        persistUserToLocalStorage(fallbackUser);
        flushSync(() => {
          setUser(fallbackUser);
          setIsLoggedIn(true);
          setIsAuthInitialized(true);
          setGlobalLoading(false);
        });
      }
    },
    [loadWeddingData]
  );

  /* -------- Setup auth state listener -------- */
  useEffect(() => {
    if (authListenerRef.current) return;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthStateChange(event, session).catch(console.error);
    });
    authListenerRef.current = subscription;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (data.session?.user) {
          handleAuthStateChange("INITIAL_SESSION", data.session).catch(console.error);
        } else {
          setIsAuthInitialized(true);
          setGlobalLoading(false);
        }
      })
      .catch(() => {
        setIsAuthInitialized(true);
        setGlobalLoading(false);
      });

    return () => {
      subscription?.unsubscribe();
      authListenerRef.current = null;
    };
  }, [handleAuthStateChange]);

  /* -------- Listen for new guest wishes (filtered by user) -------- */
  useEffect(() => {
    if (!user?.id) {
      // Ensure cleanup when user becomes null
      return;
    }

    const channel = supabase.channel(`wishes-channel-${user.id}`); // Make channel name unique

    channel.on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "guest_wishes", filter: `variant=eq.${user.id}` },
      (payload) => {
        const newWish = payload.new as WeddingWish;
        setWeddingWishes((prev) => [newWish, ...prev]);
      }
    ).subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  /* -------- Listen for wedding data realtime updates -------- */
  useEffect(() => {
    if (!user?.id || !isAuthInitialized) return;

    const channel = supabase.channel(`wedding-data-channel-${user.id}`);

    channel.on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'web_entries',
        filter: `user_id=eq.${user.id}`,
      },
      (payload) => {
        const updatedData = payload.new.web_data as WeddingData;
        const sanitizedData = {
          ...updatedData,
          schedule: transformScheduleToArray(updatedData.schedule),
          gallery: Array.isArray(updatedData.gallery) ? updatedData.gallery : [],
        };
        setWeddingData(sanitizedData);
      }
    ).subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, isAuthInitialized]);

  /* -------- Login -------- */
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (!data.user) throw new Error("No user data returned from authentication");

        const { data: profileData, error: profileError } = await supabase
          .from("user_profile")
          .select("*")
          .eq("user_id", data.user.id)
          .single();

        if (profileError) console.warn("Profile loading failed:", profileError);

        const userData: AuthUser = {
          id: data.user.id,
          email: data.user.email || email,
          isAuthenticated: true,
          bride_name: profileData?.bride_name || "",
          groom_name: profileData?.groom_name || "",
          phone_number: profileData?.phone_number || "",
          access_token: data.session?.access_token || "",
          refresh_token: data.session?.refresh_token || "",
        };

        persistUserToLocalStorage(userData);

        flushSync(() => {
          setUser(userData);
          setIsLoggedIn(true);
          setSession(data.session);
        });

        await loadWeddingData(data.user.id);
        return { error: null, user: userData };
      } catch (error: any) {
        console.error("Login error:", error);
        clearAuthLocalStorage();
        setUser(null);
        setIsLoggedIn(false);
        setSession(null);
        return {
          error: error.message || "An unexpected error occurred during login",
          user: null,
        };
      }
    },
    [loadWeddingData]
  );

  /* -------- Logout -------- */
  /** Logout function */
  const logout = useCallback(async () => {
    try {
      // Sign out from Supabase with scope 'local' to clear all storage
      const { error } = await supabase.auth.signOut({ scope: 'local' });
      if (error) {
        console.error("Supabase signOut error:", error);
        // Continue with cleanup even if signOut fails
      }
  
      // Clear ALL local storage (not just specific keys)
      localStorage.clear();
      sessionStorage.clear();
  
      // Reset state
      setUser(null);
      setIsLoggedIn(false);
      setWeddingData(defaultWeddingData);
      setWeddingWishes([]);
      setSession(null);
  
      // Force a complete page reload to ensure clean state
      window.location.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Force cleanup even if there's an error
      localStorage.clear();
      sessionStorage.clear();
      window.location.replace("/");
    }
  }, []);

  /* -------- Register -------- */
  const register = useCallback(
    async (email: string, password: string, userData: Partial<AuthUser> = {}) => {
      try {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        if (!data.user?.id) throw new Error("User creation failed: No user ID returned");

        const { error: profileError } = await supabase
          .from("user_profile")
          .insert([
            {
              user_id: data.user.id,
              email,
              bride_name: userData.bride_name || "",
              groom_name: userData.groom_name || "",
              phone_number: userData.phone_number || "",
            },
          ]);
        if (profileError) throw new Error(`Profile insertion failed: ${profileError.message}`);

        const authUser: AuthUser = {
          id: data.user.id,
          email: data.user.email || email,
          isAuthenticated: true,
          bride_name: userData.bride_name || "",
          groom_name: userData.groom_name || "",
          phone_number: userData.phone_number || "",
          access_token: data.session?.access_token || "",
          refresh_token: data.session?.refresh_token || "",
        };

        setUser(authUser);
        setSession(data.session);
        setIsLoggedIn(true);
        await loadWeddingData(data.user.id);

        return { user: authUser, error: null };
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("Registration failed. Please try again.");
        return { user: null, error };
      }
    },
    [loadWeddingData]
  );

  /* -------- Password Reset -------- */
  const resetPassword = useCallback(async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      toast.success("Password reset email sent!");
      return { error: null };
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Failed to send password reset email");
      return { error };
    }
  }, []);

  /* -------- Update Profile -------- */
  const updateProfile = useCallback(
    async (updates: Partial<AuthUser>) => {
      try {
        const { data, error } = await supabase.auth.updateUser({ data: updates });
        if (error) throw error;
        if (!data.user) throw new Error("User not returned after update");

        setUser((prev) =>
          prev
            ? {
                ...prev,
                ...updates,
                updated_at: new Date().toISOString(),
              }
            : null
        );

        toast.success("Profile updated successfully!");
        return { user: data.user, error: null };
      } catch (error) {
        console.error("Profile update error:", error);
        toast.error("Failed to update profile");
        return { user: null, error };
      }
    },
    []
  );

  /* -------- Context value -------- */
  const contextValue = useMemo(
    () => ({
      weddingData,
      weddingWishes,
      user,
      session,
      isLoggedIn,
      isAuthInitialized,
      globalIsLoading: globalLoading, // Fix: Match interface property name
      loadWeddingData,
      setWeddingData,
      setWeddingWishes,
      setUser,
      setSession,
      setIsLoggedIn,
      loadAllWeddingWishes: loadAllWishes, // Fix: Match interface property name
      updateWeddingData,
      updateGalleryImage,
      saveData,
      addWish,
      login,
      logout,
      register,
      resetPassword,
      updateProfile,
      setIsAuthInitialized,
    }),
    [
      weddingData,
      weddingWishes,
      user,
      session,
      isLoggedIn,
      isAuthInitialized,
      globalLoading,
      loadWeddingData,
      loadAllWishes,
      updateWeddingData,
      updateGalleryImage,
      saveData,
      addWish,
      login,
      logout,
      register,
      resetPassword,
      updateProfile,
    ]
  );

  return <WeddingContext.Provider value={contextValue}>{children}</WeddingContext.Provider>;
};

export default WeddingProvider;
