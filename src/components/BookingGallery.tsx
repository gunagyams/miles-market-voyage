
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
      src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=60",
      alt: "First Class Cabin Interior",
      caption: "Emirates First Class Suite"
    },
    {
      src: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=60",
      alt: "Business Class Seat",
      caption: "Qatar Airways Qsuite"
    },
    {
      src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=60",
      alt: "Aircraft Wing View",
      caption: "Premium Travel Experience"
    },
    {
      src: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&auto=format&fit=crop&q=60",
      alt: "Luxury Airport Lounge",
      caption: "Exclusive Airport Lounges"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 font-gilda">
            Experience Luxury Travel
          </h2>
          <p className="text-xl text-gray-600 font-jakarta max-w-3xl mx-auto">
            See what awaits you in business and first class cabins around the world
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {luxuryImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-0">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-64 object-cover"
                        />
                        <div className="p-4">
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
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default BookingGallery;
