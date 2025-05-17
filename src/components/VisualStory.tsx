
import React from "react";
import { motion } from "framer-motion";

const VisualStory = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 font-gilda">
            Three Easy Steps to Your Dream Flight
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We make purchasing airline miles simple and secure, so you can focus on planning your next adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
            <div className="w-16 h-16 bg-gold-light rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-gold font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold text-navy mb-3 font-gilda">Browse Miles, Habibi!</h3>
            <p className="text-gray-600">
              Explore our selection of airline miles from top carriers worldwide at competitive rates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
            <div className="w-16 h-16 bg-gold-light rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-gold font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold text-navy mb-3 font-gilda">Place Your Order</h3>
            <p className="text-gray-600">
              Complete your purchase with our secure payment system and provide your frequent flyer details.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
            <div className="w-16 h-16 bg-gold-light rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-gold font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold text-navy mb-3 font-gilda">Book Your Dream Flight</h3>
            <p className="text-gray-600">
              Once miles are credited to your account, book premium cabins at a fraction of the retail price.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualStory;
