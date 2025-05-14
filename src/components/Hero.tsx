import React from "react";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section className="relative min-h-screen text-white pt-24 flex items-center bg-[url('/img/upscalemedia-transformed.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-br from-black/55 to-black/30 z-0"></div>
      <div className="container-custom z-10 px-6 py-16">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="inline-block mb-6">
            <div className={cn("h-1 w-24 mx-auto bg-gold mb-1")}></div>
            <div className={cn("h-1 w-16 mx-auto bg-gold")}></div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="block">Buy Miles.</span>
            <span className="block">Book Luxury. Fly For Less.</span>
          </h1>

          <p className="text-xl md:text-2xl mb-10 text-gray-100">
            Get the points you need and the seat you want — for a fraction of
            the price. The world’s most trusted and secure platform for buying
            real airline miles.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#airlines"
              className="bg-gold hover:bg-gold-dark text-white font-medium py-3 px-8 rounded-md transition-colors duration-200"
            >
              Browse Miles Deals
            </a>
            <a
              href="#quote"
              className="bg-transparent hover:bg-white/10 border border-white text-white font-medium py-3 px-8 rounded-md transition-colors duration-200"
            >
              Get a Free Quote
            </a>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-flex items-center">
              <p className="text-sm font-medium">
                <div className="flex flex-col items-center gap-4 text-sm text-gray-200">
                  {/* Avatar Stack */}
                  <div className="flex -space-x-3">
                    <img
                      src="/img/img1.jpg"
                      alt="User 1"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <img
                      src="/img/img2.jpg"
                      alt="User 2"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <img
                      src="/img/img3.jpg"
                      alt="User 3"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <img
                      src="/img/img4.jpg"
                      alt="User 4"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  </div>

                  {/* Trust Text + Trustpilot Badge */}
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <p className="text-sm text-white text-center">
                      Trusted by 5,000+ travelers worldwide · Rated Excellent on
                    </p>
                    <a
                      href="https://www.trustpilot.com/review/yourdomain.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Trustpilot_Logo_%282022%29.svg"
                        alt="Trustpilot"
                        className="h-6"
                      />
                    </a>
                  </div>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
