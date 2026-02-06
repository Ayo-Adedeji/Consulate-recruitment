import { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  Heart, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Star,
  Award,
  Target,
  Handshake,
  Eye,
  Compass,
  Zap,
  UserCheck,
  Sparkles,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Phone
} from 'lucide-react';
import { FaUsers, FaUserTie, FaBroom } from "react-icons/fa";
import Navbar from './Navbar';
import Footer from './Footer';
import Process from './Process';
import IcoImage from './IcoImage';
import cleaning from '../assets/cleaning.jpg';
import permanent from '../assets/permanent.jpg'; 
import temporary from '../assets/temporary.jpg';
import consulting from '../assets/consulting.jpg';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleElements, setVisibleElements] = useState(new Set());
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Advanced Intersection Observer for sequential animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const elementId = entry.target.getAttribute('data-animate-id');
        
        if (entry.isIntersecting) {
          setVisibleElements(prev => new Set([...prev, elementId]));
          entry.target.classList.add('animate-in');
          entry.target.classList.remove('animate-out');
        } else {
          setVisibleElements(prev => {
            const newSet = new Set(prev);
            newSet.delete(elementId);
            return newSet;
          });
          entry.target.classList.add('animate-out');
          entry.target.classList.remove('animate-in');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-animate-id]');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const coreValues = [
    {
      icon: Zap,
      title: 'Determination',
      description: 'We are relentless in our pursuit of excellence, overcoming challenges with resilience and innovation to achieve the best outcomes for our clients and candidates.',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      gradient: 'from-red-500 to-red-600'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Honesty and transparency are at the heart of everything we do. We believe in building trust through ethical practices and genuine care for the people we serve.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Heart,
      title: 'Dedication',
      description: 'Our unwavering commitment to providing outstanding service ensures that we go above and beyond to meet the needs of our clients and candidates.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Handshake,
      title: 'Teamwork',
      description: 'Collaboration is key to our success. By working closely with our clients, candidates, and internal team, we create solutions that foster growth and success for everyone involved.',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: UserCheck,
      title: 'Trust',
      description: 'We strive to build lasting relationships by consistently delivering on our promises and earning the confidence of our clients and candidates through reliability and excellence.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  const services = [
    {
      title: "Permanent Recruitment",
      description: "When it comes to permanent recruitment, we connect you with a diverse pool of talented professionals who are ready to contribute to your team for the long term. Whether you're expanding your workforce, filling critical roles, or looking for fresh expertise, our candidates are carefully vetted to meet your requirements and align with your organisational goals. We manage the entire recruitment process, allowing you to focus on building a strong and committed team.",
      image: permanent,
      icon: <FaUserTie className="w-8 h-8 text-azureSoft" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: "Temporary Recruitment",
      description: "When you need to fill workforce gaps, whether planned or on short notice, we have access to a wide pool of skilled professionals ready to step in when required. Be it covering holidays, managing staff absences, strengthening your team during busy periods or your cleaning support services, our candidates bring the qualifications and experience needed to make an immediate impact. We handle the recruitment process, so you can stay focused on what matters most to your business.",
      image: temporary,
      icon: <FaUsers className="w-8 h-8 text-azureSoft" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: "Cleaning Services",
      description: "We understand the importance of keeping your environment clean, safe, and consistently maintained. That's why we focus on delivering reliable and timely cleaning support. Whether you need immediate cover for unexpected gaps or ongoing cleaning solutions, we provide the right team at the right time without compromising on quality or standards.",
      image: cleaning,
      icon: <FaBroom className="w-8 h-8 text-azureSoft" />,
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      title: "Management Services",
      description: "We go beyond providing services; we build lasting partnerships. Our team delivers ongoing support to ensure smooth and effective management within your operations. By understanding the complexities of service management, we ensure every solution is aligned with your requirements and fully compliant with industry standards.",
      image: consulting,
      icon: <Target className="w-8 h-8 text-azureSoft" />,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      qualifications: "BPharm, MBA, MPH, CBAP, CPMP",
      position: "Founder & CEO",
      image: permanent, // Using existing images as placeholders
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      name: "Ashley White",
      qualifications: "BSc, MSc",
      position: "Head of Operations",
      image: temporary,
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      name: "Michael Chen",
      qualifications: "BA, CIPD",
      position: "Senior Recruitment Consultant",
      image: cleaning,
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      name: "Emma Thompson",
      qualifications: "BSc, RN",
      position: "Healthcare Specialist",
      image: consulting,
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      {/* Enhanced CSS for animations */}
      <style jsx>{`
        .animate-slide-in-left {
          opacity: 0;
          transform: translateX(-100px) rotateY(-10deg);
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-slide-in-right {
          opacity: 0;
          transform: translateX(100px) rotateY(10deg);
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-slide-in-up {
          opacity: 0;
          transform: translateY(80px) scale(0.95);
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-scale-in {
          opacity: 0;
          transform: scale(0.8) rotateX(10deg);
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-in {
          opacity: 1 !important;
          transform: translateX(0) translateY(0) scale(1) rotateX(0) rotateY(0) !important;
        }
        
        .animate-out {
          opacity: 0 !important;
          transform: translateX(-30px) translateY(15px) scale(0.98) rotateY(-5deg) !important;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.6, 1) !important;
        }
        
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        .stagger-5 { transition-delay: 0.5s; }
        .stagger-6 { transition-delay: 0.6s; }
        .stagger-7 { transition-delay: 0.7s; }
        .stagger-8 { transition-delay: 0.8s; }
        
        .card-hover {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 127, 255, 0.15);
        }
        
        .gradient-text {
          background: linear-gradient(45deg, #007FFF, #1E88E5, #F59E0B);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 4s ease-in-out infinite;
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .text-shadow-lg {
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .drop-shadow-2xl {
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
        }
        
        .drop-shadow-lg {
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }
        
        .team-scroll {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }
        
        .team-scroll::-webkit-scrollbar {
          display: none; /* WebKit */
        }
      `}</style>
      
      {/* Hero Section */}
      <section className="pt-32 pb-32 md:pb-40 bg-gradient-to-r from-azure via-azureSoft to-primary relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-accent rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-ping"></div>
          <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-accent rounded-full animate-pulse"></div>
        </div>
        
        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 animate-float">
            <Building2 className="h-8 w-8 text-white opacity-20" />
          </div>
          <div className="absolute top-40 right-1/4 animate-float-delayed">
            <Users className="h-6 w-6 text-accent opacity-30" />
          </div>
          <div className="absolute bottom-40 left-1/3 animate-float">
            <Award className="h-7 w-7 text-white opacity-25" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h1 className="text-6xl lg:text-7xl font-bold text-white font-heading mb-8 leading-tight drop-shadow-2xl text-shadow-lg">
                About Us
              </h1>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="text-lg md:text-xl lg:text-2xl text-white max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-lg">
                Discover our story, values, and commitment to excellence in healthcare recruitment
              </p>
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-current text-blue-50">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
          </svg>
        </div>
      </section>

      {/* About Us Content Section */}
      <section className="py-20 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="animate-slide-in-up bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200"
            data-animate-id="about-content"
          >
            <div className="flex items-center justify-center mb-8">
              <Building2 className="h-12 w-12 text-azure mr-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">Our Story</h2>
            </div>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg md:text-xl">
                At Consulate Recruitment, we are committed to bridging the critical gaps in health and social care across the UK. Our agency was established to provide exceptional professional services that meet the unique needs of both our clients and candidates. We specialize in offering tailored recruitment solutions, including contract, temporary, and permanent placements, alongside comprehensive cleaning services across health and social care sectors.
              </p>
              
              <div className="bg-gradient-to-r from-azure/10 to-purple/10 rounded-xl p-6 border border-azure/20">
                <p className="text-lg">
                  Whether you are a healthcare provider seeking qualified professionals or a candidate seeking the right role, Consulate Recruitment is here to deliver. Our approach is built on integrity, quality, and efficiency, ensuring that we match the right talent with the right opportunities in the shortest possible time.
                </p>
              </div>
              
              <p className="text-lg">
                We take pride in our ability to deliver high-quality services quickly, minimizing delays and maximizing satisfaction for our clients and candidates. Consulate Recruitment is a registered limited company in the United Kingdom and is held to the highest standards of professionalism and service excellence.
              </p>
              
              <div className="flex items-center justify-center mt-8 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <CheckCircle className="h-8 w-8 text-emerald-600 mr-4" />
                <div>
                  <p className="text-emerald-800 font-semibold text-lg">
                    Registered Limited Company in the United Kingdom
                  </p>
                  <p className="text-emerald-600 text-sm">
                    Committed to the highest standards of professionalism and service excellence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            
            {/* Vision - Left Side */}
            <div className="space-y-6">
              <div 
                className="animate-slide-in-left flex items-center mb-6"
                data-animate-id="vision-header"
              >
                <Eye className="h-10 w-10 text-azure mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">
                  Our Vision
                </h2>
              </div>
              
              <p 
                className="animate-slide-in-left stagger-1 text-lg text-gray-700 leading-relaxed"
                data-animate-id="vision-text"
              >
                To become a trusted leader in recruitment and professional development, empowering individuals and organizations to achieve their fullest potential in the dynamic, evolving workforce.
              </p>
            </div>

            {/* Mission - Right Side */}
            <div className="space-y-6">
              <div 
                className="animate-slide-in-right flex items-center mb-6"
                data-animate-id="mission-header"
              >
                <Compass className="h-10 w-10 text-azure mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">
                  Our Mission
                </h2>
              </div>
              
              <p 
                className="animate-slide-in-right stagger-1 text-lg text-gray-700 leading-relaxed"
                data-animate-id="mission-text"
              >
                To deliver innovative recruitment and training solutions that connect skilled professionals with opportunities, fostering growth and success for both clients and candidates in the healthcare and social care sectors.
              </p>
            </div>
          </div>

          {/* Vision Image Section */}
          <div 
            className="animate-slide-in-up rounded-2xl overflow-hidden shadow-2xl"
            data-animate-id="vision-image"
          >
            <img 
              src={consulting} 
              alt="Our Vision" 
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-azure/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 
              className="animate-slide-in-up text-3xl md:text-4xl font-bold text-primary font-heading mb-6"
              data-animate-id="values-title"
            >
              Our Core Values
            </h2>
            <p 
              className="animate-slide-in-up stagger-1 text-lg text-gray-600 max-w-4xl mx-auto"
              data-animate-id="values-subtitle"
            >
              At Consulate Recruitment, our commitment to excellence is built on a foundation of five core values. These principles guide every aspect of our work, ensuring we consistently deliver exceptional services to our clients and candidates. These values are not just words - they are the driving force behind our commitment to serving the healthcare and social care community with distinction.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className={`animate-scale-in stagger-${index + 1} card-hover bg-white rounded-2xl shadow-lg p-8 border-2 ${value.borderColor} hover:shadow-xl transition-all duration-300 ${index === 4 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''}`}
                data-animate-id={`value-card-${index}`}
              >
                <div className={`${value.bgColor} rounded-xl p-4 w-fit mb-6 mx-auto`}>
                  <value.icon className={`h-10 w-10 ${value.color}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-primary mb-4 font-heading text-center">
                  {value.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-center">
                  {value.description}
                </p>
                
                <div className={`w-full h-1 bg-gradient-to-r ${value.gradient} rounded-full mt-6`}></div>
              </div>
            ))}
          </div>

          {/* Values CTA */}
          <div className="text-center">
            <p 
              className="animate-slide-in-up text-xl text-primary font-semibold"
              data-animate-id="values-cta"
            >
              Let us put these values to work for you.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 
              className="animate-slide-in-up text-3xl md:text-4xl font-bold text-primary font-heading mb-6"
              data-animate-id="services-title"
            >
              Our Services
            </h2>
            <p 
              className="animate-slide-in-up stagger-1 text-lg text-gray-600 max-w-3xl mx-auto"
              data-animate-id="services-subtitle"
            >
              Comprehensive recruitment and staffing solutions tailored to meet your unique needs
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`animate-scale-in stagger-${index + 1} card-hover bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300`}
                data-animate-id={`service-card-${index}`}
              >
                <div className="relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-20`}></div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-azure/10 rounded-xl p-3 mr-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-primary font-heading">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Team Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primaryLight to-azure text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 
              className="animate-slide-in-up text-3xl md:text-4xl font-bold font-heading mb-6"
              data-animate-id="team-title"
            >
              Our Management Team
            </h2>
            <p 
              className="animate-slide-in-up stagger-1 text-xl text-blue-100 max-w-4xl mx-auto"
              data-animate-id="team-subtitle"
            >
              Our team is composed of exceptionally skilled professionals who are passionate about delivering outstanding health and social care services. With a collective experience exceeding 20 years, we bring a profound depth of knowledge, expertise, and dedication to every aspect of our work. Our team is committed to upholding the highest standards of care, ensuring that every individual we serve receives compassionate, reliable, and personalized support.
            </p>
          </div>

          {/* Team Members - Horizontal Scroll */}
          <div 
            className="animate-slide-in-up overflow-x-auto team-scroll pb-4"
            data-animate-id="team-members"
          >
            <div className="flex space-x-6 min-w-max px-4">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-80 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 stagger-${index + 1}`}
                >
                  <div className="text-center">
                    <div className="relative mb-6">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-accent shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-accent rounded-full p-2">
                        <Star className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-accent font-semibold mb-1">{member.qualifications}</p>
                    <p className="text-blue-100 text-sm mb-4">{member.position}</p>
                    
                    {/* Social Links */}
                    <div className="flex justify-center space-x-3">
                      <a 
                        href={member.social.facebook} 
                        className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                      >
                        <Facebook className="h-4 w-4" />
                      </a>
                      <a 
                        href={member.social.twitter} 
                        className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                      <a 
                        href={member.social.linkedin} 
                        className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="text-center mt-8">
            <p className="text-blue-100 text-sm flex items-center justify-center">
              <ArrowRight className="h-4 w-4 mr-2 animate-pulse" />
              Scroll horizontally to see all team members
            </p>
          </div>
        </div>
      </section>

      {/* Process Component */}
      <Process />

      {/* ICO Component */}
      <IcoImage />

      <Footer />
    </div>
  );
};

export default AboutPage;