import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';

const TermsConditions = () => {
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
              Terms and Conditions
            </h1>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="text-sm text-gray-500 mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <p>
                  Welcome to Consulate Recruitment. These Terms and Conditions ("Terms", "Terms and Conditions") 
                  govern your use of our website operated by Consulate Recruitment ("us", "we", or "our").
                </p>
                <p>
                  Your access to and use of the Service is conditioned on your acceptance of and compliance with 
                  these Terms. These Terms apply to all visitors, users and others who access or use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Acceptance of Terms</h2>
                <p>
                  By accessing and using this website, you accept and agree to be bound by the terms and provision 
                  of this agreement. Additionally, when using this website's particular services, you shall be 
                  subject to any posted guidelines or rules applicable to such services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Use License</h2>
                <p>
                  Permission is granted to temporarily download one copy of the materials on Consulate Recruitment's 
                  website for personal, non-commercial transitory viewing only. This is the grant of a license, 
                  not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on the website</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Recruitment Services</h2>
                <p>
                  Consulate Recruitment provides professional recruitment and staffing services. By using our 
                  services, you agree to:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Provide accurate and truthful information</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Respect the confidentiality of client and candidate information</li>
                  <li>Use our services in good faith</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Privacy Policy</h2>
                <p>
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your 
                  use of the Service, to understand our practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Prohibited Uses</h2>
                <p>You may not use our service:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Disclaimer</h2>
                <p>
                  The materials on Consulate Recruitment's website are provided on an 'as is' basis. 
                  Consulate Recruitment makes no warranties, expressed or implied, and hereby disclaims and 
                  negates all other warranties including without limitation, implied warranties or conditions 
                  of merchantability, fitness for a particular purpose, or non-infringement of intellectual 
                  property or other violation of rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitations</h2>
                <p>
                  In no event shall Consulate Recruitment or its suppliers be liable for any damages 
                  (including, without limitation, damages for loss of data or profit, or due to business 
                  interruption) arising out of the use or inability to use the materials on Consulate 
                  Recruitment's website, even if Consulate Recruitment or an authorized representative 
                  has been notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Revisions</h2>
                <p>
                  The materials appearing on Consulate Recruitment's website could include technical, 
                  typographical, or photographic errors. Consulate Recruitment does not warrant that 
                  any of the materials on its website are accurate, complete, or current. Consulate 
                  Recruitment may make changes to the materials contained on its website at any time 
                  without notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
                <p>
                  If you have any questions about these Terms and Conditions, please contact us at:
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

export default TermsConditions;