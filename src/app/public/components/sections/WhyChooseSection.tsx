import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Palette, Heart, CheckCircle } from "lucide-react";
import AnimatedBackground from "../animations/AnimatedBackground";
import { fadeInUp, fadeInLeft, fadeInRight } from "../animations/MotionVariants";

const WhyChooseSection = () => {
  const reasons = [
    {
      icon: Award,
      title: "15+ Years of Excellence",
      description: "Trusted by over 3,000 couples across Kerala",
      color: "text-yellow-600"
    },
    {
      icon: Palette,
      title: "Affordable Premium Quality",
      description: "Starting from ₹10 - Kerala's most affordable premium cards",
      color: "text-purple-600"
    },
    {
      icon: Heart,
      title: "Cultural Heritage",
      description: "Authentic Kerala designs that celebrate your traditions",
      color: "text-red-600"
    }
  ];

  return (
    <section className="py-28 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      <AnimatedBackground variant="whyChoose" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div 
          className="grid lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto"
          {...fadeInUp}
        >
          {/* Left Content */}
          <motion.div 
            className="space-y-10"
            {...fadeInLeft}
          >
            <div className="space-y-6">
              <Badge className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20">
                <Award className="w-4 h-4 mr-2" />
                Why Choose Matson
              </Badge>
              
              <h2 className="text-4xl md:text-5xl font-serif font-medium leading-tight">
                Kerala's most trusted 
                <span className="text-gradient block mt-2">wedding partner</span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                From our humble workshop in Kottayam to serving thousands of couples, 
                we've built our reputation on quality, affordability, and authentic Kerala craftsmanship.
              </p>
            </div>

            <div className="space-y-6">
              {reasons.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow duration-300`}>
                      <Icon className={`w-6 h-6 ${reason.color}`} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                        {reason.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Content - Stats Cards */}
          <motion.div 
            className="space-y-8"
            {...fadeInRight}
          >
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl font-bold text-primary mb-2">3000+</div>
                  <div className="text-muted-foreground font-medium">Happy Couples</div>
                  <div className="mt-3 flex justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-8 text-center bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20 hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl font-bold text-accent mb-2">15+</div>
                  <div className="text-muted-foreground font-medium">Years Experience</div>
                  <div className="mt-3 flex justify-center">
                    <Award className="w-5 h-5 text-yellow-500" />
                  </div>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-8 text-center bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl font-bold text-green-600 mb-2">₹10</div>
                  <div className="text-muted-foreground font-medium">Starting Price</div>
                  <div className="mt-3 flex justify-center">
                    <Heart className="w-5 h-5 text-red-500" />
                  </div>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-8 text-center bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
                  <div className="text-muted-foreground font-medium">Satisfaction</div>
                  <div className="mt-3 flex justify-center">
                    <Palette className="w-5 h-5 text-purple-500" />
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Additional testimonial card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-gradient-to-br from-primary/5 via-white to-accent/5 border-primary/10">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Heart className="w-5 h-5 text-red-500 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground italic leading-relaxed">
                    "Matson made our wedding invitation dreams come true! Beautiful Kerala designs at unbeatable prices. Highly recommended!"
                  </blockquote>
                  <div className="text-sm font-medium text-primary">
                    - Priya & Arjun, Kottayam
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
