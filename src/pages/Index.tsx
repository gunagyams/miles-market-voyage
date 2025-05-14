
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AirlineCards from '@/components/AirlineCards';
import MilesCalculator from '@/components/MilesCalculator';
import Testimonials from '@/components/Testimonials';
import AboutUs from '@/components/AboutUs';
import QuoteForm from '@/components/QuoteForm';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const Index = () => {
  // Add scroll animation effects
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      
      {/* Decorative Arabic-inspired divider */}
      <div className="container-custom px-6 py-12">
        <div className="flex items-center justify-center">
          <div className="h-[1px] flex-grow max-w-xs bg-gray-200"></div>
          <div className="px-4">
            <div className="text-gold text-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#D4AF37" strokeWidth="0.5"/>
                <path d="M12 6L14.5 11H9.5L12 6Z" fill="#D4AF37"/>
                <path d="M12 18L9.5 13H14.5L12 18Z" fill="#D4AF37"/>
                <path d="M6 12L11 9.5V14.5L6 12Z" fill="#D4AF37"/>
                <path d="M18 12L13 14.5V9.5L18 12Z" fill="#D4AF37"/>
              </svg>
            </div>
          </div>
          <div className="h-[1px] flex-grow max-w-xs bg-gray-200"></div>
        </div>
      </div>

      {/* Main content sections */}
      <div id="airlines" className="animate-on-scroll opacity-0">
        <AirlineCards />
      </div>
      
      <div id="calculator" className="animate-on-scroll opacity-0">
        <MilesCalculator />
      </div>
      
      <div id="testimonials" className="animate-on-scroll opacity-0">
        <Testimonials />
      </div>
      
      <div id="about" className="animate-on-scroll opacity-0">
        <AboutUs />
      </div>
      
      <div id="quote" className="animate-on-scroll opacity-0">
        <QuoteForm />
      </div>
      
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
