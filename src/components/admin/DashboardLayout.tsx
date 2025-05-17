
import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  PlaneIcon,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const DashboardLayout: React.FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const navItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: <PlaneIcon className="h-5 w-5" />,
      label: "Airlines",
      path: "/admin/airlines",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Leads",
      path: "/admin/leads",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      path: "/admin/settings",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-navy text-white focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar for desktop */}
      <aside
        className={`bg-white w-64 fixed inset-y-0 z-40 transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="px-6 py-6 h-full flex flex-col">
          <div className="flex items-center justify-center mb-8">
            <h1 className="text-xl font-bold text-navy">Cash My Points</h1>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 flex-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                    isActive
                      ? "bg-navy text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="flex items-center px-4 py-3 mt-6 text-sm font-medium text-red-700 hover:bg-red-50 rounded-md"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
