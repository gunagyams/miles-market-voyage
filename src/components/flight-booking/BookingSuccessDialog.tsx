
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plane, CheckCircle } from "lucide-react";

interface BookingSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingSuccessDialog: React.FC<BookingSuccessDialogProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 relative">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <Plane className="h-4 w-4 text-green-600 absolute top-2 right-2" />
            </div>
            <span className="text-xl font-bold text-gray-900">Flight Booking Request Submitted!</span>
          </DialogTitle>
        </DialogHeader>
        <div className="text-center py-4">
          <p className="mb-6 text-gray-700 leading-relaxed">
            Thank you for your flight booking request! We've received all your details and our team will contact you within the next 
            <span className="font-bold text-blue-600"> 2 hours </span> 
            to provide you with the best flight options and complete your booking.
          </p>
          
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">What happens next?</p>
            <ul className="text-sm text-blue-700 mt-2 text-left space-y-1">
              <li>• Our travel experts will review your request</li>
              <li>• We'll find the best flight options for your route</li>
              <li>• You'll receive a call/email with your personalized quote</li>
            </ul>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-200" 
            onClick={onClose}
          >
            Okay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingSuccessDialog;
