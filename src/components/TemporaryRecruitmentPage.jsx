import { useState, useEffect } from 'react';
import { 
  Users, CheckCircle, ArrowRight, Shield, Award, Clock,
  TrendingUp, UserCheck, Briefcase, Heart, ClipboardCheck,
  Search, FileCheck, Phone, Mail, Send, Star, Calendar, Zap, Target
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const TemporaryRecruitmentPage = () => {
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
    const emailSubject = `Temporary Recruitment Request - ${formData.name}`;
    const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'Not provided'}\nPhone: ${formData.phone || 'Not provided'}\n\nMessage:\n${formData.message}\n\n---\nThis request was submitted from the Temporary Recruitment page.`.trim();
    const mailtoLink = `mailto:admin@consulaterecruitment.co.uk?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  const whenToUse = [
    { icon: Calendar, title: 'Holiday Cover', description: 'Maintain service levels during staff holidays' },
    { icon: Heart, title: 'Sickness & Emergency Absences', description: 'Quick replacements for unexpected absences' },
    { icon: Clock, title: 'Short-Term Contracts', description: 'Fixed-term project support' },
    { icon: TrendingUp, title: 'Peak & Busy Periods', description: 'Scale up during high-demand seasons' },
    { icon: Target, title: 'Project-Based Support', description: 'Specialist skills for specific initiatives' },
    { icon: Zap, title: 'Immediate Workforce Gaps', description: 'Fast solutions for urgent staffing needs' }
  ];

  const staffingSolutions = [
    { icon: Users, title: 'Ready-to-Work Talent Pool', description: 'Access to pre-screened professionals' },
    { icon: Shield, title: 'Pre-Screened & Compliant', description: 'All checks completed before placement' },
    { icon: Zap, title: 'Short-Notice Placements', description: 'Same-day availability where possible' },
    { icon: Clock, title: 'Flexible Contract Lengths', description: 'From days to months, tailored to your needs' },
    { icon: Award, title: 'Ongoing Support', description: 'Continuous monitoring during assignments' }
  ];

  const rolesAvailable = [
    { icon: UserCheck, title: 'Support Workers', description: 'Experienced care and support professionals' },
    { icon: Heart, title: 'Care Assistants', description: 'Compassionate carers for quality patient care' },
    { icon: Users, title: 'Children Workers', description: 'Qualified professionals for childcare settings' },
    { icon: Briefcase, title: 'Retail Assistants', description: 'Customer-focused retail staff' },
    { icon: ClipboardCheck, title: 'Pharmacy Assistants', description: 'Skilled assistants for pharmacy operations' },
    { icon: Heart, title: 'Homecare Workers', description: 'Dedicated professionals for home-based care' }
  ];

  const processSteps = [
    { icon: Search, title: 'Workforce Requirement Discussion', description: 'Understanding your immediate staffing needs and timeframes.' },
    { icon: Users, title: 'Candidate Selection', description: 'Matching from our ready-to-work talent pool.' },
    { icon: Shield, title: 'Compliance & Suitability Checks', description: 'Verifying all necessary qualifications and clearances.' },
    { icon: FileCheck, title: 'Placement & Shift Confirmation', description: 'Coordinating schedules and confirming assignments.' },
    { icon: CheckCircle, title: 'Ongoing Monitoring & Support', description: 'Continuous support throughout the assignment.' }
  ];

  const complianceChecks = [
    { icon: FileCheck, title: 'Experience & Qualification Verification', description: 'Confirming credentials and expertise' },
    { icon: Shield, title: 'Right-to-Work Checks', description: 'Legal employment verification' },
    { icon: UserCheck, title: 'Reference Checks', description: 'Thorough employment history validation' },
    { icon: Award, title: 'Role-Specific Compliance', description: 'Industry-specific certifications and training' },
    { icon: CheckCircle, title: 'Availability & Reliability', description: 'Ensuring commitment and dependability' }
  ];

  const benefits = [
    { icon: Zap, title: 'Reduced Downtime', description: 'Quick placements minimize service disruption' },
    { icon: Clock, title: 'Fast Response', description: 'Rapid solutions to urgent staffing gaps' },
    { icon: TrendingUp, title: 'Workforce Flexibility', description: 'Scale up or down as needed' },
    { icon: Shield, title: 'No Long-Term Risk', description: 'Temporary contracts without permanent commitment' }
  ];

  const whyChooseUs = [
    { icon: Zap, title: 'Fast Turnaround Times', description: 'Quick response to urgent needs' },
    { icon: Target, title: 'Industry Expertise', description: 'Specialized knowledge in care and support sectors' },
    { icon: Users, title: 'Strong Candidate Pool', description: 'Extensive network of qualified professionals' },
    { icon: CheckCircle, title: 'Transparent Communication', description: 'Clear updates throughout the process' },
    { icon: Award, title: 'Dedicated Support', description: 'Ongoing client and candidate assistance' }
  ];

  const testimonials = [
    { quote: "When we had an emergency staffing shortage, Consulate provided qualified temporary staff within 24 hours. Their responsiveness saved us from a critical situation.", author: "Sarah Mitchell", role: "Operations Manager", company: "CareFirst Services", rating: 5 },
    { quote: "The temporary staff we've received have been professional, reliable, and well-prepared. It's made managing our seasonal peaks so much easier.", author: "James Thompson", role: "HR Director", company: "HealthBridge Care", rating: 5 }
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
              <Clock className="w-4 h-4 mr-2" />Temporary Recruitment
            </div>
            <h1 className={`text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Temporary Recruitment<span className="block text-yellow-300 mt-2">When You Need It Most</span>
            </h1>
            <p className={`text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              When you need to fill workforce gaps, whether planned or on short notice, we have access to a wide pool of skilled professionals ready to step in when required.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <a href="#contact" className="inline-flex items-center px-8 py-4 bg-white text-azure font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Request Temporary Staff<ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a href="#roles" className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-azure transition-all duration-300">
                View Available Roles
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-bg via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">When to Use</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">When Temporary Recruitment Is the Right Choice</h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">Temporary recruitment provides fast, flexible staffing solutions without the long-term commitment of permanent hiring.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whenToUse.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} data-animate className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-azure/10 hover:border-azure/30 group stagger-${index + 1}`}>
                  <div className="w-14 h-14 bg-gradient-to-br from-azure to-primaryLight rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                  <p className="text-primary/70">{item.description}</p>
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
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">Our Temporary Staffing Solutions</h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">We handle the recruitment process, so you can stay focused on what matters most to your business.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {staffingSolutions.map((solution, index) => {
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

      <section id="roles" className="py-20 bg-gradient-to-br from-bg via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">Available Roles</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">Roles We Supply</h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">From care and support to retail and pharmacy, we provide temporary staff across multiple sectors.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rolesAvailable.map((role, index) => {
              const Icon = role.icon;
              return (
                <div key={index} data-animate className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-azure/10 hover:border-azure/30 group stagger-${index + 1}`}>
                  <div className="w-14 h-14 bg-gradient-to-br from-azure to-primaryLight rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{role.title}</h3>
                  <p className="text-primary/70">{role.description}</p>
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
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">How Our Temporary Recruitment Process Works</h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">A streamlined, efficient approach to getting you the staff you need, when you need them.</p>
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
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">Candidate Quality & Compliance</h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">Every temporary candidate undergoes thorough screening to ensure they meet the highest standards.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {complianceChecks.map((check, index) => {
              const Icon = check.icon;
              return (
                <div key={index} data-animate className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-azure/10 hover:border-azure/30 group stagger-${index + 1}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-azure to-primaryLight rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{check.title}</h3>
                  <p className="text-sm text-primary/70">{check.description}</p>
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
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">Flexible staffing solutions that keep your operations running smoothly.</p>
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
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">Why Consulate</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">Why Choose Us for Temporary Staffing</h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">Fast, reliable, and professional temporary recruitment services you can trust.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} data-animate className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-azure/10 hover:border-azure/30 group stagger-${index + 1}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-azure to-primaryLight rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
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
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">Client Success Stories</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">What Our Clients Say</h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">Real feedback from organisations we've helped with temporary staffing solutions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} data-animate className={`bg-gradient-to-br from-azure/5 to-primaryLight/5 p-8 rounded-2xl border border-azure/10 hover:border-azure/30 transition-all duration-300 hover:shadow-lg stagger-${index + 1}`}>
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
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">Need Temporary Staff Fast?</h2>
              <p className="text-lg text-white/90 leading-relaxed mb-8">Whether you need cover for a day, a week, or several months, we're here to help. Get in touch to discuss your temporary staffing needs.</p>
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
                <h3 className="text-2xl font-bold text-white mb-6">Request Temporary Staff</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <label htmlFor="message" className="block text-white/90 text-sm font-medium mb-2">Tell us about your staffing needs *</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows="4" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm resize-none" placeholder="Please describe your temporary staffing requirements, including roles needed, duration, and start date..."></textarea>
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

export default TemporaryRecruitmentPage;
