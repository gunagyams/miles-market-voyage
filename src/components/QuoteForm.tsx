import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PartyPopper, Check, X, AlertCircle } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface Airline {
  id: string;
  name: string;
  price_per_mile: number;
}

interface EmailSettings {
  notifications_enabled: boolean;
  admin_emails: string[];
}

const QuoteForm = () => {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);
  const [testModeInfo, setTestModeInfo] = useState<string>("");
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [isLoadingAirlines, setIsLoadingAirlines] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    notifications_enabled: true,
    admin_emails: [],
  });
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    airline: '',
    ffNumber: '',
    miles: 50000,
    whatsapp: '',
    email: '',
    message: '',
    countryCode: 'ae', // Default to UAE
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch airlines from Supabase
  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        const { data, error } = await supabase
          .from('airlines')
          .select('id, name, price_per_mile')
          .order('name');
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setAirlines(data);
          setFormData(prev => ({ ...prev, airline: data[0].name }));
        }
      } catch (error) {
        console.error('Error fetching airlines:', error);
      } finally {
        setIsLoadingAirlines(false);
      }
    };

    const fetchEmailSettings = async () => {
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
          setEmailSettings({
            notifications_enabled: settingsValue.notifications_enabled ?? true,
            admin_emails: Array.isArray(settingsValue.admin_emails) ? settingsValue.admin_emails : [],
          });
        }
      } catch (error) {
        console.error('Error fetching email settings:', error);
      }
    };

    fetchAirlines();
    fetchEmailSettings();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // For miles input, convert string to number
    if (name === 'miles') {
      setFormData({
        ...formData,
        [name]: parseInt(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const sendEmailNotifications = async (leadData: any, estimatedTotal: string) => {
    try {
      const response = await fetch('https://qgzompfkqrfgjnbxwhip.supabase.co/functions/v1/send-lead-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnem9tcGZrcXJmZ2puYnh3aGlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NzIwMzEsImV4cCI6MjA2MzA0ODAzMX0.5nN4G3tNcf4QOJQ989B-I6gHPlll9y3nCWicDKbeZlI'}`,
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

      const result = await response.json();
      
      if (!result.success) {
        console.error('Error sending emails:', result.error || result.errors);
        return { success: false, error: result.error || (result.errors && result.errors[0]?.error) };
      } else {
        console.log('Emails sent successfully:', result);
        if (result.testMode) {
          setIsTestMode(true);
          setTestModeInfo(`Note: You're in test mode because your domain is not verified in Resend. 
            Emails were sent to the test address instead of actual recipients.`);
        }
        return { success: true };
      }
    } catch (error) {
      console.error('Error calling send-lead-emails function:', error);
      return { success: false, error: error.message };
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.whatsapp || formData.whatsapp.length < 8) {
      setPhoneValid(false);
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid WhatsApp number.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Calculate estimated total for email
      const selectedAirline = airlines.find(a => a.name === formData.airline);
      const airlinePricePerMile = selectedAirline?.price_per_mile || 0.015; 
      const estimatedTotal = (formData.miles * airlinePricePerMile).toFixed(2);

      // Save lead to Supabase
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
      
      // Send email notifications
      const emailResult = await sendEmailNotifications(leadData, estimatedTotal);
      
      if (!emailResult.success) {
        toast({
          title: "Email Notification Warning",
          description: `Your order was submitted, but email notifications could not be sent: ${emailResult.error}`,
          variant: "destructive",
        });
      }
      
      // Show success dialog
      setIsSuccess(true);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        airline: airlines.length > 0 ? airlines[0].name : '',
        ffNumber: '',
        miles: 50000,
        whatsapp: '',
        email: '',
        message: '',
        countryCode: 'ae',
      });
      setPhoneValid(true);
    } catch (error) {
      console.error('Error submitting lead:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handlePhoneChange = (value: string, country: any) => {
    setFormData({
      ...formData,
      whatsapp: value,
      countryCode: country.countryCode
    });
    // Simple validation - check if phone number has at least 8 digits
    setPhoneValid(value.length >= 8);
  };
  
  // Calculate approximate price
  const selectedAirline = airlines.find(a => a.name === formData.airline);
  const airlinePricePerMile = selectedAirline?.price_per_mile || 0.015; 
  const estimatedTotal = (formData.miles * airlinePricePerMile).toFixed(2);

  return (
    <section id="quote" className="section-padding bg-navy text-white arabic-pattern">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Place <span className="text-gold">Order</span>
            </h2>
            <p className="text-gray-300">
              Fill out the form below to purchase miles for your frequent flyer account.
              Our team will contact you through WhatsApp or email.
            </p>
          </div>
          
          <div className="bg-white text-navy rounded-xl overflow-hidden shadow-xl">
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:outline-none"
                    placeholder="Your first name"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:outline-none"
                    placeholder="Your last name"
                  />
                </div>
                
                <div>
                  <label htmlFor="airline" className="block text-sm font-medium text-gray-700 mb-1">Airline</label>
                  <select
                    id="airline"
                    name="airline"
                    value={formData.airline}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:outline-none"
                    disabled={isLoadingAirlines}
                  >
                    {isLoadingAirlines ? (
                      <option>Loading airlines...</option>
                    ) : (
                      airlines.map((airline) => (
                        <option key={airline.id} value={airline.name}>
                          {airline.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="ffNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Frequent Flyer Number
                  </label>
                  <input
                    type="text"
                    id="ffNumber"
                    name="ffNumber"
                    value={formData.ffNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:outline-none"
                    placeholder="Your frequent flyer number"
                  />
                  <p className="text-xs text-amber-600 mt-1 italic">
                    Please ensure your frequent flyer number matches the name in your airline account records.
                  </p>
                </div>
                
                <div>
                  <label htmlFor="miles" className="block text-sm font-medium text-gray-700 mb-1">
                    Miles Amount <span className="text-xs text-gray-500">(Minimum 50,000)</span>
                  </label>
                  <input
                    type="number"
                    id="miles"
                    name="miles"
                    value={formData.miles}
                    onChange={handleChange}
                    required
                    min="50000"
                    step="1000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:outline-none"
                    placeholder="50000"
                  />
                </div>
                
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                  <div className="relative">
                    <PhoneInput
                      country={formData.countryCode}
                      value={formData.whatsapp}
                      onChange={handlePhoneChange}
                      inputProps={{
                        name: 'whatsapp',
                        required: true,
                        className: cn(
                          "w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none pl-12",
                          phoneValid ? "border-gray-300 focus:ring-gold" : "border-red-500 focus:ring-red-500"
                        )
                      }}
                      containerClass="w-full"
                      dropdownClass="bg-white shadow-lg border border-gray-300 rounded-md"
                    />
                    {formData.whatsapp && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {phoneValid ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {!phoneValid && (
                    <p className="text-xs text-red-600 mt-1">Please enter a valid phone number.</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:outline-none"
                    placeholder="Any additional information or questions..."
                  />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-navy font-medium">Estimated Total:</span>
                  <span className="text-gold text-xl font-bold">${estimatedTotal}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  This is an approximate total. Final pricing will be confirmed by our team.
                </p>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || !phoneValid}
                  className={cn(
                    "w-full py-3 px-6 rounded-md font-medium text-white transition-colors duration-200",
                    (isSubmitting || !phoneValid) ? "bg-gray-400" : "bg-gold hover:bg-gold-dark"
                  )}
                >
                  {isSubmitting ? "Processing..." : "Request Miles Purchase"}
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                By submitting this form, you agree to our terms and privacy policy. 
                We'll never share your information with third parties.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-center flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <PartyPopper className="h-8 w-8 text-green-600" />
              </div>
              <span className="text-xl font-bold font-gilda">Order Requested Successfully!</span>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <p className="mb-6 text-gray-700">
              Thank you for your purchase request. A member of our team will contact you within the next 
              <span className="font-bold"> 2 hours </span> 
              to complete your order.
            </p>
            
            {isTestMode && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md text-left">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium mb-1">Test Mode Active</p>
                    <p>{testModeInfo}</p>
                    <p className="mt-2">To send real emails, please verify your domain in your Resend account.</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="confetti-animation">
              {Array.from({ length: 50 }).map((_, i) => (
                <div 
                  key={i} 
                  className="confetti-piece"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    backgroundColor: ['#E4AB2C', '#D71F27', '#018557'][Math.floor(Math.random() * 3)]
                  }}
                />
              ))}
            </div>
            <Button 
              className="mt-4 bg-gold hover:bg-gold-dark font-jakarta" 
              onClick={() => setIsSuccess(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default QuoteForm;
