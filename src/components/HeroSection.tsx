import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Zap, Bot, BarChart3 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookDemoModal } from "./BookDemoModal";

const floatingIcons = [
  { Icon: Zap, delay: "0s", position: "top-20 left-[15%]" },
  { Icon: Bot, delay: "1s", position: "top-40 right-[20%]" },
  { Icon: BarChart3, delay: "2s", position: "bottom-32 left-[25%]" },
  { Icon: Sparkles, delay: "0.5s", position: "bottom-40 right-[15%]" },
];

export const HeroSection = () => {
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: "var(--gradient-glow)" }}
        />

        {/* Floating Icons */}
        {floatingIcons.map(({ Icon, delay, position }, index) => (
          <div
            key={index}
            className={`absolute ${position} hidden lg:block animate-float`}
            style={{ animationDelay: delay }}
          >
            <div className="glass p-4 rounded-xl">
              <Icon className="w-6 h-6 text-crimson" />
            </div>
          </div>
        ))}

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-crimson" />
              <span className="text-sm text-muted-foreground">
                AI-Powered Workflow Automation
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="text-gradient">Automate Your Business Workflow</span>
              <br />
              <span className="text-foreground">with</span>{" "}
              <span className="text-gradient-accent glow-text">Intelligent AI</span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Transform your workflows, generate more leads, automate email responses,
              and unlock data-driven insights. Let AI handle the repetitive tasks while
              you focus on what matters—your customers.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Button
                variant="hero"
                size="xl"
                onClick={() => navigate("/intake")}
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="glass" size="xl">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Video Section */}
            <div
              className="mt-16 max-w-4xl mx-auto animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden glass border border-border/50">
                <video
                  className="w-full h-full object-cover"
                  controls
                  poster=""
                >
                  <source src="/videos/SmartRunAI_1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      <BookDemoModal open={isBookDemoOpen} onOpenChange={setIsBookDemoOpen} />
    </>
  );
};
