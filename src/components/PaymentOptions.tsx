import React from "react";
import { Bitcoin, CreditCard, DollarSign, Wallet } from "lucide-react";

const paymentOptions = [
  {
    label: "ACH",
    icon: DollarSign,
    bg: "bg-gradient-to-tr from-gold/20 to-gold/5",
  },
  {
    label: "Zelle",
    icon: DollarSign,
    bg: "bg-gradient-to-tr from-gold/20 to-gold/5",
  },
  {
    label: "Revolut",
    icon: CreditCard,
    bg: "bg-gradient-to-tr from-navy/10 to-gray-100",
  },
  {
    label: "Bitcoin",
    icon: Bitcoin,
    bg: "bg-gradient-to-tr from-yellow-400/20 to-yellow-100/10",
  },
  {
    label: "Other Crypto",
    icon: Wallet,
    bg: "bg-gradient-to-tr from-green-300/20 to-green-100/10",
  },
];

const PaymentOptions = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8 mb-12">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8">
        <div className="flex flex-col items-center">
          <h3 className="text-navy text-lg font-semibold mb-6 font-jakarta tracking-wide">
            Flexible Payment Options
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full">
            {paymentOptions.map(({ label, icon: Icon, bg }, i) => (
              <div
                key={label}
                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-transform hover:scale-105 shadow-sm bg-white/60 hover:bg-gold/10 border border-gray-100 ${
                  i === 2 ? "md:col-start-3" : ""
                }`}
              >
                <div className={`mb-3 rounded-full p-4 shadow ${bg}`}>
                  <Icon className="h-7 w-7 text-navy" strokeWidth={2} />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
