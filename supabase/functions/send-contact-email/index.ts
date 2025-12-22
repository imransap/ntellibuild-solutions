import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  formType: "demo" | "contact";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  industry?: string;
  budget?: string;
  source?: string;
  message?: string;
  companyName?: string;
  companySize?: string;
  projectDescription?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactEmailRequest = await req.json();
    console.log("Received contact form submission:", data);

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

    const subject = formType === "demo" 
      ? `New Demo Request from ${firstName} ${lastName}`
      : `New Contact Form Submission from ${firstName} ${lastName}`;

    const htmlContent = formType === "demo" 
      ? `
        <h1>New Demo Request</h1>
        <h2>Contact Information</h2>
        <ul>
          <li><strong>Name:</strong> ${firstName} ${lastName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone || "Not provided"}</li>
        </ul>
        
        <h2>Company Details</h2>
        <ul>
          <li><strong>Company Name:</strong> ${companyName || "Not provided"}</li>
          <li><strong>Company Size:</strong> ${companySize || "Not provided"}</li>
          <li><strong>Industry:</strong> ${industry || "Not provided"}</li>
        </ul>
        
        <h2>Project Information</h2>
        <ul>
          <li><strong>Budget Range:</strong> ${budget || "Not provided"}</li>
          <li><strong>How they heard about us:</strong> ${source || "Not provided"}</li>
        </ul>
        
        <h2>Project Description</h2>
        <p>${projectDescription || "Not provided"}</p>
      `
      : `
        <h1>New Contact Form Submission</h1>
        <h2>Contact Information</h2>
        <ul>
          <li><strong>Name:</strong> ${firstName} ${lastName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone || "Not provided"}</li>
        </ul>
        
        <h2>Additional Details</h2>
        <ul>
          <li><strong>Industry:</strong> ${industry || "Not provided"}</li>
          <li><strong>Budget Range:</strong> ${budget || "Not provided"}</li>
          <li><strong>How they heard about us:</strong> ${source || "Not provided"}</li>
        </ul>
        
        <h2>Message</h2>
        <p>${message || "Not provided"}</p>
      `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "SmartRunAI <onboarding@resend.dev>",
        to: ["info@smartrunai.com"],
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
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
