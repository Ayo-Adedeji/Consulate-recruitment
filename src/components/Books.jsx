import { useEffect, useState, useRef } from "react";
import { FaBook, FaAmazon, FaExternalLinkAlt } from "react-icons/fa";

export default function Books() {
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
      className="relative overflow-hidden py-16 bg-gradient-to-br from-azure/5 via-white to-blue-50"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-azure/30 to-blue-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-primaryLight/30 to-azure/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 bg-azure/10 text-azure px-4 py-2 rounded-full text-sm font-medium mb-4 transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <FaBook className="w-4 h-4" />
            Published Works
          </div>
          
          <h2
            className={`text-3xl md:text-4xl font-heading font-bold text-primary mb-4 transition-all duration-1000 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Consulate <span className="text-azure">Books</span>
          </h2>
          
          <p
            className={`text-lg text-primary/70 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Explore our collection of transformative books by Olafusi Omotiba, covering addiction recovery, 
            faith-based learning, and professional guidance for care workers.
          </p>
        </div>

        {/* Books Content */}
        <div
          className={`max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-azure/10 transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Content */}
            <div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">
                Stories of Hope and Healing
              </h3>
              <p className="text-primary/70 leading-relaxed mb-6">
                Our books offer honest, human stories that explore healing, recovery, identity, and transformation. 
                From powerful narratives about overcoming addiction to engaging faith-based puzzles and practical 
                guides for care professionals, each publication is written to comfort, challenge, and restore hope.
              </p>
              <p className="text-primary/70 leading-relaxed mb-8">
                Whether you're navigating personal struggles, seeking spiritual enrichment through interactive 
                learning, or looking to enhance your skills as a care worker, our collection provides meaningful 
                resources for your journey.
              </p>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/books"
                  className="inline-flex items-center justify-center gap-2 bg-azure hover:bg-azure/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <FaBook className="w-5 h-5" />
                  View Books
                </a>
                <a
                  href="https://www.amazon.co.uk/s?k=olafusi+omotiba&crid=3N77SLEI32PYC&sprefix=%2Caps%2C106&ref=nb_sb_ss_recent_1_0_recent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#FF9900] hover:bg-[#FF9900]/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <FaAmazon className="w-5 h-5" />
                  View on Amazon
                </a>
              </div>
            </div>

            {/* Right side - Visual Element */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-azure to-primaryLight rounded-xl p-8 shadow-lg">
                <div className="text-center text-white">
                  <FaBook className="w-20 h-20 mx-auto mb-4 opacity-90" />
                  <h4 className="text-xl font-bold mb-2">Consulate Books</h4>
                  <p className="text-white/90 text-sm">
                    By Olafusi Omotiba
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <p className="text-white/80 text-sm">
                      Available on Amazon and our dedicated books platform
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-azure/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primaryLight/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
