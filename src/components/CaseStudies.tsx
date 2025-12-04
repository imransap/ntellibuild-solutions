import { ArrowUpRight, TrendingUp, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    company: "Healthcare Provider Network",
    industry: "Healthcare",
    challenge: "Manual patient scheduling causing 40% appointment no-shows",
    solution: "AI-powered scheduling with automated reminders and rescheduling",
    results: [
      { icon: TrendingUp, value: "85%", label: "Reduction in no-shows" },
      { icon: Clock, value: "15hrs", label: "Saved weekly" },
      { icon: Users, value: "2,000+", label: "Patients served/month" },
    ],
  },
  {
    company: "E-commerce Retailer",
    industry: "Retail",
    challenge: "Overwhelmed support team handling 500+ daily inquiries",
    solution: "AI chatbot with intelligent routing and automated responses",
    results: [
      { icon: TrendingUp, value: "70%", label: "Queries auto-resolved" },
      { icon: Clock, value: "24/7", label: "Support coverage" },
      { icon: Users, value: "98%", label: "Customer satisfaction" },
    ],
  },
  {
    company: "Financial Services Firm",
    industry: "Finance",
    challenge: "Manual data entry causing errors and compliance issues",
    solution: "Automated data processing with validation and audit trails",
    results: [
      { icon: TrendingUp, value: "99.9%", label: "Data accuracy" },
      { icon: Clock, value: "60%", label: "Faster processing" },
      { icon: Users, value: "$200K", label: "Annual savings" },
    ],
  },
];

export const CaseStudies = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-dots opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-crimson text-sm font-medium tracking-wider uppercase">
            Case Studies
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 text-gradient">
            Real Results, Real Impact
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            See how businesses across industries have transformed their operations with SmartRunAI
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300"
            >
              {/* Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-crimson font-medium uppercase tracking-wider">
                    {study.industry}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-crimson transition-colors" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {study.company}
                </h3>
              </div>

              {/* Challenge & Solution */}
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    Challenge
                  </span>
                  <p className="text-sm text-foreground mt-1">{study.challenge}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    Solution
                  </span>
                  <p className="text-sm text-foreground mt-1">{study.solution}</p>
                </div>
              </div>

              {/* Results */}
              <div className="p-6 bg-secondary/30">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Results
                </span>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  {study.results.map((result, idx) => (
                    <div key={idx} className="text-center">
                      <result.icon className="w-4 h-4 text-crimson mx-auto mb-1" />
                      <div className="font-display font-bold text-foreground">
                        {result.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Case Studies
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
