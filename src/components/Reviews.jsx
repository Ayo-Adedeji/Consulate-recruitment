import { useEffect, useState, useRef } from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "John Doe",
    role: "Product Manager",
    image: "https://i.pravatar.cc/150?img=12",
    text: "Working with this team was an absolute pleasure. They understood our vision and delivered beyond expectations."
  },
  {
    name: "Sarah James",
    role: "Startup Founder",
    image: "https://i.pravatar.cc/150?img=32",
    text: "Professional, fast, and very reliable. Communication was smooth throughout the entire project."
  },
  {
    name: "Michael Brown",
    role: "Creative Director",
    image: "https://i.pravatar.cc/150?img=45",
    text: "Their attention to detail and design sense is top-notch. I’d recommend them without hesitation."
  }
];

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const review = reviews[current];
  const cardAnimation = isVisible
    ? "opacity-100 translate-x-0"
    : current % 2 === 0
    ? "opacity-0 -translate-x-12"
    : "opacity-0 translate-x-12";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-slate-100"
    >
      {/* Background blobs */}
      <div className="absolute -top-40 -left-40 w-[28rem] h-[28rem] bg-indigo-300/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] bg-purple-300/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className={`
              text-3xl text-azure md:text-4xl font-bold mb-4
              transition-all duration-1000 delay-[200ms]
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
          >
            What they say about us...
          </h2>

          {/* Clickable dots */}
          <div
            className={`
              flex justify-center gap-2 transition-all duration-1000 delay-[400ms]
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-muted scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Review card */}
        <div
          className={`
            max-w-5xl mx-auto
            transition-all duration-1000 delay-[600ms]
            ${cardAnimation}
          `}
        >
          <div className="relative bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
              {/* Avatar */}
              <img
                src={review.image}
                alt={review.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-white/70"
              />

              {/* Content */}
              <div className="text-center md:text-left">
                {/* Stars */}
                <div className="flex justify-center md:justify-start mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p
                  className={`
                    text-base sm:text-lg md:text-xl italic text-gray-700 leading-relaxed
                    transition-all duration-1000 delay-[800ms]
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                  `}
                >
                  “{review.text}”
                </p>

                {/* Name */}
                <div
                  className={`
                    mt-6 transition-all duration-1000 delay-[1000ms]
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                  `}
                >
                  <p className="font-semibold text-azureSoft text-lg">
                    {review.name}
                  </p>
                  <p className="text-azureSoft text-sm">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
