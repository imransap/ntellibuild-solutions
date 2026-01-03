import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Mail, MapPin, Loader2, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const industries = [
  "Healthcare",
  "Finance & Banking",
  "E-commerce & Retail",
  "Manufacturing",
  "Real Estate",
  "Legal Services",
  "Marketing & Advertising",
  "Education",
  "Technology",
  "Other",
];

const budgets = [
  "Under $5,000",
  "$5,000 - $15,000",
  "$15,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000+",
];

const sources = [
  "Google Search",
  "Social Media",
  "Referral",
  "LinkedIn",
  "Advertisement",
  "Blog/Article",
  "Other",
];

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    industry: "",
    budget: "",
    source: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const zapierWebhookUrl = "https://hooks.zapier.com/hooks/catch/25696856/uwmyj0o/";

    try {
      // Send to Zapier webhook for Google Sheets
      fetch(zapierWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          formType: "contact",
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          industry: formData.industry,
          budget: formData.budget,
          source: formData.source,
          message: formData.message,
          timestamp: new Date().toISOString(),
        }),
      }).catch((error) => {
        console.error("Error sending to Zapier:", error);
      });

      // Also send email notification
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          formType: "contact",
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          industry: formData.industry,
          budget: formData.budget,
          source: formData.source,
          message: formData.message,
        },
      });

      if (error) throw error;

      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        industry: "",
        budget: "",
        source: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message", {
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-crimson text-sm font-medium tracking-wider uppercase">
            Contact Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 text-gradient">
            Let's Start Your Automation Journey
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Ready to transform your business? Get in touch and let's discuss how we can help.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-crimson/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-crimson" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    info@smartrunai.com
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-crimson/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-crimson" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">Location</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Toronto, Ontario, CA<br />
                    New York, NY, US
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="John"
                    className="bg-secondary/50 border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                    className="bg-secondary/50 border-border/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@company.com"
                  className="bg-secondary/50 border-border/50"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Industry *</Label>
                  <Select
                    required
                    value={formData.industry}
                    onValueChange={(value) => setFormData({ ...formData, industry: value })}
                  >
                    <SelectTrigger className="bg-secondary/50 border-border/50">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-border/50">
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Budget Range</Label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) => setFormData({ ...formData, budget: value })}
                  >
                    <SelectTrigger className="bg-secondary/50 border-border/50">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-border/50">
                      {budgets.map((budget) => (
                        <SelectItem key={budget} value={budget}>
                          {budget}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>How did you hear about us?</Label>
                  <Select
                    value={formData.source}
                    onValueChange={(value) => setFormData({ ...formData, source: value })}
                  >
                    <SelectTrigger className="bg-secondary/50 border-border/50">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-border/50">
                      {sources.map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your automation needs..."
                  rows={4}
                  className="bg-secondary/50 border-border/50 resize-none"
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
