import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Target } from "lucide-react";
import { fadeInUp, fadeInLeft, fadeInRight } from "../animations/MotionVariants";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          {...fadeInUp}
        >
          <Badge className="mb-6 bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20">
            <Target className="w-4 h-4 mr-2" />
            About Matson
          </Badge>
          <h2 className="text-4xl md:text-6xl font-serif font-medium mb-8 leading-tight">
            Crafting love stories since 
            <span className="text-gradient block mt-2">2008</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            From humble beginnings in Kottayam to becoming Kerala's most trusted wedding partner, we've been creating beautiful memories for over 15 years.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div 
            className="space-y-6"
            {...fadeInLeft}
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-bold font-serif">Our Story</h3>
              <p className="text-muted-foreground leading-relaxed">
                Founded in the heart of Kottayam, Kerala, Matson Wedding Cards began as a small family workshop crafting bespoke paper invitations. Our journey started with a simple belief: every love story deserves to be told beautifully.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Over the years, we've earned a reputation for affordability and creativity—introducing the first ₹10 and ₹15 premium wedding card collections in the region. Today, we embrace digital innovation while preserving the artisanal quality that defines us.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
                <Users className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold">3000+</div>
                <div className="text-sm text-muted-foreground">Happy Couples</div>
              </Card>
            </div>
          </motion.div>

          <motion.div 
            className="space-y-6"
            {...fadeInRight}
          >
            <Card className="p-6 bg-gradient-to-br from-primary/5 via-white to-accent/5 border-primary/10 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group cursor-pointer hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To make every couple's wedding journey memorable and stress-free by providing affordable, elegant, and culturally-rich wedding solutions that celebrate Kerala's diverse traditions.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-accent/5 via-white to-primary/5 border-accent/10 hover:shadow-lg hover:border-accent/20 transition-all duration-300 group cursor-pointer hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-4 group-hover:text-accent transition-colors duration-300">Our Vision</h3>
              <p className="text-muted-foreground">
                To become Kerala's premier one-stop wedding planning platform, seamlessly blending traditional artistry with cutting-edge technology to serve couples across India and beyond.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-primary/5 via-white to-accent/5 border-primary/10 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group cursor-pointer hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <Target className="w-8 h-8 text-primary mt-1 group-hover:scale-110 transition-transform duration-300" />
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Looking Ahead</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our journey doesn't end with cards and websites. We're building towards becoming a comprehensive wedding planning platform, offering venue selection, vendor management, budget planning, and timeline coordination.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
