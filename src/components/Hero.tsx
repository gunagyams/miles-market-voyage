
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-navy text-white pt-24 flex items-center arabic-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/90 to-navy/70 z-0"></div>
      <div className="container-custom z-10 px-6 py-16">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="inline-block mb-6">
            <div className={cn(
              "h-1 w-24 mx-auto bg-gold mb-1",
            )}></div>
            <div className={cn(
              "h-1 w-16 mx-auto bg-gold",
            )}></div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="block">Elevate Your Journey</span>
            <span className="block text-gold">Without the Hefty Price Tag</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-gray-100">
            Unlock premium airline miles at unbeatable rates. Experience first-class travel for a fraction of the cost.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-red hover:bg-red-dark text-white py-3 px-8 rounded-md transition-colors duration-200"
              asChild
              size="lg"
            >
              <a href="#airlines">Browse Miles Deals</a>  
            </Button>
            <Button 
              className="bg-transparent hover:bg-white/10 border border-white text-white py-3 px-8 rounded-md transition-colors duration-200"
              asChild
              variant="outline"
              size="lg"
            >
              <a href="#quote">Get a Free Quote</a>
            </Button>
          </div>
          
          <div className="mt-12 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-flex items-center">
              <p className="text-sm font-medium">Trusted by 5,000+ GCC travelers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
