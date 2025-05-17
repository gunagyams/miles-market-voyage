
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.2";

// This function will only be callable once to set up the initial admin user
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

    // Check if any admin users already exist
    const { data: adminUsers, error: adminCheckError } = await supabaseClient
      .from("admin_users")
      .select("id")
      .limit(1);

    if (adminCheckError) {
      throw adminCheckError;
    }

    // If admin users already exist, prevent execution
    if (adminUsers && adminUsers.length > 0) {
      return new Response(
        JSON.stringify({ error: "Admin user already exists" }),
        { status: 400, headers }
      );
    }

    // Parse the request body
    const { email, password } = await req.json();

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Create a new user
    const { data: authData, error: signUpError } = await supabaseClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (signUpError) {
      throw signUpError;
    }

    if (!authData.user) {
      throw new Error("Failed to create user");
    }

    // Add the user to the admin_users table
    const { error: adminInsertError } = await supabaseClient
      .from("admin_users")
      .insert([{ id: authData.user.id }]);

    if (adminInsertError) {
      throw adminInsertError;
    }

    return new Response(
      JSON.stringify({ success: true, message: "Admin user created successfully" }),
      { status: 200, headers }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers }
    );
  }
});
