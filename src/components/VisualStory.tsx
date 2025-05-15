import React from "react";
import { cn } from "@/lib/utils";

const VisualStory = () => {
  return (
    <section className="section-padding bg-[#fefbf3]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative overflow-hidden rounded-xl aspect-[4/3] lg:aspect-square">
            <img
              src="https://images.unsplash.com/photo-1661954864180-e61dea14208a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Luxury Travel Experience"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-navy/30 to-transparent"></div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="inline-block mb-4">
              <div className={cn("h-1 w-24 bg-gold mb-1")}></div>
              <div className={cn("h-1 w-16 bg-gold")}></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-gilda text-navy">
              Turn Miles Into Memories
            </h2>
            <p className="text-lg mb-8 text-gray-600 font-jakarta">
              Whether it's your honeymoon, a last-minute upgrade, or a
              long-overdue getaway — make it unforgettable with miles that take
              you farther for less.
            </p>
            <div>
              <a
                href="#airlines"
                className="inline-block bg-gold hover:bg-gold-dark text-white font-medium py-3 px-8 rounded-md transition-colors duration-200"
              >
                Browse Deals
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualStory;
