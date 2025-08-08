import { useState, useEffect, useRef } from 'react';
import type {
  WeddingData,
  WeddingCouple,
  WeddingStory
} from "../../types/wedding";
import { cn } from "@/lib/utils";

// Tab types
type TabType = 'design' | 'content' | 'settings';

// Template data
const templates = [
  { key: "model_1", label: "Template 1", preview: "/placeholder.svg" },
  { key: "model_2", label: "Template 2", preview: "/placeholder.svg" },
  { key: "model_3", label: "Template 3", preview: "/placeholder.svg" },
  { key: "model_4", label: "Template 4", preview: "/placeholder.svg" },
];

// Design options
const designOptions = {
  colors: [
    { name: 'Classic', value: 'classic' },
    { name: 'Romantic', value: 'romantic' },
    { name: 'Modern', value: 'modern' },
    { name: 'Vintage', value: 'vintage' },
  ],
  fonts: [
    { name: 'Playfair Display', value: 'playfair' },
    { name: 'Montserrat', value: 'montserrat' },
    { name: 'Great Vibes', value: 'great-vibes' },
    { name: 'Open Sans', value: 'open-sans' },
  ],
  layouts: [
    { name: 'Single Page', value: 'single' },
    { name: 'Multi-Page', value: 'multi' },
  ]
};

interface TemplateSidebarProps {
  selected: string;
  setSelected: (key: string) => void;
  weddingData: WeddingData & {
    colorScheme?: string;
    fontFamily?: string;
  };
  onClose?: () => void;
  onFieldChange: (section: keyof WeddingData, field: string, value: string) => void;
  onPendingChange: (section: keyof WeddingData, field: string, value: string) => void;
  pendingChanges: Partial<WeddingData>;
}

// Interface for the form data we want to edit
interface FormData {
  couple: {
    groomName: string;
    brideName: string;
    weddingQuote: string;
  };
  story: {
    title: string;
    content: string;
  };
  colorScheme: string;
  fontFamily: string;
  template: string;
}

export default function ResizableTemplateSidebar({
  selected,
  setSelected,
  weddingData,
  onClose,
  onFieldChange,
  onPendingChange,
  pendingChanges
}: TemplateSidebarProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  // Initialize form data from wedding data and pending changes
  const getInitialFormData = (): FormData => {
    const couple = { ...weddingData?.couple, ...pendingChanges?.couple } || {} as WeddingCouple;
    const story = { ...weddingData?.story, ...pendingChanges?.story } || {} as WeddingStory;

    return {
      couple: {
        groomName: couple.groomName || '',
        brideName: couple.brideName || '',
        weddingQuote: couple.weddingQuote || ''
      },
      story: {
        title: story.title || '',
        content: story.content || ''
      },
      colorScheme: weddingData?.colorScheme || 'classic',
      fontFamily: weddingData?.fontFamily || 'playfair',
      template: selected
    };
  };

  const [formData, setFormData] = useState<FormData>(getInitialFormData());

  // Update form data when wedding data, pending changes, or selected template changes
  useEffect(() => {
    setFormData(getInitialFormData());
  }, [weddingData, pendingChanges, selected]);

  const [activeTab, setActiveTab] = useState<TabType>('design');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    templates: true,
    colors: true,
    typography: false,
    layout: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle input changes with Enter key detection
  const handleInputChange = (section: keyof WeddingData, field: string, value: string, event?: React.KeyboardEvent) => {
    // Update local form data
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof FormData] as any,
        [field]: value
      }
    }));

    // If Enter was pressed, save immediately
    if (event?.key === 'Enter') {
      onFieldChange(section, field, value);
    } else {
      // Otherwise, mark as pending change
      onPendingChange(section, field, value);
    }
  };

  // Handle mouse down for resizing
  const startResizing = (e: React.MouseEvent) => {
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = sidebarRef.current?.offsetWidth || sidebarWidth;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResizing);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    const newWidth = startWidthRef.current + e.clientX - startXRef.current;
    const minWidth = 250;
    const maxWidth = 600;
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setSidebarWidth(newWidth);
    }
  };

  const stopResizing = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResizing);
  };

  // Clean up event listeners on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', stopResizing);
    };
  }, []);

  return (
    <div 
      ref={sidebarRef}
      className="h-full bg-white border-r border-gray-200 flex flex-col"
      style={{ width: sidebarWidth }}
    >
      {/* Resize handle */}
      <div
        className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-gray-300 transition-colors z-10"
        onMouseDown={startResizing}
      />

      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Website Editor</h2>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('design')}
          className={`py-2 px-4 text-sm font-medium ${activeTab === 'design' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Design
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`py-2 px-4 text-sm font-medium ${activeTab === 'content' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Content
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`py-2 px-4 text-sm font-medium ${activeTab === 'settings' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Settings
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Templates Section */}
        <div>
          <button
            onClick={() => toggleSection('templates')}
            className="w-full flex justify-between items-center text-left text-sm font-medium text-gray-700 mb-2"
          >
            Templates
            <span className="transform transition-transform">{expandedSections.templates ? '−' : '+'}</span>
          </button>
          
          {expandedSections.templates && (
            <div className="grid grid-cols-2 gap-2">
              {templates.map(t => (
                <div key={t.key}>
                  <button
                    onClick={() => setSelected(t.key)}
                    className={`relative rounded-lg overflow-hidden border-2 ${selected === t.key ? 'border-purple-500' : 'border-gray-200'}`}
                  >
                    <img src={t.preview} alt={t.label} className="w-full h-20 object-cover" />
                    <div className="p-2 text-xs font-medium text-gray-700">{t.label}</div>
                    {selected === t.key && (
                      <div className="absolute inset-0 bg-purple-500 bg-opacity-20 flex items-center justify-center">
                        <span className="text-purple-600 font-medium text-xs">✓</span>
                      </div>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Design Tab */}
        {activeTab === 'design' && (
          <>
            {/* Color Scheme */}
            <div>
              <button
                onClick={() => toggleSection('colors')}
                className="w-full flex justify-between items-center text-left text-sm font-medium text-gray-700 mb-2"
              >
                Color Scheme
                <span className="transform transition-transform">{expandedSections.colors ? '−' : '+'}</span>
              </button>
              
              {expandedSections.colors && (
                <div className="flex gap-2 flex-wrap">
                  {designOptions.colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => {
                        onFieldChange('colorScheme' as keyof WeddingData, 'value', color.value);
                      }}
                      className={`w-8 h-8 rounded-full ${formData.colorScheme === color.value ? 'ring-2 ring-offset-2 ring-purple-500' : ''}`}
                      style={{ backgroundColor: getColorValue(color.value) }}
                      aria-label={`Select ${color.name} color scheme`}
                      title={color.name}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Font Style */}
            <div>
              <button
                onClick={() => toggleSection('fonts')}
                className="w-full flex justify-between items-center text-left text-sm font-medium text-gray-700 mb-2"
              >
                Font Style
                <span className="transform transition-transform">{expandedSections.fonts ? '−' : '+'}</span>
              </button>
              
              {expandedSections.fonts && (
                <div className="space-y-1">
                  {designOptions.fonts.map((font) => (
                    <button
                      key={font.value}
                      onClick={() => {
                        onFieldChange('fontFamily' as keyof WeddingData, 'value', font.value);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        formData.fontFamily === font.value
                          ? 'bg-purple-100 text-purple-800'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      style={{ fontFamily: font.name }}
                    >
                      {font.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Groom's Name</label>
              <input
                type="text"
                value={formData.couple.groomName}
                onChange={(e) => handleInputChange('couple', 'groomName', e.target.value)}
                onKeyDown={(e) => handleInputChange('couple', 'groomName', e.currentTarget.value, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter groom's name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bride's Name</label>
              <input
                type="text"
                value={formData.couple.brideName}
                onChange={(e) => handleInputChange('couple', 'brideName', e.target.value)}
                onKeyDown={(e) => handleInputChange('couple', 'brideName', e.currentTarget.value, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter bride's name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Wedding Quote</label>
              <textarea
                value={formData.couple.weddingQuote}
                onChange={(e) => handleInputChange('couple', 'weddingQuote', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleInputChange('couple', 'weddingQuote', e.currentTarget.value, e);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter wedding quote"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Story Title</label>
              <input
                type="text"
                value={formData.story.title}
                onChange={(e) => handleInputChange('story', 'title', e.target.value)}
                onKeyDown={(e) => handleInputChange('story', 'title', e.currentTarget.value, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter story title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Story Content</label>
              <textarea
                value={formData.story.content}
                onChange={(e) => handleInputChange('story', 'content', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleInputChange('story', 'content', e.currentTarget.value, e);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter story content"
                rows={4}
              />
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter website title"
              />
            </div>
            {/* Add more settings here */}
          </div>
        )}
      </div>

      {/* Note: Removed the Save Changes button as requested */}
      
      {isResizing && (
        <div className="fixed inset-0 cursor-col-resize z-50" />
      )}
    </div>
  );
}

// Helper function to get color values
function getColorValue(color: string): string {
  const colors: Record<string, string> = {
    'classic': '#8B5CF6',
    'romantic': '#EC4899',
    'modern': '#3B82F6',
    'vintage': '#F59E0B',
  };
  return colors[color] || '#8B5CF6';
}
