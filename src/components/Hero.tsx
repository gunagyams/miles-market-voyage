
import React from "react";
import { cn } from "@/lib/utils";
import { ShieldCheck, Award, Star, Plane, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
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

          <p className="text-xl md:text-2xl mb-10 text-gray-100 font-jakarta">
            Get the points you need and the seat you want — for a fraction of
            the price. The world's most trusted and secure platform for buying
            real airline miles.
          </p>

          {/* Two Main Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Buy Miles Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300">
              <div className="bg-gold/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-gilda">Buy Miles</h3>
              <p className="text-gray-200 mb-6">
                Purchase airline miles directly at unbeatable rates from top airlines worldwide.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="#airlines"
                  className="bg-gold hover:bg-gold-dark text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
                >
                  Browse Miles Deals
                </a>
                <a
                  href="#quote"
                  className="bg-transparent hover:bg-white/10 border border-white text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
                >
                  Get Miles Quote
                </a>
              </div>
            </div>

            {/* Book Tickets Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300">
              <div className="bg-gold/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Plane className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-gilda">Book Tickets</h3>
              <p className="text-gray-200 mb-6">
                Choose your preferred flights and let us book them for you using points at incredible savings.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  to="/book-tickets"
                  className="bg-gold hover:bg-gold-dark text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
                >
                  Book Flight Tickets
                </Link>
                <Link
                  to="/book-tickets#quote"
                  className="bg-transparent hover:bg-white/10 border border-white text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
                >
                  Get Booking Quote
                </Link>
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
    </section>
  );
};

export default Hero;
