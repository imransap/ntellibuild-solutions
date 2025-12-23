import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const KNOWLEDGE_BASE = `
# Smart Run AI – Complete Knowledge Base

## 1. Introduction to Smart Run AI

Smart Run AI is an automation agency that helps small and medium-sized businesses save time, reduce manual work, and improve efficiency through intelligent automation solutions. We specialize in:

- Workflow Automation
- AI-Powered Process Optimization
- Custom Chatbots & AI Assistants
- Data Extraction & Analytics
- Lead Generation Automation
- Robotic Process Automation (RPA)

Our goal is to make automation accessible, affordable, and tailored to your specific business needs.

## 2. Our Core Services

### 2.1 Workflow Automation
We automate repetitive business processes using platforms like n8n, Make, and Zapier. Examples include:
- Email and SMS automation
- CRM and sales funnel automation
- Invoice and document processing
- Calendar and appointment scheduling
- Cross-platform data synchronization

Example Use Case: Automatically sync new leads from your website to your CRM and send personalized follow-up emails.

### 2.2 AI Chatbots & Virtual Assistants
We build custom AI chatbots for:
- Customer support (24/7 query handling)
- WhatsApp/Telegram/Messenger automation
- Internal team assistance (HR, IT helpdesk)
- Lead qualification and routing
- FAQ automation on websites

Example Use Case: A chatbot that answers common customer questions and books appointments directly into your calendar.

### 2.3 Robotic Process Automation (RPA)
We automate rule-based, repetitive digital tasks such as:
- Data entry across systems
- Form filling and submission
- Report generation
- Email sorting and labeling
- Social media posting

Example Use Case: Automatically extract data from incoming invoices and enter it into your accounting software.

### 2.4 Lead Generation Automation
We design end-to-end lead generation systems that:
- Capture leads from websites, ads, and social media
- Qualify leads using AI scoring
- Automate follow-up via email/SMS
- Sync leads to your CRM
- Provide real-time lead dashboards

Example Use Case: An AI system that captures real estate leads, scores them, and sends personalized follow-up sequences.

### 2.5 Data Extraction & Analytics
We help you turn unstructured data into actionable insights:
- Extract text/data from PDFs, emails, and websites
- Build custom Q&A systems for documents
- Create automated reporting dashboards
- Implement AI-driven analytics for decision-making

Example Use Case: An automated system that reads resumes, extracts key details, and ranks candidates for recruitment.

### 2.6 Email Automation
AI-powered email responses and campaigns that engage customers while you focus on growth.

### 2.7 Analytics & Reporting
Real-time dashboards and automated reports for data-driven decision making.

### 2.8 Customer Support AI
Intelligent chatbots that handle inquiries, route tickets, and improve satisfaction.

### 2.9 Data Processing
Automated data entry, validation, and synchronization across your systems.

### 2.10 Task Scheduling
Smart scheduling and resource allocation to maximize team productivity.

### 2.11 Quality Assurance
Automated testing and monitoring to ensure consistent delivery quality.

## 3. How We Work (Process Overview)

### Step 1: Discovery Call
We identify your pain points and automation opportunities. Book a demo to get started!

### Step 2: Process Mapping
We document your current workflows and pinpoint areas for automation.

### Step 3: Solution Design
We propose 1–2 high-impact automations to start with.

### Step 4: Development & Testing
We build and test the automation using real or sample data.

### Step 5: Deployment & Training
We launch the automation and train your team.

### Step 6: Ongoing Support
We offer maintenance, monitoring, and updates as needed.

## 4. Technology We Use

- Automation Platforms: n8n, Make, Zapier
- AI Models: OpenAI GPT, Anthropic Claude, Hugging Face
- Chatbot Builders: Custom GPTs, WhatsApp Business API, Telegram Bot API
- Data Tools: Pinecone, Chroma, Weaviate for AI memory
- Development: Google Cloud Functions, AWS Lambda (for advanced needs)
- Project Management: Notion, Airtable
- Integrations: 3000+ applications including Salesforce, HubSpot, Slack, Microsoft 365, Google Workspace, QuickBooks, Calendly, Gmail, and most major CRM, ERP, and productivity tools.

## 5. Industries We Serve

- Real Estate
- E-commerce
- Healthcare & Clinics
- Recruitment & HR
- Small Business Administration
- Logistics & Supply Chain
- Digital Marketing Agencies
- Financial Services

## 6. Case Studies & Results

### Healthcare Provider Network
- Challenge: Manual patient scheduling causing 40% appointment no-shows
- Solution: AI-powered scheduling with automated reminders and rescheduling
- Results: 85% reduction in no-shows, 15 hours saved weekly, 2,000+ patients served/month

### E-commerce Retailer
- Challenge: Overwhelmed support team handling 500+ daily inquiries
- Solution: AI chatbot with intelligent routing and automated responses
- Results: 70% queries auto-resolved, 24/7 support coverage, 98% customer satisfaction

### Financial Services Firm
- Challenge: Manual data entry causing errors and compliance issues
- Solution: Automated data processing with validation and audit trails
- Results: 99.9% data accuracy, 60% faster processing, $200K annual savings

## 7. Frequently Asked Questions (FAQ)

Q: What kind of businesses can benefit from your services?
A: Any business that relies on repetitive manual tasks, especially in real estate, e-commerce, healthcare, recruitment, and small business administration.

Q: How long does it take to build an automation?
A: Implementation timeline varies based on complexity. Simple automations can be deployed within 1-3 weeks, while enterprise solutions typically take 4-8 weeks. We provide detailed timelines during our initial consultation.

Q: Do you offer ongoing support?
A: Yes, we offer monthly maintenance and support packages to ensure everything runs smoothly.

Q: Can you automate existing software we use?
A: Yes, we integrate with popular tools like HubSpot, Salesforce, QuickBooks, Calendly, Gmail, and many more.

Q: Can automation be customized for my specific workflow?
A: Absolutely! Every automation we build is tailored to your unique processes. We start with your existing workflows and design solutions that fit seamlessly into how your team operates.

Q: Do I need technical expertise to use SmartRunAI?
A: Not at all! Our solutions are designed for business users. We handle all technical aspects and provide intuitive dashboards for monitoring. Training and ongoing support are included.

Q: What integrations do you support?
A: We integrate with 3000+ applications including Salesforce, HubSpot, Slack, Microsoft 365, Google Workspace, Zapier, and most major CRM, ERP, and productivity tools. Custom API integrations are also available.

Q: How do you ensure data security?
A: We're SOC 2 Type II compliant and follow enterprise-grade security practices. All data is encrypted in transit and at rest. We never store sensitive data longer than necessary and offer on-premise deployment for sensitive industries.

Q: What's the typical ROI for automation projects?
A: Our clients typically see 3-10x ROI within the first year. This comes from reduced labor costs, fewer errors, faster processing times, and improved customer satisfaction. We provide detailed ROI projections during consultation.

Q: Is there a free trial or demo?
A: We offer a free 15-minute automation audit and can show you live demos of similar automations we've built.

Q: What happens if something goes wrong with an automation?
A: All our automations include monitoring, alerting, and fallback mechanisms. Our support team is available 24/7 for critical issues. We also provide comprehensive documentation and training for your team.

Q: Do you offer a trial or pilot program?
A: Yes! We offer a pilot program where we implement a small automation to demonstrate value before committing to a larger engagement. This lets you see results with minimal risk.

Q: How do I get started?
A: Book a free automation audit with us! We'll analyze your workflows and suggest where automation can save you the most time. Click the "Book a Demo" button to schedule your free consultation.

## 8. How to Contact Us

- Website: www.smartrunai.com
- Email: info@smartrunai.com
- Booking: Schedule a free automation audit via the "Book a Demo" button on the website
- LinkedIn: Follow us for automation tips and case studies

## 9. What to Expect After You Reach Out

1. We'll schedule a free discovery call
2. You'll receive a tailored automation proposal
3. Once approved, we begin building your solution
4. We deploy, train, and support you ongoing

## 10. About SmartRunAI

SmartRunAI is a leading AI automation agency dedicated to helping organizations streamline operations, boost productivity, and unlock new growth opportunities.

Founded with a vision to bridge the gap between cutting-edge AI technology and practical business applications, SmartRunAI has grown into a trusted partner for organizations seeking digital transformation.

We understand that every business is unique. That's why we don't believe in one-size-fits-all solutions. Our team of AI specialists works closely with each client to develop customized automation strategies that align with their specific goals and challenges.

### Our Core Values:
- Mission-Driven: We're committed to democratizing AI automation, making powerful tools accessible to businesses of all sizes.
- Innovation First: We continuously push the boundaries of what's possible with AI, staying ahead of industry trends.
- Client-Centric: Your success is our success. We build lasting partnerships focused on delivering measurable results.
- Excellence: We maintain the highest standards in every solution we deliver, ensuring quality and reliability.
`;

const SYSTEM_PROMPT = `You are SmartRunAI's intelligent assistant. Your role is to help visitors learn about Smart Run AI's automation services and guide them toward booking a consultation.

KNOWLEDGE BASE:
${KNOWLEDGE_BASE}

IMPORTANT INSTRUCTIONS:
1. Be friendly, professional, and helpful.
2. Answer questions based ONLY on the knowledge base provided above.
3. If asked about something not in the knowledge base, politely say you don't have that specific information and suggest they contact the team or book a demo for personalized assistance.
4. DO NOT discuss specific pricing. If asked about cost, respond: "Pricing is customized based on your specific needs. I'd recommend booking a free consultation where our team can provide a tailored quote based on your requirements."
5. Encourage users to book a demo for personalized advice. Mention they can click the "Book a Demo" button or use the link: ?book-demo=true
6. Keep responses concise but informative (2-4 sentences typically).
7. Use a warm, conversational tone.
8. When discussing services, provide relevant examples and use cases.
9. If users ask how to get started, always guide them to book a free automation audit.
10. For contact, provide: email info@smartrunai.com or suggest booking a demo.

Remember: Your goal is to be helpful and encourage visitors to take the next step with SmartRunAI.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
