
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Airline {
  id: string;
  name: string;
  logo: string;
  price_per_mile: number;
  min_miles: number;
  delivery_estimate: string;
}

const AirlineCard = ({ airline }: { airline: Airline }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 card-shadow overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="text-3xl">{airline.logo}</div>
          <div className="bg-gold-light text-navy-dark text-xs font-bold px-3 py-1 rounded-full">
            Available
          </div>
        </div>
        <h3 className="text-xl font-bold text-navy mb-2">{airline.name}</h3>
        <div className="mb-4">
          <span className="text-2xl font-bold text-gold">${airline.price_per_mile.toFixed(3)}</span>
          <span className="text-gray-500 text-sm"> per mile</span>
        </div>
        <div className="space-y-2 mb-6 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Minimum Purchase:</span>
            <span className="font-medium">{airline.min_miles.toLocaleString()} miles</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Delivery Time:</span>
            <span className="font-medium">{airline.delivery_estimate}</span>
          </div>
        </div>
        <a 
          href="#quote" 
          className="block text-center bg-navy hover:bg-navy-light text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 w-full"
        >
          Get Quote
        </a>
      </div>
    </div>
  );
};

const AirlineCards = () => {
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        const { data, error } = await supabase
          .from('airlines')
          .select('*')
          .order('name');
        
        if (error) throw error;
        setAirlines(data || []);
      } catch (error) {
        console.error('Error fetching airlines:', error);
        toast({
          title: "Error loading airlines",
          description: "Failed to load airline data. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAirlines();
  }, []);

  return (
    <section id="airlines" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy">
            Premium Airline <span className="text-gold">Miles</span>
          </h2>
          <p className="text-gray-600">
            Browse our collection of premium airline miles available at unbeatable rates. All miles are sourced ethically and delivered securely to your account.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-gray-200 h-8 w-8 rounded"></div>
                  <div className="bg-gray-200 h-6 w-20 rounded-full"></div>
                </div>
                <div className="bg-gray-200 h-6 w-3/4 rounded mb-4"></div>
                <div className="bg-gray-200 h-8 w-1/2 rounded mb-4"></div>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <div className="bg-gray-200 h-4 w-1/3 rounded"></div>
                    <div className="bg-gray-200 h-4 w-1/4 rounded"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="bg-gray-200 h-4 w-1/3 rounded"></div>
                    <div className="bg-gray-200 h-4 w-1/4 rounded"></div>
                  </div>
                </div>
                <div className="bg-gray-200 h-10 w-full rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {airlines.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No airlines available at the moment. Please check back later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {airlines.map((airline) => (
                  <AirlineCard key={airline.id} airline={airline} />
                ))}
              </div>
            )}
          </>
        )}
        
        <div className="mt-12 text-center">
          <a 
            href="#calculator" 
            className="inline-flex items-center text-navy hover:text-gold font-medium transition-colors duration-200"
          >
            Calculate your savings <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AirlineCards;
