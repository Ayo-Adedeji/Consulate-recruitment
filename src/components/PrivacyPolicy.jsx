import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';

const PrivacyPolicy = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Privacy Policy
            </h1>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="text-sm text-gray-500 mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <p>
                  Consulate Recruitment ("we", "our", or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how your personal information is collected, used, and 
                  disclosed by Consulate Recruitment when you visit our website or use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
                <p>We may collect personal information that you provide to us, such as:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Name and contact information (email, phone number, address)</li>
                  <li>Resume and employment history</li>
                  <li>Educational background</li>
                  <li>Professional qualifications and certifications</li>
                  <li>References and recommendations</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Automatically Collected Information</h3>
                <p>When you visit our website, we may automatically collect:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>IP address and browser information</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website information</li>
                  <li>Device and operating system information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Provide recruitment and staffing services</li>
                  <li>Match candidates with suitable job opportunities</li>
                  <li>Communicate with you about job opportunities and services</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                  <li>Protect our rights and prevent fraud</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing</h2>
                <p>We may share your information with:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><strong>Employers:</strong> When you apply for positions or we recommend you for opportunities</li>
                  <li><strong>Service Providers:</strong> Third parties who assist us in operating our business</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                </ul>
                <p className="mt-4">
                  We do not sell, rent, or trade your personal information to third parties for marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. However, 
                  no method of transmission over the internet or electronic storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Retention</h2>
                <p>
                  We retain your personal information for as long as necessary to fulfill the purposes 
                  outlined in this Privacy Policy, unless a longer retention period is required or 
                  permitted by law. We may retain certain information for legitimate business purposes 
                  or legal compliance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
                <p>Depending on your location, you may have the right to:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your personal information</li>
                  <li>Object to processing of your information</li>
                  <li>Request data portability</li>
                  <li>Withdraw consent (where applicable)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies and Tracking</h2>
                <p>
                  Our website may use cookies and similar tracking technologies to enhance your 
                  experience. You can control cookie settings through your browser preferences. 
                  Some features of our website may not function properly if cookies are disabled.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Third-Party Links</h2>
                <p>
                  Our website may contain links to third-party websites. We are not responsible for 
                  the privacy practices or content of these external sites. We encourage you to 
                  review the privacy policies of any third-party sites you visit.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  material changes by posting the new Privacy Policy on this page and updating 
                  the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or our privacy practices, 
                  please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <p><strong>Consulate Recruitment</strong></p>
                  <p>Email: admin@consulaterecruitment.co.uk</p>
                  <p>Website: www.consulaterecruitment.co.uk</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default PrivacyPolicy;