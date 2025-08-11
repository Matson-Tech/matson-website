"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { useSearchParams } from "react-router-dom";
import {
  WeddingContext,
  useWedding,
} from "@/app/wedding/contexts/WeddingContext";
import ResizableTemplateSidebar from "@/app/wedding/components/sidebar/ResizableTemplateSidebar";
import { cn } from "@/lib/utils";
import type { WeddingData, ScheduleItem } from "@/types/wedding";
import { useToast } from "@/components/ui/use-toast";

interface SidebarContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error("useSidebar must be used within SidebarProvider");
  return context;
}

function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      if (window.innerWidth < 768) setOpen(false);
    };
    window.addEventListener("routechange", handleRouteChange);
    return () => window.removeEventListener("routechange", handleRouteChange);
  }, []);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

function DynamicUserWeddingPage() {
  const { session, weddingData } = useContext(WeddingContext) ?? {};
  const [searchParams] = useSearchParams();
  const [iframeUrl, setIframeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState("model_1");
  const [isSaving, setIsSaving] = useState(false);
  const { open, setOpen } = useSidebar();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeKey, setIframeKey] = useState(0);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // Add pending changes state to track unsaved sidebar modifications
  const [pendingChanges, setPendingChanges] = useState<Partial<WeddingData>>(
    {},
  );
  
  // Use ref to access current weddingData without causing re-renders
  const weddingDataRef = useRef(weddingData);
  
  // Update ref when weddingData changes
  useEffect(() => {
    weddingDataRef.current = weddingData;
  }, [weddingData]);

  useEffect(() => {
    const accessToken =
      searchParams.get("access_token") ?? session?.access_token ?? "";
    const refreshToken =
      searchParams.get("refresh_token") ?? session?.refresh_token ?? "";

    const url = new URL("https://template-7.matson.app/login");
    if (accessToken) url.searchParams.append("access_token", accessToken);
    if (refreshToken) url.searchParams.append("refresh_token", refreshToken);
    console.log(url.toString());

    setIframeUrl(url.toString());
    setIsLoading(false);
  }, [searchParams, session]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (open && window.innerWidth < 768) {
        const sidebar = document.querySelector("[data-sidebar]");
        const toggleButton = document.querySelector("[data-toggle-sidebar]");
        if (
          sidebar &&
          !sidebar.contains(e.target as Node) &&
          toggleButton &&
          !toggleButton.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);

  useEffect(() => {
    const onResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      // Only close sidebar when switching to mobile, don't force open on desktop
      if (!desktop) {
        setOpen(false);
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setOpen]);

  // Set initial sidebar state based on screen size
  useEffect(() => {
    const desktop = window.innerWidth >= 768;
    setOpen(desktop);
  }, [setOpen]);

  const { updateWeddingData } = useWedding();
  const { toast } = useToast();

  // Handle field changes from sidebar (for Enter key immediate saves)
  const handleFieldChange = useCallback(
    async (section: keyof WeddingData, field: string, value: string) => {
      if (!weddingData) return;

      // Create immediate save data for this field
      const immediateData = {
        ...weddingData,
        [section]: {
          ...(weddingData[section] as any),
          [field]: value,
        },
      };

      try {
        const success = await updateWeddingData(immediateData);
        if (success) {
          toast({
            title: "Saved",
            description: `${field} saved successfully.`,
            variant: "default",
          });
          // Remove this field from pending changes since it's now saved
          setPendingChanges((prev) => {
            const updated = { ...prev };
            if (updated[section]) {
              const sectionData = { ...(updated[section] as any) };
              delete sectionData[field];
              if (Object.keys(sectionData).length === 0) {
                delete updated[section];
              } else {
                updated[section] = sectionData;
              }
            }
            return updated;
          });
        }
      } catch (error) {
        console.error("Failed to save field:", error);
        toast({
          title: "Error",
          description: "Failed to save field.",
          variant: "destructive",
        });
      }
    },
    [weddingData, updateWeddingData, toast],
  );

  // Handle pending field changes (for changes without Enter)
  const handlePendingChange = useCallback(
    (section: keyof WeddingData, field: string, value: string) => {
      setPendingChanges((prev) => {
        // Handle special array_update field (entire array replacement)
        if (field === 'array_update') {
          try {
            const newArray = JSON.parse(value);
            return { ...prev, [section]: newArray };
          } catch (error) {
            console.error('Failed to parse array update:', error);
            return prev;
          }
        }
        
        // Handle array field updates (e.g., "0.time", "1.event")
        if (field.includes('.')) {
          const [indexStr, arrayField] = field.split('.');
          const index = parseInt(indexStr);
          
          if (!isNaN(index)) {
            // Get current array data
            const currentArray = (prev[section] as any) ?? (weddingDataRef.current?.[section] as any) ?? [];
            const newArray = Array.isArray(currentArray) ? [...currentArray] : [];
            
            // Ensure array has enough items
            while (newArray.length <= index) {
              if (section === 'schedule') {
                newArray.push({ id: '', time: '', event: '', description: '' });
              } else if (section === 'gallery') {
                newArray.push({ url: '', name: '', caption: '' });
              } else {
                newArray.push({});
              }
            }
            
            // Update the specific field in the array item
            newArray[index] = {
              ...newArray[index],
              [arrayField]: value
            };
            
            return { ...prev, [section]: newArray };
          }
        }
        
        // Handle regular field updates
        const sectionData = {
          ...((prev[section] as any) ?? (weddingDataRef.current?.[section] as any) ?? {}),
        };
        sectionData[field] = value;
        return { ...prev, [section]: sectionData };
      });
    },
    [], // Remove weddingData dependency to prevent callback recreation
  );

  // Updated save handler to include pending changes
  const handleSaveTemplate = useCallback(async () => {
    if (!weddingData) return;
    setIsSaving(true);

    try {
      // Merge wedding data with pending changes
      const savePayload = { ...weddingData };
      
      // Apply pending changes with proper array handling
      Object.keys(pendingChanges).forEach(section => {
        const sectionChanges = pendingChanges[section as keyof WeddingData];
        if (Array.isArray(sectionChanges)) {
          // For array sections (schedule, gallery), replace the entire array
          savePayload[section as keyof WeddingData] = sectionChanges as any;
        } else if (sectionChanges && typeof sectionChanges === 'object') {
          // For object sections, merge the changes
          const currentSectionData = savePayload[section as keyof WeddingData];
          savePayload[section as keyof WeddingData] = {
            ...(currentSectionData && typeof currentSectionData === 'object' ? currentSectionData : {}),
            ...sectionChanges
          } as any;
        }
      });

      const success = await updateWeddingData(savePayload);
      if (!success) {
        console.error("Failed to save wedding data");
        toast({
          title: "Error",
          description: "Failed to save changes. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Clear pending changes since they're now saved
      setPendingChanges({});

      // Refresh the iframe to show the updated data
      setIframeKey((k) => k + 1);

      // Show success message
      toast({
        title: "Success",
        description: "Your changes have been saved successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to save wedding data:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while saving.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, [weddingData, pendingChanges, updateWeddingData, toast]);

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

  const handleTemplateChange = useCallback((id: string) => {
    setSelectedTemplate(id);
    setIframeKey((k) => k + 1);
  }, []);

  // Send updated wedding data to iframe whenever data changes
  useEffect(() => {
    if (iframeRef.current && weddingData) {
      const sanitizedWeddingData = {
        ...(weddingData && typeof weddingData === 'object' ? weddingData : {}),
        schedule: transformScheduleToArray(weddingData.schedule),
        gallery: Array.isArray(weddingData.gallery) ? weddingData.gallery : []
      };
      
      iframeRef.current.contentWindow?.postMessage(
        {
          type: "WEDDING_DATA_UPDATE",
          weddingData: sanitizedWeddingData
        },
        "*"
      );
    }
  }, [weddingData]);

  const toggleSidebar = useCallback(() => setOpen((o) => !o), [setOpen]);

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-matson-gold"></div>
      </div>
    );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100">
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {weddingData && (
        <div
          data-sidebar
          className={cn(
            "fixed md:relative z-30 h-full transition-transform duration-300 ease-in-out",
            open ? "translate-x-0" : "-translate-x-full",
            "md:translate-x-0",
          )}
          style={{ width: sidebarWidth, minWidth: 250 }}
        >
          <ResizableTemplateSidebar
            selected={selectedTemplate}
            setSelected={handleTemplateChange}
            weddingData={weddingData}
            onClose={() => setOpen(false)}
            onFieldChange={handleFieldChange}
            onPendingChange={handlePendingChange}
            pendingChanges={pendingChanges}
            onWidthChange={setSidebarWidth}
          />
        </div>
      )}

      <div 
        className="flex-1 flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out"
        style={{ 
          width: open && isDesktop ? `calc(100% - ${sidebarWidth}px)` : '100%'
        }}
      >
        <header className="bg-white border-b border-gray-200 py-3 px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              data-toggle-sidebar
              onClick={toggleSidebar}
              className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-lg font-medium text-gray-800">
              Website Preview
            </h1>
          </div>
          <button
            className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm disabled:opacity-50"
            onClick={handleSaveTemplate}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </header>

        <div className="flex-1 bg-gray-100 p-4 overflow-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
            <iframe
              key={iframeKey}
              ref={iframeRef}
              src={`${iframeUrl}${iframeUrl.includes("?") ? "&" : "?"}template=${encodeURIComponent(selectedTemplate)}`}
              className="w-full h-full border-0"
              title="Wedding Website Preview"
              allow="camera; microphone; fullscreen;"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => {
                // Send template change and sanitized wedding data to iframe
                const sanitizedWeddingData = weddingData ? {
                  ...weddingData,
                  schedule: transformScheduleToArray(weddingData.schedule),
                  gallery: Array.isArray(weddingData.gallery) ? weddingData.gallery : []
                } : null;
                
                iframeRef.current?.contentWindow?.postMessage(
                  { 
                    type: "TEMPLATE_CHANGED", 
                    template: selectedTemplate,
                    weddingData: sanitizedWeddingData
                  },
                  "*",
                );
                setIsLoading(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DynamicUserWeddingPageWrapper() {
  return (
    <SidebarProvider>
      <DynamicUserWeddingPage />
    </SidebarProvider>
  );
}
