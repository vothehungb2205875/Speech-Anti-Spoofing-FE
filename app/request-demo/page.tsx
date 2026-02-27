"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";

export default function RequestDemoPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    useCase: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Send to backend if needed
      // const response = await axios.post("http://localhost:8000/request-demo", formData);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/request-demo`, formData);

      setSubmitted(true);
      setFormData({ fullName: "", email: "", company: "", useCase: "", message: "" });
      
      // Reset form after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 429) {
        setError("Too many requests. Please wait a few minutes before submitting again.");
      } else {
        setError("Failed to submit. Please try again or contact us directly.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {/* Header */}
      <header className="fixed w-full bg-[#020817]/80 backdrop-blur-md border-b border-white/8 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link href="/" className="font-bold text-lg md:text-xl text-white hover:text-cyan-400 transition-colors">
            YUNX DETEKTION
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 text-sm text-slate-400 flex-1 justify-center">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <a href="/#stats" className="hover:text-white transition-colors">
              Stats
            </a>
            <a href="/#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="/#demo" className="hover:text-white transition-colors">
              Demo
            </a>
            <a href="/#timeline" className="hover:text-white transition-colors">
              Roadmap
            </a>
            <a href="/#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          {/* Desktop Back Button */}
          <Link
            href="/"
            className="hidden md:inline-block bg-white text-black font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-cyan-300 transition-colors"
          >
            Back Home
          </Link>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Main Content */}
      <div className="pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-600">Request Demo</h1>
          <p className="text-gray-600 text-lg">
            Schedule a personalized demonstration of YUNX Detektion. Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        {submitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold text-green-800">Success!</p>
              <p className="text-sm text-green-700 mt-1">Your demo request has been submitted successfully. Check your email for confirmation. Our team will contact you within 24-48 hours.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold text-red-800">Error</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-5">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-800 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-gray-800 mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              placeholder="Your Company"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Use Case */}
          <div>
            <label htmlFor="useCase" className="block text-sm font-semibold text-gray-800 mb-2">
              Primary Use Case <span className="text-red-500">*</span>
            </label>
            <select
              id="useCase"
              name="useCase"
              value={formData.useCase}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            >
              <option value="">Select a use case</option>
              <option value="banking">Banking & Finance</option>
              <option value="government">Government & Defense</option>
              <option value="callcenter">Call Center Security</option>
              <option value="media">Media Verification</option>
              <option value="iot">IoT Integration</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-2">
              Additional Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us more about your requirements..."
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                  <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                Submitting...
              </>
            ) : (
              "Request Demo"
            )}
          </button>

          <p className="text-center text-xs text-gray-500">
            Or contact us directly at <a href="mailto:service@yunx-tek.com" className="text-cyan-600 hover:text-cyan-700 font-semibold">service@yunx-tek.com</a>
          </p>
        </form>
      </div>
      </div>
    </div>
  );
}
