// Loads notification settings server-side so admin emails are never exposed to the browser.
export interface ServerEmailSettings {
  adminEmails: string[];
  notificationsEnabled: boolean;
}

export const getEmailSettings = async (): Promise<ServerEmailSettings> => {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !serviceKey) {
    console.error("Supabase env vars missing; cannot load email settings");
    return { adminEmails: [], notificationsEnabled: true };
  }

  try {
    const res = await fetch(
      `${url}/rest/v1/site_settings?id=eq.email_settings&select=value`,
      {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
        },
      },
    );

    if (!res.ok) {
      console.error(`Failed to load email settings [${res.status}]:`, await res.text());
      return { adminEmails: [], notificationsEnabled: true };
    }

    const rows = await res.json();
    const value = rows?.[0]?.value ?? {};
    return {
      adminEmails: Array.isArray(value.admin_emails) ? value.admin_emails : [],
      notificationsEnabled: value.notifications_enabled ?? true,
    };
  } catch (error) {
    console.error("Error loading email settings:", error);
    return { adminEmails: [], notificationsEnabled: true };
  }
};
