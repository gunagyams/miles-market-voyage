import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const BookingGallery = () => {
  const luxuryImages = [
    {
      src: "https://images.unsplash.com/photo-1605789347875-f1ffb487365d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "First Class Cabin Interior",
      caption: "Fly to Premium Places",
    },
    {
      src: "https://images.unsplash.com/photo-1718095207983-538b5f9195f4?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Business Class Seat",
      caption: "Fly Premium Pirlines",
    },
    {
      src: "https://images.unsplash.com/photo-1554311653-61c679f7e1fc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Aircraft Wing View",
      caption: "Premium Travel Experience",
    },
    {
      src: "https://images.unsplash.com/photo-1736040891921-849833b78339?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Luxury Airport Lounge",
      caption: "Exclusive Airport Lounges",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4 md:mb-6 font-gilda">
            Experience Luxury Travel
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-jakarta max-w-3xl mx-auto">
            See what awaits you in business and first class cabins around the
            world
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {luxuryImages.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="sm:basis-1/2 md:basis-1/2 lg:basis-1/3 pl-4 md:pl-6"
                >
                  <div className="p-1">
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-0">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-48 md:h-64 object-cover"
                        />
                        <div className="p-3 md:p-4">
                          <p className="text-center font-semibold text-navy font-gilda">
                            {image.caption}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious className="left-1" />
              <CarouselNext className="right-1" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default BookingGallery;
