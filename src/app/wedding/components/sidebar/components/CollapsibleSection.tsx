import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

// Helper component for collapsible sections
export const CollapsibleSection = ({ title, isExpanded, onToggle, children }: {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="border border-gray-200 rounded-lg mb-4">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
    >
      <span className="font-medium text-gray-900">{title}</span>
      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
    </button>
    {isExpanded && (
      <div className="p-4 space-y-4">
        {children}
      </div>
    )}
  </div>
);