import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AirlineCards from "@/components/AirlineCards";
import MilesCalculator from "@/components/MilesCalculator";
import Testimonials from "@/components/Testimonials";
import AboutUs from "@/components/AboutUs";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import Overlap from "@/components/Overlap";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Overlap />
      <AirlineCards />
      <MilesCalculator />
      <Testimonials />
      <AboutUs />
      <QuoteForm />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
