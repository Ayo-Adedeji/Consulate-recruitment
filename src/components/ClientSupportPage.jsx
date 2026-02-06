import { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  Clock, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Heart,
  Award,
  Phone,
  Mail,
  MessageSquare,
  Zap,
  Target,
  UserCheck,
  Headphones,
  Globe,
  Sparkles,
  Search,
  ClipboardCheck,
  BarChart3,
  HelpCircle,
  Send,
  Star
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const ClientSupportPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // FormSubmit will handle the submission
    // Form has action and method attributes
  };

  const services = [
    {
      icon: Users,
      title: 'Permanent Recruitment',
      description: 'Find the perfect long-term fit for your organisation with our comprehensive permanent recruitment service.',
      features: ['Executive search', 'Skills assessment', 'Cultural fit evaluation']
    },
    {
      icon: Clock,
      title: 'Temporary & Contract Staffing',
      description: 'Flexible staffing solutions for short-term needs, seasonal demands, or project-based requirements.',
      features: ['Immediate availability', 'Flexible terms', 'Quality candidates']
    },
    {
      icon: Target,
      title: 'Management Consulting',
      description: 'Expert guidance and strategic advice to optimize your business operations, improve efficiency, and drive organizational growth.',
      features: ['Business strategy', 'Process optimization', 'Performance improvement']
    },
    {
      icon: Zap,
      title: 'Emergency Cover & Last-Minute Placements',
      description: '24-hour emergency staffing service for urgent requirements across healthcare, retail, and support roles.',
      features: ['24-hour response', 'Pre-vetted candidates', 'Immediate deployment']
    },
    {
      icon: Heart,
      title: 'Healthcare & Social Care',
      description: 'Specialist recruitment for care homes, hospitals, and social care facilities with qualified professionals.',
      features: ['DBS checked', 'Qualified staff', 'Compliance assured']
    },
    {
      icon: Sparkles,
      title: 'Cleaning & Facilities',
      description: 'Professional cleaning staff and facilities management personnel for commercial and residential needs.',
      features: ['Trained professionals', 'Flexible schedules', 'Quality service']
    }
  ];

  const processSteps = [
    {
      icon: MessageSquare,
      title: 'Initial Consultation',
      description: 'We begin with a detailed discussion to understand your organisation, culture, and specific staffing requirements.'
    },
    {
      icon: Search,
      title: 'Needs Assessment',
      description: 'Our team conducts a thorough analysis of your staffing needs, timelines, and budget considerations.'
    },
    {
      icon: Users,
      title: 'Candidate Sourcing & Vetting',
      description: 'We source, screen, and rigorously vet candidates through background checks, interviews, and skills assessments.'
    },
    {
      icon: ClipboardCheck,
      title: 'Placement & Onboarding',
      description: 'Seamless integration of selected candidates into your team with comprehensive onboarding support.'
    },
    {
      icon: Headphones,
      title: 'Ongoing Post-Placement Support',
      description: 'Continuous support and performance monitoring to ensure long-term success and satisfaction.'
    }
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: 'Deep Industry Knowledge',
      description: 'Years of experience across healthcare, retail, and professional services sectors.'
    },
    {
      icon: Shield,
      title: 'Rigorous Screening & Quality Assurance',
      description: 'Comprehensive vetting including DBS checks, reference verification, and skills assessment.'
    },
    {
      icon: MessageSquare,
      title: 'Transparent Communication',
      description: 'Clear, honest communication throughout the recruitment process with regular updates.'
    },
    {
      icon: Zap,
      title: 'Flexible, Responsive Service',
      description: 'Adaptable solutions that respond quickly to your changing business needs.'
    },
    {
      icon: Heart,
      title: 'Strong Client Relationships',
      description: 'We build long-term partnerships based on trust, reliability, and consistent results.'
    },
    {
      icon: BarChart3,
      title: 'Proven Track Record',
      description: 'Demonstrated success in delivering quality candidates and measurable outcomes.'
    }
  ];

  const testimonials = [
    {
      quote: "Partnering with Consulate Recruitment transformed our staffing strategy. They found the right carers quickly and stayed in close contact throughout.",
      author: "Sarah Mitchell",
      role: "Care Home Manager",
      company: "Sunrise Care Homes",
      rating: 5
    },
    {
      quote: "The emergency staffing service is exceptional. We've never been let down, even with last-minute requests. True professionals.",
      author: "James Thompson",
      role: "Operations Director",
      company: "HealthFirst Medical",
      rating: 5
    },
    {
      quote: "Their understanding of our sector and commitment to quality has made them our go-to recruitment partner for over 3 years.",
      author: "Emma Roberts",
      role: "HR Manager",
      company: "Premier Retail Group",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'How fast can you fill roles?',
      answer: 'For emergency staffing, we can source qualified candidates within 24 hours. Standard permanent placements typically take 1-2 weeks depending on role complexity and requirements.'
    },
    {
      question: 'What vetting checks do you perform?',
      answer: 'All candidates undergo comprehensive DBS checks, reference verification, qualification validation, and skills assessments. Healthcare roles include additional compliance checks.'
    },
    {
      question: 'How do you ensure candidate reliability?',
      answer: 'We maintain rigorous screening processes, conduct thorough interviews, verify work history, and provide ongoing support to ensure candidate performance and reliability.'
    },
    {
      question: 'What are your fees and payment terms?',
      answer: 'Our fees vary based on role type and placement duration. We offer competitive rates with transparent pricing and flexible payment terms. Contact us for a detailed quote.'
    },
    {
      question: 'Do you offer replacement guarantees?',
      answer: 'Yes, we provide replacement guarantees for permanent placements. If a candidate doesn\'t work out within the agreed period, we\'ll find a suitable replacement at no additional cost.'
    },
    {
      question: 'Which sectors do you specialize in?',
      answer: 'We specialize in healthcare & social care, retail & customer service, cleaning & facilities management, and professional services across the UK.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Animation Styles */}
      <style jsx>{`
        [data-animate] {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        [data-animate].animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        .stagger-5 { transition-delay: 0.5s; }
        .stagger-6 { transition-delay: 0.6s; }
      `}</style>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-azure via-azureSoft to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className={`inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-6 backdrop-blur-sm transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Building2 className="w-4 h-4 mr-2" />
              Client Support Services
            </div>
            
            <h1 className={`text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Client Support & Staffing Solutions
              <span className="block text-yellow-300 mt-2">Built for You</span>
            </h1>
            
            <p className={`text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              At Consulate Recruitment, we partner with organisations to solve staffing needs quickly and reliably. Whether you need care workers, support staff, or temporary placements, our expert team is here to support you at every step. We deliver exceptional, high-standard recruitment with a straightforward approach — our top priority is ensuring the highest quality of service.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-4 bg-white text-azure font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-azure transition-all duration-300"
              >
                Explore Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-bg via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">
              Our Services
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              Bespoke Recruitment Solutions
            </h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">
              We provide bespoke recruitment solutions across care, support and management roles — from temporary cover to permanent placements — tailored to your unique business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                data-animate
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-azure/10 hover:border-azure/30 transition-all duration-500 hover:-translate-y-2 stagger-${index + 1}`}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-azure/10 to-primaryLight/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-azure" />
                </div>
                
                <h3 className="text-xl font-heading font-bold text-primary mb-3 group-hover:text-azure transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-primary/70 leading-relaxed mb-4">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-primary/60">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">
              Our Process
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              How We Work
            </h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">
              Our process begins with a detailed consultation to understand your staffing goals. We then source, screen and match candidates, followed by continuous support to ensure long-term success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={index}
                data-animate
                className={`text-center stagger-${index + 1}`}
              >
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-azure to-primaryLight rounded-2xl flex items-center justify-center mx-auto shadow-lg hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                <h3 className="text-lg font-heading font-bold text-primary mb-3">
                  {step.title}
                </h3>
                
                <p className="text-sm text-primary/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-azure/5 via-primaryLight/5 to-azure/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              Why Clients Choose Consulate Recruitment
            </h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">
              We go beyond filling vacancies — we build long-term partnerships. Our team's deep sector expertise ensures that every candidate is a quality fit for your organisation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                data-animate
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-azure/10 stagger-${index + 1}`}
              >
                <div className="w-12 h-12 bg-azure/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-azure" />
                </div>
                
                <h3 className="text-xl font-heading font-bold text-primary mb-3">
                  {item.title}
                </h3>
                
                <p className="text-primary/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">
              Client Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              What Our Clients Say
            </h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">
              Don't just take our word for it — hear from the organisations we've helped transform their staffing strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                data-animate
                className={`bg-gradient-to-br from-azure/5 to-primaryLight/5 rounded-2xl p-8 border border-azure/10 hover:border-azure/30 transition-all duration-300 hover:shadow-lg stagger-${index + 1}`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                
                <p className="text-primary/80 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="border-t border-azure/10 pt-4">
                  <p className="font-semibold text-primary">{testimonial.author}</p>
                  <p className="text-sm text-primary/60">{testimonial.role}</p>
                  <p className="text-sm text-azure font-medium">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gradient-to-br from-bg via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQs
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-primary/70">
              Find answers to common questions about our services and processes.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                data-animate
                className={`bg-white rounded-xl border border-azure/10 overflow-hidden transition-all duration-300 hover:border-azure/30 stagger-${index + 1}`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-azure/5 transition-colors duration-200"
                >
                  <span className="font-semibold text-primary pr-4">{faq.question}</span>
                  <div className={`transform transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-azure" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="px-6 pb-5 text-primary/70 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-azure via-azureSoft to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Contact Info */}
            <div data-animate>
              <div className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                <Send className="w-4 h-4 mr-2" />
                Get in Touch
              </div>
              
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              
              <p className="text-xl text-white/90 leading-relaxed mb-8">
                Let us help you find the perfect staffing solution for your organization. Contact us today to discuss your specific needs.
              </p>

              <div className="space-y-4">
                <a href="tel:01623255223" className="flex items-center gap-4 text-white/90 hover:text-white transition-colors duration-300">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Call Us</p>
                    <p className="font-semibold">01623 255 223</p>
                  </div>
                </a>

                <a href="mailto:admin@consulaterecruitment.co.uk" className="flex items-center gap-4 text-white/90 hover:text-white transition-colors duration-300">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Email Us</p>
                    <p className="font-semibold">admin@consulaterecruitment.co.uk</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div data-animate className="stagger-1">
              <form 
                action="https://formsubmit.co/admin@consulaterecruitment.co.uk"
                method="POST"
                onSubmit={handleSubmit} 
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
              >
                {/* FormSubmit Configuration */}
                <input type="hidden" name="_subject" value="Client Support Inquiry" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                      placeholder="Your company"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 resize-none"
                      placeholder="Tell us about your staffing needs..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white text-azure font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    Send Message
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClientSupportPage;
