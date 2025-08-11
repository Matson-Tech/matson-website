import React, { useState, useCallback } from 'react';
import { useWedding } from '@/app/wedding/contexts/WeddingContext';
import { useToast } from '@/components/ui/use-toast';
import type { WeddingData } from '@/types/wedding';

interface FloatingSaveButtonProps {
  weddingData: WeddingData | null;
  pendingChanges: Partial<WeddingData>;
  onSaveComplete?: () => void;
  iframeKey: number;
  setIframeKey: React.Dispatch<React.SetStateAction<number>>;
  setPendingChanges: React.Dispatch<React.SetStateAction<Partial<WeddingData>>>;
}

// Merge current wedding data with pending changes
const buildSavePayload = (weddingData: WeddingData, pending: Partial<WeddingData>) => {
  const payload = { ...weddingData };
  Object.entries(pending).forEach(([section, changes]) => {
    if (Array.isArray(changes)) {
      payload[section as keyof WeddingData] = changes as any;
    } else if (changes && typeof changes === 'object') {
      const currentValue = payload[section as keyof WeddingData];
      const currentObject = (currentValue && typeof currentValue === 'object' && !Array.isArray(currentValue)) ? currentValue : {};
      payload[section as keyof WeddingData] = {
        ...currentObject,
        ...changes,
      } as any;
    }
  });
  return payload;
};

export default function FloatingSaveButton({
  weddingData,
  pendingChanges,
  onSaveComplete,
  setIframeKey,
  setPendingChanges
}: FloatingSaveButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { updateWeddingData } = useWedding();
  const { toast } = useToast();
  const hasPendingChanges = Object.keys(pendingChanges).length > 0;

  const handleSaveTemplate = useCallback(async () => {
    if (!weddingData) return;
    setIsSaving(true);

    try {
      const success = await updateWeddingData(buildSavePayload(weddingData, pendingChanges));
      if (!success) {
        toast({ title: "Error", description: "Failed to save changes. Please try again.", variant: "destructive" });
        return;
      }
      setPendingChanges({});
      setIframeKey(k => k + 1);
      toast({ title: "Success", description: "Your changes have been saved successfully.", variant: "default" });
      onSaveComplete?.();
    } catch (error) {
      console.error("Failed to save wedding data:", error);
      toast({ title: "Error", description: "An unexpected error occurred while saving.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  }, [weddingData, pendingChanges, updateWeddingData, toast, setIframeKey, setPendingChanges, onSaveComplete]);

  // Temporarily always show the button for debugging
  // if (!hasPendingChanges && !isSaving) return null;
  
  console.log('FloatingSaveButton render:', { hasPendingChanges, isSaving, pendingChangesCount: Object.keys(pendingChanges).length });

  return (
    <>
     
      
      <div className="absolute bottom-4 left-4 right-4 z-50">
        <button
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium disabled:opacity-50 flex items-center justify-center space-x-2"
          onClick={handleSaveTemplate}
          disabled={isSaving}
        >
        {isSaving ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            <span>Saving...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Save Changes</span>
          </>
        )}
      </button>
      </div>
    </>
  );
}
