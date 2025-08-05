
import { useEffect, useState } from "react";

// Define the template configuration
const templates = [
  { 
    key: "model_4", 
    label: "Template 3", 
    preview: "/placeholder.svg",
    component: () => import("./[slag]/model_4/pages/Index").then(mod => mod.default)
  },
];

interface DynamicUserWeddingPageProps {
  editable?: boolean;
  template?: string;
  webEntry?: any;
}

interface TemplateComponentProps {
  editable: boolean;
  webEntry: any;
}

export default function DynamicUserWeddingPage({ 
  editable = false, 
  template = "model_4", 
  webEntry 
}: DynamicUserWeddingPageProps) {
  const [selected, setSelected] = useState(template);
  const [TemplateComponent, setTemplateComponent] = useState<React.ComponentType<TemplateComponentProps> | null>(null);
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    let isMounted = true;
    
    const loadTemplate = async () => {
      try {
        console.log(`Attempting to load template: ${selected}`);
        const templateConfig = templates.find(t => t.key === selected);
        
        if (!templateConfig) {
          console.error(`Template ${selected} not found in available templates`);
          if (isMounted) setTemplateComponent(null);
          return;
        }
        
        console.log(`Found template config:`, templateConfig);
        
        const module = await templateConfig.component();
        console.log('Successfully loaded template module:', module);
        
        if (isMounted) {
          setTemplateComponent(() => module);
        }
      } catch (error) {
        console.error('Failed to load template:', error);
        if (isMounted) setTemplateComponent(null);
      }
    };
    
    loadTemplate();
    
    return () => {
      isMounted = false;
    };
  }, [selected]);
  
  // Debug info
  useEffect(() => {
    console.log('Template component state updated:', {
      hasComponent: !!TemplateComponent,
      editable,
      webEntry: webEntry ? 'webEntry provided' : 'no webEntry'
    });
  }, [TemplateComponent, editable, webEntry]);

  return (
     
      <main className="transition-all duration-300 ease-in-out">
        {!TemplateComponent ? <div>Loading...</div> : <TemplateComponent editable={editable} webEntry={webEntry} />}
      </main>
  );
}
