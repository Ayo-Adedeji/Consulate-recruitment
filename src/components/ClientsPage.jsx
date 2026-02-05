import { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  Clock, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Heart,
  Star,
  Award,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  Zap,
  Target,
  TrendingUp,
  UserCheck,
  Calendar,
  Headphones,
  FileCheck,
  Globe,
  Sparkles
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const ClientsPage = () => {
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

  const serviceCards = [
    {
      icon: Users,
      title: 'Daily Excellence',
      description: 'Every day we connect ambitious organisations with exceptional candidates. We provide quality services to recruit and staffing solutions for both temporary and permanent candidates.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Heart,
      title: 'Going Extra Miles',
      description: 'Consulate Recruitment goes extra miles to treat every client and candidate with care and respect. We use our years of experience to inspire you to achieve your ambitions. It is all driven by great and experienced people who help us in our mission to deliver excellence to individual business and communities.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Target,
      title: 'Connecting Professionals',
      description: 'We connect health professionals with great opportunities. It\'s not just our motto, it is what we do each day to make a difference to our customers and employers. We tailor every recruitment to the needs of every client, offering professional services including healthcare staffing, retail staffing, management services, and cleaning services.',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      gradient: 'from-emerald-500 to-emerald-600'
    }
  ];

  const additionalServices = [
    {
      icon: Clock,
      title: '24-Hour Emergency Staffing',
      description: 'Need qualified staff urgently? Our emergency staffing service can source trained healthcare professionals, support workers, care assistants, and retail assistants within 24 hours.',
      features: ['Immediate response', 'Pre-vetted candidates', 'Quality assurance']
    },
    {
      icon: Shield,
      title: 'Comprehensive Screening',
      description: 'All our candidates undergo rigorous background checks, DBS verification, and skills assessment to ensure they meet your facility\'s standards.',
      features: ['DBS checks', 'Reference verification', 'Skills assessment']
    },
    {
      icon: TrendingUp,
      title: 'Flexible Solutions',
      description: 'From temporary cover to permanent placements, we offer flexible staffing solutions that adapt to your changing business needs.',
      features: ['Temporary staffing', 'Permanent recruitment', 'Contract-to-hire']
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      description: 'Our dedicated account managers provide ongoing support, ensuring seamless integration and continuous satisfaction with our services.',
      features: ['Account management', '24/7 support', 'Performance monitoring']
    }
  ];

  const industries = [
    { name: 'Healthcare & Social Care', icon: Heart, count: '500+' },
    { name: 'Retail & Customer Service', icon: Building2, count: '200+' },
    { name: 'Cleaning Services', icon: Sparkles, count: '150+' },
    { name: 'Management & Administration', icon: Briefcase, count: '100+' }
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
        
        .pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 127, 255, 0.3); }
          50% { box-shadow: 0 0 30px rgba(0, 127, 255, 0.6); }
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
            <Building2 className="h-8 w-8 text-white opacity-20" />
          </div>
          <div className="absolute top-40 right-1/4 animate-float-delayed">
            <Users className="h-6 w-6 text-accent opacity-30" />
          </div>
          <div className="absolute bottom-40 left-1/3 animate-float">
            <Award className="h-7 w-7 text-white opacity-25" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h1 className="text-4xl md:text-6xl font-bold text-white font-heading mb-6 leading-tight">
                What We Have
                <span className="block gradient-text">For You</span>
              </h1>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed">
                Are you looking for healthcare professionals in the area of support workers, care assistants, or retail assistants to work for you in an emergency shift? Our team are able to source qualified and trained staff that can fill the gaps in 24 hours. Just give us a call and keep us updated. We will deliver your service.
              </p>
            </div>

            {/* Industry Stats */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {industries.map((industry, index) => (
                <div key={index} className="card-hover bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <industry.icon className="h-6 w-6 text-accent mx-auto mb-2" />
                  <h3 className="text-white font-semibold text-sm mb-1">{industry.name}</h3>
                  <p className="text-blue-100 text-xs">{industry.count} Clients</p>
                </div>
              ))}
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

      {/* Main Service Cards Section */}
      <section className="py-20 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {serviceCards.map((card, index) => (
              <div
                key={index}
                className={`animate-scale-in stagger-${index + 1} card-hover bg-white rounded-2xl shadow-lg p-8 border-2 ${card.borderColor} hover:shadow-xl transition-all duration-300`}
                data-animate-id={`service-card-${index}`}
              >
                <div className={`${card.bgColor} rounded-xl p-4 w-fit mb-6`}>
                  <card.icon className={`h-10 w-10 ${card.color}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-primary mb-4 font-heading">
                  {card.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {card.description}
                </p>
                
                <div className={`w-full h-1 bg-gradient-to-r ${card.gradient} rounded-full`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 
              className="animate-slide-in-up text-3xl md:text-4xl font-bold text-primary font-heading mb-6"
              data-animate-id="services-title"
            >
              Comprehensive Staffing Solutions
            </h2>
            <p 
              className="animate-slide-in-up stagger-1 text-lg text-gray-600 max-w-3xl mx-auto"
              data-animate-id="services-subtitle"
            >
              We offer a full range of professional services designed to meet your unique staffing challenges
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className={`animate-slide-in-${index % 2 === 0 ? 'left' : 'right'} stagger-${index + 2} card-hover bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300`}
                data-animate-id={`additional-service-${index}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-azure/10 rounded-xl p-3 flex-shrink-0">
                    <service.icon className="h-8 w-8 text-azure" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary mb-3 font-heading">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <div 
              className="animate-slide-in-up bg-gradient-to-r from-azure/10 to-purple/10 rounded-2xl p-8 border border-azure/20 pulse-glow"
              data-animate-id="services-cta"
            >
              <h3 className="text-2xl font-bold text-primary mb-4">
                Ready to Partner With Us?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Let us help you find the perfect staffing solution for your organization. Contact us today to discuss your specific needs and discover how we can support your business goals.
              </p>
              <a
                href="/contact"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-azure via-azureSoft to-primary text-white font-semibold rounded-xl hover:from-azureSoft hover:via-primary hover:to-azure focus:outline-none focus:ring-4 focus:ring-azure/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
              >
                Contact Us Today
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primaryLight to-azure text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 
              className="animate-slide-in-up text-3xl md:text-4xl font-bold font-heading mb-6"
              data-animate-id="why-title"
            >
              Why Choose Consulate Recruitment?
            </h2>
            <p 
              className="animate-slide-in-up stagger-1 text-xl text-blue-100 max-w-3xl mx-auto"
              data-animate-id="why-subtitle"
            >
              We're more than just a staffing agency - we're your strategic partner in building exceptional teams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: 'Rapid Response', desc: '24-hour emergency staffing solutions' },
              { icon: UserCheck, title: 'Quality Assured', desc: 'Thoroughly vetted and qualified professionals' },
              { icon: Calendar, title: 'Flexible Terms', desc: 'Temporary, permanent, and contract options' },
              { icon: Globe, title: 'Wide Network', desc: 'Extensive database of healthcare professionals' }
            ].map((item, index) => (
              <div
                key={index}
                className={`animate-scale-in stagger-${index + 2} text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105`}
                data-animate-id={`why-item-${index}`}
              >
                <div className="bg-accent/20 rounded-full p-4 w-fit mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-blue-100 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClientsPage;