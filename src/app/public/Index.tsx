import Hero from "@/app/public/components/Hero";
import FeaturedSection from "@/app/public/components/sections/FeaturedSection";
import ServicesSection from "@/app/public/components/sections/ServicesSection";
import WhyChooseSection from "@/app/public/components/sections/WhyChooseSection";
import AboutSection from "@/app/public/components/sections/AboutSection";
import ContactSection from "@/app/public/components/sections/ContactSection";
import CTASection from "@/app/public/components/sections/CTASection";
import { useEffect } from "react";

const Index = () => {
  // Add smooth scrolling behavior
  useEffect(() => {
    // Add smooth scrolling CSS
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen">
      <section id="home">
        <Hero />
      </section>
      
      <FeaturedSection />
      
      <section id="services">
        <ServicesSection />
      </section>
      
      <section id="why-choose">
        <WhyChooseSection />
      </section>
      
      <section id="about">
        <AboutSection />
      </section>
      
      <section id="contact">
        <ContactSection />
      </section>
{/*       
      <CTASection /> */}
    </div>
  );
};

export default Index;
