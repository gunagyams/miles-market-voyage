
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

// Enhanced testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Ahmed Al-Mansouri',
    location: 'Dubai, UAE',
    milesBought: '120,000 Emirates Skywards',
    ticketRedeemed: 'Business Class to London – Saved $3,200',
    quote: 'Cash My Points helped me and my family fly business class to London for what would have been the cost of economy tickets.',
    stars: 5,
  },
  {
    id: 2,
    name: 'Sara Al-Qassim',
    location: 'Riyadh, KSA',
    milesBought: '85,000 Qatar Privilege Club',
    ticketRedeemed: 'QSuites to Paris – Saved $2,400',
    quote: 'I was hesitant at first, but their customer service walked me through the entire process. Saved over 40% on our family vacation flights!',
    stars: 5,
  },
  {
    id: 3,
    name: 'Mohammed Hassan',
    location: 'Doha, Qatar',
    milesBought: '60,000 Etihad Guest',
    ticketRedeemed: 'First Class to New York – Saved $4,100',
    quote: 'Fast delivery of miles to my account and excellent rates. Will definitely use their services again for my business travels.',
    stars: 4,
  },
  {
    id: 4,
    name: 'Layla Mahmoud',
    location: 'Abu Dhabi, UAE',
    milesBought: '100,000 British Airways Avios',
    ticketRedeemed: 'Club World to Sydney – Saved $3,800',
    quote: 'The miles were delivered within hours and their team helped me find award availability. Amazing service!',
    stars: 5,
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-gold' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <Card className="bg-white border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
      <CardContent className="p-6">
        <div className="mb-4 border-b border-gray-100 pb-4">
          <p className="font-medium text-navy text-sm font-jakarta mb-1">Miles Purchased</p>
          <p className="text-lg font-semibold text-gold font-gilda">{testimonial.milesBought}</p>
        </div>
        <div className="mb-4 border-b border-gray-100 pb-4">
          <p className="font-medium text-navy text-sm font-jakarta mb-1">Ticket Redeemed</p>
          <p className="text-lg font-semibold text-navy font-gilda">{testimonial.ticketRedeemed}</p>
        </div>
        <StarRating rating={testimonial.stars} />
        <p className="mt-4 text-gray-600 italic font-jakarta">"{testimonial.quote}"</p>
        <div className="mt-6">
          <p className="font-semibold text-navy font-gilda">{testimonial.name}</p>
          <p className="text-sm text-gray-500 font-jakarta">{testimonial.location}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy font-gilda">
            What Real <span className="text-gold">Travelers</span> Are Saying
          </h2>
          <p className="text-gray-600 font-jakarta">
            Don't just take our word for it. Here's what our customers have to say about their experiences with Cash My Points.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2 p-2">
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
        
        <div className="mt-12 text-center">
          <div className="trust-badge inline-flex gap-3 items-center py-4 px-8 max-w-xl mx-auto">
            <div className="trust-icon">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <span className="text-navy font-medium font-jakarta">Trusted by 5,000+ GCC travelers worldwide</span>
              <div className="flex items-center mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">4.9/5 average rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
