import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Users, Target, Lightbulb, Award } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're committed to democratizing AI automation, making powerful tools accessible to businesses of all sizes."
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We continuously push the boundaries of what's possible with AI, staying ahead of industry trends."
  },
  {
    icon: Users,
    title: "Client-Centric",
    description: "Your success is our success. We build lasting partnerships focused on delivering measurable results."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in every solution we deliver, ensuring quality and reliability."
  }
];

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-crimson/10 text-crimson text-sm font-medium mb-6">
            About SmartRunAI
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Transforming Businesses Through{" "}
            <span className="text-gradient-accent">Intelligent Automation</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            SmartRunAI is a leading AI automation agency dedicated to helping organizations 
            streamline operations, boost productivity, and unlock new growth opportunities.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded with a vision to bridge the gap between cutting-edge AI technology 
                  and practical business applications, SmartRunAI has grown into a trusted 
                  partner for organizations seeking digital transformation.
                </p>
                <p>
                  We understand that every business is unique. That's why we don't believe 
                  in one-size-fits-all solutions. Our team of AI specialists works closely 
                  with each client to develop customized automation strategies that align 
                  with their specific goals and challenges.
                </p>
                <p>
                  From automating lead generation to streamlining customer communications, 
                  we've helped countless businesses save time, reduce costs, and focus on 
                  what matters most—their customers.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-crimson/20 to-navy/20 glass p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-display font-bold text-gradient-accent mb-2">100+</div>
                  <div className="text-muted-foreground">Businesses Transformed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="glass rounded-xl p-6 text-center hover:bg-secondary/50 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-crimson/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-crimson" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </main>
  );
};

export default About;
