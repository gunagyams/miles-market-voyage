
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Confetti } from "lucide-react";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

// Sample airline data for form dropdown
const airlines = [
  { id: 1, name: 'Emirates Skywards' },
  { id: 2, name: 'Etihad Guest' },
  { id: 3, name: 'Qatar Privilege' },
  { id: 4, name: 'Turkish Airlines' },
  { id: 5, name: 'British Airways' },
  { id: 6, name: 'Singapore Airlines' },
];

const QuoteForm = () => {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    airline: airlines[0].id,
    ffNumber: '',
    miles: 50000,
    whatsapp: '',
    email: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // For miles input, convert string to number
    if (name === 'miles') {
      setFormData({
        ...formData,
        [name]: parseInt(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Show success dialog
      setIsSuccess(true);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        airline: airlines[0].id,
        ffNumber: '',
        miles: 50000,
        whatsapp: '',
        email: '',
      });
    }, 1500);
  };
  
  // Calculate approximate price
  const selectedAirline = airlines.find(a => a.id === formData.airline);
  const airlinePricePerMile = 0.015; // This would come from your actual data
  const estimatedTotal = (formData.miles * airlinePricePerMile).toFixed(2);

  return (
    <section id="quote" className="section-padding bg-navy text-white arabic-pattern">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Place <span className="text-gold">Order</span>
            </h2>
            <p className="text-gray-300">
              Fill out the form below to purchase miles for your frequent flyer account.
              Our team will contact you through WhatsApp or email.
            </p>
          </div>
          
          <div className="bg-white text-navy rounded-xl overflow-hidden shadow-xl">
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:outline-none"
                    placeholder="Your first name"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:outline-none"
                    placeholder="Your last name"
                  />
                </div>
                
                <div>
                  <label htmlFor="airline" className="block text-sm font-medium text-gray-700 mb-1">Airline</label>
                  <select
                    id="airline"
                    name="airline"
                    value={formData.airline}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:outline-none"
                  >
                    {airlines.map((airline) => (
                      <option key={airline.id} value={airline.id}>
                        {airline.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="ffNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Frequent Flyer Number
                  </label>
                  <input
                    type="text"
                    id="ffNumber"
                    name="ffNumber"
                    value={formData.ffNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:outline-none"
                    placeholder="Your frequent flyer number"
                  />
                  <p className="text-xs text-amber-600 mt-1 italic">
                    Please ensure your frequent flyer number matches the name in your airline account records.
                  </p>
                </div>
                
                <div>
                  <label htmlFor="miles" className="block text-sm font-medium text-gray-700 mb-1">
                    Miles Amount <span className="text-xs text-gray-500">(Minimum 50,000)</span>
                  </label>
                  <input
                    type="number"
                    id="miles"
                    name="miles"
                    value={formData.miles}
                    onChange={handleChange}
                    required
                    min="50000"
                    step="1000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:outline-none"
                    placeholder="50000"
                  />
                </div>
                
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:outline-none"
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-navy font-medium">Estimated Total:</span>
                  <span className="text-gold text-xl font-bold">${estimatedTotal}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  This is an approximate total. Final pricing will be confirmed by our team.
                </p>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full py-3 px-6 rounded-md font-medium text-white transition-colors duration-200",
                    isSubmitting ? "bg-gray-400" : "bg-gold hover:bg-gold-dark"
                  )}
                >
                  {isSubmitting ? "Processing..." : "Request Miles Purchase"}
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                By submitting this form, you agree to our terms and privacy policy. 
                We'll never share your information with third parties.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <Confetti className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-xl font-bold">Order Requested Successfully!</span>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <p className="mb-4">
              Thank you for your purchase request. A member of our team will contact you within the next 
              <span className="font-bold"> 2 hours </span> 
              to complete your order.
            </p>
            <div className="confetti-animation">
              {Array.from({ length: 50 }).map((_, i) => (
                <div 
                  key={i} 
                  className="confetti-piece"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    backgroundColor: ['#E4AB2C', '#D71F27', '#018557'][Math.floor(Math.random() * 3)]
                  }}
                />
              ))}
            </div>
            <Button 
              className="mt-4 bg-gold hover:bg-gold-dark" 
              onClick={() => setIsSuccess(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default QuoteForm;
