
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Users, Calendar, Info, Ticket, ArrowRight } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalAirlines: 0,
    totalLeads: 0,
    totalBookTicketLeads: 0,
    newLeadsToday: 0,
    newBookTicketLeadsToday: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // Get total airlines
        const { count: airlineCount } = await supabase
          .from("airlines")
          .select("*", { count: "exact", head: true });

        // Get total leads
        const { count: leadsCount } = await supabase
          .from("leads")
          .select("*", { count: "exact", head: true });

        // Get total book ticket leads
        const { count: bookTicketLeadsCount } = await supabase
          .from("flight_bookings")
          .select("*", { count: "exact", head: true });

        // Get today's leads
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const { count: todayLeadsCount } = await supabase
          .from("leads")
          .select("*", { count: "exact", head: true })
          .gte("created_at", today.toISOString());

        // Get today's book ticket leads
        const { count: todayBookTicketLeadsCount } = await supabase
          .from("flight_bookings")
          .select("*", { count: "exact", head: true })
          .gte("created_at", today.toISOString());

        setStats({
          totalAirlines: airlineCount || 0,
          totalLeads: leadsCount || 0,
          totalBookTicketLeads: bookTicketLeadsCount || 0,
          newLeadsToday: todayLeadsCount || 0,
          newBookTicketLeadsToday: todayBookTicketLeadsCount || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome to your admin dashboard</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-5 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Airlines</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAirlines}</div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 p-0 h-auto text-blue-600 hover:text-blue-800"
                onClick={() => navigate("/admin/airlines")}
              >
                Manage Airlines <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Miles Purchase Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLeads}</div>
              <div className="text-xs text-muted-foreground">
                {stats.newLeadsToday} new today
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 p-0 h-auto text-blue-600 hover:text-blue-800"
                onClick={() => navigate("/admin/leads")}
              >
                View Leads <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Book Ticket Leads</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookTicketLeads}</div>
              <div className="text-xs text-muted-foreground">
                {stats.newBookTicketLeadsToday} new today
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 p-0 h-auto text-blue-600 hover:text-blue-800"
                onClick={() => navigate("/admin/book-ticket-leads")}
              >
                View Leads <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="h-5 w-5 mr-2" />
            Quick Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Managing Airlines</h3>
            <p className="text-sm text-gray-500">
              Update airline information including prices and minimum miles from the Airlines section.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Miles Purchase Leads</h3>
            <p className="text-sm text-gray-500">
              View and manage customer inquiries for miles purchases in the Leads section.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Book Ticket Leads</h3>
            <p className="text-sm text-gray-500">
              View and manage customer inquiries for flight bookings in the Book Ticket Leads section.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Site Settings</h3>
            <p className="text-sm text-gray-500">
              Update the contact information displayed in the footer from the Settings section.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
