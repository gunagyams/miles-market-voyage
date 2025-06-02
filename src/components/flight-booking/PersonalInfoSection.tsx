
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PersonalInfoSectionProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  phoneValid: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPhoneChange: (value: string, country: any) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  firstName,
  lastName,
  email,
  phone,
  countryCode,
  phoneValid,
  onChange,
  onPhoneChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-gray-900">Personal Information</h3>
      
      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-gray-700 font-medium text-sm">First Name *</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
            onChange={onChange}
            required
            className="h-10 border-2 hover:border-blue-300 focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-gray-700 font-medium text-sm">Last Name *</Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            onChange={onChange}
            required
            className="h-10 border-2 hover:border-blue-300 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Contact Fields */}
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 font-medium text-sm">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            required
            className="h-10 border-2 hover:border-blue-300 focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium text-sm">Phone Number *</Label>
          <PhoneInput
            country={countryCode}
            value={phone}
            onChange={onPhoneChange}
            inputStyle={{
              width: '100%',
              height: '40px',
              fontSize: '14px',
              border: phoneValid ? '2px solid #e5e7eb' : '2px solid #ef4444',
              borderRadius: '6px',
              paddingLeft: '50px'
            }}
            containerStyle={{ width: '100%' }}
            buttonStyle={{
              border: 'none',
              backgroundColor: 'transparent',
              borderRadius: '6px 0 0 6px'
            }}
          />
          {!phoneValid && (
            <p className="text-xs text-red-500">Please enter a valid phone number</p>
          )}
        </div>
      </div>
    </div>
  );
};
