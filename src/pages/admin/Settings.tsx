
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Phone, Mail, MapPin } from "lucide-react";
import { Json } from "@/integrations/supabase/types";

interface ContactDetails {
  address: string;
  phone: string;
  email: string;
}

const Settings = () => {
  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    address: "",
    phone: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", "contact_details")
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Record not found, create it
          await initializeSettings();
          return;
        }
        throw error;
      }
      
      // Properly cast the value to ContactDetails
      if (data && data.value) {
        const contactData = data.value as Record<string, string>;
        setContactDetails({
          address: contactData.address || "",
          phone: contactData.phone || "",
          email: contactData.email || ""
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast({
        title: "Error",
        description: "Failed to load contact details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const initializeSettings = async () => {
    try {
      const initialData = {
        address: "",
        phone: "",
        email: ""
      };

      const { error } = await supabase
        .from("site_settings")
        .insert({ 
          id: "contact_details", 
          value: initialData as unknown as Json,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setContactDetails(initialData);
    } catch (error) {
      console.error("Error initializing settings:", error);
      toast({
        title: "Error",
        description: "Failed to initialize contact details.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      console.log("Saving contact details:", contactDetails);
      const { error } = await supabase
        .from("site_settings")
        .update({ 
          value: contactDetails as unknown as Json, 
          updated_at: new Date().toISOString() 
        })
        .eq("id", "contact_details");

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      
      toast({
        title: "Success",
        description: "Contact details updated successfully.",
      });
    } catch (error) {
      console.error("Error updating settings:", error);
      toast({
        title: "Error",
        description: "Failed to update contact details.",
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
                  onChange={handleInputChange}
                  placeholder="Office Address"
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  name="phone"
                  value={contactDetails.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  name="email"
                  value={contactDetails.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="pl-10"
                />
              </div>
              <Button
                className="mt-4 w-full sm:w-auto flex items-center gap-2"
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
