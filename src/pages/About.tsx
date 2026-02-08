import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Users, Target, Lightbulb, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

import carousel1 from "@/assets/carousel-2.png";
import carousel2 from "@/assets/carousel-3.png";
import carousel3 from "@/assets/carousel-4.png";

const carouselImages = [
  { src: carousel1, alt: "Step 1: Discover & Analyze" },
  { src: carousel2, alt: "Step 2: Design & Integrate" },
  { src: carousel3, alt: "Step 3: Launch & Scale" },
];

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);
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
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="font-semibold text-foreground italic">
                  It started with a problem I couldn't ignore.
                </p>
                <p>
                  I watched small businesses around me drowning in repetitive tasks — business owners spending weekends updating spreadsheets, sales teams buried in data entry, customer service reps copying and pasting the same responses hundreds of times. They knew AI could help. They just didn't know where to start.
                </p>
                <p>
                  Most agencies wanted to sell them the most expensive solution. I wanted to build them the right one.
                </p>
                <p>
                  Late nights turned into early mornings as I channeled two decades of experience in SAP analytics, solution architecture, and client consulting into a new mission. I'd spent years understanding how businesses work — gathering requirements, diagnosing pain points in boardrooms and on factory floors. Now I was bringing all of that knowledge to solve a different kind of problem: helping businesses harness AI and automation in ways that actually worked for them.
                </p>
                <p>
                  Our first client was a small medical clinic drowning in appointment chaos. Their front desk staff was spending hours every day juggling phone calls — scheduling, rescheduling, canceling, confirming. Patients on hold. Missed appointments creating gaps in the schedule. The team was exhausted, and the clinic was losing revenue from unfilled slots.
                </p>
                <p>
                  We built them an intelligent system that handled it all automatically. Patients could book online instantly. Cancellations triggered smart rebooking from the waitlist. Reminders went out seamlessly. When the office manager called to tell us her staff actually took a lunch break on time for the first time in months — and that they'd filled 90% of their previously lost appointments — I knew we were onto something.
                </p>
                <p className="font-semibold text-foreground">
                  That's become our measuring stick. Not features. Not complexity. Impact.
                </p>
                <p>
                  We don't do cookie‑cutter solutions because no two businesses hurt in the same way. A system that transforms one company might be useless to another. So we listen first. We ask the uncomfortable questions. We dig until we understand not just what's broken, but why it matters.
                </p>
                <p>
                  And when budget is tight, we get creative. We've built phased solutions, started with quick wins, and yes — occasionally worked for less because we believed in what someone was building. This isn't charity. It's partnership. When our clients grow, we grow.
                </p>
                <p className="font-semibold text-foreground">
                  Some agencies want to impress you with jargon. We want to impress you with results.
                </p>
                <p>
                  Every automation we build, every workflow we optimize, every hour we give back to a business owner — it's not just about efficiency. It's about giving people their lives back. It's about helping small teams compete with big companies. It's about turning "impossible" into "done."
                </p>
                <p>
                  We're not the biggest agency. We're not the flashiest. But when you work with us, you're not getting a vendor. You're getting a team that genuinely cares whether you succeed — and will do whatever it takes to make sure you do.
                </p>
                <p className="font-semibold text-foreground italic">
                  That's not our business model. That's our promise.
                </p>
                <p className="mt-6 text-foreground">
                  P.S. If our story resonates with your struggle, let's talk. I'd love to hear yours.
                </p>
                <p className="font-semibold text-foreground mt-2">
                  — Founder &amp; CEO
                </p>
              </div>
            </div>
            <div 
              className="relative"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div className="aspect-square rounded-2xl overflow-hidden border border-border/30 bg-background relative">
                {carouselImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-background transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-background transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        index === currentSlide 
                          ? "bg-crimson" 
                          : "bg-foreground/30 hover:bg-foreground/50"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
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
