import { useState, useEffect, useCallback } from 'react';
import type { WeddingData } from "@/types/wedding";
import { useResizableSidebar } from './hooks/useResizableSidebar';
import { useSidebarForm } from './hooks/useSidebarForm';
import { createFormHandlers } from './utils/formHandlers';
import { DesignSection } from './sections/DesignSection';
import { ContentSection } from './sections/ContentSection';
import { defaultExpandedSections } from './constants/sidebarConstants';

// Tab Information
const TABS = [
  { type: 'design', label: 'Design' },
  { type: 'content', label: 'Content' },
  { type: 'settings', label: 'Settings' },
];

// Navigation Tabs (memoized)
function NavigationTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex border-b border-gray-200">
      {TABS.map(({ type, label }) => (
        <button
          key={type}
          onClick={() => setActiveTab(type)}
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === type
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {label}
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

// Use custom hook for expanded section logic
function useExpandedSections(initial) {
  const [expandedSections, setExpandedSections] = useState(initial);
  const toggleSection = useCallback(
    section => setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    })),
    [],
  );
  return [expandedSections, toggleSection];
}

export default function ResizableTemplateSidebar({
  selected,
  setSelected,
  weddingData,
  onClose,
  onFieldChange,
  onPendingChange,
  pendingChanges,
  onWidthChange
}) {
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
      />
    );
    return <SettingsTab />;
  };

  return (
    <div ref={sidebarRef}
      className="h-full bg-white border-r border-gray-200 flex flex-col relative"
      style={{ width: sidebarWidth }}>
      {/* Resize handle */}
      <div
        className="absolute right-0 top-0 h-full w-2 cursor-col-resize hover:bg-blue-300 bg-transparent transition-colors z-10"
        onMouseDown={startResizing}
        title="Drag to resize sidebar"
      />
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Website Editor</h2>
      </div>
      {/* Tabs */}
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {renderTab()}
      </div>
      {isResizing && <div className="fixed inset-0 cursor-col-resize z-50" />}
    </div>
  );
}
