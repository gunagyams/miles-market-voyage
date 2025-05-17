
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{
    success: boolean;
    error: string | null;
  }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const setupAuth = async () => {
      setIsLoading(true);
      
      // Set up auth state listener FIRST
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
        }
      );

      // THEN check for existing session
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      
      setIsLoading(false);
      
      return () => {
        subscription.unsubscribe();
      };
    };

    setupAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // First, verify if the email is an allowed admin email before attempting sign in
      const allowedAdminEmails = [
        "cashmypoints@proton.me",
        "gunagyams@gmail.com"
      ];

      if (!allowedAdminEmails.includes(email)) {
        console.error("Email not allowed:", email);
        return { 
          success: false, 
          error: "This email is not authorized to access the admin area." 
        };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Authentication error:", error);
        return { success: false, error: error.message };
      }

      // The user exists in auth system, now check if they're in the admin_users table
      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("id", data.user.id)
        .maybeSingle(); // Use maybeSingle instead of expecting an array

      if (adminError) {
        console.error("Admin check error:", adminError);
        // Sign out since we couldn't verify admin status
        await supabase.auth.signOut();
        return { 
          success: false, 
          error: "Error verifying admin status. Please try again." 
        };
      }

      if (!adminData) {
        console.error("No admin record found for user:", data.user.id);
        // Sign out since this user is not an admin
        await supabase.auth.signOut();
        return { 
          success: false, 
          error: "You are not authorized to access the admin area." 
        };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error("Sign in error:", error);
      return {
        success: false,
        error: "An unexpected error occurred during sign in.",
      };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
