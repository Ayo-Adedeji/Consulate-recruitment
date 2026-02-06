import { Calendar, Clock, Users, CheckCircle, ArrowRight, Star, Award, Briefcase, Phone, Mail } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const ConsultationsPage = () => {
  const calendlyLink = "https://calendly.com/admin-consulaterecruitment";

  const handleBookConsultation = () => {
    window.location.href = calendlyLink;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-azure via-azureSoft to-primary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6 leading-tight drop-shadow-2xl">
              Consultations
            </h1>
            
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-lg mb-10">
              Book a consultation with our experts to discuss your staffing needs and discover tailored solutions
            </p>

            <button
              onClick={handleBookConsultation}
              className="inline-flex items-center px-8 py-4 bg-white text-azure font-bold text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <Calendar className="mr-3 h-6 w-6" />
              Book Your Consultation Now
              <ArrowRight className="ml-3 h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-current text-blue-50">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary font-heading mb-4">
              Choose Your Consultation Type
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Select the consultation that best matches your needs. Our experts are ready to provide personalized guidance and solutions.
            </p>
          </div>

          {/* Consultation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={handleBookConsultation}>
              <div className="bg-blue-50 rounded-lg p-3 w-fit mb-4">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 font-heading">Recruitment Consultation</h3>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">Discuss your staffing needs and find the perfect candidates for your organization.</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">30 minutes</span>
                </div>
                <div className="flex items-center text-azure hover:text-azureSoft transition-colors">
                  <span className="text-sm font-medium mr-2">Book Now</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-emerald-200 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={handleBookConsultation}>
              <div className="bg-emerald-50 rounded-lg p-3 w-fit mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 font-heading">Staffing Solutions</h3>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">Explore flexible staffing options including temporary, permanent, and contract placements.</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">45 minutes</span>
                </div>
                <div className="flex items-center text-azure hover:text-azureSoft transition-colors">
                  <span className="text-sm font-medium mr-2">Book Now</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={handleBookConsultation}>
              <div className="bg-purple-50 rounded-lg p-3 w-fit mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 font-heading">Management Services</h3>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">Learn about our comprehensive management services and ongoing support solutions.</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">30 minutes</span>
                </div>
                <div className="flex items-center text-azure hover:text-azureSoft transition-colors">
                  <span className="text-sm font-medium mr-2">Book Now</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-orange-200 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={handleBookConsultation}>
              <div className="bg-orange-50 rounded-lg p-3 w-fit mb-4">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 font-heading">Cleaning Services</h3>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">Discuss professional cleaning solutions tailored to your facility's specific needs.</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">30 minutes</span>
                </div>
                <div className="flex items-center text-azure hover:text-azureSoft transition-colors">
                  <span className="text-sm font-medium mr-2">Book Now</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-azure/10 to-purple/10 rounded-xl p-6 border border-azure/20 mb-12">
            <h3 className="text-xl font-bold text-primary mb-4 text-center">
              Why Book a Consultation?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-azure/10 rounded-full p-3 w-fit mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-azure" />
                </div>
                <h4 className="font-semibold text-primary mb-2 text-sm">Expert Guidance</h4>
                <p className="text-gray-600 text-xs">Get personalized advice from our experienced recruitment professionals</p>
              </div>
              
              <div className="text-center">
                <div className="bg-azure/10 rounded-full p-3 w-fit mx-auto mb-3">
                  <Users className="h-6 w-6 text-azure" />
                </div>
                <h4 className="font-semibold text-primary mb-2 text-sm">Tailored Solutions</h4>
                <p className="text-gray-600 text-xs">Receive customized staffing solutions that fit your specific needs</p>
              </div>
              
              <div className="text-center">
                <div className="bg-azure/10 rounded-full p-3 w-fit mx-auto mb-3">
                  <Star className="h-6 w-6 text-azure" />
                </div>
                <h4 className="font-semibold text-primary mb-2 text-sm">No Obligation</h4>
                <p className="text-gray-600 text-xs">Free consultation with no commitment - just valuable insights</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-primary mb-4">
              Prefer to Talk Directly?
            </h3>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a 
                href="tel:+01623 255223" 
                className="flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-lg hover:bg-emerald-200 transition-colors text-sm"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Us: +01623 255223
              </a>
              <a 
                href="mailto:admin@consulaterecruitment.co.uk?subject=Consultation%20Request&body=Hello%20Consulate%20Recruitment%20Team,%0D%0A%0D%0AI%20would%20like%20to%20schedule%20a%20consultation%20to%20discuss:%0D%0A%0D%0A[Please%20describe%20your%20needs%20here]%0D%0A%0D%0ABest%20regards," 
                className="flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email: admin@consulaterecruitment.co.uk
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ConsultationsPage;