import { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  CheckCircle, 
  AlertCircle,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Users,
  Zap,
  Shield
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Create email content
      const emailSubject = `Contact Form: ${formData.subject} - ${formData.inquiryType.toUpperCase()}`;
      
      let emailBody = `NEW CONTACT FORM SUBMISSION\n\n`;
      emailBody += `CONTACT INFORMATION:\n`;
      emailBody += `Name: ${formData.name}\n`;
      emailBody += `Email: ${formData.email}\n`;
      emailBody += `Phone: ${formData.phone || 'Not provided'}\n`;
      emailBody += `Company: ${formData.company || 'Not provided'}\n\n`;
      
      emailBody += `INQUIRY DETAILS:\n`;
      emailBody += `Type: ${formData.inquiryType.charAt(0).toUpperCase() + formData.inquiryType.slice(1)} Inquiry\n`;
      emailBody += `Subject: ${formData.subject}\n\n`;
      
      emailBody += `MESSAGE:\n`;
      emailBody += `${formData.message}\n\n`;
      
      emailBody += `SUBMISSION DETAILS:\n`;
      emailBody += `Date: ${new Date().toLocaleDateString()}\n`;
      emailBody += `Time: ${new Date().toLocaleTimeString()}\n`;
      emailBody += `Source: Website Contact Form\n`;
      
      // Create mailto link
      const mailtoLink = `mailto:admin@consulaterecruitment.co.uk?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          inquiryType: 'general'
        });
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'recruitment', label: 'Recruitment Services' },
    { value: 'job', label: 'Job Opportunities' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'support', label: 'Support' }
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: '#', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: FaLinkedinIn, href: '#', label: 'LinkedIn', color: 'hover:text-blue-700' },
    { icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Office',
      content: '71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ',
      color: 'text-red-500'
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: 'admin@consulaterecruitment.co.uk',
      color: 'text-blue-500',
      link: 'mailto:admin@consulaterecruitment.co.uk'
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '01623255223',
      color: 'text-green-500',
      link: 'tel:01623255223'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM',
      color: 'text-purple-500'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Quick Response',
      description: 'We reply to all inquiries within 24 hours'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Professional recruitment specialists ready to help'
    },
    {
      icon: Shield,
      title: 'Confidential',
      description: 'Your information is secure and handled with care'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-azure via-azureSoft to-primary relative overflow-hidden">
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
            <MessageCircle className="h-8 w-8 text-white opacity-20" />
          </div>
          <div className="absolute top-40 right-1/4 animate-float-delayed">
            <Mail className="h-6 w-6 text-accent opacity-30" />
          </div>
          <div className="absolute bottom-40 left-1/3 animate-float">
            <Phone className="h-7 w-7 text-white opacity-25" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Animated Title */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h1 className="text-4xl md:text-6xl font-bold text-white font-heading mb-6 leading-tight">
                Get In
                <span className="block text-accent animate-pulse">Touch</span>
              </h1>
            </div>
            
            {/* Animated Subtitle */}
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
                Ready to take the next step? We're here to help with all your recruitment needs
              </p>
            </div>

            {/* Animated Feature Cards */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {features.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <feature.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                  <h3 className="text-white font-semibold text-lg">{feature.title}</h3>
                  <p className="text-blue-100 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-current text-bg">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <main className="pb-12 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 flex items-center shadow-lg animate-fadeInUp">
              <div className="bg-green-100 rounded-full p-2 mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-green-800 font-semibold">Message Sent Successfully!</h3>
                <p className="text-green-700">Thank you for contacting us. We'll get back to you within 24 hours.</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6 flex items-center shadow-lg animate-fadeInUp">
              <div className="bg-red-100 rounded-full p-2 mr-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-red-800 font-semibold">Please Check Your Information</h3>
                <p className="text-red-700">Please correct the errors below and try again.</p>
              </div>
            </div>
          )}

          {/* Main Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            {/* Left Side - Contact Info & Social Links */}
            <div className="space-y-8">
              
              {/* Contact Information */}
              <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-2xl shadow-soft p-8 border border-blue-100/50 hover:shadow-lg transition-all duration-300 animate-fadeInUp">
                <h2 className="text-3xl font-bold text-primary font-heading mb-8 flex items-center">
                  <div className="bg-gradient-to-r from-azure to-azureSoft rounded-xl p-3 mr-4 shadow-md">
                    <MessageCircle className="h-7 w-7 text-white" />
                  </div>
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start group hover:bg-blue-50/50 p-4 rounded-xl transition-all duration-300">
                      <div className={`${info.color} bg-gray-50 rounded-lg p-3 mr-4 group-hover:scale-110 transition-transform duration-300`}>
                        <info.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-primary mb-1">{info.title}</h3>
                        {info.link ? (
                          <a 
                            href={info.link} 
                            className="text-footerText hover:text-azure transition-colors duration-300 whitespace-pre-line"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-footerText whitespace-pre-line">{info.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media Links */}
              <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-2xl shadow-soft p-8 border border-purple-100/50 hover:shadow-lg transition-all duration-300 animate-fadeInUp">
                <h2 className="text-2xl font-bold text-primary font-heading mb-6 flex items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-3 mr-4 shadow-md">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  Follow Us
                </h2>
                
                <p className="text-footerText mb-6">
                  Stay connected with us on social media for the latest updates, job opportunities, and industry insights.
                </p>
                
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`bg-gray-100 hover:bg-white p-4 rounded-xl text-gray-600 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-md group`}
                      aria-label={social.label}
                    >
                      <social.icon className="h-6 w-6 group-hover:animate-bounce" />
                    </a>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200/50">
                  <p className="text-sm text-primary font-medium">
                    💬 <strong>Quick Tip:</strong> Follow us on LinkedIn for exclusive job postings and career advice!
                  </p>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-gradient-to-br from-white to-green-50/30 rounded-2xl shadow-soft p-8 border border-green-100/50 hover:shadow-lg transition-all duration-300 animate-fadeInUp">
                <h2 className="text-2xl font-bold text-primary font-heading mb-6 flex items-center">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-3 mr-4 shadow-md">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  Why Choose Us?
                </h2>
                
                <ul className="space-y-3 text-footerText">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Over 10 years of recruitment experience</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Personalized service for every client</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Fast response times - within 24 hours</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Comprehensive recruitment solutions</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-gradient-to-br from-white to-orange-50/20 rounded-2xl shadow-soft p-8 border border-orange-100/50 hover:shadow-lg transition-all duration-300 animate-fadeInUp">
                <h2 className="text-3xl font-bold text-primary font-heading mb-8 flex items-center">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-3 mr-4 shadow-md">
                    <Send className="h-7 w-7 text-white" />
                  </div>
                  Send Us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Inquiry Type */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-primary mb-3 group-hover:text-orange-600 transition-colors">
                      What can we help you with? <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-orange-500/50"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-primary mb-3 group-hover:text-orange-600 transition-colors">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-orange-500/50 ${
                          errors.name ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-2 animate-fadeIn">{errors.name}</p>}
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-semibold text-primary mb-3 group-hover:text-orange-600 transition-colors">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-orange-500/50 ${
                          errors.email ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                        }`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-2 animate-fadeIn">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Phone and Company Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-primary mb-3 group-hover:text-orange-600 transition-colors">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-orange-500/50"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-semibold text-primary mb-3 group-hover:text-orange-600 transition-colors">
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-orange-500/50"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-primary mb-3 group-hover:text-orange-600 transition-colors">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-orange-500/50 ${
                        errors.subject ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                      }`}
                      placeholder="What's this about?"
                    />
                    {errors.subject && <p className="text-red-500 text-sm mt-2 animate-fadeIn">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-primary mb-3 group-hover:text-orange-600 transition-colors">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={6}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-orange-500/50 resize-none ${
                        errors.message ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                      }`}
                      placeholder="Tell us more about your inquiry..."
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-2 animate-fadeIn">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full inline-flex items-center justify-center px-8 py-5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-bold text-lg rounded-2xl hover:from-amber-500 hover:via-orange-600 hover:to-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-2xl shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-4"></div>
                          <span className="animate-pulse">Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-6 w-6 mr-4 group-hover:animate-bounce" />
                          <span>Send Message</span>
                          <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </>
                      )}
                    </button>
                    
                    <p className="text-footerText text-sm mt-4 text-center">
                      We'll respond to your message within 24 hours
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;