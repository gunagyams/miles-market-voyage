
import React from "react";
import { CheckCircle, TrendingDown, MapPin } from "lucide-react";

const SuccessStories = () => {
  const stories = [
    {
      route: "Dubai → Los Angeles",
      airline: "Emirates First Class",
      traditionalPrice: "$12,500",
      ourPrice: "$3,200",
      savings: "74%",
      points: "170,000 Emirates Skywards",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&auto=format&fit=crop&q=60"
    },
    {
      route: "London → New York",
      airline: "British Airways Club World",
      traditionalPrice: "$8,900",
      ourPrice: "$2,100",
      savings: "76%",
      points: "85,000 Avios",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 font-gilda">
            Real Savings, Real Stories
          </h2>
          <p className="text-xl text-gray-600 font-jakarta max-w-3xl mx-auto">
            See how our clients saved thousands on luxury flights by booking with points
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {stories.map((story, index) => (
            <div key={index} className="bg-gradient-to-br from-navy to-navy-dark rounded-2xl overflow-hidden text-white shadow-xl">
              <div className="relative h-48">
                <img
                  src={story.image}
                  alt={`${story.route} flight`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 bg-gold px-3 py-1 rounded-full">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-semibold">{story.route}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 font-gilda">{story.airline}</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                    <span className="text-gray-300">Traditional Booking</span>
                    <span className="text-xl font-bold text-red-400">{story.traditionalPrice}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gold/20 rounded-lg border border-gold/30">
                    <span className="text-gold font-semibold">Our Price</span>
                    <span className="text-xl font-bold text-gold">{story.ourPrice}</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 p-3 bg-green-600/20 rounded-lg">
                    <TrendingDown className="w-5 h-5 text-green-400" />
                    <span className="text-lg font-bold text-green-400">
                      You Save {story.savings}!
                    </span>
                  </div>
                  
                  <div className="text-center pt-2">
                    <p className="text-gray-300 text-sm">Booked using</p>
                    <p className="text-gold font-semibold">{story.points}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">Successfully booked and traveled</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-navy mb-4 font-gilda">
              Ready for Your Luxury Journey?
            </h3>
            <p className="text-gray-600 mb-6 font-jakarta">
              Found a reward flight you want? Share the details with us and we'll give you an instant quote
            </p>
            <button className="bg-gold hover:bg-gold-dark text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 font-jakarta">
              Get Your Quote Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
