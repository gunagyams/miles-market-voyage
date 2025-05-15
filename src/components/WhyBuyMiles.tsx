import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const WhyBuyMiles = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-block mb-6">
              <div className={cn("h-1 w-24 bg-gold mb-1")}></div>
              <div className={cn("h-1 w-16 bg-gold")}></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-navy font-gilda">
              Luxury Doesn't Have to Cost a Fortune
            </h2>
            <p className="text-gray-600 mb-8 font-jakarta">
              Get access to premium cabins at a fraction of retail prices. Our
              network of sources provides miles at unbeatable rates, letting you
              travel in style for less.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Save up to 70% on luxury flights",
                "Use miles to top up and unlock premium seats",
                "Travel smarter without paying retail prices",
                "Secure trusted miles from verified sources",
                "Get expert support from our concierge team",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="mt-1 mr-3 bg-gold/10 p-1 rounded-full">
                    <Check className="h-4 w-4 text-gold" />
                  </div>
                  <span className="text-gray-700 font-jakarta">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#calculator"
              className="inline-block bg-gold hover:bg-gold-dark text-white font-medium py-3 px-8 rounded-md transition-colors duration-200"
            >
              Calculate Your Savings
            </a>
          </div>

          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-lg aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1567446188601-95f43044f6dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="First Class cabin"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-lg aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1700811476977-256055428221?q=80&w=1971&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Price comparison"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-6">
                <div className="overflow-hidden rounded-lg aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1700811476854-52f99a9f2ec1?q=80&w=1971&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Boarding pass"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-lg aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1661354421565-74ffd9650918?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Lounge buffet"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBuyMiles;
