
import React from 'react';

const AboutUs = () => {
  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute top-0 left-0 w-full h-full arabic-pattern opacity-5 z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-3">
              <div className="inline-block text-gold">✦</div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy">
              About <span className="text-gold">Miles Market</span>
            </h2>
            <p className="text-gray-600">
              We're revolutionizing the way travelers access premium flight experiences through ethical miles acquisition.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="arabesque p-6">
              <h3 className="text-xl font-semibold mb-4 text-navy font-playfair">Our Story</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Miles Market was founded in Dubai with a simple mission: to make luxury travel accessible to more people through innovative solutions. 
                We saw a gap in the market where travelers were paying full price for premium flights, unaware that there was a more affordable way.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our team of travel industry experts has deep relationships with airlines and partners across the globe, allowing us to source miles ethically 
                and pass the savings directly to you.
              </p>
            </div>
            
            <div className="arabesque p-6">
              <h3 className="text-xl font-semibold mb-4 text-navy font-playfair">Our Values</h3>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-gold-light text-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-navy">Trust & Security</h4>
                    <p className="text-gray-600">Your miles and personal information are handled with the utmost care and security.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-gold-light text-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-navy">Efficiency</h4>
                    <p className="text-gray-600">Quick delivery of miles and a streamlined process to get you flying sooner.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-gold-light text-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-navy">Value</h4>
                    <p className="text-gray-600">Competitive rates that provide significant savings compared to retail prices.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 p-8 bg-gray-50 rounded-lg border border-gray-100 premium-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 h-24 w-24 opacity-5">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50,10 L90,50 L50,90 L10,50 Z" fill="#D4AF37" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-navy font-playfair">Halal-Compliant Business</h3>
            <p className="text-gray-600 leading-relaxed">
              Miles Market operates in full compliance with Islamic financial principles. Our business model avoids interest-based 
              transactions and ensures transparency in all our dealings. We take pride in providing a service that respects and 
              adheres to the values of our community.
            </p>
            <div className="mt-4 text-right text-xs text-gray-400">
              <span className="inline-block arabic-text">حلال</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
