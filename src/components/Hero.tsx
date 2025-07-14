import { ArrowRight, Sparkles, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import heroImage from '@/assets/hero-wedding.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Kerala Wedding Celebration" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-transparent"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-pulse">
        <Sparkles className="w-6 h-6 text-primary opacity-60 float-animation" />
      </div>
      <div className="absolute top-40 right-20 animate-pulse delay-75">
        <Heart className="w-8 h-8 text-accent opacity-50 float-animation" />
      </div>
      <div className="absolute bottom-32 left-20 animate-pulse delay-150">
        <Star className="w-5 h-5 text-primary opacity-70 float-animation" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <span className="text-sm font-medium text-primary">Kerala's Premier Wedding Solutions</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Craft Your
                <span className="text-gradient block">Perfect Day</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
                From bespoke wedding cards to stunning websites, Matson brings your love story to life with Kerala's finest artistry and modern innovation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-kerala group">
                Design Your Cards
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-smooth" />
              </Button>
              <Button size="lg" variant="outline" className="btn-kerala-outline">
                Build Your Website
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">2500+</div>
                <div className="text-sm text-muted-foreground">Cards Designed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">850+</div>
                <div className="text-sm text-muted-foreground">Websites Built</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">Happy Couples</div>
              </div>
            </div>
          </div>

          {/* Right Content - Service Cards */}
          <div className="space-y-6">
            <Card className="card-elegant p-6 hover-scale">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Premium Wedding Cards</h3>
                  <p className="text-muted-foreground text-sm">Starting from ₹10 with zero design fees. Elegant, affordable, uniquely yours.</p>
                </div>
              </div>
            </Card>

            <Card className="card-elegant p-6 hover-scale">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Wedding Website Builder</h3>
                  <p className="text-muted-foreground text-sm">DIY portal with Kerala cultural motifs. Share your story beautifully.</p>
                </div>
              </div>
            </Card>

            <Card className="card-elegant p-6 hover-scale border-2 border-primary/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-kerala-green/20 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-kerala-green" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Coming Soon: Full Planning</h3>
                  <p className="text-muted-foreground text-sm">End-to-end wedding planning with vendor matching and timeline management.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;