
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import PaymentOptions from "./PaymentOptions";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Airline {
  id: string;
  name: string;
  price_per_mile: number;
  min_miles: number;
}

const MilesCalculator = () => {
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [selectedAirline, setSelectedAirline] = useState<Airline | null>(null);
  const [milesAmount, setMilesAmount] = useState(25000);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch airlines from Supabase
  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        const { data, error } = await supabase
          .from('airlines')
          .select('id, name, price_per_mile, min_miles')
          .order('name');
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setAirlines(data);
          setSelectedAirline(data[0]);
          setMilesAmount(data[0].min_miles);
        }
      } catch (error) {
        console.error('Error fetching airlines:', error);
        toast({
          title: "Error loading calculator",
          description: "Failed to load airline data for the calculator.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAirlines();
  }, []);

  // Calculate total price when airline or miles amount changes
  useEffect(() => {
    if (selectedAirline) {
      setTotalPrice(milesAmount * selectedAirline.price_per_mile);
    }
  }, [selectedAirline, milesAmount]);

  const handleAirlineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = airlines.find(
      (airline) => airline.id === event.target.value
    );
    if (selected) {
      setSelectedAirline(selected);

      // Ensure miles are at least the minimum for the selected airline
      if (milesAmount < selected.min_miles) {
        setMilesAmount(selected.min_miles);
      }
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setMilesAmount(value);
  };

  // Format with thousands separators
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (isLoading) {
    return (
      <section id="calculator" className="relative overflow-hidden pt-12 pb-2">
        <div className="absolute inset-0 arabic-pattern opacity-10 z-0"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden card-shadow animate-pulse">
            <div className="grid md:grid-cols-2">
              <div className="bg-navy p-8 h-96"></div>
              <div className="p-8 h-96"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!selectedAirline || airlines.length === 0) {
    return (
      <section id="calculator" className="relative overflow-hidden pt-12 pb-2">
        <div className="absolute inset-0 arabic-pattern opacity-10 z-0"></div>
        <div className="container-custom relative z-10 py-12">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3 text-navy">Miles Calculator</h2>
            <p className="text-gray-600">
              No airline data available. Please check back later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="calculator" className="relative overflow-hidden pt-12 pb-2">
      <div className="absolute inset-0 arabic-pattern opacity-10 z-0"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden card-shadow">
          <div className="grid md:grid-cols-2">
            <div className="bg-navy p-8 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Miles Calculator
              </h2>
              <p className="text-gray-300 mb-6">
                Select your airline, adjust the miles amount, and see your
                savings instantly.
              </p>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="airline"
                    className="block text-sm font-medium text-gray-200 mb-2"
                  >
                    Select Airline
                  </label>
                  <select
                    id="airline"
                    value={selectedAirline.id}
                    onChange={handleAirlineChange}
                    className="w-full bg-navy-light border border-gray-600 rounded-md px-4 py-2 text-white"
                  >
                    {airlines.map((airline) => (
                      <option key={airline.id} value={airline.id}>
                        {airline.name} (${airline.price_per_mile.toFixed(3)}/mile)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label
                      htmlFor="miles"
                      className="block text-sm font-medium text-gray-200"
                    >
                      Miles Amount
                    </label>
                    <span className="text-gold font-medium">
                      {formatNumber(milesAmount)} miles
                    </span>
                  </div>

                  <input
                    type="range"
                    id="miles"
                    min={selectedAirline.min_miles}
                    max="250000"
                    step="1000"
                    value={milesAmount}
                    onChange={handleSliderChange}
                    className={cn(
                      "w-full h-2 bg-navy-light rounded-lg appearance-none cursor-pointer",
                      "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4",
                      "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold"
                    )}
                  />

                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{formatNumber(selectedAirline.min_miles)}</span>
                    <span>250,000</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="h-full flex flex-col">
                <h3 className="text-xl font-semibold text-navy mb-2">
                  Your Purchase Summary
                </h3>
                <p className="text-gray-500 text-sm mb-8">
                  Review your miles purchase before submitting a quote request.
                </p>

                <div className="flex-grow space-y-4 mb-6">
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Airline</span>
                    <span className="font-medium text-navy">
                      {selectedAirline.name}
                    </span>
                  </div>

                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Miles</span>
                    <span className="font-medium text-navy">
                      {formatNumber(milesAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Rate</span>
                    <span className="font-medium text-navy">
                      ${selectedAirline.price_per_mile.toFixed(3)}/mile
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-navy">Total Cost</span>
                    <span className="text-2xl font-bold text-gold">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <a
                  href="#quote"
                  className="block text-center bg-gold hover:bg-gold-dark text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
                >
                  Get a Quote
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Add payment options component inside the calculator section */}
        <div className="mt-6">
          <PaymentOptions />
        </div>
      </div>
    </section>
  );
};

export default MilesCalculator;
