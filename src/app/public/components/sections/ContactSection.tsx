import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Globe, Instagram, Facebook } from "lucide-react";
import { fadeInUp, fadeInLeft, fadeInRight } from "../animations/MotionVariants";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div 
            className="space-y-8"
            {...fadeInLeft}
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">Send us a Message</h3>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>

            <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+91 98765 43210" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service Interest</Label>
                  <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground">
                    <option value="">Select a service</option>
                    <option value="cards">Wedding Card Design</option>
                    <option value="website">Wedding Website Builder</option>
                    <option value="planning">Full Wedding Planning (Beta)</option>
                    <option value="consultation">General Consultation</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your wedding plans and how we can help..."
                    rows={4}
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-primary to-accent text-white hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>

          {/* Contact Details */}
          <motion.div 
            className="space-y-8"
            {...fadeInRight}
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">Contact Information</h3>
              <p className="text-muted-foreground">
                Reach out to us through any of these channels
              </p>
            </div>

            <div className="space-y-4">
              <Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <div className="flex items-center space-x-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-muted-foreground text-sm">
                      Mattathil Building, MC Road<br />
                      Vazhappally P.O, Changanassery<br />
                      Kottayam, Kerala, 686103
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <div className="flex items-center space-x-4">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <a href="tel:062385 45430" className="text-muted-foreground hover:text-primary transition-colors">
                      062385 45430
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <div className="flex items-center space-x-4">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">WhatsApp</div>
                    <a href="https://wa.me/916238545430" className="text-muted-foreground hover:text-green-600 transition-colors">
                      Chat with us instantly
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <div className="flex items-center space-x-4">
                  <Mail className="w-5 h-5 text-accent" />
                  <div>
                    <div className="font-medium">Email</div>
                    <a href="mailto:hello@matsoncards.com" className="text-muted-foreground hover:text-accent transition-colors">
                      hello@matsoncards.com
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* Business Hours */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-primary mt-1" />
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold">Business Hours</h4>
                  <div className="text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>By Appointment</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold">Follow Us</h4>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="border-primary/20 hover:bg-primary/5" asChild>
                  <a href="https://www.matsoncards.com" target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 mr-2" />
                    Website
                  </a>
                </Button>
                <Button variant="outline" className="border-primary/20 hover:bg-primary/5" asChild>
                  <a href="https://instagram.com/matson_cards_" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagram
                  </a>
                </Button>
                <Button variant="outline" className="border-primary/20 hover:bg-primary/5" asChild>
                  <a href="https://facebook.com/matson.cards" target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
