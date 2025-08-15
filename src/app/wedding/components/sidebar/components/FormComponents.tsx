import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Upload, Loader2, X } from 'lucide-react';
import { uploadGalleryImage } from '@/utils/UploadGalleryImage';
import useWedding from '@/hooks/useWedding';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Helper component for text inputs
export const TextInput = ({ label, value, onChange, onKeyDown, placeholder, type = "text" }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}) => (
  <div className="space-y-1">
    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white hover:border-gray-400"
    />
  </div>
);

// Helper component for textareas
export const TextArea = ({ label, value, onChange, onKeyDown, placeholder, rows = 3 }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}) => (
  <div className="space-y-1">
    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white hover:border-gray-400 resize-vertical"
    />
  </div>
);

// Helper component for toggle switches
export const ToggleSwitch = ({ label, checked, onChange }: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full transition-colors ${
        checked ? 'bg-purple-500' : 'bg-gray-400'
      }`} />
      <label className="text-sm font-medium text-gray-700 cursor-pointer" onClick={() => onChange(!checked)}>{label}</label>
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 shadow-sm",
        checked ? "bg-purple-600 shadow-purple-200" : "bg-gray-300 hover:bg-gray-400"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  </div>
);

// Helper component for image upload
export const ImageUpload = ({ label, value, onChange }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { user } = useWedding();

  const handleFileUpload = async (file: File) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to upload images",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const uniqueName = `form_${Date.now()}_${crypto.randomUUID()}`;
      const imageUrl = await uploadGalleryImage(file, user, uniqueName);
      
      if (imageUrl) {
        // Only update the form field, don't modify gallery array
        onChange(imageUrl);
        
        toast({
          title: "Image uploaded successfully!",
          description: "The image URL has been updated.",
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image to gallery",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setShowConfirmDialog(true);
  };

  const confirmRemoveImage = () => {
    onChange('');
    setShowConfirmDialog(false);
  };

  return (
    <>
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-purple-400 hover:bg-purple-50/30 transition-all duration-200">
          {value ? (
            <div className="space-y-2">
              <img src={value} alt="Preview" className="w-full h-24 object-cover rounded-lg shadow-sm" />
              <button
                onClick={handleRemoveImage}
                disabled={isUploading}
                className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800 font-medium transition-colors disabled:opacity-50"
              >
                <X className="w-3 h-3" />
                Remove Image
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {isUploading ? (
                <div className="flex flex-col items-center space-y-2">
                  <Loader2 className="w-6 h-6 text-purple-600 animate-spin" />
                  <p className="text-xs text-gray-500">Uploading to gallery...</p>
                </div>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-gray-400 mx-auto" />
                  <p className="text-xs text-gray-500">Click to upload image to gallery</p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileUpload(file);
                  }
                }}
                disabled={isUploading}
                className="hidden"
                id={`upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
              />
              <label
                htmlFor={`upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
                className={cn(
                  "cursor-pointer text-purple-600 hover:text-purple-800 text-xs font-medium transition-colors",
                  isUploading && "opacity-50 cursor-not-allowed"
                )}
              >
                {isUploading ? 'Uploading...' : 'Choose File'}
              </label>
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this image? This action cannot be undone and the image will be permanently deleted from your gallery.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemoveImage} className="bg-red-600 hover:bg-red-700">
              Remove Image
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};