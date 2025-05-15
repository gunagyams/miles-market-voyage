
import React from "react";
import { Bitcoin, CreditCard, DollarSign, Wallet } from "lucide-react";

const PaymentOptions = () => {
  return (
    <div className="max-w-4xl mx-auto -mt-4 mb-8">
      <div className="bg-gradient-to-r from-navy/5 to-gold/5 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-navy text-lg font-semibold mb-4 font-gilda">
            Flexible Payment Options
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 w-full">
            <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-transform hover:scale-105">
              <div className="bg-gold/10 p-3 rounded-full mb-2">
                <DollarSign className="h-5 w-5 text-gold" />
              </div>
              <span className="text-xs font-medium text-navy">ACH</span>
            </div>
            
            <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-transform hover:scale-105">
              <div className="bg-gold/10 p-3 rounded-full mb-2">
                <DollarSign className="h-5 w-5 text-gold" />
              </div>
              <span className="text-xs font-medium text-navy">Zelle</span>
            </div>
            
            <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-transform hover:scale-105">
              <div className="bg-gold/10 p-3 rounded-full mb-2">
                <CreditCard className="h-5 w-5 text-gold" />
              </div>
              <span className="text-xs font-medium text-navy">Revolut</span>
            </div>
            
            <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-transform hover:scale-105">
              <div className="bg-gold/10 p-3 rounded-full mb-2">
                <Bitcoin className="h-5 w-5 text-gold" />
              </div>
              <span className="text-xs font-medium text-navy">Bitcoin</span>
            </div>
            
            <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-transform hover:scale-105">
              <div className="bg-gold/10 p-3 rounded-full mb-2">
                <Wallet className="h-5 w-5 text-gold" />
              </div>
              <span className="text-xs font-medium text-navy">Other Crypto</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
