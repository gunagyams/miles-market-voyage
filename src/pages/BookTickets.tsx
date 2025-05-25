import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BookingGallery from "@/components/BookingGallery";
import SuccessStories from "@/components/SuccessStories";
import FlightBookingModal from "@/components/FlightBookingModal";
import { Plane, Clock, Shield, Star, CheckCircle, Users, Globe, Headphones, Search, MessageSquare, CreditCard, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const BookTickets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSpeakToExpert = (e: React.MouseEvent) => {
    e.preventDefault();
    const phoneNumber = "971529581786";
    const message = encodeURIComponent(
      "Hello, I'd like to speak to an expert about booking flights with points. Can you assist me?"
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");

    toast({
      title: "WhatsApp Support",
      description: "Opening WhatsApp to connect you with our flight booking expert.",
      className: "bg-white border-green-400",
    });
  };

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
              <span className="block">Found Your Dream Flight?</span>
              <span className="block text-gold">We'll Book It For You</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-100 font-jakarta">
              Share your reward flight details with us and we'll book it using points at unbeatable prices
            </p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-lg">
              <p className="text-lg font-jakarta text-gold font-semibold">
                No need to buy miles - we handle everything for you
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
              Simple 3-step process to get you flying in luxury for less
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="bg-gold/10 p-8 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                <Search className="w-12 h-12 text-gold" />
              </div>
              <div className="bg-gold text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-4 text-navy font-gilda">Find Your Reward Flight</h3>
              <p className="text-gray-600 font-jakarta">
                Search for award flights on any airline's website. Found something you like? Perfect!
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="bg-gold/10 p-8 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                <MessageSquare className="w-12 h-12 text-gold" />
              </div>
              <div className="bg-gold text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-4 text-navy font-gilda">Share Flight Details</h3>
              <p className="text-gray-600 font-jakarta">
                Send us the flight details, dates, and passenger information. We'll give you an instant quote.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="bg-gold/10 p-8 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                <Plane className="w-12 h-12 text-gold" />
              </div>
              <div className="bg-gold text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-4 text-navy font-gilda">We Book & You Fly</h3>
              <p className="text-gray-600 font-jakarta">
                Pay our discounted rate and we'll book your flight using points. Receive your tickets and fly in luxury!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 font-gilda">
              Ready to Book Your Flight?
            </h2>
            <p className="text-lg text-gray-600 font-jakarta mb-8">
              Found your perfect reward flight? Share the details and we'll book it using points at incredible savings.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gold hover:bg-gold-dark text-white font-medium py-4 px-8 rounded-lg transition-colors duration-200 font-jakarta text-lg"
            >
              Book Your Flight
            </button>
          </div>
        </div>
      </section>

      {/* Flight Booking Form */}
      <FlightBookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Luxury Gallery */}
      <BookingGallery />

      {/* Success Stories */}
      <SuccessStories />

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-navy mb-8 font-gilda">
                Why Choose Our Service?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2 font-gilda">No Miles Purchase Required</h3>
                    <p className="text-gray-600 font-jakarta">
                      You don't need to buy miles yourself. We handle the entire booking process using our points inventory.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2 font-gilda">Massive Savings</h3>
                    <p className="text-gray-600 font-jakarta">
                      Save 60-80% compared to traditional booking sites by leveraging point redemptions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2 font-gilda">Expert Service</h3>
                    <p className="text-gray-600 font-jakarta">
                      Our team of airline experts ensures smooth booking and handles any changes or issues.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2 font-gilda">Instant Quotes</h3>
                    <p className="text-gray-600 font-jakarta">
                      Get pricing within minutes of sharing your flight details with our quick quote system.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-navy to-navy-dark rounded-2xl p-8 text-white">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4 font-gilda">Ready to Book?</h3>
                <p className="text-gray-200 font-jakarta">
                  Start your luxury travel experience today
                </p>
              </div>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-gold hover:bg-gold-dark text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 font-jakarta"
                >
                  Book Your Flight
                </button>
                <button 
                  onClick={handleSpeakToExpert}
                  className="w-full bg-transparent hover:bg-white/10 border border-white text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 font-jakarta"
                >
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

      <Footer />
      <FloatingWhatsApp />
      
      {/* Flight Booking Modal */}
      <FlightBookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default BookTickets;
