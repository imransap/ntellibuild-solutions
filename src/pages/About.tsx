import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Users, Target, Lightbulb, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

import carousel1 from "@/assets/carousel-1-square.png";
import carousel2 from "@/assets/carousel-2.png";
import carousel3 from "@/assets/carousel-3.png";
import carousel4 from "@/assets/carousel-4.png";

const carouselImages = [
  { src: carousel1, alt: "Transforming Businesses Through Automation" },
  { src: carousel2, alt: "Step 1: Discover & Analyze" },
  { src: carousel3, alt: "Step 2: Design & Integrate" },
  { src: carousel4, alt: "Step 3: Launch & Scale" },
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
