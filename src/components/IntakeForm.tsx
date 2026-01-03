import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Loader2, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const TOTAL_STEPS = 6;

const businessTypes = [
  "Small Business (1-10 employees)",
  "Medium Business (11-50 employees)",
  "Large Business (51-200 employees)",
  "Enterprise (200+ employees)",
  "Startup",
  "Freelancer / Solopreneur",
];

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
  "Consulting",
  "Non-Profit",
  "Other",
];

const automationGoals = [
  "Lead Generation & Management",
  "Customer Support Automation",
  "Email Marketing Automation",
  "Data Entry & Processing",
  "Invoice & Billing Automation",
  "Social Media Management",
  "Appointment Scheduling",
  "Document Processing",
  "Sales Pipeline Automation",
  "HR & Onboarding",
  "Inventory Management",
  "Other",
];

const currentTools = [
  "CRM (Salesforce, HubSpot, etc.)",
  "Email Marketing (Mailchimp, Constant Contact, etc.)",
  "Project Management (Asana, Trello, Monday, etc.)",
  "Accounting (QuickBooks, Xero, etc.)",
  "Communication (Slack, Teams, etc.)",
  "E-commerce Platform (Shopify, WooCommerce, etc.)",
  "Website (WordPress, Wix, etc.)",
  "Google Workspace",
  "Microsoft 365",
  "None / Not Sure",
  "Other",
];

const budgetRanges = [
  "Under $1,000",
  "$1,000 - $5,000",
  "$5,000 - $15,000",
  "$15,000 - $50,000",
  "$50,000+",
  "Not sure yet",
];

const timelines = [
  "Immediately (within 1-2 weeks)",
  "Short-term (1-3 months)",
  "Medium-term (3-6 months)",
  "Long-term (6+ months)",
  "Just exploring options",
];

const hearAboutUs = [
  "Google Search",
  "Social Media (LinkedIn, Facebook, etc.)",
  "Referral from a friend or colleague",
  "Online Advertisement",
  "Blog or Article",
  "Podcast",
  "Conference or Event",
  "Other",
];

export const IntakeForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Contact Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    jobTitle: "",
    
    // Step 2: Business Info
    businessType: "",
    industry: "",
    industryOther: "",
    website: "",
    
    // Step 3: Automation Goals
    automationGoals: [] as string[],
    automationGoalsOther: "",
    primaryChallenge: "",
    
    // Step 4: Current Tools & Tech
    currentTools: [] as string[],
    currentToolsOther: "",
    currentProcessDescription: "",
    
    // Step 5: Budget & Timeline
    budget: "",
    timeline: "",
    additionalNotes: "",
    
    // Step 6: Source
    hearAboutUs: "",
    hearAboutUsOther: "",
    referralName: "",
  });

  const handleCheckboxChange = (field: "automationGoals" | "currentTools", value: string) => {
    setFormData((prev) => {
      const current = prev[field];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter((item) => item !== value) };
      }
      return { ...prev, [field]: [...current, value] };
    });
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
          toast.error("Please fill in all required fields");
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          toast.error("Please enter a valid email address");
          return false;
        }
        return true;
      case 2:
        if (!formData.businessType || !formData.industry) {
          toast.error("Please select your business type and industry");
          return false;
        }
        if (formData.industry === "Other" && !formData.industryOther) {
          toast.error("Please specify your industry");
          return false;
        }
        return true;
      case 3:
        if (formData.automationGoals.length === 0) {
          toast.error("Please select at least one automation goal");
          return false;
        }
        if (formData.automationGoals.includes("Other") && !formData.automationGoalsOther) {
          toast.error("Please specify your other automation goals");
          return false;
        }
        return true;
      case 4:
        if (formData.currentTools.length === 0) {
          toast.error("Please select at least one option for current tools");
          return false;
        }
        if (formData.currentTools.includes("Other") && !formData.currentToolsOther) {
          toast.error("Please specify your other tools");
          return false;
        }
        return true;
      case 5:
        if (!formData.budget || !formData.timeline) {
          toast.error("Please select your budget and timeline");
          return false;
        }
        return true;
      case 6:
        if (!formData.hearAboutUs) {
          toast.error("Please let us know how you heard about us");
          return false;
        }
        if (formData.hearAboutUs === "Other" && !formData.hearAboutUsOther) {
          toast.error("Please specify how you heard about us");
          return false;
        }
        if (formData.hearAboutUs === "Referral from a friend or colleague" && !formData.referralName) {
          toast.error("Please provide the referral name");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    
    setIsSubmitting(true);

    const zapierWebhookUrl = "https://hooks.zapier.com/hooks/catch/25696856/uwmyj0o/";

    const submissionData = {
      formType: "intake",
      ...formData,
      automationGoals: formData.automationGoals.join(", "),
      currentTools: formData.currentTools.join(", "),
      timestamp: new Date().toISOString(),
    };

    try {
      // Send to Zapier webhook for Google Sheets
      fetch(zapierWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(submissionData),
      }).catch((error) => {
        console.error("Error sending to Zapier:", error);
      });

      // Also send email notification
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: submissionData,
      });

      if (error) throw error;

      toast.success("Intake form submitted successfully!", {
        description: "Our team will review your information and get back to you soon.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        companyName: "",
        jobTitle: "",
        businessType: "",
        industry: "",
        industryOther: "",
        website: "",
        automationGoals: [],
        automationGoalsOther: "",
        primaryChallenge: "",
        currentTools: [],
        currentToolsOther: "",
        currentProcessDescription: "",
        budget: "",
        timeline: "",
        additionalNotes: "",
        hearAboutUs: "",
        hearAboutUsOther: "",
        referralName: "",
      });
      setCurrentStep(1);
    } catch (error: any) {
      console.error("Error submitting intake form:", error);
      toast.error("Failed to submit form", {
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: TOTAL_STEPS }, (_, i) => (
        <div key={i} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
              i + 1 < currentStep
                ? "bg-crimson text-white"
                : i + 1 === currentStep
                ? "bg-crimson/20 text-crimson border-2 border-crimson"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {i + 1 < currentStep ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
          </div>
          {i < TOTAL_STEPS - 1 && (
            <div
              className={`w-8 h-0.5 ${
                i + 1 < currentStep ? "bg-crimson" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-display font-semibold text-foreground">Contact Information</h3>
        <p className="text-muted-foreground text-sm mt-1">Let's start with your basic details</p>
      </div>
      
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

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
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
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            className="bg-secondary/50 border-border/50"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="Acme Inc."
            className="bg-secondary/50 border-border/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            value={formData.jobTitle}
            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            placeholder="CEO / Founder"
            className="bg-secondary/50 border-border/50"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-display font-semibold text-foreground">Business Information</h3>
        <p className="text-muted-foreground text-sm mt-1">Tell us about your business</p>
      </div>

      <div className="space-y-4">
        <Label>Business Type *</Label>
        <RadioGroup
          value={formData.businessType}
          onValueChange={(value) => setFormData({ ...formData, businessType: value })}
          className="grid sm:grid-cols-2 gap-3"
        >
          {businessTypes.map((type) => (
            <div key={type} className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <RadioGroupItem value={type} id={type} />
              <Label htmlFor={type} className="cursor-pointer text-sm font-normal">{type}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>Industry *</Label>
        <RadioGroup
          value={formData.industry}
          onValueChange={(value) => setFormData({ ...formData, industry: value })}
          className="grid sm:grid-cols-2 gap-3"
        >
          {industries.map((industry) => (
            <div key={industry} className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <RadioGroupItem value={industry} id={`industry-${industry}`} />
              <Label htmlFor={`industry-${industry}`} className="cursor-pointer text-sm font-normal">{industry}</Label>
            </div>
          ))}
        </RadioGroup>
        {formData.industry === "Other" && (
          <Input
            value={formData.industryOther}
            onChange={(e) => setFormData({ ...formData, industryOther: e.target.value })}
            placeholder="Please specify your industry"
            className="bg-secondary/50 border-border/50 mt-3"
          />
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website URL</Label>
        <Input
          id="website"
          type="url"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          placeholder="https://yourcompany.com"
          className="bg-secondary/50 border-border/50"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-display font-semibold text-foreground">Automation Goals</h3>
        <p className="text-muted-foreground text-sm mt-1">What would you like to automate? (Select all that apply)</p>
      </div>

      <div className="space-y-4">
        <Label>Select your automation goals *</Label>
        <div className="grid sm:grid-cols-2 gap-3">
          {automationGoals.map((goal) => (
            <div key={goal} className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <Checkbox
                id={goal}
                checked={formData.automationGoals.includes(goal)}
                onCheckedChange={() => handleCheckboxChange("automationGoals", goal)}
              />
              <Label htmlFor={goal} className="cursor-pointer text-sm font-normal">{goal}</Label>
            </div>
          ))}
        </div>
        {formData.automationGoals.includes("Other") && (
          <Input
            value={formData.automationGoalsOther}
            onChange={(e) => setFormData({ ...formData, automationGoalsOther: e.target.value })}
            placeholder="Please specify other automation goals"
            className="bg-secondary/50 border-border/50 mt-3"
          />
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="primaryChallenge">What is your primary challenge or pain point?</Label>
        <Textarea
          id="primaryChallenge"
          value={formData.primaryChallenge}
          onChange={(e) => setFormData({ ...formData, primaryChallenge: e.target.value })}
          placeholder="Describe the main challenge you're facing that you'd like to solve with automation..."
          rows={4}
          className="bg-secondary/50 border-border/50 resize-none"
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-display font-semibold text-foreground">Current Tools & Technology</h3>
        <p className="text-muted-foreground text-sm mt-1">What tools are you currently using? (Select all that apply)</p>
      </div>

      <div className="space-y-4">
        <Label>Current tools and platforms *</Label>
        <div className="grid sm:grid-cols-2 gap-3">
          {currentTools.map((tool) => (
            <div key={tool} className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <Checkbox
                id={tool}
                checked={formData.currentTools.includes(tool)}
                onCheckedChange={() => handleCheckboxChange("currentTools", tool)}
              />
              <Label htmlFor={tool} className="cursor-pointer text-sm font-normal">{tool}</Label>
            </div>
          ))}
        </div>
        {formData.currentTools.includes("Other") && (
          <Input
            value={formData.currentToolsOther}
            onChange={(e) => setFormData({ ...formData, currentToolsOther: e.target.value })}
            placeholder="Please specify other tools you use"
            className="bg-secondary/50 border-border/50 mt-3"
          />
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentProcessDescription">Describe your current workflow/process</Label>
        <Textarea
          id="currentProcessDescription"
          value={formData.currentProcessDescription}
          onChange={(e) => setFormData({ ...formData, currentProcessDescription: e.target.value })}
          placeholder="Briefly describe how you currently handle the tasks you want to automate..."
          rows={4}
          className="bg-secondary/50 border-border/50 resize-none"
        />
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-display font-semibold text-foreground">Budget & Timeline</h3>
        <p className="text-muted-foreground text-sm mt-1">Help us understand your investment and timeline expectations</p>
      </div>

      <div className="space-y-4">
        <Label>What is your budget range for this project? *</Label>
        <RadioGroup
          value={formData.budget}
          onValueChange={(value) => setFormData({ ...formData, budget: value })}
          className="grid sm:grid-cols-2 gap-3"
        >
          {budgetRanges.map((budget) => (
            <div key={budget} className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <RadioGroupItem value={budget} id={`budget-${budget}`} />
              <Label htmlFor={`budget-${budget}`} className="cursor-pointer text-sm font-normal">{budget}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>What is your ideal timeline for implementation? *</Label>
        <RadioGroup
          value={formData.timeline}
          onValueChange={(value) => setFormData({ ...formData, timeline: value })}
          className="grid sm:grid-cols-2 gap-3"
        >
          {timelines.map((timeline) => (
            <div key={timeline} className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <RadioGroupItem value={timeline} id={`timeline-${timeline}`} />
              <Label htmlFor={`timeline-${timeline}`} className="cursor-pointer text-sm font-normal">{timeline}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalNotes">Additional Notes or Requirements</Label>
        <Textarea
          id="additionalNotes"
          value={formData.additionalNotes}
          onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
          placeholder="Any other information you'd like us to know about your project..."
          rows={4}
          className="bg-secondary/50 border-border/50 resize-none"
        />
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-display font-semibold text-foreground">How Did You Find Us?</h3>
        <p className="text-muted-foreground text-sm mt-1">One last question before you submit</p>
      </div>

      <div className="space-y-4">
        <Label>How did you hear about SmartRunAI? *</Label>
        <RadioGroup
          value={formData.hearAboutUs}
          onValueChange={(value) => setFormData({ ...formData, hearAboutUs: value })}
          className="grid sm:grid-cols-2 gap-3"
        >
          {hearAboutUs.map((source) => (
            <div key={source} className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <RadioGroupItem value={source} id={`source-${source}`} />
              <Label htmlFor={`source-${source}`} className="cursor-pointer text-sm font-normal">{source}</Label>
            </div>
          ))}
        </RadioGroup>
        {formData.hearAboutUs === "Other" && (
          <Input
            value={formData.hearAboutUsOther}
            onChange={(e) => setFormData({ ...formData, hearAboutUsOther: e.target.value })}
            placeholder="Please specify"
            className="bg-secondary/50 border-border/50 mt-3"
          />
        )}
        {formData.hearAboutUs === "Referral from a friend or colleague" && (
          <Input
            value={formData.referralName}
            onChange={(e) => setFormData({ ...formData, referralName: e.target.value })}
            placeholder="Who referred you?"
            className="bg-secondary/50 border-border/50 mt-3"
          />
        )}
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      case 6:
        return renderStep6();
      default:
        return null;
    }
  };

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8">
            {renderStepIndicator()}
            {renderCurrentStep()}

            <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
              <Button
                type="button"
                variant="ghost"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={currentStep === 1 ? "invisible" : ""}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < TOTAL_STEPS ? (
                <Button type="button" variant="hero" onClick={handleNext}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" variant="hero" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit
                      <CheckCircle2 className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
