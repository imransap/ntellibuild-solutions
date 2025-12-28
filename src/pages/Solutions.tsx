import { Navbar } from "@/components/Navbar";
import { Testimonials } from "@/components/Testimonials";
import { CaseStudies } from "@/components/CaseStudies";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";

const Solutions = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-crimson/10 text-crimson text-sm font-medium mb-6">
            Solutions & Success Stories
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Real Results from{" "}
            <span className="text-gradient-accent">Real Clients</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how businesses like yours have transformed their operations with our 
            AI automation solutions.
          </p>
        </div>
      </section>

      <CaseStudies />
      {/* Testimonials hidden until real testimonials are available */}
      {/* <Testimonials /> */}
      <Footer />
      <ChatBot />
    </main>
  );
};

export default Solutions;
