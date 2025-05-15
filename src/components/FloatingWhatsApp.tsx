
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
      className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg z-50 hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24" 
        height="24"
        viewBox="0 0 24 24"
        fill="white"
        className="h-6 w-6"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.5727 3.43078C18.2576 1.11569 15.2543 -0.092309 12.1669 0.0050882C5.49446 0.0050882 0.0838241 5.41572 0.0838241 12.0956C0.0838241 14.22 0.606577 16.2858 1.60758 18.1048L0 24.0001L6.04022 22.4293C7.77943 23.3446 9.74328 23.8288 11.7486 23.8288H11.7538C11.7538 23.8288 11.7538 23.8288 11.7538 23.8288C18.4211 23.8288 23.8369 18.4182 23.8369 11.7383C23.9342 8.6899 22.8878 5.74586 20.5727 3.43078ZM12.1669 21.8315C10.3816 21.8315 8.63452 21.3679 7.11312 20.4935L6.74918 20.285L2.91942 21.2004L3.84501 17.4759L3.61602 17.0936C2.6357 15.5228 2.13077 13.7038 2.13077 11.8338C2.13077 6.50678 6.6799 2.00743 12.0748 2.00743C14.6731 2.00743 17.1742 3.02416 19.0461 4.90311C20.9129 6.78207 21.8878 9.28319 21.8878 11.8815C21.8878 17.2607 17.1845 21.8315 12.1669 21.8315ZM17.6997 14.6023C17.3816 14.4381 15.8963 13.7038 15.5988 13.5967C15.2961 13.4896 15.0876 13.4361 14.8738 13.7542C14.6648 14.0724 14.0935 14.7477 13.9058 14.9667C13.7232 15.1857 13.5303 15.2124 13.2173 15.0535C10.8662 13.8777 9.32418 12.973 7.77943 10.305C7.42622 9.70289 7.95466 9.75641 8.44892 8.76754C8.55621 8.55647 8.50257 8.37326 8.42784 8.20898C8.35312 8.0447 7.83541 6.5594 7.57278 5.92313C7.31016 5.30578 7.04754 5.39389 6.85487 5.38103C6.66753 5.36817 6.45906 5.36817 6.25567 5.36817C6.04708 5.36817 5.71496 5.4429 5.41748 5.75578C5.11999 6.07387 4.33862 6.80826 4.33862 8.29355C4.33862 9.77885 5.43857 11.2124 5.58952 11.4261C5.75578 11.6451 7.82783 14.7423 10.9122 16.0414C12.7809 16.8473 13.5253 16.9275 14.479 16.7847C15.0558 16.6989 16.2316 16.0467 16.4943 15.3033C16.757 14.5598 16.757 13.9288 16.6823 13.7965C16.6023 13.6375 16.3934 13.561 17.6997 14.6023Z"
        />
      </svg>
      <span className="sr-only">+971 52 958 1786</span>
    </a>
  );
};

export default FloatingWhatsApp;
