import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Globe, Calendar, Users, Star, ArrowRight, CheckCircle } from "lucide-react";

const Index = () => {
  const services = [
    {
      icon: Heart,
      title: "Wedding Invitations",
      description: "Browse beautiful pre-designed templates starting from ₹10",
      image: "/placeholder.svg",
      features: ["Professional templates", "Kerala cultural designs", "Premium materials", "Fast delivery"]
    },
    {
      icon: Globe,
      title: "Wedding Websites",
      description: "Create stunning wedding websites with our easy builder",
      image: "/placeholder.svg", 
      features: ["Drag & drop builder", "RSVP management", "Photo galleries", "Mobile responsive"]
    }
  ];

  

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Services Section - Zola Style */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6">
              Everything you need for your perfect day
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From invitation cards to wedding websites, Matson provides all the tools to make your wedding planning seamless and beautiful.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-medium mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full rounded-full" variant="outline">
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Matson Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4" variant="secondary">
                Trusted by 3000+ couples
              </Badge>
              <h2 className="text-4xl font-serif font-medium mb-6">
                Why couples choose Matson
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Authentic Kerala Designs</h3>
                    <p className="text-muted-foreground">Our templates celebrate Kerala's rich cultural heritage with modern elegance.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Affordable Excellence</h3>
                    <p className="text-muted-foreground">Premium quality starting from just ₹10, with zero hidden costs.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Digital Innovation</h3>
                    <p className="text-muted-foreground">Modern tools and technology to make wedding planning effortless.</p>
                  </div>
                </div>
              </div>  
            </div>
            
            <div className="relative">
              <img 
                src="/placeholder.svg" 
                alt="Happy couple planning wedding"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

  
      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6">
            Ready to start planning?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of couples who have trusted Matson to make their wedding day perfect.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8">
              Browse card templates
            </Button>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8">
            Browse wedding website
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;