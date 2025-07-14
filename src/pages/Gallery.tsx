import { useState } from 'react';
import { Eye, Filter, Heart, Star, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Designs', count: 48 },
    { id: 'cards', label: 'Wedding Cards', count: 25 },
    { id: 'websites', label: 'Websites', count: 15 },
    { id: 'premium', label: 'Premium', count: 8 },
  ];

  const galleryItems = [
    {
      id: 1,
      type: 'cards',
      title: 'Traditional Kerala Hindu Wedding Card',
      category: 'Premium Collection',
      price: '₹35',
      tags: ['Traditional', 'Gold Foil', 'Hindu'],
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop',
      likes: 124,
      views: 2341
    },
    {
      id: 2,
      type: 'websites',
      title: 'Elegant Christian Wedding Website',
      category: 'Website Template',
      price: 'Free',
      tags: ['Modern', 'Christian', 'Photo Gallery'],
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=300&fit=crop',
      likes: 89,
      views: 1876
    },
    {
      id: 3,
      type: 'cards',
      title: 'Minimalist Muslim Wedding Invitation',
      category: 'Starter Collection',
      price: '₹15',
      tags: ['Minimalist', 'Muslim', 'Elegant'],
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&h=300&fit=crop',
      likes: 156,
      views: 3124
    },
    {
      id: 4,
      type: 'websites',
      title: 'Kerala Traditional Wedding Portal',
      category: 'Website Template',
      price: 'Free',
      tags: ['Traditional', 'Interactive', 'RSVP'],
      image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=500&h=300&fit=crop',
      likes: 203,
      views: 4567
    },
    {
      id: 5,
      type: 'premium',
      title: 'Luxury Boxed Wedding Suite',
      category: 'Premium Collection',
      price: '₹50',
      tags: ['Luxury', 'Boxed', 'Multi-faith'],
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&h=300&fit=crop',
      likes: 98,
      views: 1987
    },
    {
      id: 6,
      type: 'cards',
      title: 'Eco-Friendly Wedding Card',
      category: 'Eco Collection',
      price: '₹20',
      tags: ['Eco-friendly', 'Recycled', 'Natural'],
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=300&fit=crop',
      likes: 167,
      views: 2890
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.type === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl font-bold">Design Gallery</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore our stunning collection of wedding cards and website templates, crafted with love for Kerala couples
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? 'default' : 'outline'}
                onClick={() => setActiveFilter(filter.id)}
                className={`${
                  activeFilter === filter.id ? 'btn-kerala' : 'btn-kerala-outline'
                } group`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {filter.label}
                <Badge 
                  variant="secondary" 
                  className="ml-2 bg-background/50 text-foreground group-hover:bg-background"
                >
                  {filter.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card key={item.id} className="card-elegant group overflow-hidden hover-scale">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth">
                    <div className="absolute bottom-4 left-4 right-4">
                      <Button size="sm" className="btn-kerala w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <Badge className="absolute top-4 left-4 bg-card/90 text-foreground border-border/50">
                    {item.category}
                  </Badge>
                  
                  {/* Price */}
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    {item.price}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-smooth">
                      {item.title}
                    </h3>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{item.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{item.views}</span>
                      </div>
                    </div>
                    
                    {item.type === 'websites' && (
                      <div className="flex items-center space-x-1 text-accent">
                        <Globe className="w-4 h-4" />
                        <span>Live Demo</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="py-8 text-center">
        <div className="container mx-auto px-4">
          <Button size="lg" variant="outline" className="btn-kerala-outline">
            Load More Designs
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Ready to Create Your Own?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Join thousands of couples who've chosen Matson for their special day. Start designing your perfect wedding cards or website today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-kerala">
                <Star className="w-5 h-5 mr-2" />
                Start Designing Cards
              </Button>
              <Button size="lg" variant="outline" className="btn-kerala-outline">
                <Globe className="w-5 h-5 mr-2" />
                Build Your Website
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;