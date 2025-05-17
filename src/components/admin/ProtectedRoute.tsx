
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checkingAdmin, setCheckingAdmin] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const verifyAdminStatus = async () => {
      if (!user) {
        console.log("No user found in protected route");
        setCheckingAdmin(false);
        return;
      }

      console.log("Verifying admin status for user:", user.id);

      try {
        // Use a database function call to avoid RLS recursion issues
        const { data: isUserAdmin, error } = await supabase.rpc(
          'is_user_admin',
          { user_id: user.id }
        );

        if (error) {
          console.error("Error checking admin status:", error);
          toast({
            title: "Error",
            description: "Failed to verify admin status.",
            variant: "destructive",
          });
          setIsAdmin(false);
        } else {
          console.log("Admin check result:", isUserAdmin);
          setIsAdmin(isUserAdmin); 
        }
      } catch (err) {
        console.error("Admin verification error:", err);
        setIsAdmin(false);
      } finally {
        setCheckingAdmin(false);
      }
    };

    if (user) {
      verifyAdminStatus();
    } else {
      setCheckingAdmin(false);
    }
  }, [user, toast]);

  if (isLoading || checkingAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy"></div>
      </div>
    );
  }

  if (!user || isAdmin === false) {
    console.log("Access denied: user not authenticated or not an admin");
    return <Navigate to="/admin/login" replace />;
  }

  console.log("Access granted: user is authenticated and is an admin");
  return <>{children}</>;
};

export default ProtectedRoute;
