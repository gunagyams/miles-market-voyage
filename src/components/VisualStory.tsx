
import React from "react";
import { motion } from "framer-motion";

const VisualStory = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img 
              src="/lovable-uploads/3c0693ce-ddca-44fb-bd5a-2d52444c81db.png" 
              alt="Luxury flight experience" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          
          <div className="order-1 md:order-2">
            <div className="flex mb-6">
              <div className="h-1 w-24 bg-gold"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6 font-gilda">
              Turn Miles Into Memories
            </h2>
            <p className="text-gray-600 mb-8">
              Whether it's your honeymoon, a last-minute upgrade, or a long-overdue
              getaway — make it unforgettable with miles that take you farther for less.
            </p>
            
            <a
              href="#airlines"
              className="bg-gold hover:bg-gold-dark text-white font-medium py-3 px-8 rounded-md transition-colors duration-200"
            >
              Browse Deals
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualStory;
