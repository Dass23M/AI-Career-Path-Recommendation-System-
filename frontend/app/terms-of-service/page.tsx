export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">1. Acceptance of Terms</h2>
          <p>By accessing and using CareerAI, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">2. Provision of Services</h2>
          <p>CareerAI provides AI-powered career prediction, skill gap analysis, and educational roadmaps. You agree and acknowledge that CareerAI is entitled to modify, improve or discontinue any of its services at its sole discretion and without notice to you even if it may result in you being prevented from accessing any information contained in it.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">3. Proprietary Rights</h2>
          <p>You acknowledge and agree that CareerAI may contain proprietary and confidential information including trademarks, service marks and patents protected by intellectual property laws and international intellectual property treaties. CareerAI authorizes you to view and make a single copy of portions of its content for offline, personal, non-commercial use. Our content may not be sold, reproduced, or distributed without our written permission.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">4. Disclaimer of Warranties</h2>
          <p>You understand and agree that your use of CareerAI is entirely at your own risk and that our services are provided "As Is" and "As Available". CareerAI does not make any express or implied warranties, endorsements or representations whatsoever as to the operation of the CareerAI website, information, content, materials, or products.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">5. Limitation of Liability</h2>
          <p>You understand and agree that CareerAI and any of its subsidiaries or affiliates shall in no event be liable for any direct, indirect, incidental, consequential, or exemplary damages. This shall include, but not be limited to damages for loss of profits, business interruption, business reputation or goodwill, loss of programs or information or other intangible loss arising out of the use of or the inability to use the service, or information, or any permanent or temporary cessation of such service or access to information, or the deletion or corruption of any content or information, or the failure to store any content or information.</p>
        </section>
      </div>
    </div>
  );
}
