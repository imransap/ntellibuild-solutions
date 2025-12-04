import { MessageSquare, Cog, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Discover & Analyze",
    description:
      "We analyze your current workflows and identify automation opportunities. Our AI evaluates processes to find the best optimization strategies.",
  },
  {
    number: "02",
    icon: Cog,
    title: "Design & Build",
    description:
      "Our team designs custom AI solutions tailored to your needs. We build and integrate automation seamlessly into your existing systems.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Deploy & Scale",
    description:
      "Launch your automated workflows with full support. Monitor performance, gather insights, and scale as your business grows.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-dots opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-crimson text-sm font-medium tracking-wider uppercase">
            How It Works
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 text-gradient">
            Three Steps to Transformation
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Our streamlined process ensures quick deployment and maximum ROI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-crimson/50 to-transparent" />
              )}

              <div className="glass-card rounded-2xl p-8 h-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
                {/* Step Number */}
                <div className="text-6xl font-display font-bold text-crimson/20 absolute top-4 right-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-crimson to-crimson-dark flex items-center justify-center mb-6 glow">
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
