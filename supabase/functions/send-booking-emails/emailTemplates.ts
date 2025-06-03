// emailTemplates.ts

const generateCustomerEmailHTML = (firstName: string, airline: string, points: number, flightDetails: string, lastName: string, email: string, phone: string) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #0f172a;">Cash My Points</h1>
      </div>
      <div style="margin-bottom: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
        <h2 style="color: #0f172a;">Thank You for Your Flight Booking Request!</h2>
        <p>Hello ${firstName},</p>
        <p>We've received your comprehensive flight booking request with ${airline} using ${points.toLocaleString()} points.</p>
        <p>A member of our team will contact you within the next <strong>2 hours</strong> to complete your booking.</p>
        <div style="margin: 20px 0; padding: 15px; background-color: #ffffff; border-radius: 5px; border-left: 4px solid #d4af37;">
          <h3 style="margin: 0 0 10px 0; color: #0f172a;">Complete Flight Details:</h3>
          <div style="margin: 0; white-space: pre-line; line-height: 1.6;">${flightDetails}</div>
        </div>
        <div style="margin: 20px 0; padding: 15px; background-color: #f0f9ff; border-radius: 5px; border-left: 4px solid #3b82f6;">
          <h3 style="margin: 0 0 10px 0; color: #0f172a;">Your Contact Information:</h3>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> +${phone}</p>
          <p style="margin: 5px 0;"><strong>Preferred Airline:</strong> ${airline}</p>
          <p style="margin: 5px 0;"><strong>Points Required:</strong> ${points.toLocaleString()}</p>
        </div>
        <p>If you have any questions before we reach out, feel free to reply to this email.</p>
      </div>
      <div style="margin-bottom: 20px; font-size: 14px; color: #6b7280;">
        <p>We appreciate your business and look forward to helping you with your flight booking!</p>
        <p>Best regards,</p>
        <div style="margin-top: 15px;">
          <p style="font-weight: 500; color: #0f172a; margin-bottom: 5px;">Tanya M. | Sr. Accounts Executive</p>
          <p style="color: #6b7280; font-size: 12px; margin-bottom: 5px;">Office Address: Citadel Tower, Business Bay, Floor 25th Office No 2507 96, Dubai, UAE</p>
          <p style="color: #6b7280; font-size: 12px; margin-bottom: 15px;">Phone Number: <a href="tel:+971529581786" style="color: #1d4ed8; text-decoration: none;">+971 529581786</a></p>
          <p style="color: #6b7280; font-size: 13px; font-style: italic; margin-bottom: 15px;">Trusted by 5000+ travelers</p>
          <a href="https://www.trustpilot.com/review/cashmypoint.com" style="display: inline-block; margin-bottom: 10px;">
            <img src="/lovable-uploads/d04b1c2c-522a-463d-9744-e76d6619b44d.png" alt="Trustpilot" style="height: 25px; margin-right: 5px; vertical-align: middle;">
            <span style="color: #1d4ed8; text-decoration: underline; font-size: 13px; vertical-align: middle;">See our reviews on Trustpilot</span>
          </a>
        </div>
      </div>
      <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; background-color: #ffffff; margin-top: 30px;">
        <p style="color: #6b7280; font-size: 12px;">© ${new Date().getFullYear()} Cash My Points. All rights reserved.</p>
      </div>
    </div>
  `;
};

const generateAdminEmailHTML = (firstName: string, lastName: string, email: string, phone: string, airline: string, points: number, flightDetails: string) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #0f172a;">New Flight Booking Request</h1>
      </div>
      <div style="margin-bottom: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
        <h2 style="color: #0f172a;">New Comprehensive Flight Booking Request</h2>
        <div style="margin: 20px 0; padding: 15px; background-color: #ffffff; border-radius: 5px; border-left: 4px solid #10b981;">
          <h3 style="margin: 0 0 10px 0; color: #0f172a;">Customer Details:</h3>
          <ul style="list-style-type: none; padding-left: 0; margin: 0;">
            <li style="margin: 5px 0;"><strong>First Name:</strong> ${firstName}</li>
            <li style="margin: 5px 0;"><strong>Last Name:</strong> ${lastName}</li>
            <li style="margin: 5px 0;"><strong>Email:</strong> ${email}</li>
            <li style="margin: 5px 0;"><strong>Phone:</strong> +${phone}</li>
          </ul>
        </div>
        <div style="margin: 20px 0; padding: 15px; background-color: #ffffff; border-radius: 5px; border-left: 4px solid #3b82f6;">
          <h3 style="margin: 0 0 10px 0; color: #0f172a;">Booking Preferences:</h3>
          <ul style="list-style-type: none; padding-left: 0; margin: 0;">
            <li style="margin: 5px 0;"><strong>Preferred Airline:</strong> ${airline}</li>
            <li style="margin: 5px 0;"><strong>Points Required:</strong> ${points.toLocaleString()}</li>
          </ul>
        </div>
        <div style="margin: 20px 0; padding: 15px; background-color: #ffffff; border-radius: 5px; border-left: 4px solid #d4af37;">
          <h3 style="margin: 0 0 10px 0; color: #0f172a;">Complete Flight Details:</h3>
          <div style="margin: 0; white-space: pre-line; line-height: 1.6; background-color: #f9f9f9; padding: 10px; border-radius: 4px;">${flightDetails}</div>
        </div>
        <div style="margin: 20px 0; padding: 15px; background-color: #fef3c7; border-radius: 5px; border-left: 4px solid #f59e0b;">
          <p style="margin: 0; color: #92400e;"><strong>⏰ Action Required:</strong> Please contact the customer within 2 hours to process this booking request.</p>
        </div>
      </div>
      <div style="margin-bottom: 20px; font-size: 14px; color: #6b7280;">
        <p>Please log in to the admin dashboard to view and manage this booking request.</p>
        <p style="font-size: 12px; color: #9ca3af;">This email was sent automatically from the Cash My Points booking system.</p>
      </div>
    </div>
  `;
};

export { generateCustomerEmailHTML, generateAdminEmailHTML };
