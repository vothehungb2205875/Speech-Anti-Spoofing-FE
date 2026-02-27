export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10">
        {/* Branding Section - 1 col on mobile (full width), 2 on small tablet, 3 on medium */}
        <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <svg width="28" height="16" viewBox="0 0 40 24" fill="none">
              <rect x="0"  y="10" width="3" height="4"  rx="1.5" fill="#22d3ee"/>
              <rect x="5"  y="6"  width="3" height="12" rx="1.5" fill="#22d3ee"/>
              <rect x="10" y="2"  width="3" height="20" rx="1.5" fill="#22d3ee"/>
              <rect x="15" y="5"  width="3" height="14" rx="1.5" fill="#22d3ee"/>
              <rect x="20" y="0"  width="3" height="24" rx="1.5" fill="#22d3ee"/>
              <rect x="25" y="4"  width="3" height="16" rx="1.5" fill="#22d3ee"/>
              <rect x="30" y="7"  width="3" height="10" rx="1.5" fill="#22d3ee"/>
              <rect x="35" y="9"  width="3" height="6"  rx="1.5" fill="#22d3ee"/>
            </svg>
            <span className="text-white font-bold text-sm md:text-base tracking-wide">YUNX DETEKTION</span>
          </div>
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
            Enterprise-grade Speech Deepfake Detection powered by neural networks and advanced spectral analysis.
          </p>
        </div>

        {/* Products Section */}
        <div className="col-span-1">
          <h4 className="text-white font-semibold text-xs md:text-sm mb-4 tracking-wide">Products</h4>
          <ul className="space-y-2.5 text-xs md:text-sm">
            {["XLSR-SLS Model", "Detection API", "Edge SDK", "Batch Analyzer", "Support Center"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Solutions Section */}
        <div className="col-span-1">
          <h4 className="text-white font-semibold text-xs md:text-sm mb-4 tracking-wide">Solutions</h4>
          <ul className="space-y-2.5 text-xs md:text-sm">
            {["Banking & Finance", "Government Defense", "Call Center Security", "Media Verification", "IoT Integration"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Learn More Section */}
        <div className="col-span-1">
          <h4 className="text-white font-semibold text-xs md:text-sm mb-4 tracking-wide">Learn More</h4>
          <ul className="space-y-2.5 text-xs md:text-sm">
            {["About YUNX", "Case Studies", "Latest News", "Documentation", "FAQ"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="col-span-1">
          <h4 className="text-white font-semibold text-xs md:text-sm mb-4 tracking-wide">Contact Us</h4>
          <ul className="space-y-2.5 md:space-y-3 text-xs md:text-sm">
            <li className="flex items-start gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-shrink-0">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.13 1 .37 1.97.72 2.9a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.93.35 1.9.6 2.9.72A2 2 0 0122 14.93v2z" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="leading-relaxed">02-2500-0081</span>
            </li>
            <li className="flex items-start gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-shrink-0">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M22 6l-10 7L2 6" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="break-all">service@yunx-tek.com</span>
            </li>
            <li className="flex items-start gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-shrink-0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#22d3ee" strokeWidth="1.5"/>
                <circle cx="12" cy="10" r="3" stroke="#22d3ee" strokeWidth="1.5"/>
              </svg>
              <span className="leading-relaxed text-xs md:text-sm">3F., No. 329-1, Longjiang Rd.,<br/>Zhongshan Dist., Taipei City</span>
            </li>
          </ul>

          <div className="flex gap-2 mt-4 md:mt-5">
            {[
              { label: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
              { label: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
              { label: "YouTube", path: "M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 001.46 6.42A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
            ].map((s) => (
              <a key={s.label} href="#" aria-label={s.label}
                className="w-8 h-8 rounded border border-white/10 flex items-center justify-center hover:border-cyan-400/50 hover:text-cyan-400 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d={s.path} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
        <span className="text-center sm:text-left">© 2026 YUNX Detektion. All rights reserved.</span>
        <div className="flex gap-3 sm:gap-4 md:gap-6 text-xs">
          <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-400 transition-colors">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
