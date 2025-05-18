
import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Check, X, Info } from 'lucide-react';
import { Airline } from '@/utils/quoteUtils';

interface FormFieldsProps {
  formData: {
    firstName: string;
    lastName: string;
    airline: string;
    ffNumber: string;
    miles: number;
    whatsapp: string;
    email: string;
    message: string;
    countryCode: string;
  };
  airlines: Airline[];
  isLoadingAirlines: boolean;
  phoneValid: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handlePhoneChange: (value: string, country: any) => void;
  estimatedTotal: string;
}

const FormFields: React.FC<FormFieldsProps> = ({
  formData,
  airlines,
  isLoadingAirlines,
  phoneValid,
  handleChange,
  handlePhoneChange,
  estimatedTotal
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1">First Name</Label>
          <Input
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
          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1">Last Name</Label>
          <Input
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
          <Label htmlFor="airline" className="text-sm font-medium text-gray-700 mb-1">Airline</Label>
          <select
            id="airline"
            name="airline"
            value={formData.airline}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:outline-none"
            disabled={isLoadingAirlines}
          >
            {isLoadingAirlines ? (
              <option>Loading airlines...</option>
            ) : (
              airlines.map((airline) => (
                <option key={airline.id} value={airline.name}>
                  {airline.name}
                </option>
              ))
            )}
          </select>
        </div>
        
        <div>
          <Label htmlFor="ffNumber" className="text-sm font-medium text-gray-700 mb-1">
            Frequent Flyer Number
          </Label>
          <Input
            type="text"
            id="ffNumber"
            name="ffNumber"
            value={formData.ffNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:outline-none"
            placeholder="Your frequent flyer number"
          />
          <div className="mt-2 p-2 bg-amber-50 border border-amber-100 rounded-md flex items-start space-x-2 text-xs">
            <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <span className="text-amber-700">
              Please ensure your frequent flyer number matches the name in your airline account records.
            </span>
          </div>
        </div>
        
        <div>
          <Label htmlFor="miles" className="text-sm font-medium text-gray-700 mb-1">
            Miles Amount <span className="text-xs text-gray-500">(Minimum 50,000)</span>
          </Label>
          <Input
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
          <Label htmlFor="whatsapp" className="text-sm font-medium text-gray-700 mb-1">WhatsApp Number</Label>
          <div className="relative">
            <PhoneInput
              country={formData.countryCode}
              value={formData.whatsapp}
              onChange={handlePhoneChange}
              inputProps={{
                name: 'whatsapp',
                required: true,
                className: cn(
                  "w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none pl-12",
                  phoneValid ? "border-gray-300 focus:ring-gold" : "border-red-500 focus:ring-red-500"
                )
              }}
              containerClass="w-full"
              dropdownClass="bg-white shadow-lg border border-gray-300 rounded-md"
            />
            {formData.whatsapp && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {phoneValid ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
            )}
          </div>
          {!phoneValid && (
            <p className="text-xs text-red-600 mt-1">Please enter a valid phone number.</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">Email Address</Label>
          <Input
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

        <div className="md:col-span-2">
          <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-1">Message (Optional)</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:outline-none"
            placeholder="Any additional information or questions..."
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
    </>
  );
};

export default FormFields;
