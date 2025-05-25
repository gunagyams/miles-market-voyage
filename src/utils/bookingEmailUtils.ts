
import { supabase } from '@/integrations/supabase/client';

export interface EmailSettings {
  notifications_enabled: boolean;
  admin_emails: string[];
}

export const fetchEmailSettings = async (): Promise<EmailSettings> => {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('id', 'email_settings')
      .maybeSingle();
    
    if (error) throw error;
    
    // Safely convert the JSON data to EmailSettings
    if (data && data.value) {
      const settingsValue = data.value as Record<string, any>;
      return {
        notifications_enabled: settingsValue.notifications_enabled ?? true,
        admin_emails: Array.isArray(settingsValue.admin_emails) ? settingsValue.admin_emails : [],
      };
    }
    
    return {
      notifications_enabled: true,
      admin_emails: [],
    };
  } catch (error) {
    console.error('Error fetching email settings:', error);
    return {
      notifications_enabled: true,
      admin_emails: [],
    };
  }
};

export const sendBookingEmailNotifications = async (
  bookingData: any,
  emailSettings: EmailSettings
) => {
  try {
    console.log('🚀 Starting booking email notifications process');
    console.log('Booking data:', bookingData);
    console.log('Email settings:', emailSettings);
    
    // Check if we have admin emails configured
    if (!emailSettings.admin_emails || emailSettings.admin_emails.length === 0) {
      console.warn('⚠️ No admin emails configured. Admin notifications will not be sent.');
    }
    
    const supabaseUrl = 'https://qgzompfkqrfgjnbxwhip.supabase.co';
    const endpoint = `${supabaseUrl}/functions/v1/send-booking-emails`;
    console.log('📧 Sending request to:', endpoint);

    // Use the same ANON_KEY as in quoteUtils
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnem9tcGZrcXJmZ2puYnh3aGlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NzIwMzEsImV4cCI6MjA2MzA0ODAzMX0.5nN4G3tNcf4QOJQ989B-I6gHPlll9y3nCWicDKbeZlI';

    const requestBody = {
      firstName: bookingData.first_name,
      lastName: bookingData.last_name,
      email: bookingData.email,
      phone: bookingData.phone,
      airline: bookingData.airline_name,
      points: bookingData.points_required,
      flightDetails: bookingData.flight_details,
      adminEmails: emailSettings.admin_emails,
      notificationsEnabled: emailSettings.notifications_enabled
    };

    console.log('📤 Request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log('📥 Response status:', response.status);
    console.log('📥 Response ok:', response.ok);

    if (!response.ok) {
      try {
        const errorData = await response.json();
        console.error('❌ Error response from send-booking-emails function:', errorData);
        
        let errorMessage = `Server returned ${response.status}`;
        if (errorData.error) {
          errorMessage += `: ${errorData.error}`;
        } else if (errorData.errors && errorData.errors.length > 0) {
          const errorMessages = errorData.errors.map((e: any) => `${e.type}: ${e.error}`).join("; ");
          errorMessage += `: ${errorMessages}`;
        }
        
        if (errorData.apiKeyUsed) {
          console.log('🔑 API key used had prefix:', errorData.apiKeyUsed);
        }
        if (errorData.apiKeyPresent === false) {
          console.error('🔥 CRITICAL ERROR: Edge function reported no API key configured');
        }
        
        return {
          success: false,
          error: errorMessage,
          testMode: errorData.testMode || false
        };
      } catch (e) {
        const errorText = await response.text();
        console.error('❌ Error parsing JSON response:', errorText);
        return {
          success: false,
          error: `Server returned ${response.status}: ${errorText}`,
          testMode: false
        };
      }
    }

    const result = await response.json();
    console.log('✅ Booking email notification result:', result);
    
    if (!result.success) {
      console.error('❌ Error sending booking emails:', result.error || result.errors);
      return { 
        success: false, 
        error: result.error || (result.errors && result.errors.map((e: any) => e.error).join(', ')),
        testMode: result.testMode 
      };
    } else {
      console.log('🎉 Booking emails sent successfully:', result);
      return { 
        success: true,
        testMode: result.testMode 
      };
    }
  } catch (error: any) {
    console.error('💥 Error calling send-booking-emails function:', error);
    return { 
      success: false, 
      error: error.message,
      testMode: false 
    };
  }
};

export const saveFlightBooking = async (formData: any) => {
  console.log('💾 Saving flight booking to database:', formData);
  
  const bookingData = {
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    airline_name: formData.airline,
    points_required: formData.points,
    flight_details: formData.flightDetails,
    screenshot_url: formData.screenshotUrl,
    status: 'new'
  };

  const { error } = await supabase.from('flight_bookings').insert([bookingData]);
  
  if (error) {
    console.error('❌ Database save error:', error);
    throw error;
  }
  
  console.log('✅ Flight booking saved successfully');
  return bookingData;
};
