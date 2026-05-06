import { useState, useEffect, useRef } from 'react';
import {
  Calendar, Users, CheckCircle, ArrowRight, Star, Award,
  Briefcase, Phone, Mail, Send, Clock, Shield, Target
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const SERVICE_OPTIONS = [
  'Recruitment Consultation',
  'Staffing Solutions',
  'Management & Web Services',
  'Cleaning Services',
];

const ConsultationsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    if (window.location.search.includes('submitted=true')) {
      setSubmitted(true);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const observerOptions = { threshold: 0.2, rootMargin: '0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('animate-in');
      });
    }, observerOptions);
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.submit();
  };

  const handleCardCTA = (serviceName) => {
    setSelectedService(serviceName);
    setFormData((prev) => ({ ...prev, service: serviceName }));
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const serviceCards = [
    {
      icon: Briefcase,
      title: 'Recruitment Consultation',
      description: 'Discuss your staffing needs and find the perfect candidates for your organisation.',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: Users,
      title: 'Staffing Solutions',
      description: 'Explore flexible staffing options including temporary, permanent, and contract placements.',
      borderColor: 'border-emerald-200',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      icon: Star,
      title: 'Management & Web Services',
      description: 'Whether you need business management consulting or a website built from scratch or redesigned to fit your brand — we\'ve got you covered. Both offerings work hand in hand to help your organisation run and present itself better.',
      borderColor: 'border-purple-200',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      icon: Award,
      title: 'Cleaning Services',
      description: 'Discuss professional cleaning solutions tailored to your facility\'s specific needs.',
      borderColor: 'border-orange-200',
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
  ];

  const reasons = [
    {
      icon: CheckCircle,
      title: 'Expert Guidance',
      description: 'Get personalised advice from our experienced recruitment and management professionals.',
    },
    {
      icon: Target,
      title: 'Tailored Solutions',
      description: 'Receive customised solutions that fit your specific business needs and goals.',
    },
    {
      icon: Shield,
      title: 'Trusted & Reliable',
      description: 'We\'re committed to delivering quality outcomes with full transparency and accountability.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <style jsx>{`
        [data-animate] { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        [data-animate].animate-in { opacity: 1; transform: translateY(0); }
        .stagger-1 { transition-delay: 0.1s; } .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; } .stagger-4 { transition-delay: 0.4s; }
        .stagger-5 { transition-delay: 0.5s; } .stagger-6 { transition-delay: 0.6s; }
      `}</style>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-azure via-azureSoft to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent rounded-full blur-3xl animate-float-delayed"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className={`inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-6 backdrop-blur-sm transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Calendar className="w-4 h-4 mr-2" />Consultations
            </div>
            <h1 className={`text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Expert Consultations
              <span className="block text-yellow-300 mt-2">Tailored to Your Needs</span>
            </h1>
            <p className={`text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Explore our Stan Store for books, resources, and direct consultations with our expert — everything you need to move your organisation forward, all in one place.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <a
                href="https://stan.store/Olafusi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-azure font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explore Resources <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-azure transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 bg-gradient-to-br from-bg via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">Our Services</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Choose Your Consultation Type</h2>
            <p className="text-lg text-primary/70 max-w-2xl mx-auto">Select the service that best matches your needs and we'll get you sorted.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  data-animate
                  className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 ${card.borderColor} p-6 stagger-${index + 1}`}
                >
                  <div className={`${card.iconBg} rounded-lg p-3 w-fit mb-4`}>
                    <Icon className={`h-8 w-8 ${card.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3 font-heading">{card.title}</h3>
                  <p className="text-primary/70 leading-relaxed mb-5 text-sm">{card.description}</p>
                  <button
                    onClick={() => handleCardCTA(card.title)}
                    className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-azure to-primaryLight text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-all duration-300 shadow hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why + Contact Form — two column layout */}
      <section ref={formRef} id="contact" className="py-20 bg-gradient-to-br from-azure via-azureSoft to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent rounded-full blur-3xl animate-float-delayed"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left — heading, reason cards, contact details */}
            <div data-animate>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-white/80 leading-relaxed mb-8">
                Send us a message and we'll get back to you as soon as possible. Or reach out directly using the details below.
              </p>

              <div className="space-y-4 mb-8">
                {reasons.map((reason, index) => {
                  const Icon = reason.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm mb-1">{reason.title}</h4>
                        <p className="text-white/70 text-xs leading-relaxed">{reason.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3">
                <a href="tel:+01623255223" className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Call us</p>
                    <span className="text-white font-semibold hover:text-yellow-300 transition-colors">+01623 255223</span>
                  </div>
                </a>
                <a href="mailto:admin@consulaterecruitment.co.uk" className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Email us</p>
                    <span className="text-white font-semibold hover:text-yellow-300 transition-colors">admin@consulaterecruitment.co.uk</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div data-animate className="stagger-1">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>

                {submitted && (
                  <div className="mb-6 flex items-start gap-3 bg-green-500/20 border border-green-400/40 rounded-xl px-5 py-4">
                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-semibold text-sm">Message sent successfully!</p>
                      <p className="text-white/80 text-xs mt-0.5">We'll be in touch with you shortly.</p>
                    </div>
                  </div>
                )}

                <form
                  action="https://formsubmit.co/admin@consulaterecruitment.co.uk"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <input type="hidden" name="_subject" value="Consultation Request" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_next" value={`${window.location.origin}/consultations?submitted=true`} />

                  <div>
                    <label htmlFor="name" className="block text-white/90 text-sm font-medium mb-2">Full Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                      placeholder="John Smith" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white/90 text-sm font-medium mb-2">Email Address *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                      placeholder="john@example.com" />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-white/90 text-sm font-medium mb-2">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                      placeholder="+44 7XXX XXXXXX" />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-white/90 text-sm font-medium mb-2">Service Type *</label>
                    <select id="service" name="service" value={formData.service} onChange={handleInputChange} required
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm">
                      <option value="" className="text-primary bg-white">Select a service...</option>
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="text-primary bg-white">{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white/90 text-sm font-medium mb-2">Message / Notes *</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows="4"
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm resize-none"
                      placeholder="Tell us about your needs..."></textarea>
                  </div>

                  <button type="submit"
                    className="w-full bg-white text-azure font-semibold py-4 px-6 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <Send className="w-5 h-5" /> Send Message
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ConsultationsPage;
