
import React from "react";

export default function ThreeStepsProcess() {
  return (
    <div className="bg-[#fefbf3] mt-[-30px] w-[90%] py-10 px-6 text-center text-[#0e1e3c] relative z-10 mx-auto rounded-xl shadow-xl border border-gray-100">
      <div className="max-w-4xl mx-auto mb-6">
        <h2 className="text-2xl md:text-3xl font-gilda font-semibold mb-3 text-navy">
          Three Easy Steps to Your Dream Flight
        </h2>
        <p className="text-gray-600 font-jakarta mb-4">
          Buying airline miles and booking luxury seats has never been easier.
        </p>
        <div className="h-1 w-24 mx-auto bg-gold"></div>
      </div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {/* Step 1 */}
        <div className="step-card group">
          <div className="mb-4 overflow-hidden rounded-lg h-[160px] relative">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" 
              alt="Browse Deals" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent flex items-end p-3">
              <h3 className="text-lg font-medium text-white mb-1">Step 1</h3>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2 font-gilda text-navy">Browse Deals</h2>
          <p className="text-gray-600 font-jakarta text-sm">
            Explore our curated list of airline mile offers to find the best fit for your travel goals.
          </p>
        </div>
        
        {/* Step 2 */}
        <div className="step-card group">
          <div className="mb-4 overflow-hidden rounded-lg h-[160px] relative">
            <img 
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" 
              alt="Calculate Your Cost" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent flex items-end p-3">
              <h3 className="text-lg font-medium text-white mb-1">Step 2</h3>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2 font-gilda text-navy">Calculate Your Cost</h2>
          <p className="text-gray-600 font-jakarta text-sm">
            Use the slider tool to estimate how much you'll pay for the number of miles you need.
          </p>
        </div>

        {/* Step 3 */}
        <div className="step-card group">
          <div className="mb-4 overflow-hidden rounded-lg h-[160px] relative">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" 
              alt="Place Your Order" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent flex items-end p-3">
              <h3 className="text-lg font-medium text-white mb-1">Step 3</h3>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2 font-gilda text-navy">Place Your Order</h2>
          <p className="text-gray-600 font-jakarta text-sm">
            Submit your details and let us take care of the rest. We'll deliver your miles quickly and securely.
          </p>
        </div>
      </div>
    </div>
  );
}
