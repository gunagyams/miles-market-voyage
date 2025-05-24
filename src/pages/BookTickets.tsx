
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Plane, Clock, Shield, Star, CheckCircle, Users, Globe, Headphones } from "lucide-react";

const BookTickets = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] text-white pt-24 flex items-center bg-[url('/img/upscalemedia-transformed.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-br from-navy/90 to-black/60 z-0"></div>
        <div className="container-custom z-10 px-6 py-16">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-block mb-6">
              <div className="h-1 w-24 mx-auto bg-gold mb-1"></div>
              <div className="h-1 w-16 mx-auto bg-gold"></div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-gilda">
              <span className="block">Book Premium Flights</span>
              <span className="block text-gold">With Points</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-100 font-jakarta">
              Choose your dream destination, we'll book it for you using points at unbeatable prices
            </p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-lg">
              <p className="text-lg font-jakarta text-gold font-semibold">
                Save up to 90% on Business & First Class flights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 font-gilda">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 font-jakarta max-w-3xl mx-auto">
              Our simple 4-step process gets you flying in luxury for less
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="bg-gold/10 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                <Globe className="w-10 h-10 text-gold" />
              </div>
              <div className="bg-gold text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-4 text-navy font-gilda">Choose Your Flight</h3>
              <p className="text-gray-600 font-jakarta">
                Browse and select your preferred flights from any airline, any destination, any class.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="bg-gold/10 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                <Users className="w-10 h-10 text-gold" />
              </div>
              <div className="bg-gold text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-4 text-navy font-gilda">Submit Your Request</h3>
              <p className="text-gray-600 font-jakarta">
                Fill out our booking form with your flight details and travel preferences.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="bg-gold/10 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                <Clock className="w-10 h-10 text-gold" />
              </div>
              <div className="bg-gold text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-4 text-navy font-gilda">We Find The Best Deal</h3>
              <p className="text-gray-600 font-jakarta">
                Our experts search for the best point redemption options across all airline programs.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center group">
              <div className="bg-gold/10 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                <Plane className="w-10 h-10 text-gold" />
              </div>
              <div className="bg-gold text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                4
              </div>
              <h3 className="text-xl font-bold mb-4 text-navy font-gilda">Fly In Luxury</h3>
              <p className="text-gray-600 font-jakarta">
                Receive your tickets and enjoy your premium flight experience at a fraction of the cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-navy mb-8 font-gilda">
                Why Book With Us?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2 font-gilda">Expert Point Optimization</h3>
                    <p className="text-gray-600 font-jakarta">
                      Our team knows every airline program inside out to get you the maximum value for your points.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2 font-gilda">Access to Hidden Inventory</h3>
                    <p className="text-gray-600 font-jakarta">
                      We can access award seats that aren't visible to the public through our airline partnerships.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2 font-gilda">Complete Service</h3>
                    <p className="text-gray-600 font-jakarta">
                      From booking to boarding, we handle everything so you can focus on enjoying your trip.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2 font-gilda">24/7 Support</h3>
                    <p className="text-gray-600 font-jakarta">
                      Our dedicated team is available around the clock to assist with any changes or issues.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-navy to-navy-dark rounded-2xl p-8 text-white">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4 font-gilda">Ready to Book?</h3>
                <p className="text-gray-200 font-jakarta">
                  Get started with your luxury travel experience today
                </p>
              </div>
              
              <div className="space-y-4">
                <button className="w-full bg-gold hover:bg-gold-dark text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 font-jakarta">
                  Get Flight Quote
                </button>
                <button className="w-full bg-transparent hover:bg-white/10 border border-white text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 font-jakarta">
                  Speak to Expert
                </button>
              </div>
              
              <div className="mt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-gold" />
                  <span className="font-bold">4.9/5 Rating</span>
                </div>
                <p className="text-sm text-gray-300">Trusted by 10,000+ travelers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="quote" className="py-20 bg-gradient-to-r from-navy to-navy-dark text-white">
        <div className="container-custom px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-gilda">
            Start Your Journey Today
          </h2>
          <p className="text-xl mb-10 text-gray-200 font-jakarta max-w-3xl mx-auto">
            Fill out our booking form and let our experts find you the perfect flight using points
          </p>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 font-gilda">Booking Form Coming Soon</h3>
            <p className="text-gray-200 mb-8 font-jakarta">
              Our comprehensive booking form will be available here to capture all your flight preferences and requirements.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gold hover:bg-gold-dark text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 font-jakarta">
                Contact Us Now
              </button>
              <button className="bg-transparent hover:bg-white/10 border border-white text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 font-jakarta">
                Call: +1 (555) 123-4567
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default BookTickets;
