
import React from "react";
import { Bitcoin, CreditCard, DollarSign, Wallet } from "lucide-react";

const PaymentOptions = () => {
  return (
    <div className="max-w-4xl mx-auto mt-6 mb-8">
      <div className="bg-transparent backdrop-blur-sm rounded-xl p-4">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-navy text-base font-medium mb-4 font-jakarta">
            Flexible Payment Options
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 w-full">
            <div className="flex flex-col items-center justify-center p-3 rounded-lg transition-transform hover:scale-105 opacity-75 hover:opacity-100">
              <div className="bg-gray-100 p-3 rounded-full mb-2">
                <DollarSign className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-xs font-medium text-gray-600">ACH</span>
            </div>
            
            <div className="flex flex-col items-center justify-center p-3 rounded-lg transition-transform hover:scale-105 opacity-75 hover:opacity-100">
              <div className="bg-gray-100 p-3 rounded-full mb-2">
                <DollarSign className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-xs font-medium text-gray-600">Zelle</span>
            </div>
            
            <div className="flex flex-col items-center justify-center p-3 rounded-lg transition-transform hover:scale-105 opacity-75 hover:opacity-100">
              <div className="bg-gray-100 p-3 rounded-full mb-2">
                <CreditCard className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-xs font-medium text-gray-600">Revolut</span>
            </div>
            
            <div className="flex flex-col items-center justify-center p-3 rounded-lg transition-transform hover:scale-105 opacity-75 hover:opacity-100">
              <div className="bg-gray-100 p-3 rounded-full mb-2">
                <Bitcoin className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-xs font-medium text-gray-600">Bitcoin</span>
            </div>
            
            <div className="flex flex-col items-center justify-center p-3 rounded-lg transition-transform hover:scale-105 opacity-75 hover:opacity-100">
              <div className="bg-gray-100 p-3 rounded-full mb-2">
                <Wallet className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-xs font-medium text-gray-600">Other Crypto</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
