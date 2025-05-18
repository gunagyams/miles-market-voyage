
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PartyPopper, AlertCircle } from "lucide-react";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  isTestMode: boolean;
  testModeInfo: string;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({
  isOpen,
  onClose,
  isTestMode,
  testModeInfo
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <PartyPopper className="h-8 w-8 text-green-600" />
            </div>
            <span className="text-xl font-bold font-gilda">Order Requested Successfully!</span>
          </DialogTitle>
        </DialogHeader>
        <div className="text-center py-4">
          <p className="mb-6 text-gray-700">
            Thank you for your purchase request. A member of our team will contact you within the next 
            <span className="font-bold"> 2 hours </span> 
            to complete your order.
          </p>
          
          {isTestMode && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md text-left">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">Test Mode Active</p>
                  <p>{testModeInfo}</p>
                  <p className="mt-2">To send real emails, please verify your domain in your Resend account.</p>
                </div>
              </div>
            </div>
          )}
          
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
            className="mt-4 bg-gold hover:bg-gold-dark font-jakarta" 
            onClick={() => onClose(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
