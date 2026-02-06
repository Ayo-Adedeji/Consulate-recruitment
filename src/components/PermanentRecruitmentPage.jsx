import { useState, useEffect } from 'react';
import { 
  Users, 
  CheckCircle, 
  ArrowRight,
  Shield,
  Award,
  Target,
  TrendingUp,
  UserCheck,
  Briefcase,
  Heart,
  ClipboardCheck,
  Search,
  FileCheck,
  Phone,
  Mail,
  Send,
  Star
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const PermanentRecruitmentPage = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const rolesAvailable = [
    { icon: Briefcase, title: 'Operation Managers', description: 'Strategic leaders to oversee daily operations' },
    { icon: Award, title: 'Registered Managers', description: 'Qualified professionals for care home management' },
    { icon: Users, title: 'Team Leads', description: 'Experienced supervisors to guide your teams' },
    { icon: UserCheck, title: 'Support Workers', description: 'Dedicated professionals for care and support' },
    { icon: Heart, title: 'Care Assistants', description: 'Compassionate carers for quality patient care' },
    { icon: ClipboardCheck, title: 'Pharmacy Assistants', description: 'Skilled assistants for pharmacy operations' }
  ];

  const processSteps = [
    {
      icon: Search,
      title: 'Consultation & Role Analysis',
      description: 'Understanding your needs, culture, and specific requirements for the role.'
    },
    {
      icon: Users,
      title: 'Candidate Sourcing',
      description: 'Targeted search through our extensive talent pool and professional networks.'
    },
    {
      icon: Shield,
      title: 'Screening & Vetting',
      description: 'Thorough interviews, background checks, and reference verification.'
    },
    {
      icon: FileCheck,
      title: 'Shortlisting & Selection',
      description: 'Presenting only the best-fit candidates who match your criteria.'
    },
    {
      icon: CheckCircle,
      title: 'Placement & Aftercare',
      description: 'Ongoing support post-hire to ensure long-term success.'
    }
  ];

  const whyChooseUs = [
    {
      icon: Target,
      title: 'Industry-Specific Expertise',
      description: 'Deep knowledge of healthcare, care, and professional services sectors.'
    },
    {
      icon: Shield,
      title: 'Rigorous Screening',
      description: 'Comprehensive compliance checks and thorough vetting processes.'
    },
    {
      icon: Award,
      title: 'Tailored Strategies',
      description: 'Custom recruitment approaches designed for your unique needs.'
    },
    {
      icon: TrendingUp,
      title: 'Transparent Communication',
      description: 'Clear updates and honest feedback throughout the process.'
    }
  ];

  const benefits = [
    { icon: Shield, title: 'Reduced Hiring Risk', description: 'Thoroughly vetted candidates minimize placement failures' },
    { icon: TrendingUp, title: 'Time & Cost Savings', description: 'Efficient process reduces recruitment overhead' },
    { icon: Users, title: 'Workforce Stability', description: 'Long-term placements build consistent teams' },
    { icon: Award, title: 'Improved Performance', description: 'Quality hires drive better business outcomes' }
  ];

  const whoItsFor = [
    'Care homes seeking qualified management and care staff',
    'Healthcare providers building reliable clinical teams',
    'Corporate organisations expanding their workforce',
    'Growing businesses requiring long-term staffing stability',
    'Organisations focused on reducing staff turnover'
  ];

  const testimonials = [
    {
      quote: "We've successfully secured permanent staff who remain committed and productive long-term. The quality of candidates has been exceptional.",
      author: "Michael Davies",
      role: "Care Home Director",
      company: "Oakwood Care",
      rating: 5
    },
    {
      quote: "Their understanding of our needs and the caliber of candidates they provide has made them our trusted recruitment partner.",
      author: "Lisa Anderson",
      role: "HR Manager",
      company: "HealthCare Plus",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
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
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className={`inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-6 backdrop-blur-sm transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Briefcase className="w-4 h-4 mr-2" />
              Permanent Recruitment
            </div>
            
            <h1 className={`text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Permanent Recruitment Solutions
              <span className="block text-yellow-300 mt-2">You Can Trust</span>
            </h1>
            
            <p className={`text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              We help organisations secure skilled, long-term talent that fits their culture, values, and business goals. When it comes to permanent recruitment, we connect you with a diverse pool of talented professionals who are ready to contribute to your team for the long term.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-4 bg-white text-azure font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Request a Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="#roles"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-azure transition-all duration-300"
              >
                View Available Roles
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Service Is For */}
      <section className="py-20 bg-gradient-to-br from-bg via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">
              Who We Serve
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              Who This Service Is For
            </h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">
              Our permanent recruitment service is designed for organisations looking to build reliable, committed teams — not just fill vacancies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whoItsFor.map((item, index) => (
              <div
                key={index}
                data-animate
                className={`flex items-start gap-3 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-azure/10 stagger-${index + 1}`}
              >
                <CheckCircle className="w-6 h-6 text-azure flex-shrink-0 mt-0.5" />
                <p className="text-primary/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Permanent Recruitment Means */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-animate>
              <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">
                Our Approach
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                What Permanent Recruitment Means at Consulate
              </h2>
              <p className="text-lg text-primary/70 leading-relaxed mb-6">
                Permanent recruitment is more than matching CVs to roles. We focus on understanding your organisation, identifying the right talent, and delivering candidates who stay, grow, and perform.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-azure/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-azure" />
                  </div>
                  <span className="text-primary/80">Long-term placements that build stable teams</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-azure/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-azure" />
                  </div>
                  <span className="text-primary/80">Cultural fit assessment for seamless integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-azure/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-azure" />
                  </div>
                  <span className="text-primary/80">Reduced turnover through quality matching</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-azure/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-azure" />
                  </div>
                  <span className="text-primary/80">Quality over speed, with efficient processes</span>
                </div>
              </div>
            </div>

            <div data-animate className="stagger-1">
              <div className="bg-gradient-to-br from-azure/10 to-primaryLight/10 rounded-2xl p-8 border border-azure/20">
                <p className="text-primary/80 leading-relaxed mb-6">
                  Whether you're expanding your workforce, filling critical roles, or looking for fresh expertise, our candidates are carefully vetted to meet your requirements and align with your organizational goals.
                </p>
                <p className="text-primary/80 leading-relaxed">
                  We manage the entire recruitment process, allowing you to focus on building a strong, committed team that drives your success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Available Section */}
      <section id="roles" className="py-20 bg-gradient-to-br from-bg via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">
              Available Positions
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              Roles We Recruit For
            </h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">
              From frontline care to senior management, we recruit across all levels to support your organisation's growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rolesAvailable.map((role, index) => {
              const Icon = role.icon;
              return (
                <div
                  key={index}
                  data-animate
                  className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-azure/10 hover:border-azure/30 group stagger-${index + 1}`}
                >
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

      {/* Our Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">
              Our Process
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              How We Work
            </h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">
              A structured, transparent approach to finding the right permanent talent for your organisation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  data-animate
                  className={`bg-gradient-to-br from-azure/5 to-primaryLight/5 p-6 rounded-xl border border-azure/10 hover:border-azure/30 transition-all duration-300 hover:shadow-lg stagger-${index + 1}`}
                >
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

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-bg via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">
              Why Consulate
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              Why Choose Us for Permanent Recruitment
            </h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">
              We combine industry expertise with a commitment to quality, ensuring every placement is a success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  data-animate
                  className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-azure/10 hover:border-azure/30 group stagger-${index + 1}`}
                >
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

      {/* Candidate Quality & Compliance Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-animate>
              <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">
                Quality Assurance
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                Candidate Quality & Compliance
              </h2>
              <p className="text-lg text-primary/70 leading-relaxed mb-6">
                Every candidate we present undergoes rigorous screening to ensure they meet the highest standards of professionalism, compliance, and competence.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-azure/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-5 h-5 text-azure" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Full Compliance Checks</h4>
                    <p className="text-sm text-primary/70">DBS checks, right to work verification, and professional registrations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-azure/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FileCheck className="w-5 h-5 text-azure" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Reference Verification</h4>
                    <p className="text-sm text-primary/70">Thorough reference checks with previous employers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-azure/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <UserCheck className="w-5 h-5 text-azure" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Skills Assessment</h4>
                    <p className="text-sm text-primary/70">Competency evaluations and qualification verification</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-azure/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-5 h-5 text-azure" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Cultural Fit Analysis</h4>
                    <p className="text-sm text-primary/70">Ensuring alignment with your organisation's values and culture</p>
                  </div>
                </div>
              </div>
            </div>

            <div data-animate className="stagger-1">
              <div className="bg-gradient-to-br from-azure to-primaryLight rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Commitment to Excellence</h3>
                <p className="text-white/90 leading-relaxed mb-6">
                  We don't just fill positions — we build partnerships. Our thorough vetting process ensures that every candidate we present is not only qualified but also committed to long-term success within your organisation.
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <p className="text-white/90 italic">
                    "Quality recruitment is about finding people who will grow with your organisation, not just fill a vacancy."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-bg via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">
              Client Benefits
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              What You Gain
            </h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">
              Partnering with us for permanent recruitment delivers measurable value to your organisation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  data-animate
                  className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-azure/10 hover:border-azure/30 group stagger-${index + 1}`}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-azure to-primaryLight rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-animate>
            <div className="inline-flex items-center px-4 py-2 bg-azure/10 text-azure text-sm font-medium rounded-full mb-4">
              Client Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              What Our Clients Say
            </h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">
              Real feedback from organisations we've helped build stronger teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                data-animate
                className={`bg-gradient-to-br from-azure/5 to-primaryLight/5 p-8 rounded-2xl border border-azure/10 hover:border-azure/30 transition-all duration-300 hover:shadow-lg stagger-${index + 1}`}
              >
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

      {/* Contact/CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-azure via-azureSoft to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-animate>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                Ready to Build Your Team?
              </h2>
              <p className="text-lg text-white/90 leading-relaxed mb-8">
                Let's discuss your permanent recruitment needs. Whether you're looking to fill one role or build an entire department, we're here to help you find the right talent.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Call us</p>
                    <a href="tel:+447438733336" className="text-white font-semibold hover:text-yellow-300 transition-colors">
                      +01623 255223
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Email us</p>
                    <a href="mailto:admin@consulaterecruitment.co.uk" className="text-white font-semibold hover:text-yellow-300 transition-colors">
                      admin@consulaterecruitment.co.uk
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div data-animate className="stagger-1">
              <form 
                action="https://formsubmit.co/admin@consulaterecruitment.co.uk"
                method="POST"
                onSubmit={handleSubmit} 
                className="bg-white rounded-2xl p-8 shadow-2xl"
              >
                {/* FormSubmit Configuration */}
                <input type="hidden" name="_subject" value="Permanent Recruitment Consultation Request" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                
                <h3 className="text-2xl font-bold text-primary mb-6">Request a Consultation</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azure focus:border-transparent transition-all"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azure focus:border-transparent transition-all"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-primary mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azure focus:border-transparent transition-all"
                      placeholder="Your Company Ltd"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azure focus:border-transparent transition-all"
                      placeholder="+44 7XXX XXXXXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                      Tell us about your needs *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azure focus:border-transparent transition-all resize-none"
                      placeholder="What roles are you looking to fill?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-azure to-primaryLight text-white font-semibold py-4 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    Send Message
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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

export default PermanentRecruitmentPage;
