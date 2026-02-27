"use client";

import { useState } from "react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is a speech deepfake?",
      answer:
        "A speech deepfake is synthetic audio created using AI and machine learning algorithms to replicate a person's voice and speech patterns. It can be used to create convincing fake audio recordings that impersonate real individuals.",
    },
    {
      question: "How does YUNX Detektion detect deepfakes?",
      answer:
        "Our system uses advanced neural networks (XLSR-SLS model) combined with spectral analysis to examine audio files. We analyze voice patterns, acoustic features, and digital artifacts that are signatures of AI-generated speech versus authentic human voices.",
    },
    {
      question: "What's the accuracy rate of your detection system?",
      answer:
        "Our XLSR-SLS speech deepfake detection model achieves highly accurate detection results across various audio conditions. The exact accuracy depends on audio quality and deepfake generation method, but we continuously improve our model performance.",
    },
    {
      question: "What audio formats are supported?",
      answer:
        "We support common audio formats including MP3, WAV, FLAC, M4A, and OGG. Files are processed with automatic format detection, and we recommend high-quality audio (16kHz or higher) for optimal detection accuracy.",
    },
    {
      question: "Is my data secure when using YUNX Detektion?",
      answer:
        "Yes, security and privacy are paramount. All audio files are processed securely and are not stored or shared. We use encryption for data transmission and follow strict data protection protocols to ensure your voice communications remain confidential.",
    },
    {
      question: "Can the system detect both voice conversion and text-to-speech?",
      answer:
        "Yes, our detection system is designed to identify various types of speech synthesis techniques, including voice conversion and text-to-speech generated audio. We continuously update our models to detect emerging deepfake technologies.",
    },
    {
      question: "What should I do if I detect a deepfake?",
      answer:
        "If you detect a speech deepfake, document when and where you encountered it. Report it to relevant authorities or platforms where it was shared. If it impersonates you or causes harm, consider legal action. Use YUNX Detektion to verify suspected deepfakes.",
    },
    {
      question: "Is there an API available for enterprise use?",
      answer:
        "Yes, we offer a Detection API for enterprise customers. Our API allows integration into existing systems for automated deepfake detection. Contact our sales team for enterprise licensing and API documentation.",
    },
  ];

  return (
    <section id="faq" className="py-12 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 md:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Everything you need to know about speech deepfake detection
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 md:py-5 flex items-start justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-sm md:text-base text-gray-900 leading-relaxed">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 mt-1">
                  <svg
                    className={`w-5 h-5 text-cyan-600 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 md:py-5 border-t border-gray-200 bg-gray-50">
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
