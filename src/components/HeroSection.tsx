import { Sparkles, Zap, Bot, BarChart3 } from "lucide-react";
import { useState } from "react";
import { BookDemoModal } from "./BookDemoModal";

const floatingIcons = [
  { Icon: Zap, delay: "0s", position: "top-20 left-[15%]" },
  { Icon: Bot, delay: "1s", position: "top-40 right-[20%]" },
  { Icon: BarChart3, delay: "2s", position: "bottom-32 left-[25%]" },
  { Icon: Sparkles, delay: "0.5s", position: "bottom-40 right-[15%]" },
];

export const HeroSection = () => {
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);

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

            {/* AI Automation Content Section */}
            <div
              className="mt-12 max-w-3xl mx-auto text-left animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
                What is AI Automation:
              </h2>
              <p className="text-muted-foreground mb-4">
                AI automation is a smarter way to run your business. It uses intelligent software to handle repetitive tasks like data entry, customer follow-ups, scheduling, and reporting automatically and accurately. It works quietly in the background, helping your business operate faster, smoother, and more efficiently.
              </p>
              <p className="text-muted-foreground mb-4">
                For small business owners, AI automation means less time spent on manual work and more time focusing on customers, growth, and revenue.
              </p>
              <p className="text-muted-foreground mb-8">
                For enterprise and corporate teams, it means scalable operations, consistent processes, better data visibility, and reduced operational costs without increasing workload.
              </p>

              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
                The Business Value:
              </h2>
              <p className="text-muted-foreground mb-4">
                AI automation reduces errors, speeds up operations, improves customer experience, and helps businesses grow without adding unnecessary overhead. The result is a more streamlined, high-performing organization built for long-term success.
              </p>
              <p className="text-muted-foreground mb-6">
                AI automation isn't just about saving time, it's about transforming how your business operates. By reducing manual work, your team can focus on what truly drives growth, that is, customers, strategy, and revenue.
              </p>
              <p className="text-muted-foreground mb-4">
                With the right automation in place, businesses can:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-8 space-y-2 pl-2">
                <li>Reduce operational costs</li>
                <li>Eliminate human errors</li>
                <li>Respond to customers faster</li>
                <li>Scale operations without hiring more staff</li>
                <li>Gain real-time insights for smarter decisions</li>
              </ul>

              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
                The Real Business Impact
              </h2>
              <p className="text-muted-foreground">
                When processes are automated, work gets done faster, customers get better service, and teams feel less overwhelmed. The result is a more productive business, happier customers, and measurable ROI often within the first few months.
              </p>
            </div>

            {/* Video Section */}
            <div
              className="mt-16 max-w-3xl mx-auto animate-fade-in"
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
