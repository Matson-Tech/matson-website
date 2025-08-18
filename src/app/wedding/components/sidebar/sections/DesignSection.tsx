import React, { useEffect, useState } from 'react';
import { CollapsibleSection } from '../components/CollapsibleSection';
import { designOptions } from '../constants/sidebarConstants';
import { getColorValue } from '../utils/formHandlers';
import type { WeddingData } from '@/types/wedding';
import type { FormData } from '../hooks/useSidebarForm';
import { supabase } from '@/integrations/supabase/client';
import { WEDDING_WEBSITES } from '@/app/public/constants/websites'; // Add this import

interface Template {
  template_id: string;
  template_name: string;
  template_url: string;
  description: string | null;
  coming_soon?: boolean;
  source?: 'database' | 'websites'; // Add source tracking
}

interface DesignSectionProps {
  selected: string;
  setSelected: (key: string) => void;
  formData: FormData;
  expandedSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
  onFieldChange: (section: keyof WeddingData, field: string, value: string | boolean) => void;
  onPendingChange: (section: keyof WeddingData, field: string, value: string) => void; // Add this
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const DesignSection: React.FC<DesignSectionProps> = ({
  selected,
  setSelected,
  formData,
  expandedSections,
  toggleSection,
  onFieldChange,
  onPendingChange, // Add this
  setFormData
}) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        // Fetch templates from Supabase
        const { data, error } = await supabase
          .from('wedding_template')
          .select('template_id, template_name, template_url, description')
          .order('template_name');

        if (error) {
          console.error('Error fetching templates:', error);
          return;
        }

        // Convert Supabase templates
        const supabaseTemplates: Template[] = (data || []).map(template => ({
          ...template,
          coming_soon: false,
          source: 'database' as const
        }));

        // Convert websites.ts templates to Template format
        const websiteTemplates: Template[] = WEDDING_WEBSITES.map((website, index) => ({
          template_id: `website-${index}`, // Generate unique IDs
          template_name: website.name,
          template_url: website.url,
          description: 'Coming Soon Template',
          coming_soon: website.comingSoon || false,
          source: 'websites' as const
        }));

        // Combine both sources - put coming soon templates at the end
        const allTemplates = [...supabaseTemplates, ...websiteTemplates];
        
        setTemplates(allTemplates);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setIsLoadingTemplates(false);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <>
      {/* Enhanced Templates Section */}
      <CollapsibleSection title="🎨 Templates" isExpanded={expandedSections.templates} onToggle={() => toggleSection('templates')}>
        {isLoadingTemplates ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {templates.map(template => (
              <div key={template.template_id} className="relative">
                <button
                  onClick={() => {
                    // Allow selection of all templates, including coming soon ones
                    setSelected(template.template_id);
                  }}
                  // Remove the disabled attribute to allow clicking
                  className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 hover:shadow-md ${
                    selected === template.template_id 
                      ? 'border-purple-500 shadow-lg ring-2 ring-purple-200' 
                      : template.coming_soon
                      ? 'border-orange-300 hover:border-orange-400' // Change styling for coming soon but keep them clickable
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-full h-20 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center relative">
                    <span className={`font-semibold text-sm ${
                      template.coming_soon ? 'text-orange-600' : 'text-purple-600' // Change color but don't gray out
                    }`}>
                      {template.template_name}
                    </span>
                    {template.coming_soon && (
                      <div className="absolute top-1 left-1 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                        Coming Soon
                      </div>
                    )}
                    {template.source === 'websites' && !template.coming_soon && (
                      <div className="absolute top-1 right-1 bg-blue-500 text-white text-xs px-1 py-0.5 rounded">
                        New
                      </div>
                    )}
                  </div>
                  <div className={`p-2 text-xs font-medium transition-colors ${
                    selected === template.template_id ? 'text-purple-700 bg-purple-50' : 
                    template.coming_soon ? 'text-orange-600 bg-orange-50' : 'text-gray-700 bg-white' // Change styling but keep readable
                  }`}>
                    {template.template_name}
                  </div>
                  {selected === template.template_id && ( // Remove the !template.coming_soon condition
                    <div className="absolute top-1 right-1 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </CollapsibleSection>

      {/* Enhanced Color Scheme */}
      <CollapsibleSection title="🎨 Color Scheme" isExpanded={expandedSections.colors} onToggle={() => toggleSection('colors')}>
        <div className="grid grid-cols-4 gap-3">
          {designOptions.colors.map((color) => (
            <button
              key={color.value}
              onClick={() => {
                setFormData(prev => ({ ...prev, colorScheme: color.value }));
                onFieldChange('colorScheme' as keyof WeddingData, 'colorScheme', color.value);
              }}
              className={`relative w-12 h-12 rounded-lg transition-all duration-200 hover:scale-105 ${
                formData.colorScheme === color.value 
                  ? 'ring-2 ring-offset-2 ring-purple-500 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              style={{ backgroundColor: getColorValue(color.value) }}
              aria-label={`Select ${color.name} color scheme`}
              title={color.name}
            >
              {formData.colorScheme === color.value && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-sm font-bold drop-shadow-lg">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="✍️ Font Style" isExpanded={expandedSections.fonts} onToggle={() => toggleSection('fonts')}>
        <div className="space-y-3">
          {designOptions.fonts.map((font) => (
            <button
              key={font.value}
              onClick={() => {
                setFormData(prev => ({ ...prev, fontStyle: font.value }));
                onFieldChange('fontStyle' as keyof WeddingData, 'fontStyle', font.value);
              }}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                formData.fontStyle === font.value 
                  ? 'border-purple-500 bg-purple-50 shadow-lg ring-2 ring-purple-200' 
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              style={{ fontFamily: font.value }}
            >
              <div className="flex items-center justify-between">
                <span className={`font-medium ${
                  formData.fontStyle === font.value ? 'text-purple-700' : 'text-gray-700'
                }`}>
                  {font.name}
                </span>
                {formData.fontStyle === font.value && (
                  <span className="text-purple-600 font-bold">✓</span>
                )}
              </div>
              <div className="text-sm text-gray-500 mt-1" style={{ fontFamily: font.value }}>
                The quick brown fox jumps
              </div>
            </button>
          ))}
        </div>
      </CollapsibleSection>
    </>
  );
};
