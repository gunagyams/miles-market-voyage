
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
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
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const setupAuth = async () => {
      setIsLoading(true);
      
      // Set up auth state listener FIRST
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          
          // Check admin status after auth state changes
          if (session?.user) {
            setTimeout(async () => {
              try {
                const { data, error } = await supabase.rpc('is_admin');
                if (error) throw error;
                setIsAdmin(!!data);
              } catch (error) {
                console.error("Failed to check admin status:", error);
                setIsAdmin(false);
              }
            }, 0);
          } else {
            setIsAdmin(false);
          }
        }
      );

      // THEN check for existing session
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      
      // Initial admin check
      if (session?.user) {
        try {
          const { data, error } = await supabase.rpc('is_admin');
          if (error) throw error;
          setIsAdmin(!!data);
        } catch (error) {
          console.error("Failed to check admin status:", error);
          setIsAdmin(false);
        }
      }
      
      setIsLoading(false);
      
      return () => {
        subscription.unsubscribe();
      };
    };

    setupAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      // Check if user is an admin after successful sign-in
      const { data: isAdminData, error: isAdminError } = await supabase.rpc('is_admin');
      
      if (isAdminError) {
        // Sign out if not admin
        await supabase.auth.signOut();
        return {
          success: false,
          error: "You do not have permission to access the admin area.",
        };
      }

      if (!isAdminData) {
        // Sign out if not admin
        await supabase.auth.signOut();
        return {
          success: false,
          error: "You do not have permission to access the admin area.",
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
    isAdmin,
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
