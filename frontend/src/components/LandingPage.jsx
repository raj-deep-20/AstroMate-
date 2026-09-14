import { useEffect, useState } from "react";
import {

} from "lucide-react"

function AnimatedStat({ value, suffix = "", label, delay = 0 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frameId;
    let startTime;
    const duration = 1200;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };

    const timeoutId = window.setTimeout(() => {
      frameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [delay, value]);

  return (
    <div className="text-center animate-fade-up">
      <h3 className="text-3xl font-serif font-bold text-[#33256e]">
        {count}{suffix}
      </h3>
      <p className="text-sm text-slate-500 mt-2">{label}</p>
    </div>
  );
}

export default function LandingPage({ onEnter }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const features = [
    {
      icon: "🔆",
      title: "Daily Horoscope",
      description:
        "Receive personalized cosmic insights for love, career, finance, and your daily energy.",
      accent: "from-amber-100 to-orange-50",
    },
    {
      icon: "🌑",
      title: "Birth Chart",
      description:
        "Explore your unique cosmic blueprint through planetary positions and celestial patterns.",
      accent: "from-violet-100 to-purple-50",
    },
    {
      icon: "💞",
      title: "Synastry Match",
      description:
        "Discover relationship compatibility, elemental harmony, and cosmic connections.",
      accent: "from-pink-100 to-rose-50",
    },
    {
      icon: "",
      title: "Astro Chat",
      description:
        "Ask AstroMate AI about transits, zodiac signs, destiny, and your cosmic journey.",
      accent: "from-cyan-100 to-blue-50",
    },
  ];

  const testimonials = [
    {
      quote:
        "AstroMate completely transformed how I understand myself and my relationships.",
      name: "Ananya Sharma",
      role: "Marketing Manager",
      initials: "AS",
    },
    {
      quote:
        "The birth chart insights were surprisingly detailed and helped me understand myself better.",
      name: "Rohit Mehta",
      role: "Software Engineer",
      initials: "RM",
    },
    {
      quote:
        "The Astro Chat feels like having a personal astrologer available whenever I need guidance.",
      name: "Priya Nair",
      role: "Entrepreneur",
      initials: "PN",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#f8f7fc] text-[#17152b]">
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-[120px]" />

        <div className="absolute top-[20%] -right-40 w-[500px] h-[500px] bg-pink-200/30 rounded-full blur-[120px]" />

        <div className="absolute bottom-0 left-[20%] w-[400px] h-[400px] bg-indigo-200/20 rounded-full blur-[120px]" />
      </div>

      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <nav className="relative z-30 max-w-7xl mx-auto px-6 lg:px-8 py-5 md:py-6 animate-fade-down">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#191733] text-[#f6c65b] flex items-center justify-center text-xl shadow-lg">
              <img src="/assests/logo.png" alt="AstroMate Logo" className="w-8 h-8" />
            </div>

            <span className="font-serif text-2xl font-bold tracking-wide">
              AstroMate
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a
              href="#home"
              className="hover:text-purple-700 transition-colors"
            >
              Home
            </a>

            <a
              href="#features"
              className="hover:text-purple-700 transition-colors"
            >
              Explore
            </a>

            <a
              href="#how-it-works"
              className="hover:text-purple-700 transition-colors"
            >
              How It Works
            </a>

            <a
              href="#testimonials"
              className="hover:text-purple-700 transition-colors"
            >
              Stories
            </a>
          </div>

          <div className="flex items-center gap-3">
            {/* CTA */}
            <button
              onClick={onEnter}
              className="px-4 md:px-5 py-2.5 rounded-xl bg-[#33256e] hover:bg-[#4a3598] text-white text-sm font-semibold shadow-lg shadow-purple-300/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              Enter the Cosmos
            </button>

            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="md:hidden w-11 h-11 rounded-xl border border-slate-200 bg-white text-[#33256e] flex items-center justify-center shadow-sm"
            >
              <i className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`} />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 rounded-2xl border border-purple-100 bg-white p-3 shadow-xl">
            {[
              ["Home", "#home"],
              ["Explore", "#features"],
              ["How It Works", "#how-it-works"],
              ["Stories", "#testimonials"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-purple-50 hover:text-purple-700"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section
        id="home"
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-8 pb-20 md:pt-12 lg:pt-20 lg:pb-24"
      >
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
          {/* LEFT HERO CONTENT */}
          <div className="animate-fade-up">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-purple-100 shadow-sm text-xs font-semibold uppercase tracking-widest text-purple-700 mb-7 animate-fade-up-delay-1">
              <span>✦</span>
              AI-Powered Astrological Guidance
            </div>

            {/* Heading */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.08] font-bold mb-6 animate-fade-up-delay-2">
              Your Cosmic
              <span className="block bg-gradient-to-r from-[#39267d] via-[#7c4db8] to-[#d276a4] text-transparent bg-clip-text">
                Journey Begins Here
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg leading-relaxed text-slate-600 max-w-xl mb-9 animate-fade-up-delay-3">
              Discover the connection between the stars and your story. AstroMate
              combines ancient astrological wisdom with modern AI to bring
              personalized insights directly to you.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-10 animate-fade-up-delay-4">
              <button
                onClick={onEnter}
                className="group flex items-center gap-3 px-7 py-4 rounded-xl bg-[#33256e] hover:bg-[#4a3598] text-white font-semibold shadow-xl shadow-purple-300/50 transition-all duration-300 hover:-translate-y-1"
              >
                <span>Enter the Cosmos</span>

                <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-3 px-6 py-4 rounded-xl border border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50 transition-all font-medium"
              >
                <span className="w-7 h-7 rounded-full border border-slate-400 flex items-center justify-center text-xs">
                  ▶
                </span>

                Explore Astrology
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {["A", "R", "P", "S"].map((letter, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-full border-3 border-white bg-gradient-to-br from-purple-400 to-pink-300 flex items-center justify-center text-white font-bold text-sm"
                  >
                    {letter}
                  </div>
                ))}
              </div>

              <div>
                <div className="flex text-amber-400 text-sm">★★★★★</div>

                <p className="text-xs text-slate-500 mt-1">
                  Trusted by 10,000+ cosmic explorers
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              HERO VISUAL
          ===================================================== */}
          <div className="relative flex justify-center">
            {/* Glow */}
            <div className="absolute inset-0 bg-purple-300/30 blur-[100px] rounded-full" />

            {/* Main Card */}
            <div className="relative w-full max-w-[540px] aspect-square rounded-[40px] bg-gradient-to-br from-[#17142f] via-[#242050] to-[#47306f] shadow-2xl overflow-hidden border border-white/10">
              {/* Stars */}
              <div className="absolute inset-0 opacity-70">
                {[...Array(40)].map((_, index) => (
                  <span
                    key={index}
                    className="absolute text-white text-xs animate-pulse"
                    style={{
                      left: `${(index * 37) % 95}%`,
                      top: `${(index * 53) % 95}%`,
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    ✦
                  </span>
                ))}
              </div>

              {/* Orbit Rings */}
              <div className="absolute inset-10 border border-amber-300/30 rounded-full" />
              <div className="absolute inset-20 border border-purple-300/30 rounded-full" />
              <div className="absolute inset-32 border border-pink-300/30 rounded-full" />

              {/* Zodiac Circle */}
              <div className="absolute inset-[17%] rounded-full border border-[#f4c75f]/50 bg-[#101027]/70 backdrop-blur-xl flex items-center justify-center shadow-2xl">
                <div className="absolute inset-5 rounded-full border border-[#f4c75f]/30" />

                <div className="absolute inset-14 rounded-full border border-[#f4c75f]/20" />

                {/* Zodiac Signs */}
                <div className="absolute top-5 text-[#f4c75f] text-xl">♈</div>
                <div className="absolute top-12 right-12 text-[#f4c75f] text-xl">
                  ♉
                </div>
                <div className="absolute right-5 text-[#f4c75f] text-xl">♊</div>
                <div className="absolute bottom-12 right-12 text-[#f4c75f] text-xl">
                  ♋
                </div>
                <div className="absolute bottom-5 text-[#f4c75f] text-xl">♌</div>
                <div className="absolute bottom-12 left-12 text-[#f4c75f] text-xl">
                  ♍
                </div>
                <div className="absolute left-5 text-[#f4c75f] text-xl">♎</div>
                <div className="absolute top-12 left-12 text-[#f4c75f] text-xl">
                  ♏
                </div>

                {/* Sun */}
                <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#ffd978] via-[#f5b93f] to-[#db7f27] shadow-[0_0_80px_rgba(255,194,73,0.7)] flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center">
                    <span className="text-5xl">☀</span>
                  </div>
                </div>
              </div>

              {/* Floating Planets */}
              <div className="absolute top-10 right-8 w-20 h-20 rounded-full bg-gradient-to-br from-pink-200 to-purple-500 shadow-xl" />

              <div className="absolute bottom-14 left-8 w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 to-orange-400 shadow-xl" />

              {/* AI Label */}
              <div className="absolute bottom-8 right-8 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                <p className="text-[10px] uppercase tracking-widest text-purple-200">
                  Powered By
                </p>

                <p className="font-semibold text-sm mt-1">AI + Astrology ✦</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TRUST STATS
      ===================================================== */}
      <section className="relative z-10 border-y border-purple-100 bg-white/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedStat value={10} suffix="K+" label="Cosmic Explorers" delay={100} />
            <AnimatedStat value={50} suffix="K+" label="Insights Generated" delay={220} />
            <AnimatedStat value={12} label="Zodiac Signs" delay={340} />
            <AnimatedStat value={24} suffix="/7" label="AI Guidance" delay={460} />
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURES SECTION
      ===================================================== */}
      <section
        id="features"
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-28"
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-purple-700 text-xs uppercase tracking-[0.25em] font-bold mb-4">
            What You Can Explore
          </p>

          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-5">
            Everything You Need for
            <span className="block text-purple-700">Cosmic Clarity</span>
          </h2>

          <p className="text-slate-500 leading-relaxed">
            Explore the universe through personalized insights designed around
            your unique astrological journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.accent} rounded-bl-[100px] opacity-60`}
              />

              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>

                <h3 className="font-serif text-xl font-bold mb-3">
                  {feature.title}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  {feature.description}
                </p>

                <button
                  onClick={onEnter}
                  className="text-sm font-semibold text-purple-700 flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Explore
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
      <section
        id="how-it-works"
        className="relative z-10 bg-[#111027] text-white overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-10 border border-purple-400 rounded-full" />
          <div className="absolute inset-24 border border-purple-400 rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-28">
          <div className="text-center mb-20">
            <p className="text-purple-300 text-xs uppercase tracking-[0.25em] font-bold mb-4">
              How It Works
            </p>

            <h2 className="font-serif text-4xl md:text-5xl font-bold">
              Your Path to Cosmic Guidance
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-10">
            {[
              {
                icon: "♙",
                title: "Create Your Profile",
                text: "Share your basic birth details and personal preferences.",
              },
              {
                icon: "🪐",
                title: "AI Analyzes",
                text: "AstroMate explores cosmic patterns and planetary positions.",
              },
              {
                icon: "📜",
                title: "Receive Insights",
                text: "Get personalized readings designed around your journey.",
              },
              {
                icon: "✦",
                title: "Live Your Best Life",
                text: "Use your insights to make more conscious decisions.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 mx-auto rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-3xl mb-6 shadow-xl">
                  {step.icon}
                </div>

                <div className="w-7 h-7 mx-auto -mt-9 mb-5 rounded-full bg-[#f5c45d] text-[#111027] text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </div>

                <h3 className="font-serif text-lg font-semibold mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}
      <section
        id="testimonials"
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-28"
      >
        <div className="text-center mb-16">
          <p className="text-purple-700 text-xs uppercase tracking-[0.25em] font-bold mb-4">
            Loved By Cosmic Explorers
          </p>

          <h2 className="font-serif text-4xl md:text-5xl font-bold">
            What Our Users Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl text-purple-200 font-serif mb-4">“</div>

              <p className="text-slate-600 leading-relaxed mb-6">
                {testimonial.quote}
              </p>

              <div className="flex text-amber-400 text-sm mb-6">
                ★★★★★
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-400 to-pink-300 flex items-center justify-center text-white text-xs font-bold">
                  {testimonial.initials}
                </div>

                <div>
                  <h4 className="font-semibold text-sm">
                    {testimonial.name}
                  </h4>

                  <p className="text-xs text-slate-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          CTA SECTION
      ===================================================== */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-28">
        <div className="relative overflow-hidden rounded-[35px] bg-gradient-to-r from-[#1b1740] via-[#3b246c] to-[#8b4f83] px-8 py-16 md:px-16 md:py-20 text-white">
          {/* Decorations */}
          <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-purple-300/20 blur-3xl" />

          <div className="absolute right-20 bottom-[-80px] w-64 h-64 rounded-full border border-pink-300/30" />

          <div className="relative max-w-xl">
            <p className="text-purple-200 text-xs uppercase tracking-[0.25em] font-bold mb-5">
              The Universe Is Waiting
            </p>

            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6">
              Ready to Unlock Your Cosmic Potential?
            </h2>

            <p className="text-purple-100/80 leading-relaxed mb-8">
              Join thousands of explorers discovering deeper insights about
              themselves, their relationships, and their journey through life.
            </p>

            <button
              onClick={onEnter}
              className="group px-7 py-4 bg-white text-[#33256e] rounded-xl font-bold shadow-xl hover:scale-105 transition-all"
            >
              <span className="flex items-center gap-3">
                Enter the Cosmos
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </button>
          </div>

          {/* Moon Decoration */}
          <div className="hidden md:flex absolute right-20 bottom-[-20px] w-56 h-56 rounded-full bg-gradient-to-br from-[#f6d8bb] via-[#cf94c3] to-[#71487f] shadow-[0_0_100px_rgba(224,150,200,0.5)] items-center justify-center">
            <span className="text-7xl opacity-70">☾</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          NEWSLETTER
      ===================================================== */}
      <section className="relative z-10 bg-white border-y border-purple-100">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <p className="text-purple-700 text-xs uppercase tracking-[0.25em] font-bold mb-4">
            Stay Connected
          </p>

          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Cosmic Insights in Your Inbox
          </h2>

          <p className="text-slate-500 max-w-lg mx-auto mb-7">
            Receive astrology insights, cosmic updates, and new AstroMate
            features directly in your inbox.
          </p>

          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-purple-300"
            />

            <button className="px-6 py-4 rounded-xl bg-[#33256e] hover:bg-[#4a3598] text-white font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="relative z-10 bg-[#101027] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 text-[#f5c45d] flex items-center justify-center text-xl">
                  ✦
                </div>

                <span className="font-serif text-2xl font-bold">
                  AstroMate
                </span>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                AstroMate combines ancient astrological wisdom with artificial
                intelligence to bring clarity to your cosmic journey.
              </p>

              <div className="flex gap-3 mt-6">
                {["instagram", "twitter", "facebook", "youtube"].map(
                  (social) => (
                    <button
                      key={social}
                      className="w-9 h-9 rounded-lg bg-white/5 hover:bg-purple-500/30 flex items-center justify-center transition-colors"
                    >
                      <i className={`fa-brands fa-${social} text-sm`} />
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-5">Explore</h4>

              <div className="space-y-3 text-sm text-slate-400">
                <a href="#features" className="block hover:text-white">
                  Daily Horoscope
                </a>

                <a href="#features" className="block hover:text-white">
                  Birth Chart
                </a>

                <a href="#features" className="block hover:text-white">
                  Synastry Match
                </a>

                <a href="#features" className="block hover:text-white">
                  Astro Chat
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-5">Company</h4>

              <div className="space-y-3 text-sm text-slate-400">
                <a href="#home" className="block hover:text-white">
                  About AstroMate
                </a>

                <a href="#how-it-works" className="block hover:text-white">
                  How It Works
                </a>

                <a href="#testimonials" className="block hover:text-white">
                  Testimonials
                </a>

                <button
                  onClick={onEnter}
                  className="block hover:text-white text-left"
                >
                  Get Started
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-5">Support</h4>

              <div className="space-y-3 text-sm text-slate-400">
                <button className="block hover:text-white text-left">
                  Help Center
                </button>

                <button className="block hover:text-white text-left">
                  Privacy Policy
                </button>

                <button className="block hover:text-white text-left">
                  Terms of Service
                </button>

                <button className="block hover:text-white text-left">
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 mt-14 pt-7 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2026 AstroMate. All rights reserved.</p>

            <p className="flex items-center gap-2">
              Made with <span className="text-pink-400">♥</span> for cosmic
              explorers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}