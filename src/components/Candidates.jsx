import { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Shield, 
  Users, 
  MapPin, 
  CreditCard, 
  Hash, 
  Banknote,
  CheckCircle,
  ArrowRight,
  Briefcase,
  Heart,
  Star,
  Award
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import Process from './Process';
import IcoImage from './IcoImage';
import permanent from '../assets/permanent.jpg';
import temporary from '../assets/temporary.jpg';
import cleaning from '../assets/cleaning.jpg';

const Candidates = () => {
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
          // Add to visible elements
          setVisibleElements(prev => new Set([...prev, elementId]));
          entry.target.classList.add('animate-in');
          entry.target.classList.remove('animate-out');
        } else {
          // Remove from visible elements
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

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('[data-animate-id]');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const documentationItems = [
    {
      icon: Shield,
      title: 'Right to Work',
      description: 'You will need to demonstrate your eligibility to work in the UK. Please consult the government\'s right to work list A for guidance and ensure you bring the appropriate documentation.',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      icon: FileText,
      title: 'Application Form',
      description: 'You are required to complete our application form, which can be downloaded below or filled out in person when you visit the branch to register.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: Users,
      title: 'References',
      description: 'You will need to provide two references from your recent employment. Additional references from previous employers are also greatly appreciated.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      icon: Shield,
      title: 'DBS',
      description: 'You must provide proof of your criminal record through the police in the United Kingdom or share your code so we can check the updated record.',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      icon: MapPin,
      title: 'Proof of Address',
      description: 'To verify your address, you can provide one of the following: a valid UK driving license, a utility bill, a credit card or bank statement (dated within the last three months), a council tax bill (dated within the last 12 months), or a tenancy agreement.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      icon: Hash,
      title: 'National Insurance',
      description: 'To verify your national insurance number, you can provide the NI card or an official letter issued by the Department for Work and Pensions or HMRC.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      icon: Banknote,
      title: 'Bank Account Details',
      description: 'To ensure we can process your payments, please provide your bank account details so we can deposit your earnings directly into your account every week or monthly.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
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
        
        /* Enhanced hover effects */
        .card-hover {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 127, 255, 0.15);
        }
        
        /* Smooth image animations */
        .image-float {
          animation: imageFloat 8s ease-in-out infinite;
        }
        
        .image-float-delayed {
          animation: imageFloat 8s ease-in-out infinite 2s;
        }
        
        @keyframes imageFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(0deg); }
          75% { transform: translateY(-15px) rotate(-1deg); }
        }
        
        /* Gradient text animation */
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
      `}</style>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-azure via-azureSoft to-primary relative overflow-hidden">
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
            <Briefcase className="h-8 w-8 text-white opacity-20" />
          </div>
          <div className="absolute top-40 right-1/4 animate-float-delayed">
            <Heart className="h-6 w-6 text-accent opacity-30" />
          </div>
          <div className="absolute bottom-40 left-1/3 animate-float">
            <Star className="h-7 w-7 text-white opacity-25" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h1 className="text-4xl md:text-6xl font-bold text-white font-heading mb-6 leading-tight">
                Find Your Next
                <span className="block gradient-text animate-pulse">Job Opportunity</span>
              </h1>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
                Join our network of healthcare and retail professionals and discover your perfect career match
              </p>
            </div>

            {/* Quick Stats */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="card-hover bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <Award className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="text-white font-semibold text-lg">Expert Guidance</h3>
                <p className="text-blue-100 text-sm">Professional career support</p>
              </div>
              <div className="card-hover bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <Briefcase className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="text-white font-semibold text-lg">Diverse Opportunities</h3>
                <p className="text-blue-100 text-sm">Healthcare & retail positions</p>
              </div>
              <div className="card-hover bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <Heart className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="text-white font-semibold text-lg">Personal Approach</h3>
                <p className="text-blue-100 text-sm">Tailored to your goals</p>
              </div>
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

      {/* About Section with Enhanced Animations */}
      <section className="py-20 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Content with slide-in-left animation */}
            <div className="space-y-6">
              <h2 
                className="animate-slide-in-left text-3xl md:text-4xl font-bold text-primary font-heading mb-6"
                data-animate-id="about-title"
              >
                Seeking Your Next Professional Opportunity in Healthcare or Retail?
              </h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p 
                  className="animate-slide-in-left stagger-1 text-lg"
                  data-animate-id="about-p1"
                >
                  We specialize in connecting talented professionals like you with a diverse range of opportunities, 
                  both temporary and permanent, in the health and social care sectors. Whether you're an experienced 
                  professional or just starting your career, we are committed to helping you find roles that align 
                  with your goals and expertise.
                </p>
                
                <p 
                  className="animate-slide-in-left stagger-2 text-lg"
                  data-animate-id="about-p2"
                >
                  Our recruitment process and approach is simple. It's all about you. Do you have years of experience 
                  under your belt? Or you're exploring the professional landscape for the first time? Our job is to 
                  provide guidance that fits your life and scout out that dream job for you. We work with hundreds 
                  of registered companies, large and small. Across Health and Social Care setting, we'll find you 
                  somewhere where you will grow and flourish. Whatever your professional aspiration may be, discover 
                  your next career move with us.
                </p>
                
                <p 
                  className="animate-slide-in-left stagger-3 text-lg"
                  data-animate-id="about-p3"
                >
                  Connect with our skilled team today who will guide you through a seamless and efficient registration 
                  process while helping you plan your next career move.
                </p>
              </div>
              
              <div className="pt-6">
                <a
                  href="/contact"
                  className="animate-slide-in-left stagger-4 group inline-flex items-center px-8 py-4 bg-gradient-to-r from-azure via-azureSoft to-primary text-white font-semibold rounded-xl hover:from-azureSoft hover:via-primary hover:to-azure focus:outline-none focus:ring-4 focus:ring-azure/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
                  data-animate-id="about-cta"
                >
                  Get In Touch
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Right Side - Images with slide-in-right animation */}
            <div className="animate-slide-in-right" data-animate-id="about-images">
              <div className="relative">
                {/* Main large image */}
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                  <img 
                    src={permanent} 
                    alt="Healthcare Professional" 
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-azure/20 to-transparent"></div>
                </div>
                
                {/* Floating smaller images */}
                <div className="absolute -top-6 -right-6 z-20 rounded-xl overflow-hidden shadow-xl transform hover:scale-110 transition-all duration-500 image-float">
                  <img 
                    src={temporary} 
                    alt="Temporary Staff" 
                    className="w-32 h-32 object-cover"
                  />
                </div>
                
                <div className="absolute -bottom-6 -left-6 z-20 rounded-xl overflow-hidden shadow-xl transform hover:scale-110 transition-all duration-500 image-float-delayed">
                  <img 
                    src={cleaning} 
                    alt="Cleaning Services" 
                    className="w-28 h-28 object-cover"
                  />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-azure/10 to-purple/10 rounded-full -z-10 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Section with Sequential Card Animations */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 
              className="animate-slide-in-up text-3xl md:text-4xl font-bold text-primary font-heading mb-6"
              data-animate-id="docs-title"
            >
              Documentation and Registration
            </h2>
            <p 
              className="animate-slide-in-up stagger-1 text-lg text-gray-600 max-w-3xl mx-auto"
              data-animate-id="docs-subtitle"
            >
              You will need to provide the following documents before you can start your job
            </p>
          </div>

          {/* Documentation Grid with Sequential Animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {documentationItems.map((item, index) => (
              <div
                key={index}
                className={`animate-scale-in stagger-${index + 1} card-hover bg-white rounded-2xl shadow-lg p-6 border-2 ${item.borderColor} hover:shadow-xl transition-all duration-300`}
                data-animate-id={`doc-card-${index}`}
              >
                <div className={`${item.bgColor} rounded-xl p-4 w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`h-8 w-8 ${item.color}`} />
                </div>
                
                <h3 className="text-xl font-bold text-primary mb-3 font-heading">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm">
                  {item.description}
                </p>
                
                <div className="mt-4 flex items-center text-azure hover:text-azureSoft transition-colors cursor-pointer">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Required</span>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA with slide-in animation */}
          <div className="text-center">
            <div 
              className="animate-slide-in-up bg-gradient-to-r from-azure/10 to-purple/10 rounded-2xl p-8 border border-azure/20"
              data-animate-id="docs-cta"
            >
              <h3 className="text-2xl font-bold text-primary mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Have all your documents ready? Contact us today to begin your registration process 
                and take the first step towards your new career opportunity.
              </p>
              <a
                href="/contact"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-azure via-azureSoft to-primary text-white font-semibold rounded-xl hover:from-azureSoft hover:via-primary hover:to-azure focus:outline-none focus:ring-4 focus:ring-azure/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
              >
                Contact Us
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
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

export default Candidates;