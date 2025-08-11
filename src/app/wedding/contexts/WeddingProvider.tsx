import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { flushSync } from "react-dom";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/app/wedding/types/custom-types";
import { WeddingContext } from "./WeddingContext";
import type {
  AuthUser,
  WeddingData,
  WeddingWish,
  ScheduleItem,
} from "@/types/wedding";
import uploadImage from "@/utils/UploadImage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Default empty wedding data structure
const createEmptyWeddingData = (): WeddingData => ({
  couple: {
    groomName: "",
    brideName: "",
    weddingQuote: "",
    image: "",
  },
  story: {
    title: "",
    content: "",
    image: "",
  },
  weddingDetails: {
    event1: {
      title: "",
      date: "",
      time: "",
      venue: "",
      address: "",
      addressMapLink: ""
    },
    event2: {
      title: "",
      date: "",
      time: "",
      venue: "",
      address: "",
      addressMapLink: ""
    },
    toKnow1: {
      title: "",
      description: ""
    },
    toKnow2: {
      title: "",
      description: ""
    },
    toKnow3: {
      title: "",
      description: ""
    }
  },
  schedule: [],
  gallery: [],
  moreInfo: {
    title: "",
    content: "",
  },
  contact: {
    phone: "",
    email: "",
    address: "",
    addressMapLink: "",
  },
  jeweller: {
    title: "",
    description: "",
    shopName: "",
    website: "",
  },
});
  const transformScheduleToArray = (schedule: any): ScheduleItem[] => {
  if (Array.isArray(schedule)) return schedule;
  return Object.keys(schedule || {})
    .filter((k) => !isNaN(+k) && typeof schedule[k] === "object")
    .map((k) => {
      const { id, time, event, description } = schedule[k];
      return id && time && event
        ? { id, time, event, description: description || "" }
        : null;
    })
    .filter(Boolean) as ScheduleItem[];
};

const sanitizeWeddingData = (data: WeddingData): WeddingData => ({
  ...data,
  schedule: transformScheduleToArray(data.schedule),
  gallery: Array.isArray(data.gallery) ? data.gallery : [],
});

const saveUserToStorage = (user: AuthUser | null) => {
  if (user) {
    localStorage.setItem("wedding_user", JSON.stringify(user));
    localStorage.setItem("wedding_isLoggedIn", "true");
    localStorage.setItem("wedding_userId", user.id);
  } else {
    ["wedding_user", "wedding_isLoggedIn", "wedding_userId"].forEach((k) =>
      localStorage.removeItem(k)
    );
  }
};

/** -----------------------
 * Wedding Context Hook
 * ---------------------- */
export const useWedding = () => {
  const context = React.useContext(WeddingContext);
  if (!context) throw new Error("useWedding must be used within a WeddingProvider");
  return context;
};

/** -----------------------
 * Provider
 * ---------------------- */
export const WeddingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weddingData, setWeddingData] = useState<WeddingData>(createEmptyWeddingData());
  const [weddingWishes, setWeddingWishes] = useState<WeddingWish[]>([]);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const [globalIsLoading, setGlobalIsLoading] = useState(true);

  const location = useLocation();

  /** Save data to Supabase */
  const saveData = useCallback(
    async (data: WeddingData) => {
      if (!user?.id) return false;
      try {
        const sanitized = sanitizeWeddingData(data);
        const { error } = await supabase.from("web_entries").upsert(
          {
            user_id: user.id,
            web_data: sanitized as unknown as Json,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );
        if (error) throw error;
        return true;
      } catch (err) {
        console.error("Error saving wedding data:", err);
        return false;
      }
    },
    [user]
  );

  /** Load wedding data */
  const loadWeddingData = useCallback(
    async (userId: string) => {
      if (!userId || userId === "default") return;
      try {
        const { data, error } = await supabase
          .from("web_entries")
          .select("web_data")
          .eq("user_id", userId)
          .maybeSingle();
        if (error) throw error;
        if (data?.web_data) setWeddingData(sanitizeWeddingData(data.web_data as WeddingData));

        if (location.pathname === "/wishes") {
          const { data: wishes, error: wishErr } = await supabase
            .from("guest_wishes")
            .select("id, name, message")
            .eq("variant", userId)
            .order("created_at", { ascending: false })
            .limit(3);
          if (!wishErr) setWeddingWishes(wishes || []);
        }
      } catch (err) {
        console.error("Error loading wedding data:", err);
      }
    },
    [location.pathname]
  );

  const loadAllWeddingWishes = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("guest_wishes")
        .select("id, name, message")
        .eq("variant", import.meta.env.VITE_WEBSITE_KEY || "")
        .order("created_at", { ascending: false });
      if (!error) setWeddingWishes(data || []);
    } catch (err) {
      console.error("Error loading all wishes:", err);
    }
  }, []);

  /** Partial update + save */
  const updateWeddingData = useCallback(
    async (data: Partial<WeddingData>) => {
      const prev = structuredClone(weddingData);
      const updated = { ...weddingData, ...data };
      setWeddingData(updated);
      if (!(await saveData(updated))) setWeddingData(prev);
      return true;
    },
    [weddingData, saveData]
  );

  /** Gallery image update */
  const updateGalleryImage = useCallback(
    async (file: File | null, caption: string | null, idx: number): Promise<void> => {
      const imageId = `${Date.now()}-${crypto.randomUUID()}`;
      const name = `gallery_image_${imageId}`;
      const updated = [...weddingData.gallery];
      if (idx >= updated.length) updated.push({ id: imageId, url: "", caption, name });
      if (file) {
        const url = await uploadImage(file, user, name);
        if (!url) {
          toast.error("Image upload failed");
          return;
        }
        updated[idx].url = url;
      }
      updated[idx].caption = caption;
      await updateWeddingData({ gallery: updated });
    },
    [updateWeddingData, user, weddingData.gallery]
  );

  /** Add wish */
  const addWish = useCallback(
    async (wish: Omit<WeddingWish, "id">) => {
      if (!user?.id) {
        toast.error("You must be logged in to add a wish.");
        return false;
      }
      try {
        const { data: webEntry } = await supabase
          .from("web_entries")
          .select("id")
          .eq("user_id", user.id)
          .single();
        if (!webEntry) throw new Error("Wedding data not found.");

        const { error } = await supabase.from("guest_wishes").insert({
          ...wish,
          variant: webEntry.id,
          created_at: new Date().toISOString(),
        });
        if (error) throw error;

        await loadAllWeddingWishes();
        return true;
      } catch (err) {
        console.error(err);
        toast.error("Failed to add your wish. Please try again.");
        return false;
      }
    },
    [user?.id, loadAllWeddingWishes]
  );

  /** Auth change handler */
  const handleAuthStateChange = useCallback(
    async (_: string, sess: Session | null) => {
      flushSync(() => setSession(sess));
      if (!sess?.user) {
        flushSync(() => {
          setUser(null);
          setIsLoggedIn(false);
          setIsAuthInitialized(true);
          setGlobalIsLoading(false);
        });
        return;
      }
      try {
        saveUserToStorage(null);
        flushSync(() => {
          setUser(null);
          setIsLoggedIn(false);
          setWeddingData(createEmptyWeddingData());
          setWeddingWishes([]);
        });

        const { data: profile } = await supabase
          .from("user_profile")
          .select("*")
          .eq("user_id", sess.user.id)
          .single();

        const userData: AuthUser = {
          id: sess.user.id,
          email: sess.user.email || "",
          isAuthenticated: true,
          bride_name: profile?.bride_name || "",
          groom_name: profile?.groom_name || "",
          phone_number: profile?.phone_number || "",
        };

        saveUserToStorage(userData);
        flushSync(() => {
          setUser(userData);
          setIsLoggedIn(true);
          setIsAuthInitialized(true);
          setGlobalIsLoading(false);
        });

        await loadWeddingData(sess.user.id);
      } catch (err) {
        console.error("Auth change error", err);
      }
    },
    [loadWeddingData]
  );

  /** Auth effects */
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) handleAuthStateChange("INITIAL_SESSION", data.session);
      else {
        setIsAuthInitialized(true);
        setGlobalIsLoading(false);
      }
    });
    return () => subscription?.unsubscribe();
  }, [handleAuthStateChange]);

  /** Realtime listeners */
  useEffect(() => {
    const ch = supabase.channel("wishes-channel").on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "guest_wishes" },
      (pl) => setWeddingWishes((prev) => [pl.new as WeddingWish, ...prev])
    ).subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    const ch = supabase.channel("wedding-data-channel").on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "web_entries", filter: `user_id=eq.${user.id}` },
      (pl) => setWeddingData(sanitizeWeddingData(pl.new.web_data as WeddingData))
    ).subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [user?.id]);

  /** Auth methods */
  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error || !data.user) throw error || new Error("Login failed");

      const { data: profile } = await supabase
        .from("user_profile")
        .select("*")
        .eq("user_id", data.user.id)
        .single();

      const userData: AuthUser = {
        id: data.user.id,
        email: data.user.email || email,
        isAuthenticated: true,
        bride_name: profile?.bride_name || "",
        groom_name: profile?.groom_name || "",
        phone_number: profile?.phone_number || "",
        access_token: data.session?.access_token || "",
        refresh_token: data.session?.refresh_token || "",
      };

      saveUserToStorage(userData);
      flushSync(() => {
        setUser(userData);
        setIsLoggedIn(true);
        setSession(data.session);
      });
      await loadWeddingData(data.user.id);
      return { error: null, user: userData };
    } catch (err: any) {
      console.error("Login error:", err);
      saveUserToStorage(null);
      setUser(null);
      setIsLoggedIn(false);
      setSession(null);
      return { error: err.message, user: null };
    }
  }, [loadWeddingData]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    saveUserToStorage(null);
    setUser(null);
    setIsLoggedIn(false);
    setWeddingData(createEmptyWeddingData());
    setWeddingWishes([]);
    if (typeof window !== "undefined") window.location.href = "/";
  }, []);

  const register = useCallback(async (email: string, password: string, usr: Partial<AuthUser> = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error || !data.user?.id) throw error || new Error("User creation failed");

      await supabase.from("user_profile").insert([{
        user_id: data.user.id,
        email,
        bride_name: usr.bride_name || "",
        groom_name: usr.groom_name || "",
        phone_number: usr.phone_number || "",
      }]);

      const newUser: AuthUser = {
        id: data.user.id,
        email: data.user.email || email,
        isAuthenticated: true,
        bride_name: usr.bride_name || "",
        groom_name: usr.groom_name || "",
        phone_number: usr.phone_number || "",
        access_token: data.session?.access_token || "",
        refresh_token: data.session?.refresh_token || "",
      };
      saveUserToStorage(newUser);
      setUser(newUser);
      setSession(data.session);
      setIsLoggedIn(true);
      await loadWeddingData(data.user.id);
      return { user: newUser, error: null };
    } catch (err) {
      toast.error("Registration failed.");
      return { user: null, error: err };
    }
  }, [loadWeddingData]);

  const resetPassword = useCallback(async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      toast.success("Password reset email sent!");
      return { error: null };
    } catch (err) {
      toast.error("Failed to send password reset email");
      return { error: err };
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<AuthUser>) => {
    try {
      const { data, error } = await supabase.auth.updateUser({ data: updates });
      if (error) throw error;
      if (data.user) {
        setUser((prev) => (prev ? { ...prev, ...updates, updated_at: new Date().toISOString() } : null));
        toast.success("Profile updated successfully!");
        return { user: data.user, error: null };
      }
      throw new Error("User not returned after update");
    } catch (err) {
      toast.error("Failed to update profile");
      return { user: null, error: err };
    }
  }, []);

  /** Context value */
  const contextValue = useMemo(
    () => ({
      weddingData, weddingWishes, user, session, isLoggedIn, isAuthInitialized, globalIsLoading,
      loadWeddingData, setWeddingData, setWeddingWishes, setUser, setSession, setIsLoggedIn,
      loadAllWeddingWishes, updateWeddingData, updateGalleryImage, saveData, addWish,
      login, logout, register, resetPassword, updateProfile, setIsAuthInitialized,
    }),
    [weddingData, weddingWishes, user, session, isLoggedIn, isAuthInitialized,
     loadWeddingData, loadAllWeddingWishes, updateWeddingData, updateGalleryImage,
     saveData, addWish, login, logout, register, resetPassword, updateProfile]
  );

  return <WeddingContext.Provider value={contextValue}>{children}</WeddingContext.Provider>;
};

export default WeddingProvider;
