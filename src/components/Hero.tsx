
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, Plane } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-navy text-white pt-20 flex items-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 arabic-pattern opacity-20 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/90 to-navy/80 z-10"></div>
      
      {/* Main content */}
      <div className="container-custom z-20 px-6 py-16 relative">
        <div className="max-w-4xl mx-auto">
          {/* Arabic calligraphy-inspired decorative element */}
          <div className="mb-8 text-center">
            <div className="inline-block">
              <div className="h-[1px] w-32 mx-auto bg-gold mb-1.5"></div>
              <div className="h-[1px] w-24 mx-auto bg-gold mb-1.5"></div>
              <div className="h-[1px] w-16 mx-auto bg-gold"></div>
            </div>
          </div>
          
          {/* Main heading with animation */}
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold mb-6 leading-tight">
              <span className="block">Experience Luxury</span>
              <span className="block text-gold mt-2">Without The Premium</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-gray-200 font-light max-w-3xl mx-auto leading-relaxed">
              Unlock a world of <span className="text-gold font-normal">first-class travel experiences</span> through premium airline miles at exceptional rates.
            </p>
            
            {/* Call to action buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
              <a 
                href="#airlines" 
                className="bg-gold hover:bg-gold-dark text-navy font-medium py-4 px-10 rounded-md transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl"
              >
                Explore Miles Offers
              </a>
              <a 
                href="#quote" 
                className="bg-transparent hover:bg-white/10 border border-gold text-gold hover:text-white font-medium py-4 px-10 rounded-md transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl"
              >
                Request a Quote
              </a>
            </div>
            
            {/* Trust indicator */}
            <div className="mt-16 flex justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 inline-flex flex-col items-center">
                <Plane className="text-gold mb-2" size={24} />
                <p className="text-sm font-medium text-gray-200">Trusted by <span className="text-gold">5,000+</span> discerning GCC travelers</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#airlines" className="text-white/70 hover:text-gold transition-colors">
            <ChevronDown size={28} />
          </a>
        </div>
      </div>
      
      {/* Decorative diagonal pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-r from-navy to-navy-dark transform -skew-y-2 translate-y-16 z-10"></div>
    </section>
  );
};

export default Hero;
