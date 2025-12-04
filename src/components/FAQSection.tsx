import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does it take to implement an automation solution?",
    answer:
      "Implementation timeline varies based on complexity. Simple automations can be deployed within 1-2 weeks, while enterprise solutions typically take 4-8 weeks. We provide detailed timelines during our initial consultation.",
  },
  {
    question: "Do I need technical expertise to use SmartRunAI?",
    answer:
      "Not at all! Our solutions are designed for business users. We handle all technical aspects and provide intuitive dashboards for monitoring. Training and ongoing support are included.",
  },
  {
    question: "What integrations do you support?",
    answer:
      "We integrate with 3000+ applications including Salesforce, HubSpot, Slack, Microsoft 365, Google Workspace, Zapier, and most major CRM, ERP, and productivity tools. Custom API integrations are also available.",
  },
  {
    question: "How do you ensure data security?",
    answer:
      "We're SOC 2 Type II compliant and follow enterprise-grade security practices. All data is encrypted in transit and at rest. We never store sensitive data longer than necessary and offer on-premise deployment for sensitive industries.",
  },
  {
    question: "What's the typical ROI for automation projects?",
    answer:
      "Our clients typically see 3-10x ROI within the first year. This comes from reduced labor costs, fewer errors, faster processing times, and improved customer satisfaction. We provide detailed ROI projections during consultation.",
  },
  {
    question: "Can automations be customized for my specific workflow?",
    answer:
      "Absolutely! Every automation we build is tailored to your unique processes. We start with your existing workflows and design solutions that fit seamlessly into how your team operates.",
  },
  {
    question: "What happens if something goes wrong with an automation?",
    answer:
      "All our automations include monitoring, alerting, and fallback mechanisms. Our support team is available 24/7 for critical issues. We also provide comprehensive documentation and training for your team.",
  },
  {
    question: "Do you offer a trial or pilot program?",
    answer:
      "Yes! We offer a pilot program where we implement a small automation to demonstrate value before committing to a larger engagement. This lets you see results with minimal risk.",
  },
];

export const FAQSection = () => {
  return (
    <section id="faqs" className="py-24 relative bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-crimson text-sm font-medium tracking-wider uppercase">
            FAQs
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 text-gradient">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Everything you need to know about SmartRunAI and our automation services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl border-0 px-6 data-[state=open]:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-left font-display font-semibold hover:no-underline py-5 text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
