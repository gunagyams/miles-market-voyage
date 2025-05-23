
import { supabase } from '@/integrations/supabase/client';

export interface Airline {
  id: string;
  name: string;
  price_per_mile: number;
}

export interface EmailSettings {
  notifications_enabled: boolean;
  admin_emails: string[];
}

export const fetchAirlines = async (): Promise<Airline[]> => {
  try {
    const { data, error } = await supabase
      .from('airlines')
      .select('id, name, price_per_mile')
      .order('name');
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching airlines:', error);
    return [];
  }
};

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

export const calculateEstimatedTotal = (
  miles: number,
  airlinePricePerMile: number
): string => {
  return (miles * airlinePricePerMile).toFixed(2);
};

export const sendEmailNotifications = async (
  leadData: any,
  estimatedTotal: string,
  emailSettings: EmailSettings
) => {
  try {
    // Check if we have admin emails configured
    if (!emailSettings.admin_emails || emailSettings.admin_emails.length === 0) {
      console.warn('No admin emails configured. Admin notifications will not be sent.');
    }
    
    console.log('Sending email notifications with data:', {
      firstName: leadData.first_name,
      lastName: leadData.last_name,
      email: leadData.email,
      phone: leadData.phone,
      airline: leadData.airline,
      miles: leadData.miles_amount,
      estimatedTotal: estimatedTotal,
      adminEmails: emailSettings.admin_emails,
      notificationsEnabled: emailSettings.notifications_enabled
    });
    
    const supabaseUrl = 'https://qgzompfkqrfgjnbxwhip.supabase.co';
    const endpoint = `${supabaseUrl}/functions/v1/send-lead-emails`;
    console.log('Sending request to:', endpoint);

    // Use a fixed ANON_KEY instead of trying to access process.env
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnem9tcGZrcXJmZ2puYnh3aGlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NzIwMzEsImV4cCI6MjA2MzA0ODAzMX0.5nN4G3tNcf4QOJQ989B-I6gHPlll9y3nCWicDKbeZlI';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        firstName: leadData.first_name,
        lastName: leadData.last_name,
        email: leadData.email,
        phone: leadData.phone,
        airline: leadData.airline,
        miles: leadData.miles_amount,
        estimatedTotal: estimatedTotal,
        adminEmails: emailSettings.admin_emails,
        notificationsEnabled: emailSettings.notifications_enabled
      }),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        console.error('Error response from send-lead-emails function:', errorData);
        
        // Enhanced error logging
        let errorMessage = `Server returned ${response.status}`;
        if (errorData.error) {
          errorMessage += `: ${errorData.error}`;
        } else if (errorData.errors && errorData.errors.length > 0) {
          // Format all error messages from the errors array
          const errorMessages = errorData.errors.map((e: any) => `${e.type}: ${e.error}`).join("; ");
          errorMessage += `: ${errorMessages}`;
        }
        
        // Log API key info if available
        if (errorData.apiKeyUsed) {
          console.log('API key used had prefix:', errorData.apiKeyUsed);
        }
        if (errorData.apiKeyPresent === false) {
          console.error('CRITICAL ERROR: Edge function reported no API key configured');
        }
        
        return {
          success: false,
          error: errorMessage,
          testMode: errorData.testMode || false
        };
      } catch (e) {
        const errorText = await response.text();
        console.error('Error parsing JSON response:', errorText);
        return {
          success: false,
          error: `Server returned ${response.status}: ${errorText}`,
          testMode: false
        };
      }
    }

    const result = await response.json();
    console.log('Email notification result:', result);
    
    if (!result.success) {
      console.error('Error sending emails:', result.error || result.errors);
      return { 
        success: false, 
        error: result.error || (result.errors && result.errors.map((e: any) => e.error).join(', ')),
        testMode: result.testMode 
      };
    } else {
      console.log('Emails sent successfully:', result);
      return { 
        success: true,
        testMode: result.testMode 
      };
    }
  } catch (error: any) {
    console.error('Error calling send-lead-emails function:', error);
    return { 
      success: false, 
      error: error.message,
      testMode: false 
    };
  }
};

export const saveLead = async (formData: any) => {
  const leadData = {
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    phone: formData.whatsapp,
    airline: formData.airline,
    miles_amount: formData.miles,
    message: formData.message,
    status: 'new'
  };

  const { error } = await supabase.from('leads').insert([leadData]);
  
  if (error) throw error;
  
  return leadData;
};
