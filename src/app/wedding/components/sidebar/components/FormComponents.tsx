import React from 'react';
import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';

// Helper component for text inputs
export const TextInput = ({ label, value, onChange, onKeyDown, placeholder, type = "text" }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
    />
  </div>
);

// Helper component for toggle switches
export const ToggleSwitch = ({ label, checked, onChange }: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <div className="flex items-center justify-between">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        checked ? "bg-blue-600" : "bg-gray-200"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
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
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
      {value ? (
        <div className="space-y-2">
          <img src={value} alt="Preview" className="w-full h-32 object-cover rounded" />
          <button
            onClick={() => onChange('')}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Remove Image
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <Upload className="w-8 h-8 text-gray-400 mx-auto" />
          <p className="text-sm text-gray-500">Click to upload image</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // In a real app, you'd upload this to a server
                const url = URL.createObjectURL(file);
                onChange(url);
              }
            }}
            className="hidden"
            id={`upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
          />
          <label
            htmlFor={`upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
            className="cursor-pointer text-blue-600 hover:text-blue-800"
          >
            Choose File
          </label>
        </div>
      )}
    </div>
  </div>
);