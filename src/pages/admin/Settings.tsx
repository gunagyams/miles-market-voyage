
import React, { useEffect, useState } from "react";
import { supabase, safeSupabaseOperation } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Phone, Mail, MapPin, Plus, X, BellRing } from "lucide-react";
import { Json } from "@/integrations/supabase/types";
import { Switch } from "@/components/ui/switch";

interface ContactDetails {
  address: string;
  phone: string;
  email: string;
}

interface EmailSettings {
  notifications_enabled: boolean;
  admin_emails: string[];
}

const Settings = () => {
  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    address: "",
    phone: "",
    email: "",
  });
  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    notifications_enabled: true,
    admin_emails: [],
  });
  const [newAdminEmail, setNewAdminEmail] = useState("");
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
          const emailValue = dataValue as EmailSettings;
          setEmailSettings({
            notifications_enabled: emailValue.notifications_enabled ?? true,
            admin_emails: emailValue.admin_emails || []
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

  useEffect(() => {
    fetchSettings();
  }, []);

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

  const addAdminEmail = () => {
    if (!newAdminEmail || !newAdminEmail.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (emailSettings.admin_emails.includes(newAdminEmail)) {
      toast({
        title: "Email Already Added",
        description: "This email is already in the list.",
        variant: "destructive",
      });
      return;
    }

    setEmailSettings(prev => ({
      ...prev,
      admin_emails: [...prev.admin_emails, newAdminEmail]
    }));
    setNewAdminEmail("");
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500">Manage website settings and configuration</p>
      </div>

      {/* Contact Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  name="address"
                  value={contactDetails.address}
                  onChange={handleContactInputChange}
                  placeholder="Office Address"
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  name="phone"
                  value={contactDetails.phone}
                  onChange={handleContactInputChange}
                  placeholder="Phone Number"
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  name="email"
                  value={contactDetails.email}
                  onChange={handleContactInputChange}
                  placeholder="Email Address"
                  className="pl-10"
                />
              </div>
              <Button
                className="mt-4 w-full sm:w-auto flex items-center gap-2"
                onClick={handleSaveContactDetails}
                disabled={isSaving}
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save Contact Info"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Email Notifications Card */}
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Enable/Disable Notifications */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <BellRing className="h-5 w-5 text-gray-500" />
                    <h3 className="font-medium text-gray-900">Email Notifications</h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    Enable email notifications for new lead submissions
                  </p>
                </div>
                <Switch
                  checked={emailSettings.notifications_enabled}
                  onCheckedChange={handleToggleNotifications}
                />
              </div>
              
              {/* Admin Email Recipients */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Email Recipients</h3>
                <p className="text-sm text-gray-500">
                  Add email addresses that will receive notifications when new leads are submitted
                </p>
                
                {/* Add Email Form */}
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Add administrator email"
                    value={newAdminEmail}
                    onChange={e => setNewAdminEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    size="sm" 
                    className="flex items-center gap-1" 
                    onClick={addAdminEmail}
                  >
                    <Plus className="h-4 w-4" /> Add
                  </Button>
                </div>
                
                {/* Email List */}
                <div className="space-y-2 mt-4">
                  {emailSettings.admin_emails.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No email recipients added yet</p>
                  ) : (
                    emailSettings.admin_emails.map((email, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                        <span className="text-sm">{email}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0" 
                          onClick={() => removeAdminEmail(email)}
                        >
                          <X className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <Button
                className="mt-4 w-full sm:w-auto flex items-center gap-2"
                onClick={handleSaveEmailSettings}
                disabled={isSaving}
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save Email Settings"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
