import { useState, useEffect } from "react";
import { supabase, safeSupabaseOperation } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Json } from "@/integrations/supabase/types";

interface ContactDetails {
  email: string;
  phone: string;
  address: string;
  whatsapp: string;
}

interface EmailSettings {
  sendNotificationsToAdmin: boolean;
  adminEmails: string[];
}

interface AirlineSettings {
  isAvailable: boolean;
}

const useSettingsData = () => {
  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    email: "",
    phone: "",
    address: "",
    whatsapp: "",
  });
  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    sendNotificationsToAdmin: true,
    adminEmails: [],
  });
  const [airlineSettings, setAirlineSettings] = useState<AirlineSettings>({
    isAvailable: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        // Fetch contact details
        const contactData = await safeSupabaseOperation(async () => {
          const response = await supabase
            .from("site_settings")
            .select("value")
            .eq("id", "contact")
            .single();
          return response;
        });

        if (contactData?.value) {
          // Use proper type assertion with unknown intermediary
          const contactValue = contactData.value as Record<string, any>;
          setContactDetails({
            email: contactValue.email || "",
            phone: contactValue.phone || "",
            address: contactValue.address || "",
            whatsapp: contactValue.whatsapp || "",
          });
        }

        // Fetch email settings
        const emailData = await safeSupabaseOperation(async () => {
          const response = await supabase
            .from("site_settings")
            .select("value")
            .eq("id", "email")
            .single();
          return response;
        });

        if (emailData?.value) {
          // Use proper type assertion with unknown intermediary
          const emailValue = emailData.value as Record<string, any>;
          setEmailSettings({
            sendNotificationsToAdmin: emailValue.sendNotificationsToAdmin || false,
            adminEmails: Array.isArray(emailValue.adminEmails) ? emailValue.adminEmails : [],
          });
        }

        // Fetch airline settings
        const airlineData = await safeSupabaseOperation(async () => {
          const response = await supabase
            .from("site_settings")
            .select("value")
            .eq("id", "airline")
            .single();
          return response;
        });

        if (airlineData?.value) {
          // Use proper type assertion with unknown intermediary
          const airlineValue = airlineData.value as Record<string, any>;
          setAirlineSettings({
            isAvailable: Boolean(airlineValue.isAvailable),
          });
        } else {
          // If no airline settings exist, create default one
          await safeSupabaseOperation(async () => {
            return supabase
              .from("site_settings")
              .insert({ id: "airline", value: { isAvailable: true } as Json });
          });
        }

      } catch (error: any) {
        console.error("Error fetching settings:", error);
        toast({
          title: "Error loading settings",
          description: error.message || "Failed to load settings",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [toast]);

  const handleContactInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleNotifications = () => {
    setEmailSettings((prev) => ({
      ...prev,
      sendNotificationsToAdmin: !prev.sendNotificationsToAdmin,
    }));
  };

  const handleToggleAirlineAvailability = () => {
    setAirlineSettings((prev) => ({
      ...prev,
      isAvailable: !prev.isAvailable,
    }));
  };

  const addAdminEmail = (email: string) => {
    if (!email || emailSettings.adminEmails.includes(email)) return;
    setEmailSettings((prev) => ({
      ...prev,
      adminEmails: [...prev.adminEmails, email],
    }));
  };

  const removeAdminEmail = (email: string) => {
    setEmailSettings((prev) => ({
      ...prev,
      adminEmails: prev.adminEmails.filter((e) => e !== email),
    }));
  };

  const handleSaveContactDetails = async () => {
    setIsSaving(true);
    try {
      await safeSupabaseOperation(async () => {
        const response = await supabase
          .from("site_settings")
          .upsert({ 
            id: "contact", 
            value: contactDetails as unknown as Json 
          });
        return response;
      });

      toast({
        title: "Success",
        description: "Contact details saved successfully",
      });
    } catch (error: any) {
      console.error("Error saving contact details:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save contact details",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveEmailSettings = async () => {
    setIsSaving(true);
    try {
      await safeSupabaseOperation(async () => {
        const response = await supabase
          .from("site_settings")
          .upsert({ 
            id: "email", 
            value: emailSettings as unknown as Json 
          });
        return response;
      });

      toast({
        title: "Success",
        description: "Email settings saved successfully",
      });
    } catch (error: any) {
      console.error("Error saving email settings:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save email settings",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAirlineSettings = async () => {
    setIsSaving(true);
    try {
      await safeSupabaseOperation(async () => {
        const response = await supabase
          .from("site_settings")
          .upsert({ 
            id: "airline", 
            value: airlineSettings as unknown as Json 
          });
        return response;
      });

      toast({
        title: "Success",
        description: "Airline settings saved successfully",
      });
    } catch (error: any) {
      console.error("Error saving airline settings:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save airline settings",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    contactDetails,
    emailSettings,
    airlineSettings,
    isLoading,
    isSaving,
    handleContactInputChange,
    handleToggleNotifications,
    handleToggleAirlineAvailability,
    addAdminEmail,
    removeAdminEmail,
    handleSaveContactDetails,
    handleSaveEmailSettings,
    handleSaveAirlineSettings,
  };
};

export default useSettingsData;
