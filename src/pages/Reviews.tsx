
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star } from "lucide-react";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

// Sample Trustpilot reviews data
const reviews = [
  {
    id: 1,
    name: "Ahmed S.",
    rating: 5,
    date: "June 5, 2024",
    content: "Cash My Points helped me book a first-class flight to London using miles I purchased through them. The process was seamless and I saved thousands of dirhams. Highly recommended!"
  },
  {
    id: 2,
    name: "Sarah M.",
    rating: 5,
    date: "May 28, 2024",
    content: "I was skeptical at first, but Cash My Points delivered exactly as promised. Their customer service was exceptional throughout the entire process. Will definitely use their service again."
  },
  {
    id: 3,
    name: "John D.",
    rating: 5,
    date: "May 15, 2024",
    content: "The team at Cash My Points made everything so easy. I got my miles within 48 hours and was able to book my dream vacation to the Maldives in business class for less than half the retail cost."
  },
  {
    id: 4,
    name: "Fatima H.",
    rating: 4,
    date: "May 10, 2024",
    content: "Very professional service. The miles were delivered as promised and the support team was always available to answer my questions. The only reason for 4 stars is that I wish the process was slightly faster."
  },
  {
    id: 5,
    name: "David P.",
    rating: 5,
    date: "April 30, 2024",
    content: "I've used Cash My Points three times now and each experience has been exceptional. They're my go-to for all my miles needs. The savings are incredible!"
  },
  {
    id: 6,
    name: "Lina K.",
    rating: 5,
    date: "April 22, 2024",
    content: "The most trustworthy miles broker in the UAE. I was able to treat my parents to a surprise business class trip thanks to Cash My Points. Their rates are the best in the market."
  }
];

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-navy">{review.name}</h3>
          <p className="text-sm text-gray-500">{review.date}</p>
        </div>
        <div className="flex">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-gold fill-gold" />
          ))}
          {[...Array(5 - review.rating)].map((_, i) => (
            <Star key={i + review.rating} className="h-5 w-5 text-gray-300" />
          ))}
        </div>
      </div>
      <p className="text-gray-600">{review.content}</p>
    </div>
  );
};

const Reviews = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <section className="mb-12 bg-navy text-white py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 font-gilda">
                Customer <span className="text-gold">Reviews</span>
              </h1>
              <p className="text-xl text-gray-300">
                See what our customers are saying about their experience with Cash My Points
              </p>
            </div>
          </div>
        </section>

        <section className="container-custom mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-10 border border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center mb-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Trustpilot_Logo_%282022%29.svg"
                    alt="Trustpilot"
                    className="h-8 mr-3"
                  />
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-[#00b67a] fill-[#00b67a]" />
                    ))}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-navy mb-2 font-gilda">Trusted by thousands of travelers</h2>
                <p className="text-gray-600">
                  We're proud to maintain an excellent rating on Trustpilot with over 500+ verified reviews.
                </p>
              </div>
              <a 
                href="https://www.trustpilot.com/review/cashmypoint.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00b67a] hover:bg-[#009c69] text-white py-2 px-6 rounded-md transition-colors duration-200 whitespace-nowrap"
              >
                View on Trustpilot
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <a 
              href="https://www.trustpilot.com/review/cashmypoint.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-navy hover:text-gold font-medium transition-colors duration-200"
            >
              See all reviews on Trustpilot
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-navy font-gilda">Why Our Customers Trust Us</h2>
              <p className="text-gray-600">
                At Cash My Points, we're committed to providing a reliable, transparent, and secure service
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gold-light text-gold mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-navy mb-2 font-gilda">100% Secure Transactions</h3>
                <p className="text-gray-600">
                  All your transactions and personal information are protected with enterprise-grade security protocols.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gold-light text-gold mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-navy mb-2 font-gilda">Fast Delivery</h3>
                <p className="text-gray-600">
                  We pride ourselves on quick delivery of miles, typically within 24-48 hours after payment confirmation.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gold-light text-gold mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-navy mb-2 font-gilda">Dedicated Support</h3>
                <p className="text-gray-600">
                  Our customer service team is always available to assist you with any questions or concerns.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Reviews;
