import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TechStack } from "@/components/TechStack";
import { HowItWorks } from "@/components/HowItWorks";
import { WorkflowBuilder } from "@/components/WorkflowBuilder";
import { ChatBot } from "@/components/ChatBot";
import { Footer } from "@/components/Footer";

const Home = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TechStack />
      <HowItWorks />
      <WorkflowBuilder />
      <Footer />
      <ChatBot />
    </main>
  );
};

export default Home;
