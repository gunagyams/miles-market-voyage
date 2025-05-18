
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import FormFields from './quote/FormFields';
import SuccessDialog from './quote/SuccessDialog';
import {
  Airline,
  EmailSettings,
  fetchAirlines,
  fetchEmailSettings,
  calculateEstimatedTotal,
  sendEmailNotifications,
  saveLead
} from '@/utils/quoteUtils';

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

  // Fetch data from Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        const airlinesData = await fetchAirlines();
        
        if (airlinesData && airlinesData.length > 0) {
          setAirlines(airlinesData);
          setFormData(prev => ({ ...prev, airline: airlinesData[0].name }));
        }
        
        const emailSettingsData = await fetchEmailSettings();
        setEmailSettings(emailSettingsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoadingAirlines(false);
      }
    };

    loadData();
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
  
  const handlePhoneChange = (value: string, country: any) => {
    setFormData({
      ...formData,
      whatsapp: value,
      countryCode: country.countryCode
    });
    // Simple validation - check if phone number has at least 8 digits
    setPhoneValid(value.length >= 8);
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
      const estimatedTotal = calculateEstimatedTotal(formData.miles, airlinePricePerMile);

      // Save lead to Supabase
      const leadData = await saveLead(formData);
      
      // Send email notifications with firstName and lastName separately
      const emailResult = await sendEmailNotifications(
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.whatsapp,
          airline: formData.airline,
          miles_amount: formData.miles
        }, 
        estimatedTotal, 
        emailSettings
      );
      
      if (!emailResult.success) {
        toast({
          title: "Email Notification Warning",
          description: `Your order was submitted, but email notifications could not be sent: ${emailResult.error}`,
          variant: "destructive",
        });
      }
      
      // Set test mode info if applicable
      if (emailResult.testMode) {
        setIsTestMode(true);
        setTestModeInfo(`Note: You're in test mode because your domain is not verified in Resend. 
          Emails were sent to the test address instead of actual recipients.`);
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
  
  // Calculate approximate price
  const selectedAirline = airlines.find(a => a.name === formData.airline);
  const airlinePricePerMile = selectedAirline?.price_per_mile || 0.015; 
  const estimatedTotal = calculateEstimatedTotal(formData.miles, airlinePricePerMile);

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
              <FormFields
                formData={formData}
                airlines={airlines}
                isLoadingAirlines={isLoadingAirlines}
                phoneValid={phoneValid}
                handleChange={handleChange}
                handlePhoneChange={handlePhoneChange}
                estimatedTotal={estimatedTotal}
              />
              
              <div className="mt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting || !phoneValid}
                  className={cn(
                    "w-full py-3 px-6 rounded-md font-medium text-white transition-colors duration-200",
                    (isSubmitting || !phoneValid) ? "bg-gray-400" : "bg-gold hover:bg-gold-dark"
                  )}
                >
                  {isSubmitting ? "Processing..." : "Request Miles Purchase"}
                </Button>
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
      <SuccessDialog
        isOpen={isSuccess}
        onClose={setIsSuccess}
        isTestMode={isTestMode}
        testModeInfo={testModeInfo}
      />
    </section>
  );
};

export default QuoteForm;
