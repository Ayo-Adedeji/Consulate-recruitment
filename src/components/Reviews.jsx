import { useEffect, useState, useRef } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const reviews = [
  {
    name: "John Doe",
    role: "Product Manager",
    company: "Tech Solutions Ltd",
    image: "https://i.pravatar.cc/150?img=12",
    text: "Working with this team was an absolute pleasure! 🎉 They understood our vision and delivered beyond expectations.",
    time: "2:34 PM",
    rating: 5
  },
  {
    name: "Sarah James",
    role: "Startup Founder", 
    company: "Innovation Hub",
    image: "https://i.pravatar.cc/150?img=32",
    text: "Professional, fast, and very reliable 👌 Communication was smooth throughout the entire project. Highly recommend!",
    time: "11:22 AM",
    rating: 5
  },
  {
    name: "Michael Brown",
    role: "Creative Director",
    company: "Design Studio",
    image: "https://i.pravatar.cc/150?img=45", 
    text: "Their attention to detail is top-notch! 💯 Found us the perfect candidates in record time. Will definitely work with them again.",
    time: "4:15 PM",
    rating: 5
  }
];

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const nextReview = () => {
    setCurrent((prev) => (prev + 1) % reviews.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const prevReview = () => {
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const review = reviews[current];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-12 md:py-16 bg-gradient-to-br from-gray-50 via-blue-50/30 to-azure/5"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-azure/10 to-blue-300/10 rounded-full blur-3xl transition-all duration-1000 ${
          isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}></div>
        <div className={`absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-azureSoft/10 to-primary/10 rounded-full blur-3xl transition-all duration-1000 delay-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center gap-2 bg-azure/10 text-azure px-3 py-1 rounded-full text-xs font-medium mb-3 transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <FaStar className="w-3 h-3" />
            Client Messages
          </div>
          
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 transition-all duration-1000 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            What <span className="text-azure">Clients</span> Are Saying
          </h2>
          
          <p
            className={`text-base text-gray-600 max-w-xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Real messages from real clients
          </p>
        </div>

        {/* Chat Interface */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevReview}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-azure hover:bg-azure hover:text-white transition-all duration-300 hover:scale-110 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={nextReview}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-azure hover:bg-azure hover:text-white transition-all duration-300 hover:scale-110 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <FaChevronRight className="w-4 h-4" />
          </button>

          {/* Phone Mockup */}
          <div
            className={`mx-auto max-w-sm bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl transition-all duration-1000 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {/* Phone Screen */}
            <div className="bg-white rounded-[2rem] overflow-hidden">
              {/* Status Bar */}
              <div className="bg-gray-100 px-6 py-3 flex justify-between items-center text-sm font-medium text-gray-800">
                <span>Messages</span>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs">100%</span>
                </div>
              </div>

              {/* Chat Header */}
              <div className="bg-azure px-6 py-4 flex items-center gap-3">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm">{review.name}</h3>
                  <p className="text-blue-100 text-xs">{review.role} • {review.company}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="w-3 h-3 text-yellow-300" />
                  ))}
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-4 min-h-[200px] bg-gray-50 flex flex-col justify-end">
                {/* Timestamp */}
                <div className="text-center mb-4">
                  <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
                    Today {review.time}
                  </span>
                </div>

                {/* Message Bubble */}
                <div className="flex justify-end mb-3">
                  <div className="max-w-[85%] bg-azure text-white rounded-2xl rounded-br-md px-3 py-2 shadow-lg">
                    <p className="text-xs leading-relaxed">{review.text}</p>
                    <div className="flex justify-end mt-1">
                      <span className="text-xs text-blue-100">✓✓</span>
                    </div>
                  </div>
                </div>

                {/* Typing Indicator */}
                <div className="flex items-center gap-2 text-gray-500">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <div className="bg-white rounded-2xl rounded-bl-md px-4 py-2 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-3">
                <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
                  <span className="text-gray-500 text-sm">Message...</span>
                </div>
                <div className="w-8 h-8 bg-azure rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-6 gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrent(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 8000);
              }}
              className={`transition-all duration-300 ${
                index === current
                  ? "w-8 h-3 bg-azure rounded-full"
                  : "w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400"
              } ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
              style={{ transitionDelay: `${500 + index * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}