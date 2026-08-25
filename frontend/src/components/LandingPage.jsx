import React from 'react';

export default function LandingPage({ onEnter }) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] text-center max-w-4xl mx-auto px-4 py-12">
      {/* Title Tag */}
      <div className="inline-flex items-center space-x-2 border border-cosmic-accent/30 bg-cosmic-accent/10 px-4 py-1.5 rounded-full text-xs text-cosmic-accent tracking-wide uppercase font-semibold mb-6 animate-pulse">
        <span>✦ Your AI Astrological Portal ✦</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-cosmic-gold via-white to-cosmic-accent tracking-wide font-extrabold mb-6 leading-tight">
        AstroMate
      </h1>

      <p className="text-slate-300 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12">
        Unlock planetary configurations, compatibility mappings, and custom daily horoscopes designed for your unique spiritual path—powered by Gemini Artificial Intelligence.
      </p>

      {/* CTA Button */}
      <button
        onClick={onEnter}
        className="relative group px-8 py-4 bg-gradient-to-r from-cosmic-accent to-purple-600 hover:from-pink-500 hover:to-purple-700 text-white font-serif text-lg font-semibold rounded-2xl transition-all duration-300 active:scale-95 shadow-xl shadow-cosmic-accent/20 hover:shadow-cosmic-accent/40 mb-16"
      >
        <span className="flex items-center space-x-3">
          <i className="fa-solid fa-sparkles animate-pulse"></i>
          <span>Enter the Cosmos</span>
          <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
        </span>
      </button>

      {/* Features Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 w-full text-left">
        {/* Feature 1 */}
        <div className="border border-white/10 bg-white/5 backdrop-blur-md p-6 rounded-2xl hover:border-cosmic-accent/30 transition-colors">
          <span className="text-3xl text-cosmic-gold block mb-3">🌟</span>
          <h3 className="font-serif text-lg text-white font-semibold mb-2">Daily Horoscope</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Get personalized daily updates on love, finance, and energies tailored to your zodiac sign.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="border border-white/10 bg-white/5 backdrop-blur-md p-6 rounded-2xl hover:border-cosmic-accent/30 transition-colors">
          <span className="text-3xl text-cosmic-accent block mb-3">🌀</span>
          <h3 className="font-serif text-lg text-white font-semibold mb-2">Birth Chart</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Generate your detailed natal cosmic blueprint estimating major planetary alignments.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="border border-white/10 bg-white/5 backdrop-blur-md p-6 rounded-2xl hover:border-cosmic-accent/30 transition-colors">
          <span className="text-3xl text-pink-400 block mb-3">💖</span>
          <h3 className="font-serif text-lg text-white font-semibold mb-2">Synastry Match</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Analyze relationship chemistry, elemental harmony, and synastry scores between two individuals.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="border border-white/10 bg-white/5 backdrop-blur-md p-6 rounded-2xl hover:border-cosmic-accent/30 transition-colors">
          <span className="text-3xl text-purple-400 block mb-3">🔮</span>
          <h3 className="font-serif text-lg text-white font-semibold mb-2">Astro Chat</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Consult AstroMate AI, your dedicated personal astrologer, on transits, destiny, and questions.
          </p>
        </div>
      </div>
    </div>
  );
}
