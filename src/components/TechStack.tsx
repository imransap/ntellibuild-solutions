import { Bot, Cloud, Database, Lock, Zap, Globe } from "lucide-react";

const technologies = [
  { icon: Bot, name: "OpenAI GPT", description: "Advanced language models" },
  { icon: Cloud, name: "AWS", description: "Cloud infrastructure" },
  { icon: Database, name: "PostgreSQL", description: "Data management" },
  { icon: Lock, name: "SOC 2 Compliant", description: "Enterprise security" },
  { icon: Zap, name: "Zapier", description: "3000+ integrations" },
  { icon: Zap, name: "n8n", description: "Workflow automation" },
  { icon: Zap, name: "Make", description: "Visual automation" },
  { icon: Globe, name: "Power BI", description: "Business intelligence" },
  { icon: Globe, name: "REST APIs", description: "Universal connectivity" },
];

export const TechStack = () => {
  return (
    <section className="py-16 border-y border-border bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-muted-foreground text-sm">
            Powered by Industry-Leading Technology
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-crimson/10 transition-colors">
                <tech.icon className="w-5 h-5 text-muted-foreground group-hover:text-crimson transition-colors" />
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-foreground">
                  {tech.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {tech.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
