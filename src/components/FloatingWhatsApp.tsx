
import React from "react";
import { MessageSquare } from "lucide-react";
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
      className="fixed bottom-8 right-8 bg-green text-white p-4 rounded-full shadow-lg z-50 hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <MessageSquare className="h-6 w-6" />
      <span className="sr-only">+971 52 958 1786</span>
    </a>
  );
};

export default FloatingWhatsApp;
