import { 
  Mail, 
  Users, 
  BarChart3, 
  Clock, 
  MessageSquare, 
  Database,
  Workflow,
  Shield
} from "lucide-react";

const services = [
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Streamline complex business processes with intelligent automation that adapts to your needs.",
  },
  {
    icon: Mail,
    title: "Email Automation",
    description: "AI-powered email responses and campaigns that engage customers while you focus on growth.",
  },
  {
    icon: Users,
    title: "Lead Generation",
    description: "Automated lead capture, qualification, and nurturing to fill your pipeline 24/7.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Real-time dashboards and automated reports for data-driven decision making.",
  },
  {
    icon: MessageSquare,
    title: "Customer Support AI",
    description: "Intelligent chatbots that handle inquiries, route tickets, and improve satisfaction.",
  },
  {
    icon: Database,
    title: "Data Processing",
    description: "Automated data entry, validation, and synchronization across your systems.",
  },
  {
    icon: Clock,
    title: "Task Scheduling",
    description: "Smart scheduling and resource allocation to maximize team productivity.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Automated testing and monitoring to ensure consistent delivery quality.",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-crimson text-sm font-medium tracking-wider uppercase">
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 text-gradient">
            AI Automation Solutions
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Comprehensive automation services designed to transform every aspect of your business operations
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-crimson/10 flex items-center justify-center mb-4 group-hover:bg-crimson/20 transition-colors">
                <service.icon className="w-6 h-6 text-crimson" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-foreground">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
