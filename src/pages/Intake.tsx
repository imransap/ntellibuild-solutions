import { Navbar } from "@/components/Navbar";
import { IntakeForm } from "@/components/IntakeForm";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";

const Intake = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-crimson/10 text-crimson text-sm font-medium mb-6">
            Get Started
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Let's Build Your{" "}
            <span className="text-gradient-accent">Automation Solution</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete this intake form to help us understand your needs. We'll review your 
            information and create a customized automation strategy for your business.
          </p>
        </div>
      </section>

      <IntakeForm />
      <Footer />
      <ChatBot />
    </main>
  );
};

export default Intake;
