
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
    
    console.log("Received lead email request:", payload);
    
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

    // Send confirmation email to customer
    try {
      const customerEmail = await resend.emails.send({
        from: "Cash My Points <no-reply@resend.dev>",
        to: [email],
        subject: "Your Miles Purchase Request - Cash My Points",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4ab2c; border-radius: 5px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #0f172a;">Cash My Points</h1>
            </div>
            <div style="margin-bottom: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
              <h2 style="color: #0f172a;">Thank You for Your Order Request!</h2>
              <p>Hello ${firstName},</p>
              <p>We've received your request to purchase ${miles.toLocaleString()} ${airline} miles.</p>
              <p>A member of our team will contact you within the next <strong>2 hours</strong> to complete your order.</p>
              <p>Your estimated total: <strong>$${estimatedTotal}</strong></p>
            </div>
            <div style="margin-bottom: 20px; font-size: 14px; color: #6b7280;">
              <p>If you have any questions, please reply to this email or contact us directly.</p>
              <p>Best regards,<br>The Cash My Points Team</p>
            </div>
          </div>
        `,
      });
      
      console.log("Customer email sent:", customerEmail);
      successCount++;
    } catch (error) {
      console.error("Error sending customer email:", error);
      errors.push({ type: "customer", error: error.message });
    }

    // Send notification emails to admins if there are any admin emails configured
    if (adminEmails && adminEmails.length > 0) {
      try {
        const adminEmail = await resend.emails.send({
          from: "Cash My Points <no-reply@resend.dev>",
          to: adminEmails,
          subject: "New Lead Notification - Cash My Points",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4ab2c; border-radius: 5px;">
              <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #0f172a;">New Lead Notification</h1>
              </div>
              <div style="margin-bottom: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
                <h2 style="color: #0f172a;">New Miles Purchase Request</h2>
                <p><strong>Customer Details:</strong></p>
                <ul style="list-style-type: none; padding-left: 0;">
                  <li><strong>Name:</strong> ${firstName} ${lastName}</li>
                  <li><strong>Email:</strong> ${email}</li>
                  <li><strong>Phone:</strong> ${phone}</li>
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
        
        console.log("Admin email sent:", adminEmail);
        successCount++;
      } catch (error) {
        console.error("Error sending admin email:", error);
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
      }),
      {
        status: successCount > 0 ? 200 : 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error in send-lead-emails function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
