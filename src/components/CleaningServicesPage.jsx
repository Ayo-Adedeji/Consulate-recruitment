import { useState, useEffect } from 'react';
import { 
  Sparkles, CheckCircle, ArrowRight, Shield, Award, Clock,
  Users, Building2, Heart, Home, Droplets, Wind,
  Search, FileCheck, Phone, Mail, Send, Star, Zap, Target
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const CleaningServicesPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '', message: ''
  });
  
  useEffect(() => { setIsVisible(true); }, []);

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
    // FormSubmit will handle the submission
    // Form has action and method attributes
  };

  const whenNeeded = [
    { icon: Zap, title: 'Short-Notice or Emergency Cover', description: 'Quick response for unexpected cleaning needs' },
    { icon: Users, title: 'Staff Absences or Gaps', description: 'Reliable cover when your team is unavailable' },
    { icon: Clock, title: 'Ongoing Scheduled Cleaning', description: 'Regular, consistent cleaning services' },
    { icon: Building2, title: 'High-Traffic Environments', description: 'Maintaining cleanliness in busy spaces' },
    { icon: Shield, title: 'Hygiene & Safety Standards', description: 'Meeting compliance and safety requirements' }
  ];

  const serviceSolutions = [
    { icon: Users, title: 'Reliable & Punctual Staff', description: 'Dependable cleaning professionals' },
    { icon: Award, title: 'Fully Trained & Vetted', description: 'Qualified and background-checked personnel' },
    { icon: Clock, title: 'Flexible Support', description: 'Short-term and long-term arrangements' },
    { icon: Sparkles, title: 'Consistent Quality', description: 'Attention to detail in every service' },
    { icon: Shield, title: 'Health & Safety Compliance', description: 'Meeting all regulatory standards' }
  ];

  const cleaningTypes = [
    { icon: Building2, title: 'Commercial & Office Cleaning', description: 'Professional workspace maintenance' },
    { icon: Heart, title: 'Care & Healthcare Facilities', description: 'Specialized cleaning for medical environments' },
    { icon: Home, title: 'Residential & Communal', description: 'Living spaces and shared areas' },
    { icon: Droplets, title: 'Deep & Specialist Cleaning', description: 'Thorough and specialized services' },
    { icon: Wind, title: 'Ongoing Contract Cleaning', description: 'Regular scheduled maintenance' }
  ];

  const processSteps = [
    { icon: Search, title: 'Cleaning Requirement Assessment', description: 'Understanding your specific needs and standards.' },
    { icon: Clock, title: 'Scheduling & Staffing', description: 'Arranging the right team at the right time.' },
    { icon: Users, title: 'Deployment of Trained Staff', description: 'Professional cleaners ready to work.' },
    { icon: FileCheck, title: 'Quality Monitoring', description: 'Regular checks and feedback collection.' },
    { icon: CheckCircle, title: 'Ongoing Support', description: 'Continuous adjustments and improvements.' }
  ];

  const qualityStandards = [
    { icon: Shield, title: 'Health & Safety Compliance', description: 'Full adherence to regulations' },
    { icon: Droplets, title: 'Proper Cleaning Procedures', description: 'Industry-standard methods' },
    { icon: Heart, title: 'Hygiene & Infection Control', description: 'Preventing contamination and spread' },
    { icon: Users, title: 'Reliable Supervision', description: 'Accountable team management' },
    { icon: Award, title: 'Consistent Service Delivery', description: 'Maintaining high standards' }
  ];

  const benefits = [
    { icon: Sparkles, title: 'Clean & Safe Environments', description: 'Healthy spaces for everyone' },
    { icon: Zap, title: 'Reduced Disruption', description: 'Minimal impact on operations' },
    { icon: Target, title: 'Flexible & Scalable', description: 'Services that grow with your needs' },
    { icon: Shield, title: 'Reliable Service', description: 'Dependable cleaning you can trust' }
  ];

  const testimonials = [
    { quote: "The cleaning team from Consulate has been exceptional. They're reliable, thorough, and always maintain the highest standards in our care facility.", author: "Emma Richardson", role: "Facility Manager", company: "Greenwood Care Home", rating: 5 },
    { quote: "We've been using their cleaning services for over a year. The consistency and quality have been outstanding, and they're always responsive to our needs.", author: "David Chen", role: "Operations Director", company: "Metro Office Solutions", rating: 5 }
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

      <section className="pt-32 pb-20 bg-gradient-to-br from-azure via-azureSoft to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent rounded-full blur-3xl animate-float-delayed"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className={`inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-6 backdrop-blur-sm transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Sparkles className="w-4 h-4 mr-2" />Professional Cleaning Services
            </div>
            <h1 className={`text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Professional Cleaning Services<span className="block text-yellow-300 mt-2">You Can Rely On</span>
            </h1>
            <p className={`text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Reliable, high-quality cleaning support to maintain safe, hygienic, and well-managed environments. Cleaning support ensures consistency, safety, and compliance without disruption to daily operations.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <a href="#contact" className="inline-flex items-center px-8 py-4 bg-white text-azure font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Request Cleaning Support<ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a href="#services" className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-azure transition-all duration-300">
                View Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-bg via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">When You Need Us</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">When Our Cleaning Services Are Needed</h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">Professional cleaning support for every situation, ensuring your spaces remain clean, safe, and welcoming.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {whenNeeded.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} data-animate className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-azure/10 hover:border-azure/30 group stagger-${index + 1}`}>
                  <div className="w-14 h-14 bg-gradient-to-br from-azure to-primaryLight rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-primary/70">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">Our Solutions</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">Our Cleaning Service Solution</h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">What makes our cleaning service dependable, professional, and trusted by organizations across sectors.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {serviceSolutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <div key={index} data-animate className={`bg-gradient-to-br from-azure/5 to-primaryLight/5 p-6 rounded-xl border border-azure/10 hover:border-azure/30 transition-all duration-300 hover:shadow-lg stagger-${index + 1}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-azure to-primaryLight rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{solution.title}</h3>
                  <p className="text-sm text-primary/70">{solution.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-gradient-to-br from-bg via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">Service Types</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">Types of Cleaning Services We Provide</h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">Comprehensive cleaning solutions tailored to your specific environment and requirements.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {cleaningTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <div key={index} data-animate className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-azure/10 hover:border-azure/30 group stagger-${index + 1}`}>
                  <div className="w-14 h-14 bg-gradient-to-br from-azure to-primaryLight rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{type.title}</h3>
                  <p className="text-sm text-primary/70">{type.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">Our Process</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">How Our Cleaning Service Works</h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">A clear, structured approach to delivering consistent, high-quality cleaning services.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} data-animate className={`bg-gradient-to-br from-azure/5 to-primaryLight/5 p-6 rounded-xl border border-azure/10 hover:border-azure/30 transition-all duration-300 hover:shadow-lg stagger-${index + 1}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-azure to-primaryLight rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-primary/70">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-bg via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">Quality Assurance</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">Quality, Safety & Standards</h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">Our commitment to excellence, compliance, and trust in every cleaning service we provide.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {qualityStandards.map((standard, index) => {
              const Icon = standard.icon;
              return (
                <div key={index} data-animate className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-azure/10 hover:border-azure/30 group stagger-${index + 1}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-azure to-primaryLight rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{standard.title}</h3>
                  <p className="text-sm text-primary/70">{standard.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">Client Benefits</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">Benefits to Your Organisation</h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">Value-driven outcomes that make a real difference to your operations and environment.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} data-animate className={`bg-gradient-to-br from-azure/5 to-primaryLight/5 p-6 rounded-xl border border-azure/10 hover:border-azure/30 transition-all duration-300 hover:shadow-lg stagger-${index + 1}`}>
                  <div className="w-14 h-14 bg-gradient-to-br from-azure to-primaryLight rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{benefit.title}</h3>
                  <p className="text-sm text-primary/70">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-bg via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">Client Success Stories</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">What Our Clients Say</h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">Real feedback from organizations we've helped maintain clean, safe environments.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} data-animate className={`bg-white p-8 rounded-2xl border border-azure/10 hover:border-azure/30 transition-all duration-300 hover:shadow-lg stagger-${index + 1}`}>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-primary/80 leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-azure to-primaryLight rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{testimonial.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.author}</p>
                    <p className="text-sm text-primary/60">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gradient-to-br from-azure via-azureSoft to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent rounded-full blur-3xl animate-float-delayed"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-animate>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">Ready for Professional Cleaning Support?</h2>
              <p className="text-lg text-white/90 leading-relaxed mb-8">Whether you need regular cleaning services or emergency cover, we're here to help. Get in touch to discuss your cleaning requirements.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Call us</p>
                    <a href="tel:+01623 255223" className="text-white font-semibold hover:text-yellow-300 transition-colors">+44 7438 733336</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Email us</p>
                    <a href="mailto:admin@consulaterecruitment.co.uk" className="text-white font-semibold hover:text-yellow-300 transition-colors">admin@consulaterecruitment.co.uk</a>
                  </div>
                </div>
              </div>
            </div>
            <div data-animate className="stagger-1">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">Request a Cleaning Quote</h3>
                <form 
                  action="https://formsubmit.co/admin@consulaterecruitment.co.uk"
                  method="POST"
                  onSubmit={handleSubmit} 
                  className="space-y-4"
                >
                  {/* FormSubmit Configuration */}
                  <input type="hidden" name="_subject" value="Cleaning Services Request" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  
                  <div>
                    <label htmlFor="name" className="block text-white/90 text-sm font-medium mb-2">Your Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm" placeholder="John Smith" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white/90 text-sm font-medium mb-2">Email Address *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-white/90 text-sm font-medium mb-2">Company Name</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm" placeholder="Your Company" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-white/90 text-sm font-medium mb-2">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm" placeholder="+44 7XXX XXXXXX" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-white/90 text-sm font-medium mb-2">Tell us about your cleaning needs *</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows="4" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm resize-none" placeholder="Please describe your cleaning requirements, including facility type, frequency, and any specific needs..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-white text-azure font-semibold py-4 px-6 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <Send className="w-5 h-5" />Send Request
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

export default CleaningServicesPage;
