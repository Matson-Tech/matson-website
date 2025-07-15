import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Search, Filter } from 'lucide-react';
import Footer from '@/components/Footer';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Hindu', 'Christian', 'Muslim', 'Modern', 'Traditional'];
  
  const templates = [
    {
      id: 1,
      name: 'Kerala Traditional',
      category: 'Hindu',
      price: '₹15',
      image: '/placeholder.svg',
      popular: true,
      description: 'Classic Kerala Hindu wedding design with traditional motifs'
    },
    {
      id: 2,
      name: 'Christian Elegance',
      category: 'Christian',
      price: '₹12',
      image: '/placeholder.svg',
      popular: false,
      description: 'Modern Christian wedding invitation with elegant typography'
    },
    {
      id: 3,
      name: 'Islamic Harmony',
      category: 'Muslim',
      price: '₹18',
      image: '/placeholder.svg',
      popular: true,
      description: 'Beautiful Islamic calligraphy with contemporary design'
    },
    {
      id: 4,
      name: 'Modern Minimalist',
      category: 'Modern',
      price: '₹10',
      image: '/placeholder.svg',
      popular: false,
      description: 'Clean, modern design perfect for contemporary couples'
    },
    {
      id: 5,
      name: 'Royal Kerala',
      category: 'Traditional',
      price: '₹25',
      image: '/placeholder.svg',
      popular: true,
      description: 'Luxurious traditional design with gold accents'
    },
    {
      id: 6,
      name: 'Garden Romance',
      category: 'Modern',
      price: '₹14',
      image: '/placeholder.svg',
      popular: false,
      description: 'Floral themed design with romantic watercolor elements'
    }
  ];

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6">
              Wedding invitation templates
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Choose from our collection of beautifully designed templates. Each design celebrates Kerala's rich cultural heritage.
            </p>
            
            <div className="flex justify-center">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full px-6"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img 
                    src={template.image} 
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  
                  {/* Overlay content */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {template.popular && (
                      <Badge className="bg-primary text-primary-foreground">
                        Popular
                      </Badge>
                    )}
                    <Badge variant="secondary" className="bg-white/90 text-foreground">
                      {template.category}
                    </Badge>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-8 h-8 p-0 rounded-full bg-white/90 hover:bg-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button className="w-full rounded-full bg-white text-foreground hover:bg-white/90">
                      Preview & Customize
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-serif font-medium">{template.name}</h3>
                    <span className="text-lg font-bold text-primary">{template.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 rounded-full">
                      Quick view
                    </Button>
                    <Button className="flex-1 rounded-full">
                      Select
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-medium mb-4">
            Need something custom?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our design team can create a completely custom invitation just for you. Starting from ₹50.
          </p>
          <Button size="lg" className="rounded-full px-8">
            Request custom design
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;