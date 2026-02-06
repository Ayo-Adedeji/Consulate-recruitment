import { useEffect, useState, useRef } from "react";
import { FaBook, FaAmazon } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import authorImage from "../assets/author.jpeg";
import findingTruePathway from "../assets/finding-true-pathway.jpeg";
import bibleNames from "../assets/bible-names.jpeg";
import love from "../assets/love.jpeg";
import careGuide from "../assets/care-guide.jpeg";

const books = [
  {
    id: 1,
    title: "FINDING TRUE PATHWAY",
    subtitle: "A Journey Through Addiction, Breakdown, and the Fight for Recovery",
    description: "A powerful memoir exploring the journey through addiction, mental health challenges, and the path to recovery and healing.",
    image: findingTruePathway,
    bookUrl: "https://consulatebooks.onrender.com/book/finding-true-pathway"
  },
  {
    id: 2,
    title: "BIBLE NAMES WORD SEARCH",
    subtitle: "Biblical Names & Characters Puzzle Book",
    description: "66 engaging word search puzzles featuring biblical names, characters, and Christian names. Perfect for Sunday school, faith-based learning, and spiritual enrichment. 6x9 format.",
    image: bibleNames,
    bookUrl: "https://consulatebooks.onrender.com/book/bible-names"
  },
  {
    id: 3,
    title: "LOVE WITHOUT BORDERS",
    subtitle: "Valentine Word Search Inspired By Cultures Around the World",
    description: "A thoughtful puzzle book celebrating love across cultures. Perfect for adults, teens, educators, and gift buyers. 6x9 format with relaxing and engaging word searches.",
    image: love,
    bookUrl: "https://consulatebooks.onrender.com/book/love-without-borders"
  },
  {
    id: 4,
    title: "The Practical Guide for Care and Support Workers",
    subtitle: "Enhancing Skills, Avoiding Mistakes, Delivering Outstanding Care",
    description: "Essential guidance for care and support workers in health and social care. Learn to enhance your skills, avoid common mistakes, and deliver exceptional care to those who need it most.",
    image: careGuide,
    bookUrl: "https://consulatebooks.onrender.com/book/practical-guide"
  },
];

export default function BooksPage() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const booksRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [booksVisible, setBooksVisible] = useState(false);

  useEffect(() => {
    const observerOptions = { threshold: 0.2 };
    
    const heroObserver = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      observerOptions
    );
    const aboutObserver = new IntersectionObserver(
      ([entry]) => setAboutVisible(entry.isIntersecting),
      observerOptions
    );
    const booksObserver = new IntersectionObserver(
      ([entry]) => setBooksVisible(entry.isIntersecting),
      observerOptions
    );

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (aboutRef.current) aboutObserver.observe(aboutRef.current);
    if (booksRef.current) booksObserver.observe(booksRef.current);

    return () => {
      heroObserver.disconnect();
      aboutObserver.disconnect();
      booksObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-br from-azure via-primaryLight to-azure pt-32 pb-20"
      >
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-white/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div
            className={`inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-1000 ${
              heroVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <FaBook className="w-4 h-4" />
            Published Works
          </div>

          <h1
            className={`text-4xl md:text-5xl font-heading font-bold text-white mb-6 transition-all duration-1000 delay-100 ${
              heroVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Consulate Books
          </h1>

          <p
            className={`text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              heroVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Consulate Books is dedicated to telling honest, human stories that explore healing, recovery, 
            identity, and transformation. These books are written to comfort, challenge, and restore hope 
            to readers navigating real-life struggles.
          </p>
        </div>
      </section>

      {/* About Author Section */}
      <section
        ref={aboutRef}
        className="relative overflow-hidden py-16 bg-gradient-to-br from-bg via-white to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Author Image */}
            <div
              className={`transition-all duration-1000 ${
                aboutVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={authorImage}
                  alt="Olafusi Omotiba"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-azure/90 to-transparent p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">Olafusi Omotiba</h3>
                  <p className="text-white/90 text-sm">Public Health Pharmacist (NIG)</p>
                  <p className="text-white/90 text-sm">Business Manager & Author</p>
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <div
              className={`transition-all duration-1000 delay-200 ${
                aboutVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                About the <span className="text-azure">Author</span>
              </h2>
              <p className="text-primary/80 leading-relaxed mb-4">
                Olafusi Omotiba is a public health pharmacist and mental health advocate dedicated to 
                supporting individuals facing addiction and emotional challenges.
              </p>
              <p className="text-primary/80 leading-relaxed mb-4">
                With experience in pharmaceutical care, project management, business analysis, drug abuse 
                prevention, community outreach, and counselling, he is a seasoned independent author with 
                over 20 years of experience.
              </p>
              <p className="text-primary/80 leading-relaxed">
                His work focuses on bringing hope, healing, and practical guidance to those navigating 
                life's most challenging moments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section
        ref={booksRef}
        className="relative overflow-hidden py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl font-heading font-bold text-primary mb-4 transition-all duration-1000 ${
                booksVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              Our <span className="text-azure">Collection</span>
            </h2>
            <p
              className={`text-lg text-primary/70 max-w-3xl mx-auto transition-all duration-1000 delay-100 ${
                booksVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              Explore transformative books covering addiction recovery, faith-based learning, 
              and professional development in healthcare.
            </p>
          </div>

          {/* Books Grid - 2 columns on desktop for better book display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {books.map((book, index) => (
              <div
                key={book.id}
                className={`group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-azure/30 transition-all duration-500 ${
                  booksVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="md:flex md:h-full">
                  {/* Book Image - Left side on desktop */}
                  <div className="relative md:w-2/5 h-64 md:h-auto bg-gradient-to-br from-azure/5 to-primaryLight/5 flex items-center justify-center overflow-hidden">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Book Details - Right side on desktop */}
                  <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-primary mb-2 group-hover:text-azure transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm text-azure font-medium mb-3">
                        {book.subtitle}
                      </p>
                      <p className="text-sm text-primary/70 leading-relaxed mb-6">
                        {book.description}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3">
                      <a
                        href={book.bookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-azure hover:bg-azure/90 text-white px-5 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        <FaBook className="w-4 h-4" />
                        View Book Details
                      </a>
                      <a
                        href="https://www.amazon.co.uk/s?k=olafusi+omotiba&crid=3N77SLEI32PYC&sprefix=%2Caps%2C106&ref=nb_sb_ss_recent_1_0_recent"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#FF9900] hover:bg-[#FF9900]/90 text-white px-5 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        <FaAmazon className="w-5 h-5" />
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
