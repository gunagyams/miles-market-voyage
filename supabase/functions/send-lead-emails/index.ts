
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Initialize Resend with the API key from environment variables
const resendApiKey = Deno.env.get("RESEND_API_KEY");
if (!resendApiKey) {
  console.error("RESEND_API_KEY is not set. Emails will not be sent.");
}
const resend = new Resend(resendApiKey);

console.log("Resend initialized with API key:", resendApiKey ? "API key is set" : "API key is missing");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadEmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  airline: string;
  miles: number;
  estimatedTotal: string;
  adminEmails: string[];
  notificationsEnabled: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: LeadEmailRequest = await req.json();
    const { firstName, lastName, email, phone, airline, miles, estimatedTotal, adminEmails, notificationsEnabled } = payload;
    
    console.log("Received lead email request with data:", payload);
    console.log("Resend API key configured:", resendApiKey ? "Yes" : "No");
    
    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "RESEND_API_KEY is not configured",
          apiKeyPresent: false
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    if (!notificationsEnabled) {
      console.log("Email notifications are disabled in settings, skipping email sending");
      return new Response(
        JSON.stringify({ success: true, message: "Notifications disabled" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    let successCount = 0;
    let errors = [];
    
    // Use your verified domain email which is set in the environment variable
    const verifiedEmail = Deno.env.get("VERIFIED_DOMAIN_EMAIL") || "hi@cashmypoints.com";
    const fromName = "Cash My Points";

    // Send confirmation email to customer
    try {
      console.log(`Attempting to send customer email to: ${email} from: ${verifiedEmail}`);
      const customerEmailResult = await resend.emails.send({
        from: `${fromName} <${verifiedEmail}>`,
        to: [email],
        subject: "Your Miles Purchase Request - Cash My Points",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #0f172a;">Cash My Points</h1>
            </div>
            <div style="margin-bottom: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
              <h2 style="color: #0f172a;">Thank You for Your Order Request!</h2>
              <p>Hello ${firstName},</p>
              <p>We've received your request to purchase ${miles.toLocaleString()} ${airline} miles.</p>
              <p>A member of our team will contact you within the next <strong>2 hours</strong> to complete your order.</p>
              <p>Your estimated total: <strong>$${estimatedTotal}</strong></p>
              <p>If you have any questions before we reach out, feel free to reply to this email.</p>
            </div>
            <div style="margin-bottom: 20px; font-size: 14px; color: #6b7280;">
              <p>We appreciate your business and look forward to helping you with your miles purchase!</p>
              <p>Best regards,</p>
              <div style="margin-top: 15px;">
                <p style="font-weight: 500; color: #0f172a; margin-bottom: 5px;">Tanya M. | Sr. Accounts Executive</p>
                <p style="color: #6b7280; font-size: 12px; margin-bottom: 5px;">Office Address: Citadel Tower, Business Bay, Floor 25th Office No 2507 96, Dubai, UAE</p>
                <p style="color: #6b7280; font-size: 12px; margin-bottom: 15px;">Phone Number: <a href="tel:+971529581786" style="color: #1d4ed8; text-decoration: none;">+971 529581786</a></p>
                <p style="color: #6b7280; font-size: 13px; font-style: italic; margin-bottom: 15px;">Trusted by 5000+ travelers</p>
                <a href="https://www.trustpilot.com/review/cashmypoint.com" style="display: inline-block; margin-bottom: 10px;">
                  <img src="https://cdn.trustpilot.net/brand-assets/1.1.0/logo-white.svg" alt="Trustpilot" style="height: 25px; background-color: #00b67a; padding: 5px; border-radius: 4px;">
                  <span style="color: #1d4ed8; text-decoration: underline; font-size: 13px; margin-left: 5px; vertical-align: top;">See our reviews on Trustpilot</span>
                </a>
              </div>
            </div>
            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; background-color: #ffffff; margin-top: 30px;">
              <p style="color: #6b7280; font-size: 12px;">© ${new Date().getFullYear()} Cash My Points. All rights reserved.</p>
            </div>
          </div>
        `,
      });
      
      console.log("Customer email result:", customerEmailResult);
      
      if (customerEmailResult.error) {
        throw new Error(`Customer email error: ${customerEmailResult.error.message}`);
      } else {
        console.log("Customer email sent successfully to:", email);
        successCount++;
      }
    } catch (error) {
      console.error(`Error sending customer email to ${email}:`, error);
      errors.push({ type: "customer", error: error.message });
    }

    // Send notification emails to admins
    if (adminEmails && adminEmails.length > 0) {
      try {
        // Send to all admin emails at once to simplify the process
        console.log(`Attempting to send admin emails to: ${adminEmails.join(", ")} from: ${verifiedEmail}`);
        const adminEmailResult = await resend.emails.send({
          from: `${fromName} <${verifiedEmail}>`,
          to: adminEmails,
          subject: "New Lead Notification - Cash My Points",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
              <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #0f172a;">New Lead Notification</h1>
              </div>
              <div style="margin-bottom: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
                <h2 style="color: #0f172a;">New Miles Purchase Request</h2>
                <p><strong>Customer Details:</strong></p>
                <ul style="list-style-type: none; padding-left: 0;">
                  <li><strong>First Name:</strong> ${firstName}</li>
                  <li><strong>Last Name:</strong> ${lastName}</li>
                  <li><strong>Email:</strong> ${email}</li>
                  <li><strong>Phone:</strong> +${phone}</li>
                </ul>
                <p><strong>Order Details:</strong></p>
                <ul style="list-style-type: none; padding-left: 0;">
                  <li><strong>Airline:</strong> ${airline}</li>
                  <li><strong>Miles Amount:</strong> ${miles.toLocaleString()}</li>
                  <li><strong>Estimated Total:</strong> $${estimatedTotal}</li>
                </ul>
              </div>
              <div style="margin-bottom: 20px; font-size: 14px; color: #6b7280;">
                <p>Please log in to the admin dashboard to view and manage this lead.</p>
              </div>
            </div>
          `,
        });
        
        console.log("Admin emails result:", adminEmailResult);
        
        if (adminEmailResult.error) {
          throw new Error(`Admin email error: ${adminEmailResult.error.message}`);
        } else {
          console.log("Admin emails sent successfully to:", adminEmails.join(", "));
          successCount++;
        }
      } catch (error) {
        console.error(`Error sending admin emails to ${adminEmails.join(", ")}:`, error);
        errors.push({ type: "admin", error: error.message });
      }
    } else {
      console.log("No admin emails configured, skipping admin notification");
    }

    return new Response(
      JSON.stringify({
        success: successCount > 0,
        sent: successCount,
        errors: errors.length > 0 ? errors : undefined,
        testMode: false,
        apiKeyUsed: resendApiKey ? resendApiKey.substring(0, 5) + "..." : "none"
      }),
      {
        status: successCount > 0 ? 200 : 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-lead-emails function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        apiKeyUsed: resendApiKey ? resendApiKey.substring(0, 5) + "..." : "none"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
