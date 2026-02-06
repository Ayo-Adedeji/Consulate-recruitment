import { useEffect, useState, useRef } from "react";
import { MessageCircle } from "lucide-react";

const reviews = [
  {
    name: "Maria T.",
    company: "3P Residential Care",
    text: "Consulate Recruitment has been a game-changer! High-quality staff who are skilled and compassionate. Their emergency response is unmatched. We wouldn't trust anyone else! ⭐⭐⭐⭐⭐",
  },
  {
    name: "James R.",
    company: "Peace Care Homes",
    text: "Finding reliable carers was a challenge until we found Consulate Recruitment. They understand our needs perfectly and deliver candidates that fit our culture. Refreshing to work with! ⭐⭐⭐⭐⭐",
  },
  {
    name: "Emily L.",
    company: "Maxwell Residential Living",
    text: "They go above and beyond! Not just filling vacancies, but helping us build a team we're proud of. The follow-up support is exceptional. Noticed huge improvement since partnering! ⭐⭐⭐⭐⭐",
  }
];

export default function Reviews() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle through reviews
  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isVisible]);

  const review = reviews[currentReview];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 bg-gradient-to-br from-white via-blue-50/30 to-white"
    >
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div
            className={`inline-flex items-center gap-2 bg-azure/10 text-azure px-4 py-2 rounded-full text-sm font-medium mb-4 transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            Client Testimonials
          </div>
          
          <h2
            className={`text-3xl md:text-4xl font-heading font-bold text-primary mb-3 transition-all duration-700 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            What Our <span className="text-azure">Clients</span> Say
          </h2>
          
          <p
            className={`text-lg text-primary/70 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Real messages from care homes we've partnered with
          </p>
        </div>

        {/* iPhone 17 Mockup */}
        <div
          className={`max-w-sm mx-auto transition-all duration-700 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Phone Frame */}
          <div className="relative bg-gradient-to-b from-gray-900 to-black rounded-[2.5rem] p-2 shadow-2xl">
            {/* Dynamic Island */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black rounded-b-3xl z-10 flex items-center justify-center">
              <div className="w-16 h-4 bg-gray-900 rounded-full"></div>
            </div>
            
            {/* Phone Screen */}
            <div className="relative bg-white rounded-[2.2rem] overflow-hidden">
              {/* Status Bar */}
              <div className="bg-gradient-to-r from-azure to-primary px-5 pt-10 pb-3">
                <div className="flex items-center justify-between text-white text-xs mb-3">
                  <span className="font-semibold">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-3 border border-white rounded-sm"></div>
                    <div className="w-1 h-3 bg-white rounded-sm"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-sm">Consulate Recruitment</h3>
                    <p className="text-white/80 text-xs">Active now</p>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="p-4 min-h-[280px] bg-gradient-to-b from-gray-50 to-white">
                {/* Client Message */}
                <div key={currentReview} className="animate-slideInLeft mb-3">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-azure to-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-white font-bold text-xs">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2.5 shadow-sm border border-gray-100 max-w-[90%]">
                        <p className="text-xs text-gray-800 leading-relaxed">
                          {review.text}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 ml-1">
                        <p className="text-[10px] text-gray-500 font-medium">{review.name}</p>
                        <span className="text-[10px] text-gray-400">•</span>
                        <p className="text-[10px] text-gray-400">{review.company}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typing Indicator - Always Visible */}
                <div className="flex items-end gap-2 justify-end">
                  <div className="bg-azure/10 rounded-2xl rounded-tr-sm px-3 py-2">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-azure rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-azure rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-azure rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-azure to-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <MessageCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="px-4 py-3 bg-white border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-50 rounded-full px-3 py-2 border border-gray-200">
                    <p className="text-xs text-gray-400">Message...</p>
                  </div>
                  <button className="w-7 h-7 bg-gradient-to-r from-azure to-primary rounded-full flex items-center justify-center shadow-sm">
                    <MessageCircle className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentReview
                    ? "w-6 h-1.5 bg-azure"
                    : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`View review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.4s ease-out;
        }
      `}</style>
    </section>
  );
}