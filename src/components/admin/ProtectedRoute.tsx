
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
        setCheckingAdmin(false);
        return;
      }

      try {
        const { data: adminData, error } = await supabase
          .from("admin_users")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error checking admin status:", error);
          toast({
            title: "Error",
            description: "Failed to verify admin status.",
            variant: "destructive",
          });
          setIsAdmin(false);
        } else {
          setIsAdmin(!!adminData);
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
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
