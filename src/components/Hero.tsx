
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ShieldCheck, Award, Star, CreditCard, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import FlightBookingModal from "@/components/FlightBookingModal";

const Hero = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen text-white pt-24 flex items-center bg-[url('/img/upscalemedia-transformed.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/40 z-0"></div>
      <div className="container-custom z-10 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-block mb-6">
            <div className={cn("h-1 w-24 mx-auto bg-gold mb-1")}></div>
            <div className={cn("h-1 w-16 mx-auto bg-gold")}></div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-gilda">
            <span className="block">Buy Miles.</span>
            <span className="block">Book Luxury. Fly For Less.</span>
          </h1>

          <p className="text-xl md:text-2xl mb-16 text-gray-100 font-jakarta">
            Get the points you need and the seat you want — for a fraction of
            the price. The world's most trusted and secure platform for buying
            real airline miles.
          </p>

          {/* Two Main Options - Updated Design */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
            {/* Buy Miles Section */}
            <div className="bg-gradient-to-br from-gold/20 to-gold/10 backdrop-blur-md rounded-2xl p-8 border-2 border-gold/50 shadow-2xl hover:border-gold transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <CreditCard className="w-8 h-8 text-gold mr-3" />
                  <h3 className="text-2xl font-bold font-gilda text-gold">Buy Miles</h3>
                </div>
                <p className="text-gray-200 text-lg mb-8 leading-relaxed">
                  Purchase airline miles from top carriers
                </p>
                <a
                  href="#airlines"
                  className="inline-block bg-gold hover:bg-gold-dark text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Browse Miles
                </a>
              </div>
            </div>

            {/* Book Tickets Section */}
            <div className="bg-gradient-to-br from-gold/20 to-gold/10 backdrop-blur-md rounded-2xl p-8 border-2 border-gold/50 shadow-2xl hover:border-gold transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Plane className="w-8 h-8 text-gold mr-3" />
                  <h3 className="text-2xl font-bold font-gilda text-gold">Book Tickets</h3>
                </div>
                <p className="text-gray-200 text-lg mb-8 leading-relaxed">
                  Found a reward flight? Use your points to book it
                </p>
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="inline-block bg-gold hover:bg-gold-dark text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Book Flights
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-lg">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Trust Metrics */}
                <div className="flex items-center gap-3">
                  <div className="bg-gold/20 p-3 rounded-full">
                    <ShieldCheck className="w-6 h-6 text-gold" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white">100% Secure</p>
                    <p className="text-sm text-gray-200">
                      Verified transactions
                    </p>
                  </div>
                </div>

                {/* Customer Reviews */}
                <div className="flex items-center gap-3">
                  <div className="bg-gold/20 p-3 rounded-full">
                    <Star className="w-6 h-6 text-gold" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white">4.9/5 Rating</p>
                    <p className="text-sm text-gray-200">From 5,000+ reviews</p>
                  </div>
                </div>

                {/* Awards */}
                <div className="flex items-center gap-3">
                  <div className="bg-gold/20 p-3 rounded-full">
                    <Award className="w-6 h-6 text-gold" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center">
                      <p className="font-bold text-white mr-2">Excellent on</p>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Trustpilot_Logo_%282022%29.svg"
                        alt="Trustpilot"
                        className="h-5"
                      />
                    </div>
                    <p className="text-sm text-gray-200">
                      Award winning service
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FlightBookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </section>
  );
};

export default Hero;
