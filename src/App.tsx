
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import DashboardLayout from "@/components/admin/DashboardLayout";
import Index from "./pages/Index";
import BookTickets from "./pages/BookTickets";
import Reviews from "./pages/Reviews";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import RegisterAdmin from "./pages/admin/RegisterAdmin";
import Dashboard from "./pages/admin/Dashboard";
import Airlines from "./pages/admin/Airlines";
import Leads from "./pages/admin/Leads";
import BookTicketLeads from "./pages/admin/BookTicketLeads";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/book-tickets" element={<BookTickets />} />
              <Route path="/reviews" element={<Reviews />} />
              
              {/* Admin Auth Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/register" element={<RegisterAdmin />} />
              
              {/* Protected Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="airlines" element={<Airlines />} />
                <Route path="leads" element={<Leads />} />
                <Route path="book-ticket-leads" element={<BookTicketLeads />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              
              {/* Catch all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
