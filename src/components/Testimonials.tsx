
import React from 'react';

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Ahmed Al-Mansouri',
    location: 'Dubai, UAE',
    quote: 'Miles Market helped me and my family fly business class to London for what would have been the cost of economy tickets. Exceptional service!',
    stars: 5,
  },
  {
    id: 2,
    name: 'Sara Al-Qassim',
    location: 'Riyadh, KSA',
    quote: 'I was hesitant at first, but their customer service walked me through the entire process. Saved over 40% on our family vacation flights!',
    stars: 5,
  },
  {
    id: 3,
    name: 'Mohammed Hassan',
    location: 'Doha, Qatar',
    quote: 'Fast delivery of miles to my account and excellent rates. Will definitely use their services again for my business travels.',
    stars: 4,
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
    <div className="bg-white p-8 rounded-lg shadow-md card-shadow border border-gray-100 hover:border-gold/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl arabesque">
      <StarRating rating={testimonial.stars} />
      <p className="mt-6 text-gray-600 italic leading-relaxed font-light">"{testimonial.quote}"</p>
      <div className="mt-8 pt-6 border-t border-gray-100">
        <p className="font-semibold text-navy font-playfair">{testimonial.name}</p>
        <p className="text-sm text-gray-500">{testimonial.location}</p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full arabic-pattern opacity-5 z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-3">
            <div className="inline-block text-gold">✦</div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy">
            Trusted by <span className="text-gold">Travelers</span>
          </h2>
          <p className="text-gray-600">
            Don't just take our word for it. Here's what our customers have to say about their experiences with Miles Market.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-white py-4 px-8 rounded-full shadow-md premium-shadow">
            <span className="mr-2 text-gold">✦</span>
            <span className="text-navy font-medium">Trusted by 5,000+ GCC travelers</span>
            <span className="ml-2 text-gold">✦</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
