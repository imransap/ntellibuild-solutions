import { Navbar } from "@/components/Navbar";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";

const Contact = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-crimson/10 text-crimson text-sm font-medium mb-6">
            Get In Touch
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Let's Start Your{" "}
            <span className="text-gradient-accent">Automation Journey</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your business? Get in touch with our team and discover 
            how AI automation can work for you.
          </p>
        </div>
      </section>

      <ContactSection />
      <Footer />
      <ChatBot />
    </main>
  );
};

export default Contact;
