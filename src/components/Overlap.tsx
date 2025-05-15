
import React from "react";
import { Search, Calculator, ShoppingCart } from "lucide-react";

export default function ThreeStepProcess() {
  return (
    <div className="bg-[#fefbf3] mt-[-30px] w-[90%] py-16 px-8 text-center text-[#0e1e3c] relative z-10 mx-auto rounded-xl shadow-xl border border-gray-100">
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-gilda font-semibold mb-6 text-navy">
          Three easy steps to unlock your dream flight with airline miles
        </h2>
        <div className="h-1 w-24 mx-auto bg-gold"></div>
      </div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="step-card group">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
              <Search className="h-10 w-10 text-gold" />
            </div>
          </div>
          <h3 className="text-xl font-medium text-gold mb-1">Step 1</h3>
          <h2 className="text-2xl font-semibold mb-4 font-gilda">Browse deals</h2>
          <p className="text-gray-600 font-jakarta">
            Explore our curated list of airline mile offers to find the best fit for your travel goals.
          </p>
        </div>
        
        {/* Step 2 */}
        <div className="step-card group">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
              <Calculator className="h-10 w-10 text-gold" />
            </div>
          </div>
          <h3 className="text-xl font-medium text-gold mb-1">Step 2</h3>
          <h2 className="text-2xl font-semibold mb-4 font-gilda">Calculate your cost</h2>
          <p className="text-gray-600 font-jakarta">
            Use the slider tool to estimate how much you'll pay for the number of miles you need.
          </p>
        </div>

        {/* Step 3 */}
        <div className="step-card group">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
              <ShoppingCart className="h-10 w-10 text-gold" />
            </div>
          </div>
          <h3 className="text-xl font-medium text-gold mb-1">Step 3</h3>
          <h2 className="text-2xl font-semibold mb-4 font-gilda">Place your order</h2>
          <p className="text-gray-600 font-jakarta">
            Submit your details and let us take care of the rest. We'll deliver your miles quickly and securely.
          </p>
        </div>
      </div>
    </div>
  );
}
