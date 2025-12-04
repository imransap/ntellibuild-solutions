import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { ServicesSection } from "@/components/ServicesSection";
import { WorkflowBuilder } from "@/components/WorkflowBuilder";
import { Testimonials } from "@/components/Testimonials";
import { CaseStudies } from "@/components/CaseStudies";
import { TechStack } from "@/components/TechStack";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { ChatBot } from "@/components/ChatBot";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TechStack />
      <HowItWorks />
      <ServicesSection />
      <WorkflowBuilder />
      <Testimonials />
      <CaseStudies />
      <FAQSection />
      <ContactSection />
      <Footer />
      <ChatBot />
    </main>
  );
};

export default Index;
