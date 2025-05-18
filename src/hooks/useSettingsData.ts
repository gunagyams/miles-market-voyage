
import { useState, useEffect } from "react";
import { supabase, safeSupabaseOperation } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Json } from "@/integrations/supabase/types";

interface ContactDetails {
  address: string;
  phone: string;
  email: string;
}

interface EmailSettings {
  notifications_enabled: boolean;
  admin_emails: string[];
}

export function useSettingsData() {
  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    address: "",
    phone: "",
    email: "",
  });
  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    notifications_enabled: true,
    admin_emails: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      // Fetch contact details
      const contactData = await safeSupabaseOperation(async () => {
        const response = await supabase
          .from("site_settings")
          .select("*")
          .eq("id", "contact_details")
          .maybeSingle();
        return response;
      });
      
      console.log("Fetched contact details:", contactData);
      
      if (contactData) {
        // Type assertion with safety check
        const dataValue = contactData.value;
        if (dataValue && typeof dataValue === 'object') {
          const contactValue = dataValue as Record<string, string>;
          setContactDetails({
            address: contactValue.address || "",
            phone: contactValue.phone || "",
            email: contactValue.email || ""
          });
        }
      } else {
        // Settings not found, initialize them
        await initializeContactSettings();
      }

      // Fetch email settings
      const emailData = await safeSupabaseOperation(async () => {
        const response = await supabase
          .from("site_settings")
          .select("*")
          .eq("id", "email_settings")
          .maybeSingle();
        return response;
      });
      
      console.log("Fetched email settings:", emailData);
      
      if (emailData) {
        // Type assertion with safety check
        const dataValue = emailData.value;
        if (dataValue && typeof dataValue === 'object') {
          // Safely convert JSON data to EmailSettings interface
          const emailValue = dataValue as Record<string, any>;
          setEmailSettings({
            notifications_enabled: emailValue.notifications_enabled ?? true,
            admin_emails: Array.isArray(emailValue.admin_emails) ? emailValue.admin_emails : []
          });
        }
      } else {
        // Settings not found, initialize them
        await initializeEmailSettings();
      }
    } catch (error: any) {
      console.error("Error fetching settings:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to load settings.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const initializeContactSettings = async () => {
    try {
      const initialData = {
        address: "",
        phone: "",
        email: ""
      };

      console.log("Initializing contact settings with:", initialData);

      await safeSupabaseOperation(async () => {
        const response = await supabase
          .from("site_settings")
          .insert({ 
            id: "contact_details", 
            value: initialData as unknown as Json,
            updated_at: new Date().toISOString()
          });
        return response;
      });

      setContactDetails(initialData);
    } catch (error: any) {
      console.error("Error initializing contact settings:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to initialize contact details.",
        variant: "destructive",
      });
    }
  };

  const initializeEmailSettings = async () => {
    try {
      const initialData = {
        notifications_enabled: true,
        admin_emails: []
      };

      console.log("Initializing email settings with:", initialData);

      await safeSupabaseOperation(async () => {
        const response = await supabase
          .from("site_settings")
          .insert({ 
            id: "email_settings", 
            value: initialData as unknown as Json,
            updated_at: new Date().toISOString()
          });
        return response;
      });

      setEmailSettings(initialData);
    } catch (error: any) {
      console.error("Error initializing email settings:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to initialize email settings.",
        variant: "destructive",
      });
    }
  };

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleNotifications = (checked: boolean) => {
    setEmailSettings(prev => ({
      ...prev,
      notifications_enabled: checked
    }));
  };

  const addAdminEmail = (email: string) => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (emailSettings.admin_emails.includes(email)) {
      toast({
        title: "Email Already Added",
        description: "This email is already in the list.",
        variant: "destructive",
      });
      return;
    }

    setEmailSettings(prev => ({
      ...prev,
      admin_emails: [...prev.admin_emails, email]
    }));
  };

  const removeAdminEmail = (email: string) => {
    setEmailSettings(prev => ({
      ...prev,
      admin_emails: prev.admin_emails.filter(e => e !== email)
    }));
  };

  const handleSaveContactDetails = async () => {
    setIsSaving(true);
    try {
      console.log("Saving contact details:", contactDetails);
      
      await safeSupabaseOperation(async () => {
        const response = await supabase
          .from("site_settings")
          .update({ 
            value: contactDetails as unknown as Json, 
            updated_at: new Date().toISOString() 
          })
          .eq("id", "contact_details");
        return response;
      });
      
      toast({
        title: "Success",
        description: "Contact details updated successfully.",
      });
    } catch (error: any) {
      console.error("Error updating contact settings:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update contact details.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveEmailSettings = async () => {
    setIsSaving(true);
    try {
      console.log("Saving email settings:", emailSettings);
      
      await safeSupabaseOperation(async () => {
        const response = await supabase
          .from("site_settings")
          .update({ 
            value: emailSettings as unknown as Json, 
            updated_at: new Date().toISOString() 
          })
          .eq("id", "email_settings");
        return response;
      });
      
      toast({
        title: "Success",
        description: "Email notification settings updated successfully.",
      });
    } catch (error: any) {
      console.error("Error updating email settings:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update email settings.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    contactDetails,
    emailSettings,
    isLoading,
    isSaving,
    handleContactInputChange,
    handleToggleNotifications,
    addAdminEmail,
    removeAdminEmail,
    handleSaveContactDetails,
    handleSaveEmailSettings,
  };
}

export default useSettingsData;
