
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, BellRing, Plus, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface EmailSettings {
  notifications_enabled: boolean;
  admin_emails: string[];
}

interface EmailSettingsCardProps {
  emailSettings: EmailSettings;
  isLoading: boolean;
  isSaving: boolean;
  onToggleNotifications: (checked: boolean) => void;
  onSaveEmailSettings: () => Promise<void>;
  onAddEmail: (email: string) => void;
  onRemoveEmail: (email: string) => void;
}

const EmailSettingsCard = ({
  emailSettings,
  isLoading,
  isSaving,
  onToggleNotifications,
  onSaveEmailSettings,
  onAddEmail,
  onRemoveEmail,
}: EmailSettingsCardProps) => {
  const [newAdminEmail, setNewAdminEmail] = useState("");

  const handleAddEmail = () => {
    onAddEmail(newAdminEmail);
    setNewAdminEmail("");
  };

  return (
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
                onCheckedChange={onToggleNotifications}
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
                  onClick={handleAddEmail}
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
                        onClick={() => onRemoveEmail(email)}
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
              onClick={onSaveEmailSettings}
              disabled={isSaving}
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save Email Settings"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailSettingsCard;
