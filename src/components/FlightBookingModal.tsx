import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AirportSelector } from "@/components/ui/airport-selector";
import { supabase } from '@/integrations/supabase/client';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Upload, CheckCircle, Plane, CalendarIcon, ArrowUpDown, X } from 'lucide-react';
import { fetchEmailSettings, sendBookingEmailNotifications, saveFlightBooking } from '@/utils/bookingEmailUtils';
import { format } from 'date-fns';
import { getAirportByIata } from '@/utils/airportsApi';
import { useIsMobile } from '@/hooks/use-mobile';

interface Airline {
  id: string;
  name: string;
}

interface FlightBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FlightBookingModal: React.FC<FlightBookingModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [isLoadingAirlines, setIsLoadingAirlines] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [phoneValid, setPhoneValid] = useState(true);
  const [departureDate, setDepartureDate] = useState<Date>();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    fromAirport: '',
    toAirport: '',
    airlineName: '',
    flightDetails: '',
    pointsRequired: '',
    countryCode: 'ae',
  });

  // Fetch airlines from Supabase
  useEffect(() => {
    if (isOpen) {
      const fetchAirlines = async () => {
        try {
          const { data, error } = await supabase
            .from('airlines')
            .select('id, name')
            .order('name');
          
          if (error) throw error;
          
          setAirlines(data || []);
          if (data && data.length > 0) {
            setFormData(prev => ({ ...prev, airlineName: data[0].name }));
          }
        } catch (error) {
          console.error('Error fetching airlines:', error);
          toast({
            title: "Error",
            description: "Failed to load airlines. Please refresh the page.",
            variant: "destructive",
          });
        } finally {
          setIsLoadingAirlines(false);
        }
      };

      fetchAirlines();
    }
  }, [isOpen, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, airlineName: value }));
  };

  const handleAirportChange = (field: 'fromAirport' | 'toAirport', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhoneChange = (value: string, country: any) => {
    setFormData(prev => ({ ...prev, phone: value, countryCode: country.countryCode }));
    setPhoneValid(value.length >= 8);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload only JPG or PNG images.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      setUploadedFile(file);
    }
  };

  const uploadScreenshot = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('flight-screenshots')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('flight-screenshots')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      fromAirport: '',
      toAirport: '',
      airlineName: airlines.length > 0 ? airlines[0].name : '',
      flightDetails: '',
      pointsRequired: '',
      countryCode: 'ae',
    });
    setUploadedFile(null);
    setPhoneValid(true);
    setDepartureDate(undefined);
    
    // Reset file input
    const fileInput = document.getElementById('modal-screenshot') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const swapAirports = () => {
    setFormData(prev => ({
      ...prev,
      fromAirport: prev.toAirport,
      toAirport: prev.fromAirport
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.phone || formData.phone.length < 8) {
      setPhoneValid(false);
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.pointsRequired || isNaN(Number(formData.pointsRequired))) {
      toast({
        title: "Invalid Points",
        description: "Please enter a valid number for points required.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.fromAirport || !formData.toAirport || !departureDate) {
      toast({
        title: "Incomplete Information",
        description: "Please select a departure airport, destination airport, and departure date.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      let screenshotUrl = null;
      
      // Upload screenshot if provided
      if (uploadedFile) {
        screenshotUrl = await uploadScreenshot(uploadedFile);
        if (!screenshotUrl) {
          throw new Error('Failed to upload screenshot');
        }
      }

      // Get airport details for saving
      const fromAirportData = getAirportByIata(formData.fromAirport);
      const toAirportData = getAirportByIata(formData.toAirport);

      // Save flight booking to database with enhanced flight route information
      const enhancedFlightDetails = `
Route: ${fromAirportData?.city} (${formData.fromAirport}) → ${toAirportData?.city} (${formData.toAirport})
Departure Date: ${format(departureDate, 'PPP')}
Airline: ${formData.airlineName}
Additional Details: ${formData.flightDetails}
      `.trim();

      const bookingData = await saveFlightBooking({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        airline: formData.airlineName,
        points: parseInt(formData.pointsRequired),
        flightDetails: enhancedFlightDetails,
        screenshotUrl: screenshotUrl
      });

      // Fetch email settings and send notifications
      const emailSettings = await fetchEmailSettings();
      
      if (emailSettings.notifications_enabled) {
        console.log('📧 Sending booking email notifications...');
        const emailResult = await sendBookingEmailNotifications(bookingData, emailSettings);
        
        if (emailResult.success) {
          console.log('✅ Booking emails sent successfully');
        } else {
          console.warn('⚠️ Email notification failed:', emailResult.error);
          // Don't fail the whole process if email fails
        }
      } else {
        console.log('📧 Email notifications are disabled');
      }

      toast({
        title: "Booking Request Submitted!",
        description: "We've received your flight booking request. Our team will contact you within 2 hours with next steps.",
      });

      resetForm();
      onClose();

    } catch (error) {
      console.error('Error submitting booking request:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your booking request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fromAirport = formData.fromAirport ? getAirportByIata(formData.fromAirport) : null;
  const toAirport = formData.toAirport ? getAirportByIata(formData.toAirport) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "w-full mx-auto p-0 overflow-hidden bg-white",
        isMobile 
          ? "max-w-sm h-[90vh] max-h-[600px] rounded-t-2xl sm:rounded-2xl" 
          : "max-w-2xl h-[85vh] max-h-[700px] rounded-2xl"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={cn(
            "flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-600 text-white",
            isMobile ? "p-4" : "p-6"
          )}>
            <div>
              <DialogTitle className={cn(
                "font-bold text-white",
                isMobile ? "text-lg" : "text-2xl"
              )}>
                Book Your Flight
              </DialogTitle>
              {!isMobile && (
                <p className="text-blue-100 text-sm mt-1">Find the perfect flight for your journey</p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-white/20 rounded-full text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit} className={cn("space-y-6", isMobile ? "p-4" : "p-6")}>
              {/* Flight Route Section */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 space-y-4">
                <div className="flex items-center gap-2 text-blue-700 mb-3">
                  <Plane className="w-4 h-4" />
                  <span className="font-semibold text-sm">Flight Route</span>
                </div>

                {/* From/To Airports - Side by side on desktop */}
                <div className={cn(
                  "gap-3",
                  isMobile ? "space-y-3" : "grid grid-cols-2"
                )}>
                  {/* From Airport */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>FROM</span>
                    </div>
                    <AirportSelector
                      value={formData.fromAirport}
                      onValueChange={(value) => handleAirportChange('fromAirport', value)}
                      placeholder="Departure"
                      className="bg-white border-gray-200 h-12"
                    />
                  </div>

                  {/* Swap Button - Center for desktop, separate row for mobile */}
                  {isMobile && (
                    <div className="flex justify-center py-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={swapAirports}
                        className="h-8 w-8 rounded-full border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                      >
                        <ArrowUpDown className="h-3 w-3 text-blue-600" />
                      </Button>
                    </div>
                  )}

                  {/* To Airport */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>TO</span>
                    </div>
                    <AirportSelector
                      value={formData.toAirport}
                      onValueChange={(value) => handleAirportChange('toAirport', value)}
                      placeholder="Destination"
                      className="bg-white border-gray-200 h-12"
                    />
                  </div>
                </div>

                {/* Desktop Swap Button */}
                {!isMobile && (
                  <div className="flex justify-center -mt-2 -mb-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={swapAirports}
                      className="h-8 w-8 rounded-full border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                    >
                      <ArrowUpDown className="h-3 w-3 text-blue-600" />
                    </Button>
                  </div>
                )}

                {/* Departure Date */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
                    <CalendarIcon className="w-3 h-3" />
                    <span>DEPARTURE DATE</span>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start h-12 bg-white border-2 hover:border-blue-300 text-left",
                          !departureDate && "text-gray-500"
                        )}
                      >
                        <CalendarIcon className="mr-3 h-4 w-4 text-gray-400" />
                        {departureDate ? (
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">
                              {format(departureDate, "MMM d, yyyy")}
                            </div>
                            <div className="text-xs text-gray-500">
                              {format(departureDate, "EEEE")}
                            </div>
                          </div>
                        ) : (
                          <span>Select departure date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={departureDate}
                        onSelect={setDepartureDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Flight Preferences */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-gray-900">Flight Preferences</h3>
                
                {/* Airline and Points - Side by side on desktop */}
                <div className={cn(
                  "gap-3",
                  isMobile ? "space-y-3" : "grid grid-cols-2"
                )}>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium text-sm">Preferred Airline *</Label>
                    <Select value={formData.airlineName} onValueChange={handleSelectChange} disabled={isLoadingAirlines}>
                      <SelectTrigger className="h-10 border-2 hover:border-blue-300">
                        <SelectValue placeholder={isLoadingAirlines ? "Loading..." : "Select airline"} />
                      </SelectTrigger>
                      <SelectContent>
                        {airlines.map((airline) => (
                          <SelectItem key={airline.id} value={airline.name}>
                            {airline.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pointsRequired" className="text-gray-700 font-medium text-sm">Points Required *</Label>
                    <Input
                      id="pointsRequired"
                      name="pointsRequired"
                      type="number"
                      value={formData.pointsRequired}
                      onChange={handleChange}
                      placeholder="e.g., 75000"
                      required
                      min="1"
                      className="h-10 border-2 hover:border-blue-300 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Flight Details */}
                <div className="space-y-2">
                  <Label htmlFor="flightDetails" className="text-gray-700 font-medium text-sm">
                    Additional Flight Information *
                  </Label>
                  <Textarea
                    id="flightDetails"
                    name="flightDetails"
                    value={formData.flightDetails}
                    onChange={handleChange}
                    placeholder="Class of service, number of passengers, preferences..."
                    required
                    rows={3}
                    className="border-2 hover:border-blue-300 focus:border-blue-500 resize-none"
                  />
                </div>

                {/* Screenshot Upload */}
                <div className="space-y-2">
                  <Label htmlFor="modal-screenshot" className="text-gray-700 font-medium text-sm">
                    Flight Screenshot (Optional)
                  </Label>
                  <div>
                    <Input
                      id="modal-screenshot"
                      type="file"
                      onChange={handleFileChange}
                      accept=".jpg,.jpeg,.png"
                      className="hidden"
                    />
                    <label
                      htmlFor="modal-screenshot"
                      className="flex items-center justify-center w-full h-16 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50"
                    >
                      {uploadedFile ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">{uploadedFile.name}</span>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-600">Upload screenshot</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
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
                      value={formData.firstName}
                      onChange={handleChange}
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
                      value={formData.lastName}
                      onChange={handleChange}
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
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-10 border-2 hover:border-blue-300 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium text-sm">Phone Number *</Label>
                    <PhoneInput
                      country={formData.countryCode}
                      value={formData.phone}
                      onChange={handlePhoneChange}
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
            </form>
          </div>

          {/* Footer */}
          <div className={cn("border-t border-gray-100 bg-gray-50", isMobile ? "p-4" : "p-6")}>
            <Button
              type="submit"
              disabled={isSubmitting || !phoneValid || isLoadingAirlines || !formData.fromAirport || !formData.toAirport || !departureDate}
              onClick={(e) => {
                e.preventDefault();
                const form = e.currentTarget.closest('div')?.parentElement?.querySelector('form') as HTMLFormElement;
                form?.requestSubmit();
              }}
              className={cn(
                "w-full font-semibold transition-all duration-200 rounded-lg",
                isMobile ? "h-12 text-base" : "h-14 text-lg",
                (isSubmitting || !phoneValid || isLoadingAirlines || !formData.fromAirport || !formData.toAirport || !departureDate) 
                  ? "bg-gray-300 text-gray-500" 
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
              )}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </div>
              ) : (
                "Submit Booking Request"
              )}
            </Button>
            <p className="text-xs text-gray-500 text-center mt-2">
              We'll contact you within 2 hours with your quote.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlightBookingModal;
