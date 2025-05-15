
import React from "react";
import { Bitcoin, CreditCard, DollarSign } from "lucide-react";

const PaymentOptions = () => {
  return (
    <div className="container-custom py-6 md:py-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-navy text-sm md:text-base mb-4">
              We accept multiple payment methods for your convenience
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
              <div className="flex flex-col items-center">
                <DollarSign className="h-6 w-6 text-gold mb-2" />
                <span className="text-xs text-gray-600">ACH</span>
              </div>
              
              <div className="flex flex-col items-center">
                <DollarSign className="h-6 w-6 text-gold mb-2" />
                <span className="text-xs text-gray-600">Zelle</span>
              </div>
              
              <div className="flex flex-col items-center">
                <CreditCard className="h-6 w-6 text-gold mb-2" />
                <span className="text-xs text-gray-600">Revolut</span>
              </div>
              
              <div className="flex flex-col items-center">
                <Bitcoin className="h-6 w-6 text-gold mb-2" />
                <span className="text-xs text-gray-600">Bitcoin</span>
              </div>
              
              <div className="flex flex-col items-center">
                <Bitcoin className="h-6 w-6 text-gold mb-2" />
                <span className="text-xs text-gray-600">Crypto</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
