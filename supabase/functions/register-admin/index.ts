
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.2";

// This function should be run once to set up the initial admin users
serve(async (req) => {
  // CORS headers
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers });
  }

  try {
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default
      Deno.env.get("SUPABASE_URL") ?? "",
      // Supabase API SERVICE ROLE KEY - env var exported by default
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Create admin users with the specified credentials
    const admins = [
      { email: "cashmypoints@proton.me", password: "Fly@2025" },
      { email: "gunagyams@gmail.com", password: "Fly@2025" }
    ];
    
    const results = [];

    for (const admin of admins) {
      try {
        // Try to create the user first
        const { data: userData, error: userError } = await supabaseClient.auth.admin.createUser({
          email: admin.email,
          password: admin.password,
          email_confirm: true,
        });

        let userId;
        if (userError) {
          // If user already exists, try to get the user id
          const { data: existingUser, error: fetchError } = await supabaseClient.auth.admin.listUsers();
          if (fetchError) throw fetchError;
          
          const foundUser = existingUser.users.find(u => u.email === admin.email);
          if (foundUser) {
            userId = foundUser.id;
          } else {
            throw new Error(`Could not create or find user with email ${admin.email}`);
          }
        } else {
          userId = userData.user!.id;
        }

        // Now make sure this user is in the admin_users table
        const { data: adminCheck, error: adminCheckError } = await supabaseClient
          .from("admin_users")
          .select("*")
          .eq("id", userId);

        // If admin exists, skip insertion
        if (!adminCheckError && adminCheck && adminCheck.length > 0) {
          results.push({ email: admin.email, status: "already exists" });
          continue;
        }

        // Otherwise, add to admin_users table
        const { error: adminInsertError } = await supabaseClient
          .from("admin_users")
          .insert([{ id: userId }]);

        if (adminInsertError) throw adminInsertError;

        results.push({ email: admin.email, status: "created successfully" });
      } catch (error) {
        results.push({ email: admin.email, status: "error", message: error.message });
      }
    }

    return new Response(
      JSON.stringify({ success: true, results }),
      { status: 200, headers }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers }
    );
  }
});
