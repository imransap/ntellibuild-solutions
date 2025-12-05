import { Navbar } from "@/components/Navbar";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";

const FAQs = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-crimson/10 text-crimson text-sm font-medium mb-6">
            FAQs
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Frequently Asked{" "}
            <span className="text-gradient-accent">Questions</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our AI automation services 
            and how we can help your business.
          </p>
        </div>
      </section>

      <FAQSection />
      <Footer />
      <ChatBot />
    </main>
  );
};

export default FAQs;
