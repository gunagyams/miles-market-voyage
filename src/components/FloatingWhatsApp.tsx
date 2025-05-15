
import React from "react";
import { toast } from "@/hooks/use-toast";

const FloatingWhatsApp = () => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const phoneNumber = "971529581786";
    const message = encodeURIComponent(
      "Hello, I'm interested in buying airline miles. Can you assist me?"
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");

    toast({
      title: "WhatsApp Support",
      description: "Opening WhatsApp to connect you with our support team.",
      className: "bg-white border-green-400",
    });
  };

  return (
    <a
      href="#whatsapp"
      onClick={handleClick}
      className="fixed bottom-8 right-8 bg-green-500 text-white p-3 rounded-full shadow-lg z-50 hover:bg-green-600 transition-all duration-300 flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 175.216 175.552"
        className="h-7 w-7"
        fill="white"
      >
        <path d="M85.702,0.146C38.55,0.146,0,38.696,0,85.849c0,13.793,3.287,26.791,9.094,38.343l-9.094,50.912
        l52.408-9.095c10.979,5.42,23.315,8.482,36.389,8.482c47.152,0,85.702-38.543,85.702-88.642
        C174.499,38.696,132.854,0.146,85.702,0.146z M138.898,114.793c-1.825,5.024-10.055,9.249-13.65,9.3
        c-3.595,0.05-6.95,1.607-22.523-4.681c-19.037-7.333-31.278-25.678-32.183-26.779c-0.908-1.102-7.412-9.839-7.412-18.756
        c0-8.92,4.681-13.293,6.323-15.096c1.643-1.803,3.583-2.245,4.779-2.245c1.196,0,2.444-0.154,3.521,1.9
        c1.178,2.267,3.378,7.86,3.738,8.36c0.357,0.502,0.603,1.10,0.102,1.8c-0.501,0.694-0.752,1.094-1.253,1.696
        c-0.503,0.604-1.094,1.313-1.543,1.762c-0.502,0.501-1.003,1.045-0.401,2.146c0.604,1.096,2.646,4.682,5.705,7.57
        c3.932,3.688,7.236,4.839,8.288,5.339c1.046,0.502,1.642,0.403,2.29-0.252c0.65-0.655,2.612-3.039,3.322-4.084
        c0.708-1.044,1.403-0.854,2.345-0.502c0.95,0.356,5.945,2.799,6.949,3.313c1.001,0.502,1.673,0.754,1.927,1.203
        C140.926,105.002,140.776,109.771,138.898,114.793z" />
      </svg>
      <span className="sr-only">+971 52 958 1786</span>
    </a>
  );
};

export default FloatingWhatsApp;
