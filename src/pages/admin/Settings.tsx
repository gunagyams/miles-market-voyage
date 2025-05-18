
import React from "react";
import ContactSettingsCard from "@/components/admin/settings/ContactSettingsCard";
import EmailSettingsCard from "@/components/admin/settings/EmailSettingsCard";
import AirlineSettingsCard from "@/components/admin/settings/AirlineSettingsCard";
import useSettingsData from "@/hooks/useSettingsData";

const Settings = () => {
  const {
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
  } = useSettingsData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500">Manage website settings and configuration</p>
      </div>

      {/* Contact Information Card */}
      <ContactSettingsCard 
        contactDetails={contactDetails}
        isLoading={isLoading}
        isSaving={isSaving}
        onContactInputChange={handleContactInputChange}
        onSaveContactDetails={handleSaveContactDetails}
      />

      {/* Email Notifications Card */}
      <EmailSettingsCard 
        emailSettings={emailSettings}
        isLoading={isLoading}
        isSaving={isSaving}
        onToggleNotifications={handleToggleNotifications}
        onSaveEmailSettings={handleSaveEmailSettings}
        onAddEmail={addAdminEmail}
        onRemoveEmail={removeAdminEmail}
      />

      {/* Airline Availability Card */}
      <AirlineSettingsCard
        airlineSettings={airlineSettings}
        isLoading={isLoading}
        isSaving={isSaving}
        onToggleAirlineAvailability={handleToggleAirlineAvailability}
        onSaveAirlineSettings={handleSaveAirlineSettings}
      />
    </div>
  );
};

export default Settings;
