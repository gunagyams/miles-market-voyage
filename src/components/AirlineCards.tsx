
import React from 'react';
import { ArrowRight } from 'lucide-react';

// Sample data for airline cards
const airlines = [
  {
    id: 1,
    name: 'Emirates Skywards',
    logo: '✈️',
    pricePerMile: 0.015,
    minMiles: 10000,
    deliveryEstimate: '24-48 hours',
  },
  {
    id: 2,
    name: 'Etihad Guest',
    logo: '✈️',
    pricePerMile: 0.014,
    minMiles: 15000,
    deliveryEstimate: '24-48 hours',
  },
  {
    id: 3,
    name: 'Qatar Privilege',
    logo: '✈️',
    pricePerMile: 0.016,
    minMiles: 12000,
    deliveryEstimate: '48-72 hours',
  },
  {
    id: 4,
    name: 'Turkish Airlines',
    logo: '✈️',
    pricePerMile: 0.012,
    minMiles: 20000,
    deliveryEstimate: '48-72 hours',
  },
  {
    id: 5,
    name: 'British Airways',
    logo: '✈️',
    pricePerMile: 0.018,
    minMiles: 10000,
    deliveryEstimate: '24-48 hours',
  },
  {
    id: 6,
    name: 'Singapore Airlines',
    logo: '✈️',
    pricePerMile: 0.02,
    minMiles: 15000,
    deliveryEstimate: '48-72 hours',
  },
];

const AirlineCard = ({ airline }: { airline: typeof airlines[0] }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 card-shadow overflow-hidden border border-gray-100 hover:border-gold/30 hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="text-3xl">{airline.logo}</div>
          <div className="bg-gold-light text-navy-dark text-xs font-bold px-3 py-1 rounded-full">
            Available
          </div>
        </div>
        <h3 className="text-xl font-bold text-navy mb-2 font-playfair">{airline.name}</h3>
        <div className="mb-4">
          <span className="text-2xl font-bold text-gold">${airline.pricePerMile.toFixed(3)}</span>
          <span className="text-gray-500 text-sm"> per mile</span>
        </div>
        <div className="space-y-2 mb-6 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Minimum Purchase:</span>
            <span className="font-medium">{airline.minMiles.toLocaleString()} miles</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Delivery Time:</span>
            <span className="font-medium">{airline.deliveryEstimate}</span>
          </div>
        </div>
        <a 
          href="#quote" 
          className="block text-center bg-navy hover:bg-navy-light text-white font-medium py-3 px-4 rounded-md transition-all duration-300 w-full hover:shadow-lg"
        >
          Get Quote
        </a>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-gold/30 via-gold to-gold/30"></div>
    </div>
  );
};

const AirlineCards = () => {
  return (
    <section id="airlines" className="section-padding bg-gray-50 relative overflow-hidden">
      {/* Decorative Arabic-inspired pattern */}
      <div className="absolute top-0 left-0 w-full h-full arabic-pattern opacity-5 z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-3">
            <div className="inline-block rotate-45 text-gold">✦</div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy font-playfair">
            Premium Airline <span className="text-gold">Miles</span>
          </h2>
          <p className="text-gray-600">
            Browse our collection of premium airline miles available at unbeatable rates. All miles are sourced ethically and delivered securely to your account.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {airlines.map((airline) => (
            <AirlineCard key={airline.id} airline={airline} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#calculator" 
            className="inline-flex items-center text-navy hover:text-gold font-medium transition-colors duration-200 group"
          >
            Calculate your savings <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AirlineCards;
