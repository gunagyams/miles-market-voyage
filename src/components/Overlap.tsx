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
        <div
          className="step-card group rounded-[8px]"
          style={{ borderRadius: "8px" }}
        >
          <div className="mb-4 overflow-hidden rounded-xl h-[160px] relative">
            <img
              src="https://images.unsplash.com/photo-1595279211419-88239fbff506?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Browse Deals"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent flex items-end p-3 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-1">Step 1</h3>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2 font-gilda text-navy">
            Browse Deals
          </h2>
          <p className="text-gray-600 font-jakarta text-sm">
            Explore our curated list of airline mile offers to find the best fit
            for your travel goals.
          </p>
        </div>

        {/* Step 2 */}
        <div
          className="step-card group rounded-[8px]"
          style={{ borderRadius: "8px" }}
        >
          <div className="mb-4 overflow-hidden rounded-xl h-[160px] relative">
            <img
              src="https://images.unsplash.com/photo-1503221043305-f7498f8b7888?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Calculate Your Cost"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent flex items-end p-3 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-1">Step 2</h3>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2 font-gilda text-navy">
            Calculate Your Cost
          </h2>
          <p className="text-gray-600 font-jakarta text-sm">
            Use the slider tool to estimate how much you'll pay for the number
            of miles you need.
          </p>
        </div>

        {/* Step 3 */}
        <div
          className="step-card group rounded-[8px]"
          style={{ borderRadius: "8px" }}
        >
          <div className="mb-4 overflow-hidden rounded-xl h-[160px] relative">
            <img
              src="https://images.unsplash.com/photo-1569629743817-70d8db6c323b?q=80&w=2098&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Place Your Order"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent flex items-end p-3 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-1">Step 3</h3>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2 font-gilda text-navy">
            Place Your Order
          </h2>
          <p className="text-gray-600 font-jakarta text-sm">
            Submit your details and let us take care of the rest. We'll deliver
            your miles quickly and securely.
          </p>
        </div>
      </div>
    </div>
  );
}
