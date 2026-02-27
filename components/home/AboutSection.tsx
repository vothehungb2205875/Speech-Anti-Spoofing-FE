"use client";

import { useState } from "react";
import { AudioSamples } from "./AudioSamples";
import { DollarSign, Shield, Heart, Film, Scale, Briefcase, X, ExternalLink } from "lucide-react";

export function AboutSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const industriesData = [
    {
      id: "banking",
      title: "Banking & Finance",
      description: "Vulnerable to voice fraud and manipulation",
      icon: DollarSign,
      story: "In 2024, a financial employee at the Hong Kong branch of multinational company Arup was tricked into transferring a total of $25 million (about 200 million HKD) through 15 transactions. The scammer sent a fake email from the CFO, then organized a video conference call where all participants (including the CFO and colleagues) were deepfakes, with voices and images AI-cloned from real videos. The employee initially suspected but trusted because 'the voice and image were identical', leading to total loss before discovering the fraud after 1 week.",
      link: "https://edition.cnn.com/2024/02/04/asia/deepfake-cfo-scam-hong-kong-intl-hnk",
    },
    {
      id: "government",
      title: "Government",
      description: "Vulnerable to voice fraud and manipulation",
      icon: Shield,
      story: "In 2024, before the US presidential primary election in New Hampshire, thousands of voters received automated robocalls with a deepfake voice that sounded exactly like President Joe Biden. The fake voice advised 'don't vote today, it only helps Republicans win, wait until November'. This was an election interference plot using speech deepfake, orchestrated by political consultant Steve Kramer. The FCC fined $6 million, New Hampshire filed criminal charges for voter suppression, and the calling service provider (Lingo Telecom) faced an additional $1 million fine.",
      link: "https://www.npr.org/2024/05/23/nx-s1-4977582/fcc-ai-deepfake-robocall-biden-new-hampshire-political-operative",
    },
    {
      id: "healthcare",
      title: "Healthcare",
      description: "Vulnerable to voice fraud and manipulation",
      icon: Heart,
      story: "From 2024-2025, numerous renowned doctors were cloned in voice and image to advertise fake products on social media and YouTube. A typical example: Dr. Sir Jim Mann (renowned diabetes specialist at University of Otago, New Zealand) was used in deepfake videos fake 'health news', advising type 2 diabetes patients to stop using metformin (standard drug) and switch to hemp chewing gum or fake health supplements. The AMA (American Medical Association) warned this is a public health threat, causing patients to lose money, health, and trust in real medical advice.",
      link: "https://www.medpagetoday.com/special-reports/features/113679",
    },
    {
      id: "media",
      title: "Media & Entertainment",
      description: "Vulnerable to voice fraud and manipulation",
      icon: Film,
      story: "In 2023, YouTuber MrBeast and BBC presenters (Matthew Amroliwala, Sally Bundock) were used in a series of deepfake videos that went viral on TikTok and social media. Fake MrBeast videos 'giving away free iPhones' or BBC presenters reading 'breaking news' about investment opportunities, with voices and images cloned to lure viewers to click on scam links. Millions of views, many victims lost money thinking it was official content from celebrities.",
      link: "https://www.bbc.com/news/technology-66993651",
    },
    {
      id: "legal",
      title: "Legal & Law Enforcement",
      description: "Vulnerable to voice fraud and manipulation",
      icon: Scale,
      story: "In 2024, at Pikesville High School (Maryland, USA), athletic director Dazhon Darien used AI to clone the voice of principal Eric Eiswert to create an audio recording with racist and antisemitic slurs. The recording went viral, causing the principal to be investigated internally and facing public backlash. Police had to hire forensic experts to analyze it, confirm it was a deepfake, and then arrest Darien. This is a typical example of deepfakes being used as 'fake evidence' directly affecting law enforcement investigations.",
      link: "https://apnews.com/article/ai-maryland-principal-voice-recording-663d5bc0714a3af221392cc6f1af985e",
    },
    {
      id: "corporate",
      title: "Corporate",
      description: "Vulnerable to voice fraud and manipulation",
      icon: Briefcase,
      story: "In 2019, the CEO of a British energy company was tricked into transferring $243,000 (about €220,000) through just one phone call. The scammer used AI to clone the voice of the parent company's CEO in Germany, pretending to issue an urgent order to transfer money to a 'Hungarian supplier'. This was one of the first successful deepfake voice cases recorded, proving that a fake voice alone is enough for senior employees to follow orders without needing to meet in person.",
      link: "https://www.wsj.com/articles/fraudsters-use-ai-to-mimic-ceos-voice-in-unusual-cybercrime-case-11567157402",
    },
  ];
  return (
    <section id="about" className="py-12 md:py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 md:mb-4">
            Understanding Speech Deepfakes
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Learn about the technology, risks, and how we're fighting against voice manipulation
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-14">
          {/* What is Speech Deepfake */}
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              What is Speech Deepfake?
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Speech deepfakes are synthetic audio files created using artificial intelligence and machine learning to accurately imitate a person's voice. These can be used to:
            </p>
            <ul className="space-y-2 text-sm md:text-base text-gray-600">
              <li className="flex gap-3">
                <span className="text-cyan-600 font-bold flex-shrink-0">•</span>
                <span>Impersonate individuals in phone calls or recordings</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-600 font-bold flex-shrink-0">•</span>
                <span>Manipulate public opinion through false statements</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-600 font-bold flex-shrink-0">•</span>
                <span>Commit fraud and social engineering attacks</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-600 font-bold flex-shrink-0">•</span>
                <span>Damage reputation and credibility</span>
              </li>
            </ul>
          </div>

          {/* Audio Demo Placeholder */}
          <div className="bg-white rounded-2xl p-8 flex items-center justify-center min-h-64 md:min-h-auto shadow-sm">
            <div className="w-full">
              <AudioSamples />
            </div>
          </div>
        </div>

        {/* Affected Industries */}
        <div>
          <div className="mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Industries at Risk
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Real-world cases show how deepfakes have already impacted critical sectors. Click each card to learn the story.
            </p>
          </div>

          {/* Industries Icon Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {expandedId ? (
              // Expanded View
              <div className="sm:col-span-2 md:col-span-3 rounded-xl p-6 md:p-8 bg-white border border-cyan-400 shadow-lg">
                {industriesData.map((industry) => {
                  if (industry.id !== expandedId) return null;
                  const IconComponent = industry.icon;
                  return (
                    <div key={industry.id} className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="text-cyan-600">
                            <IconComponent className="w-16 h-16" />
                          </div>
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{industry.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">Real case study</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedId(null)}
                          className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          aria-label="Close"
                        >
                          <X className="w-6 h-6 text-gray-400" />
                        </button>
                      </div>
                      <div className="border-t pt-4">
                        <p className="text-base text-gray-700 leading-relaxed">{industry.story}</p>
                      </div>
                      <div className="pt-4 border-t flex gap-3">
                        <a
                          href={industry.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-colors"
                        >
                          Learn More
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setExpandedId(null)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Grid View
              industriesData.map((industry) => {
                const IconComponent = industry.icon;
                return (
                  <button
                    key={industry.id}
                    onClick={() => setExpandedId(industry.id)}
                    className="rounded-xl p-6 md:p-8 bg-gray-50 border border-gray-200 hover:border-cyan-400 hover:bg-cyan-50 transition-all min-h-48 flex flex-col items-center justify-center text-center group cursor-pointer"
                  >
                    <IconComponent className="w-12 h-12 text-gray-800 group-hover:text-cyan-600 transition-colors mb-4" />
                    <h4 className="font-semibold text-base md:text-lg text-gray-900 mb-2">{industry.title}</h4>
                    <p className="text-xs md:text-sm text-gray-600 mb-3">{industry.description}</p>
                    <span className="text-xs font-medium text-cyan-600 group-hover:text-cyan-700">Click to learn →</span>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Our Mission */}
        <div className="mt-12 md:mt-14 bg-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-sm">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Our Mission
          </h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
            YUNX Detektion is dedicated to protecting individuals, organizations, and institutions from the threats posed by synthetic audio. Using advanced neural networks and spectral analysis, we provide enterprise-grade detection capabilities to identify and prevent voice fraud.
          </p>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            As deepfake technology becomes more sophisticated, the need for reliable detection solutions has never been greater. We're committed to staying ahead of these threats and providing the tools necessary to maintain trust and security in voice communications.
          </p>
        </div>
      </div>
    </section>
  );
}
