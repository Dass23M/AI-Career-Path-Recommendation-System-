"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-10 text-lg">Have a question or need support? Send us a message and we'll get back to you as soon as possible.</p>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" id="name" required className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="email" required className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea id="message" rows={5} required className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="How can we help you?"></textarea>
            </div>
            <button type="submit" className="w-full bg-gray-900 text-white font-medium py-3 rounded-md hover:bg-gray-800 transition-colors">
              Send Message
            </button>
            {submitted && (
              <p className="text-green-600 font-medium mt-3">Thank you! Your message has been sent.</p>
            )}
          </form>
        </div>
        <div className="space-y-8 bg-gray-50 p-8 rounded-lg">
          <div>
            <h3 className="text-xl font-semibold mb-2">Email Support</h3>
            <p className="text-gray-600">support@careerai.com</p>
            <p className="text-gray-600 mt-1">We aim to respond within 24 hours.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Business Inquiries</h3>
            <p className="text-gray-600">partnerships@careerai.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Office</h3>
            <p className="text-gray-600">123 AI Boulevard<br/>Tech District<br/>San Francisco, CA 94107</p>
          </div>
        </div>
      </div>
    </div>
  );
}
