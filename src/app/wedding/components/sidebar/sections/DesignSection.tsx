import React from 'react';
import { CollapsibleSection } from '../components/CollapsibleSection';
import { templates, designOptions } from '../constants/sidebarConstants';
import { getColorValue } from '../utils/formHandlers';
import type { WeddingData } from '@/types/wedding';
import type { FormData } from '../hooks/useSidebarForm';

interface DesignSectionProps {
  selected: string;
  setSelected: (key: string) => void;
  formData: FormData;
  expandedSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
  onFieldChange: (section: keyof WeddingData, field: string, value: string | boolean) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const DesignSection: React.FC<DesignSectionProps> = ({
  selected,
  setSelected,
  formData,
  expandedSections,
  toggleSection,
  onFieldChange,
  setFormData
}) => {
  return (
    <>
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
                  // Update local state immediately
                  setFormData(prev => ({ ...prev, colorScheme: color.value }));
                  // Save immediately for design choices
                  onFieldChange('colorScheme' as keyof WeddingData, 'colorScheme', color.value);
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
                  // Update local state immediately
                  setFormData(prev => ({ ...prev, fontFamily: font.value }));
                  // Save immediately for design choices
                  onFieldChange('fontFamily' as keyof WeddingData, 'fontFamily', font.value);
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
  );
};