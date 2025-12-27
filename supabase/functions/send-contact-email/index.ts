import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// Allowed origins for CORS - exact matches
const ALLOWED_ORIGINS = [
  "https://smartrunai.com",
  "https://www.smartrunai.com",
  "https://smartrunai.io",
  "https://www.smartrunai.io",
  "https://smart-run-ai-website.lovable.app",
  "http://localhost:8080",
  "http://localhost:5173",
];

// Pattern matching for dynamic Lovable domains
function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  
  // Check exact matches first
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  
  // Allow any Lovable preview/deployed domains
  if (origin.endsWith(".lovable.app")) return true;
  if (origin.endsWith(".lovableproject.com")) return true;
  
  return false;
}

// Simple in-memory rate limiting (per IP, resets on function restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // Max 5 requests per minute
const RATE_LIMIT_WINDOW = 60000; // 1 minute in ms

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = isAllowedOrigin(origin) ? origin! : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
}

// HTML escape function to prevent injection
function escapeHtml(text: string | undefined | null): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Input validation schema
const ContactFormSchema = z.object({
  formType: z.enum(["demo", "contact"]),
  firstName: z.string().min(1).max(50).regex(/^[a-zA-Z\s\-']+$/, "Invalid characters in first name"),
  lastName: z.string().min(1).max(50).regex(/^[a-zA-Z\s\-']+$/, "Invalid characters in last name"),
  email: z.string().email().max(255),
  phone: z.string().max(30).regex(/^[+]?[0-9\s().\-]*$/, "Invalid phone format").optional().or(z.literal("")),
  industry: z.string().max(100).optional(),
  budget: z.string().max(100).optional(),
  source: z.string().max(100).optional(),
  message: z.string().max(2000).optional(),
  companyName: z.string().max(100).optional(),
  companySize: z.string().max(50).optional(),
  projectDescription: z.string().max(2000).optional(),
});

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!checkRateLimit(clientIP)) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Parse and validate input
    const rawData = await req.json();
    console.log("Received contact form submission from IP:", clientIP);

    const validationResult = ContactFormSchema.safeParse(rawData);
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.errors);
      return new Response(
        JSON.stringify({ error: "Invalid input data", details: validationResult.error.errors }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const data = validationResult.data;
    const {
      formType,
      firstName,
      lastName,
      email,
      phone,
      industry,
      budget,
      source,
      message,
      companyName,
      companySize,
      projectDescription,
    } = data;

    // Escape all user input for HTML
    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeIndustry = escapeHtml(industry);
    const safeBudget = escapeHtml(budget);
    const safeSource = escapeHtml(source);
    const safeMessage = escapeHtml(message);
    const safeCompanyName = escapeHtml(companyName);
    const safeCompanySize = escapeHtml(companySize);
    const safeProjectDescription = escapeHtml(projectDescription);

    const subject = formType === "demo" 
      ? `New Demo Request from ${safeFirstName} ${safeLastName}`
      : `New Contact Form Submission from ${safeFirstName} ${safeLastName}`;

    const htmlContent = formType === "demo" 
      ? `
        <h1>New Demo Request</h1>
        <h2>Contact Information</h2>
        <ul>
          <li><strong>Name:</strong> ${safeFirstName} ${safeLastName}</li>
          <li><strong>Email:</strong> ${safeEmail}</li>
          <li><strong>Phone:</strong> ${safePhone || "Not provided"}</li>
        </ul>
        
        <h2>Company Details</h2>
        <ul>
          <li><strong>Company Name:</strong> ${safeCompanyName || "Not provided"}</li>
          <li><strong>Company Size:</strong> ${safeCompanySize || "Not provided"}</li>
          <li><strong>Industry:</strong> ${safeIndustry || "Not provided"}</li>
        </ul>
        
        <h2>Project Information</h2>
        <ul>
          <li><strong>Budget Range:</strong> ${safeBudget || "Not provided"}</li>
          <li><strong>How they heard about us:</strong> ${safeSource || "Not provided"}</li>
        </ul>
        
        <h2>Project Description</h2>
        <p>${safeProjectDescription || "Not provided"}</p>
      `
      : `
        <h1>New Contact Form Submission</h1>
        <h2>Contact Information</h2>
        <ul>
          <li><strong>Name:</strong> ${safeFirstName} ${safeLastName}</li>
          <li><strong>Email:</strong> ${safeEmail}</li>
          <li><strong>Phone:</strong> ${safePhone || "Not provided"}</li>
        </ul>
        
        <h2>Additional Details</h2>
        <ul>
          <li><strong>Industry:</strong> ${safeIndustry || "Not provided"}</li>
          <li><strong>Budget Range:</strong> ${safeBudget || "Not provided"}</li>
          <li><strong>How they heard about us:</strong> ${safeSource || "Not provided"}</li>
        </ul>
        
        <h2>Message</h2>
        <p>${safeMessage || "Not provided"}</p>
      `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "SmartRunAI <onboarding@resend.dev>",
        to: ["emailtoimran@gmail.com"],
        subject: subject,
        html: htmlContent,
        reply_to: email,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const emailResponse = await res.json();
    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);