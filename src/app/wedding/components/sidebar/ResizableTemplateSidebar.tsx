import { useState, useEffect, useCallback } from 'react';
import type { WeddingData } from "@/types/wedding";
import { useResizableSidebar } from './hooks/useResizableSidebar';
import { useSidebarForm } from './hooks/useSidebarForm';
import { createFormHandlers } from './utils/formHandlers';
import { DesignSection } from './sections/DesignSection';
import { ContentSection } from './sections/ContentSection';
import { defaultExpandedSections } from './constants/sidebarConstants';
import FloatingSaveButton from './components/FloatingSaveButton';

// Tab Information
const TABS = [
  { type: 'design', label: 'Design' },
  { type: 'content', label: 'Content' },
  { type: 'settings', label: 'Settings' },
];

// Navigation Tabs (memoized)
function NavigationTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex border-b border-gray-200 bg-white px-2">
      {TABS.map(({ type, label }) => (
        <button
          key={type}
          onClick={() => setActiveTab(type)}
          className={`py-3 px-4 text-sm font-semibold transition-all duration-200 relative ${
            activeTab === type
              ? 'text-purple-600 bg-purple-50 rounded-t-lg border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-t-lg'
          }`}
        >
          {label}
          {activeTab === type && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-600 rounded-full -mb-1" />
          )}
        </button>
      ))}
    </div>
  );
}

// Settings Placeholder
const SettingsTab = () => (
  <div className="text-center py-8 space-y-2">
    <div className="text-gray-400 mb-2">
      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-700">Settings</h3>
    <p className="text-gray-500 text-sm">Coming Soon</p>
    <p className="text-gray-400 text-xs">Additional settings options will be available here in future updates.</p>
  </div>
);

// Use custom hook for expanded section logic with accordion behavior
function useExpandedSections(initial: Record<string, boolean>) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const toggleSection = useCallback(
    (section: string) => setExpandedSections(prev => {
      // If the clicked section is already expanded, close it
      if (prev[section]) {
        return { [section]: false };
      }
      // Otherwise, close all sections and open only the clicked one
      return { [section]: true };
    }),
    [],
  );
  return [expandedSections, toggleSection] as const;
}

interface ResizableTemplateSidebarProps {
  selected: string;
  setSelected: (id: string) => void;
  weddingData: WeddingData | null;
  onClose: () => void;
  onFieldChange: (section: keyof WeddingData, field: string, value: string) => void;
  onPendingChange: (section: keyof WeddingData, field: string, value: string) => void;
  pendingChanges: Partial<WeddingData>;
  onWidthChange?: (width: number) => void;
  setPendingChanges: React.Dispatch<React.SetStateAction<Partial<WeddingData>>>;
}

export default function ResizableTemplateSidebar({
  selected,
  setSelected,
  weddingData,
  onClose,
  onFieldChange,
  onPendingChange,
  pendingChanges,
  onWidthChange,
  setPendingChanges
}: ResizableTemplateSidebarProps) {
  const { isResizing, sidebarWidth, sidebarRef, startResizing } = useResizableSidebar();
  const { formData, setFormData } = useSidebarForm(weddingData, selected, pendingChanges);

  useEffect(() => { onWidthChange?.(sidebarWidth); }, [sidebarWidth, onWidthChange]);
  const formHandlers = createFormHandlers(setFormData, onFieldChange, onPendingChange);
  const [activeTab, setActiveTab] = useState('design');
  const [expandedSections, toggleSection] = useExpandedSections(defaultExpandedSections);

  // Sidebar content tabs
  const renderTab = () => {
    if (activeTab === 'design') return (
      <DesignSection
        formData={formData}
        setFormData={setFormData}
        selected={selected}
        setSelected={setSelected}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        onFieldChange={onFieldChange}
      />
    );
    if (activeTab === 'content') return (
      <ContentSection
        formData={formData}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        onFieldChange={onFieldChange}
        setFormData={setFormData}
        handleInputChange={formHandlers.handleInputChange}
        handleArrayUpdate={formHandlers.handleArrayUpdate}
        handleArrayAdd={formHandlers.handleArrayAdd}
        handleArrayRemove={formHandlers.handleArrayRemove}
        onPendingChange={onPendingChange}
      />
    );
    return <SettingsTab />;
  };

  return (
    <div ref={sidebarRef}
      className="h-full bg-white border-r border-gray-200 flex flex-col relative overflow-visible"
      style={{ width: sidebarWidth }}>
      {/* Resize handle */}
      <div
        className="absolute right-0 top-0 h-full w-2 cursor-col-resize hover:bg-blue-300 bg-transparent transition-colors z-10"
        onMouseDown={startResizing}
        title="Drag to resize sidebar"
      />
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <h2 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full" />
          <span>Website Editor</span>
        </h2>
        <p className="text-xs text-gray-600 mt-1">Customize your wedding website</p>
      </div>
      {/* Tabs */}
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Main content */}
      <div className="flex-1 overflow-y-auto overflow-x-visible p-3 space-y-4 bg-gray-50/50 pb-20">
        {renderTab()}
      </div>
      {/* Floating Save Button */}
      <FloatingSaveButton
        weddingData={weddingData}
        pendingChanges={pendingChanges}
        setPendingChanges={setPendingChanges}
      />
      {isResizing && <div className="fixed inset-0 cursor-col-resize z-50" />}
    </div>
  );
}
