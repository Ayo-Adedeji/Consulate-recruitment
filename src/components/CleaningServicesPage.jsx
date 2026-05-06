import { useState, useEffect } from 'react';
import {
  Sparkles, CheckCircle, ArrowRight, Shield, Award, Clock,
  Users, Building2, Heart, Home, Droplets, Wind,
  Search, FileCheck, Phone, Mail, Send, Star, Zap, Target,
  Sun, Calendar, Layers
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import cleaningBg from '../assets/cleaning_lady.jpg';
import frame1 from '../assets/frame1.jpeg';
import frame2 from '../assets/frame2.jpeg';
import frame3 from '../assets/frame3.jpeg';
import frame4 from '../assets/frame4.jpeg';
import frame5 from '../assets/frame5.jpeg';
import frame6 from '../assets/frame6.jpeg';
import gardenOne from '../assets/one.jpeg';
import gardenTwo from '../assets/two.jpeg';
import gardenThree from '../assets/three.jpeg';

const CleaningServicesPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('daily');
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
    e.target.submit();
  };

  const cleaningTypes = [
    { icon: Building2, title: 'Commercial & Office Cleaning', description: 'Professional workspace maintenance for productive environments.' },
    { icon: Heart, title: 'Care & Healthcare Facilities', description: 'Specialized cleaning meeting strict hygiene standards for medical settings.' },
    { icon: Home, title: 'Residential & Communal', description: 'Living spaces and shared areas kept spotless and welcoming.' },
    { icon: Droplets, title: 'Deep & Specialist Cleaning', description: 'Thorough treatments for areas requiring intensive attention.' },
    { icon: Wind, title: 'Ongoing Contract Cleaning', description: 'Reliable scheduled maintenance you can count on every time.' }
  ];

  const processSteps = [
    { icon: Search, step: '01', title: 'Requirement Assessment', description: 'We understand your specific needs, standards, and schedule.' },
    { icon: Clock, step: '02', title: 'Scheduling & Staffing', description: 'The right team arranged at the right time for your space.' },
    { icon: Users, step: '03', title: 'Deployment', description: 'Trained, vetted professionals arrive ready to deliver.' },
    { icon: FileCheck, step: '04', title: 'Quality Monitoring', description: 'Regular checks and feedback to maintain high standards.' },
    { icon: CheckCircle, step: '05', title: 'Ongoing Support', description: 'Continuous adjustments so service always improves.' }
  ];

  const cleaningBenefits = {
    daily: [
      { title: 'Improved Health & Hygiene', description: 'Regular cleaning reduces dust, allergens, and bacteria, lowering the risk of respiratory issues and illness.' },
      { title: 'Pest Prevention', description: 'Removing food crumbs and spills eliminates the primary attractants for ants, cockroaches, and rodents.' },
      { title: 'Reduced Stress & Anxiety', description: 'A tidy environment minimizes visual clutter, lowering cortisol levels and promoting mental clarity.' },
      { title: 'Efficient Time Management', description: 'A few minutes each day prevents overwhelming multi-hour cleaning sessions during your free time.' },
      { title: 'Extended Asset Lifespan', description: 'Daily removal of grit and dust prevents premature wear on flooring, furniture, and upholstery.' },
      { title: 'Enhanced Safety', description: 'Keeping walkways clear of debris reduces the risk of trips and falls for all household members.' },
      { title: 'Better Air Quality', description: 'Frequent dusting and vacuuming remove airborne particles, creating a fresher indoor environment.' },
      { title: 'Increased Productivity', description: 'An organized space allows for better focus and saves time otherwise spent searching for misplaced items.' },
    ],
    weekly: [
      { title: 'Deep Allergen Removal', description: 'Weekly vacuuming of upholstery, rugs, and curtains combined with laundering bed linens eliminates dust mites.' },
      { title: 'Bacteria Eradication', description: 'Disinfecting bathrooms and kitchens once a week prevents mold, mildew, and harmful bacteria.' },
      { title: 'Appliance Efficiency', description: 'Cleaning filters and wiping out microwaves weekly prevents grime buildup and keeps appliances running efficiently.' },
      { title: 'Floor Preservation', description: 'A weekly deep mop or steam clean removes sticky residues and ingrained dirt that daily sweeping cannot reach.' },
      { title: 'Inventory Management', description: 'Clearing out the refrigerator and pantry weekly helps identify expired items and reduce food waste.' },
      { title: 'Odor Control', description: 'Deep cleaning trash bins, drains, and pet areas once a week neutralizes lingering odors at their source.' },
      { title: 'Visual Restoration', description: 'Polishing mirrors and glass surfaces weekly removes smudges, brightening the home with more natural light.' },
      { title: 'Structural Inspection', description: 'A weekly cleaning session serves as an informal inspection, allowing you to spot minor issues before they become costly.' },
    ],
    deep: [
      { title: 'Comprehensive Sanitization', description: 'Deep cleaning moves furniture and appliances to reach hidden areas where dust, mold, and bacteria accumulate.' },
      { title: 'Indoor Air Quality Restoration', description: 'Cleaning HVAC vents and deep-cleaning carpets removes deeply embedded pollutants that compromise the air you breathe.' },
      { title: 'Elimination of Hidden Allergens', description: 'Intensive cleaning targets hotspots like tops of tall cabinets, baseboards, and behind large appliances.' },
      { title: 'Surface Restoration', description: 'Steam cleaning grout or conditioning leather furniture restores surfaces to their original appearance.' },
      { title: 'Pest Infestation Prevention', description: 'Reaching into the deepest corners of pantries and storage areas removes potential nesting sites for insects.' },
      { title: 'Maximized Property Value', description: 'Consistent deep cleaning prevents permanent damage, keeping fixtures in showroom condition.' },
      { title: 'Mental Refreshment', description: 'The thoroughness of a deep clean provides a unique sense of renewal and order.' },
      { title: 'Appliance Longevity', description: 'Cleaning refrigerator coils and washing machine drums ensures expensive assets operate at peak efficiency for years.' },
    ]
  };

  const tabs = [
    { id: 'daily', label: 'Daily Cleaning', icon: Sun },
    { id: 'weekly', label: 'Weekly Cleaning', icon: Calendar },
    { id: 'deep', label: 'Deep Cleaning', icon: Layers },
  ];

  const testimonials = [
    { quote: "The cleaning team from Consulate has been exceptional. They're reliable, thorough, and always maintain the highest standards in our care facility.", author: "Emma Richardson", role: "Facility Manager", company: "Greenwood Care Home", rating: 5 },
    { quote: "We've been using their cleaning services for over a year. The consistency and quality have been outstanding, and they're always responsive to our needs.", author: "David Chen", role: "Operations Director", company: "Metro Office Solutions", rating: 5 },
  ];

  const gardenPhotos = [
    { src: gardenOne, caption: 'Outdoor garden cleaning, Sutton in Ashfield' },
    { src: gardenTwo, caption: 'Garden restoration, Sutton in Ashfield' },
    { src: gardenThree, caption: 'Completed outdoor clean, Sutton in Ashfield' },
  ];

  const deliverables = [
    { image: frame1, caption: 'Bedroom Cleaning' },
    { image: frame2, caption: 'Guest Room Cleaning' },
    { image: frame3, caption: 'Living Room Cleaning' },
    { image: frame4, caption: 'Appliance Cleaning' },
    { image: frame5, caption: 'Deep Cleaning' },
    { image: frame6, caption: 'Post-Tenancy Cleaning' },
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

      {/* Hero */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center text-center overflow-hidden bg-cover bg-center mt-24"
        style={{ backgroundImage: `url(${cleaningBg})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
          <div className={`inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-6 backdrop-blur-sm transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Sparkles className="w-4 h-4 mr-2" />Professional Cleaning Services
          </div>
          <h1 className={`text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            Professional Cleaning Services
            <span className="block text-yellow-300 mt-2">You Can Rely On</span>
          </h1>
          <p className={`text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            Reliable, high-quality cleaning support to maintain safe, hygienic, and well-managed environments — without disruption to your daily operations.
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <a href="#contact" className="inline-flex items-center px-8 py-4 bg-white text-azure font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Request Cleaning Support <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a href="#services" className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-azure transition-all duration-300">
              View Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section id="services" className="py-20 bg-gradient-to-br from-bg via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">What We Do</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Types of Cleaning Services</h2>
            <p className="text-lg text-primary/70 max-w-2xl mx-auto">From daily office upkeep to specialist deep cleans, we cover every environment with the same attention to detail.</p>
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

      {/* Our Deliverables */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">Our Work</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Our Deliverables</h2>
            <p className="text-lg text-primary/70 max-w-2xl mx-auto">A glimpse of the spaces we transform — clean, safe, and ready for use.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((item, index) => (
              <div key={index} data-animate className={`group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 stagger-${index + 1}`}>
                <div className="overflow-hidden h-56">
                  <img src={item.image} alt={item.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="bg-gradient-to-br from-azure/5 to-primaryLight/5 border border-azure/10 px-5 py-4">
                  <p className="text-primary font-semibold text-center">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cleaning Benefits Tabs */}
      <section className="py-20 bg-gradient-to-br from-bg via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">Why It Matters</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">The Real Benefits of a Cleaning Routine</h2>
            <p className="text-lg text-primary/70 max-w-2xl mx-auto">Whether it's a quick daily tidy or a thorough deep clean, every level of cleaning delivers measurable results.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-10" data-animate>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${activeTab === tab.id ? 'bg-azure text-white shadow-lg shadow-azure/30' : 'bg-azure/10 text-azure hover:bg-azure/20'}`}>
                  <Icon className="w-4 h-4" />{tab.label}
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cleaningBenefits[activeTab].map((benefit, index) => (
              <div key={`${activeTab}-${index}`} className="bg-white p-5 rounded-xl border border-azure/10 hover:border-azure/30 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-azure mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-primary text-sm mb-1">{benefit.title}</h4>
                    <p className="text-xs text-primary/65 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">Our Process</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">How It Works</h2>
            <p className="text-lg text-primary/70 max-w-2xl mx-auto">A clear, structured approach so you always know what to expect from us.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} data-animate className={`relative bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-azure/10 hover:border-azure/30 group stagger-${index + 1}`}>
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-azure text-white text-xs font-bold rounded-full flex items-center justify-center shadow">{step.step}</div>
                  <div className="w-12 h-12 bg-gradient-to-br from-azure to-primaryLight rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-primary/70">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-bg via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">Client Success Stories</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">What Our Clients Say</h2>
            <p className="text-lg text-primary/70 max-w-2xl mx-auto">Real feedback from organisations we've helped maintain clean, safe environments.</p>
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

      {/* Garden Cleaning Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">Outdoor Cleaning</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Garden & Outdoor Cleaning</h2>
            <p className="text-lg text-primary/70 max-w-2xl mx-auto">We also handle outdoor spaces — from garden clearances to full exterior cleans, leaving every area spotless.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {gardenPhotos.map((photo, index) => (
              <div key={index} data-animate className={`group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 stagger-${index + 1}`}>
                <div className="overflow-hidden h-64">
                  <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="bg-gradient-to-br from-azure/5 to-primaryLight/5 border border-azure/10 px-5 py-4">
                  <p className="text-primary font-semibold text-center text-sm">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-gradient-to-br from-azure via-azureSoft to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent rounded-full blur-3xl animate-float-delayed"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-animate>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">Ready for Professional Cleaning Support?</h2>
              <p className="text-lg text-white/90 leading-relaxed mb-4">Whether you need regular cleaning services or emergency cover, we're here to help.</p>
              <p className="text-white/80 leading-relaxed mb-8">Get in touch to discuss your cleaning requirements and we'll arrange the right team for you.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Call us</p>
                    <a href="tel:+447438733336" className="text-white font-semibold hover:text-yellow-300 transition-colors">+44 7438 733336</a>
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
                <form action="https://formsubmit.co/admin@consulaterecruitment.co.uk" method="POST" onSubmit={handleSubmit} className="space-y-4">
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
                    <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows="4" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm resize-none" placeholder="Describe your requirements — facility type, frequency, and any specific needs..."></textarea>
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
