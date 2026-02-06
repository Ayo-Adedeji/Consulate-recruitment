import { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle,
  MessageCircle,
  Users,
  Zap
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';
import Toast from './Toast';

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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  // Animation trigger and success detection
  useEffect(() => {
    setIsVisible(true);
    
    // Check if user was redirected back after form submission
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submitted') === 'true') {
      setSubmitStatus('success');
      setToastType('success');
      setToastMessage('Message sent successfully! We\'ll get back to you within 24 hours.');
      setShowToast(true);
      // Clean up URL
      window.history.replaceState({}, '', '/contact');
    }
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
      setToastType('error');
      setToastMessage('Please fill in all required fields correctly');
      setShowToast(true);
      return;
    }
    
    // If validation passes, submit the form to FormSubmit
    e.target.submit();
  };

  const socialLinks = [
    { icon: FaFacebookF, href: '#', label: 'Facebook', color: 'hover:text-blue-600', bg: 'hover:bg-blue-50' },
    { icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:text-pink-600', bg: 'hover:bg-pink-50' },
    { icon: FaLinkedinIn, href: '#', label: 'LinkedIn', color: 'hover:text-blue-700', bg: 'hover:bg-blue-50' },
    { icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400', bg: 'hover:bg-blue-50' }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: '71-75 Shelton Street, Covent Garden\nLondon, United Kingdom, WC2H 9JQ',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'admin@consulaterecruitment.co.uk',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: 'mailto:admin@consulaterecruitment.co.uk'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '01623255223',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      link: 'tel:01623255223'
    },
    {
      icon: Clock,
      title: 'Hours',
      content: 'Mon-Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
      
      <Navbar />
      
      {/* Enhanced Header with Animation */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-azure via-azureSoft to-primary relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-16 h-16 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-12 h-12 bg-accent rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-white rounded-full animate-ping"></div>
        </div>
        
        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 animate-float">
            <MessageCircle className="h-6 w-6 text-white opacity-20" />
          </div>
          <div className="absolute top-40 right-1/4 animate-float-delayed">
            <Mail className="h-5 w-5 text-accent opacity-30" />
          </div>
          <div className="absolute bottom-40 left-1/3 animate-float">
            <Phone className="h-5 w-5 text-white opacity-25" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mb-4">
                Contact Us
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                Get in touch with our recruitment specialists. We're here to help with all your staffing needs.
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Zap className="h-6 w-6 text-accent mx-auto mb-2" />
                <h3 className="text-white font-semibold">Quick Response</h3>
                <p className="text-blue-100 text-sm">Within 24 hours</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Users className="h-6 w-6 text-accent mx-auto mb-2" />
                <h3 className="text-white font-semibold">Expert Team</h3>
                <p className="text-blue-100 text-sm">Professional specialists</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <CheckCircle className="h-6 w-6 text-accent mx-auto mb-2" />
                <h3 className="text-white font-semibold">Trusted Service</h3>
                <p className="text-blue-100 text-sm">10+ years experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-current text-blue-50">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <main className="pb-16 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          
          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 flex items-center shadow-lg animate-fadeInUp">
              <div className="bg-green-100 rounded-full p-2 mr-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-green-800 font-semibold">Message sent successfully!</h3>
                <p className="text-green-700 text-sm">We'll get back to you within 24 hours.</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-4 flex items-center shadow-lg animate-fadeInUp">
              <div className="bg-red-100 rounded-full p-2 mr-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-red-800 font-semibold">Please check your information</h3>
                <p className="text-red-700 text-sm">Correct the errors below and try again.</p>
              </div>
            </div>
          )}

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Side - Contact Info with Colorful Design */}
            <div className="space-y-6">
              
              {/* Contact Information */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300 animate-fadeInLeft">
                <div className="flex items-center mb-6">
                  <div className="bg-white/20 rounded-xl p-3 mr-4">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Get In Touch</h2>
                </div>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start group hover:bg-white/10 p-3 rounded-xl transition-all duration-300">
                      <div className={`${info.bgColor} rounded-lg p-2 mr-4 group-hover:scale-110 transition-transform duration-300`}>
                        <info.icon className={`h-5 w-5 ${info.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                        {info.link ? (
                          <a 
                            href={info.link} 
                            className="text-blue-100 hover:text-white transition-colors duration-300 whitespace-pre-line text-sm"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-blue-100 whitespace-pre-line text-sm">{info.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300 animate-fadeInLeft">
                <div className="flex items-center mb-4">
                  <div className="bg-white/20 rounded-xl p-3 mr-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold">Follow Us</h2>
                </div>
                <p className="text-pink-100 text-sm mb-4">
                  Connect with us on social media for updates and opportunities.
                </p>
                
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`bg-white/20 hover:bg-white/30 p-3 rounded-xl text-white transition-all duration-300 hover:scale-110 hover:rotate-6 group`}
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5 group-hover:animate-bounce" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300 animate-fadeInLeft">
                <div className="flex items-center mb-3">
                  <div className="bg-white/20 rounded-xl p-2 mr-3">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg">Quick Response</h3>
                </div>
                <p className="text-emerald-100 text-sm">
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please call us directly.
                </p>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="animate-fadeInRight">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-azure to-azureSoft rounded-xl p-3 mr-4">
                    <Send className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">Send a Message</h2>
                </div>
                
                <form 
                  action="https://formsubmit.co/admin@consulaterecruitment.co.uk" 
                  method="POST"
                  onSubmit={handleSubmit} 
                  className="space-y-5"
                >
                  {/* FormSubmit Configuration Fields */}
                  <input type="hidden" name="_subject" value="New Contact Form Submission" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_next" value={`${window.location.origin}/contact?submitted=true`} />
                  
                  {/* Inquiry Type */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-azure transition-colors">
                      Inquiry Type
                    </label>
                    <select
                      name="inquiry_type"
                      value={formData.inquiryType}
                      onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-azure/20 focus:border-azure transition-all duration-300 bg-white hover:border-azure/50 group-hover:border-azure/50"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="recruitment">Recruitment Services</option>
                      <option value="job">Job Opportunities</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-azure transition-colors">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-azure/20 focus:border-azure transition-all duration-300 bg-white hover:border-azure/50 group-hover:border-azure/50 ${
                          errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1 animate-fadeIn">{errors.name}</p>}
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-azure transition-colors">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-azure/20 focus:border-azure transition-all duration-300 bg-white hover:border-azure/50 group-hover:border-azure/50 ${
                          errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1 animate-fadeIn">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Phone and Company */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-azure transition-colors">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-azure/20 focus:border-azure transition-all duration-300 bg-white hover:border-azure/50 group-hover:border-azure/50"
                        placeholder="Your phone number"
                      />
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-azure transition-colors">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-azure/20 focus:border-azure transition-all duration-300 bg-white hover:border-azure/50 group-hover:border-azure/50"
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-azure transition-colors">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-azure/20 focus:border-azure transition-all duration-300 bg-white hover:border-azure/50 group-hover:border-azure/50 ${
                        errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="Brief subject line"
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1 animate-fadeIn">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-azure transition-colors">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      rows={5}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-azure/20 focus:border-azure transition-all duration-300 bg-white hover:border-azure/50 group-hover:border-azure/50 resize-none ${
                        errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="Your message..."
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1 animate-fadeIn">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-azure via-azureSoft to-primary text-white font-semibold rounded-xl hover:from-azureSoft hover:via-primary hover:to-azure focus:outline-none focus:ring-4 focus:ring-azure/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-lg shadow-md"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-3 group-hover:animate-bounce" />
                          Send Message
                        </>
                      )}
                    </button>
                    
                    <p className="text-gray-600 text-sm mt-3 text-center">
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