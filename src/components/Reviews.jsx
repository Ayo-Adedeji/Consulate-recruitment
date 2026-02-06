import { useEffect, useState, useRef } from "react";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Maria T.",
    role: "Manager",
    company: "3P Residential Care",
    text: "Consulate Recruitment Agency has been a game-changer for us. They consistently provide high-quality staff who are not only skilled but also truly compassionate and dedicated to their roles. Their responsiveness during emergencies is unmatched—they always deliver, no matter how last-minute the request. We wouldn't trust anyone else with our staffing needs.",
    rating: 5
  },
  {
    name: "James R.",
    role: "Operations Director",
    company: "Peace Care Homes",
    text: "Finding reliable and skilled carers used to be a challenge, but Consulate Recruitment made it effortless. Their team took the time to understand our needs and always delivers candidates who fit perfectly with our culture. It's refreshing to work with an agency that values both their clients and the well-being of the residents we care for.",
    rating: 5
  },
  {
    name: "Emily L.",
    role: "Owner",
    company: "Maxwell Residential Living",
    text: "Consulate Recruitment goes above and beyond. They're not just filling vacancies; they're helping us build a team we can be proud of. Their follow-up support and attention to detail show how much they genuinely care about their clients. We've noticed a significant improvement in our staffing since partnering with them. Exceptional service all around!",
    rating: 5
  }
];

export default function Reviews() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-8 bg-gradient-to-br from-bg via-white to-blue-50"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-azure/20 to-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-azureSoft/20 to-primary/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center gap-2 bg-azure/10 text-azure px-3 py-1.5 rounded-full text-sm font-medium mb-3 transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <FaStar className="w-3.5 h-3.5" />
            Client Testimonials
          </div>
          
          <h2
            className={`text-2xl md:text-3xl font-heading font-bold text-primary mb-3 transition-all duration-1000 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            What Our <span className="text-azure">Clients</span> Say
          </h2>
          
          <p
            className={`text-base text-primary/70 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Real feedback from care homes and organizations we've helped build exceptional teams.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 border border-azure/10 hover:border-azure/30 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm text-primary/80 leading-relaxed mb-4 italic">
                "{review.text}"
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center gap-2.5 pt-3 border-t border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-azure to-primaryLight rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-base">{review.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-primary">{review.name}</p>
                  <p className="text-xs text-primary/60">{review.role}</p>
                  <p className="text-xs text-primary/60">{review.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}